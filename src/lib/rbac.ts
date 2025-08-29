import { getApp } from "firebase/app";
import { auth } from "../../firebase";
import { onIdTokenChanged } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { Roles, type Role } from "../types/role";

let userRole: Role | null = null;
let unsub: (() => void) | null = null;

/**
 * Force refresh the user's ID token and claims from Firebase.
 * Useful after updating role in backend.
 */
export async function refreshRole(): Promise<Role | null> {
  const u = auth.currentUser;
  if (!u) {
    userRole = null;
    return null;
  }
  await u.getIdToken(true); // force refresh
  const res = await u.getIdTokenResult();
  userRole = (res.claims.role as Role) ?? null; // update the cache
  return userRole;
}

/**
 * Set a user's role in Firebase via a callable Cloud Function.
 *
 * @param uid - Firebase Auth UID of the user.
 * @param role - Role to assign.
 */
export async function setUserRole(uid: string, role: Role) {
  const fn = httpsCallable<{ uid: string; role: Role }, void>(
    getFunctions(getApp(), "us-east4"),
    "setUserRole"
  );
  await fn({ uid, role });
}

/**
 * Get the most recently known role of the current user.
 *
 * @returns The current user's role, or null if not set or unauthenticated.
 */
export function getUserRole(): Role | null {
  return userRole;
}

/**
 * Subscribe to role changes.
 * Fires on sign-in, sign-out, and token refresh.
 * Updates internal `userRole` and invokes the provided callback.
 *
 * @param onRole - Callback to run when the role changes.
 * @returns Unsubscribe function.
 */
// eslint-disable-next-line no-unused-vars
export function subscribeToRole(onRole: (role: Role | null) => void) {
  return onIdTokenChanged(auth, async (user) => {
    if (!user) {
      userRole = null;
      onRole(null);
      return;
    }

    try {
      const token = await user.getIdTokenResult();
      const roleClaim = token.claims.role as Role | undefined;
      userRole = roleClaim ?? null;
    } catch (error) {
      console.error("Error fetching role claim:", error);
      userRole = null;
    }

    onRole(userRole);
  });
}

/**
 * React hook for UI components that need live role updates.
 * Subscribes to role changes and re-renders when updated.
 *
 * @returns The current role or null if unauthenticated.
 */
export function useRole() {
  const [role, setRole] = useState<Role | null>(userRole);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const token = await user.getIdTokenResult(true);
      const claim = token.claims.role as Role | undefined;

      setRole(claim || null);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { role, loading };
}

/**
 * Wait for a role to appear by refreshing a few times.
 */
export async function ensureRole(opts?: {
  timeoutMs?: number;
}): Promise<Role | null> {
  const timeout = opts?.timeoutMs ?? 6000;
  const start = Date.now();
  let role = await refreshRole();
  while (!role && Date.now() - start < timeout) {
    await new Promise((r) => setTimeout(r, 150));
    role = await refreshRole();
  }
  return role;
}

/**
 * Fallback path for users created BEFORE onCreate trigger existed:
 * calls a callable to set a default role iff missing, then refreshes again.
 */
export async function ensureRoleWithFallback(opts?: {
  timeoutMs?: number;
}): Promise<Role | null> {
  let role = await ensureRole(opts);
  if (role) return role;

  // Call a server function that sets a default role only if none exists
  const fn = httpsCallable(
    getFunctions(getApp(), "us-east4"),
    "initializeRole"
  );
  try {
    await fn({}); // server uses auth context; no args needed
  } catch (e) {
    console.warn("initializeRole callable failed:", e);
  }

  return await ensureRole(opts);
}

// Sets up a listener to monitor changes in the authentication state of a user.
export function startRoleListener() {
  if (unsub) return unsub;
  unsub = onIdTokenChanged(auth, async (user) => {
    if (!user) {
      userRole = null;
      return;
    }
    const res = await user.getIdTokenResult();
    userRole = (res.claims.role as Role) ?? null;
  });
  return unsub;
}

// Utility for role checks
export function hasRole(role: Role | null, allowed: Role[]): boolean {
  return role !== null && allowed.includes(role);
}

// Permission helpers
export const isApplicant = (role: Role | null): boolean =>
  role === Roles.Applicant;

export const isStrictAdmin = (role: Role | null): boolean =>
  role === Roles.Admin;

export const isAdmin = (role: Role | null): boolean =>
  role === Roles.Admin || role === Roles.SuperAdmin;

export const isSuperAdmin = (role: Role | null): boolean =>
  role === Roles.SuperAdmin;

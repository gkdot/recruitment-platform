import { auth } from "../../firebase";
import { onIdTokenChanged } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";

export type Role = "applicant" | "admin" | "coordinator" | "super_admin";

let currentRole: Role | null = null;

/**
 * Subscribe to role changes.
 * Fires on sign-in, sign-out, and token refresh.
 * Updates internal `currentRole` and invokes the provided callback.
 *
 * @param onRole - Callback to run when the role changes.
 * @returns Unsubscribe function.
 */
// eslint-disable-next-line no-unused-vars
export function subscribeToRole(onRole: (role: Role | null) => void) {
  return onIdTokenChanged(auth, async (user) => {
    if (!user) {
      currentRole = null;
      onRole(null);
      return;
    }

    try {
      const token = await user.getIdTokenResult();
      const roleClaim = token.claims.role as Role | undefined;
      currentRole = roleClaim ?? null;
    } catch (error) {
      console.error("Error fetching role claim:", error);
      currentRole = null;
    }

    onRole(currentRole);
  });
}

/**
 * Force refresh the user's ID token and claims from Firebase.
 * Useful after updating role in backend.
 */
export async function refreshRole() {
  await auth.currentUser?.getIdToken(true);
}

/**
 * Set a user's role in Firebase via a callable Cloud Function.
 *
 * @param uid - Firebase Auth UID of the user.
 * @param role - Role to assign.
 */
export async function setUserRole(uid: string, role: Role) {
  const fn = httpsCallable<{ uid: string; role: Role }, void>(
    getFunctions(),
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
  return currentRole;
}

/**
 * React hook for UI components that need live role updates.
 * Subscribes to role changes and re-renders when updated.
 *
 * @returns The current role or null if unauthenticated.
 */
export function useRole() {
  const [role, setRole] = useState<Role | null>(currentRole);

  useEffect(() => {
    const unsubscribe = subscribeToRole(setRole);
    return unsubscribe;
  }, []);

  return role;
}

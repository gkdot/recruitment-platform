// functions/src/index.ts
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

// Merge claims safely without overwriting
async function setRoleClaim(uid: string, claims: Record<string, unknown>) {
  await admin.auth().setCustomUserClaims(uid, claims);
  console.log(`Assigned claims ${JSON.stringify(claims)} to user ${uid}`);
}

// Assign a default role to any newly created Firebase Auth user
export const setDefaultRole = functions
  .region("us-east4")
  .auth.user()
  .onCreate(async (user) => {
    const isGoogle = user.providerData?.some(
      (p) => p?.providerId === "google.com"
    );
    if (!isGoogle) return;

    const existing = (user.customClaims ?? {}) as Record<string, unknown>;
    await setRoleClaim(user.uid, { ...existing, role: "applicant" });
  });

// Callable fallback for already-existing users
export const initializeRole = functions
  .region("us-east4")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be logged in."
      );
    }

    const uid = context.auth.uid;
    const user = await admin.auth().getUser(uid);
    const claims = (user.customClaims ?? {}) as Record<string, unknown>;

    if (claims.role) {
      return { ok: true, role: claims.role, changed: false };
    }

    await setRoleClaim(uid, { ...claims, role: "applicant" });
    return { ok: true, role: "applicant", changed: true };
});

export const setUserRole = functions
.region("us-east4")
.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can set roles."
    );
  }

  // Extra guard: only let admins set roles
  const caller = await admin.auth().getUser(context.auth.uid);
  if (caller.customClaims?.role !== "admin" && caller.customClaims?.role !== "super_admin") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only admins can assign roles."
    );
  }

  const { uid, role } = data as { uid: string; role: string };
  if (!uid || !role) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Must provide uid and role."
    );
  }

  const user = await admin.auth().getUser(uid);
  const claims = (user.customClaims ?? {}) as Record<string, unknown>;
  await setRoleClaim(uid, { ...claims, role });

  return { ok: true, role };
});

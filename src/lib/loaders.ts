import { auth } from "../../firebase";
import { getUserRole, refreshRole } from "./rbac";

export async function requireAuth(allowedRoles?: string[]) {
  const user = auth.currentUser;
  if (!user) {
    throw new Response("Unauthorized", { status: 403 });
  }

  // refresh role in case it's stale
  await refreshRole();
  const role = getUserRole();

  if (allowedRoles && allowedRoles.length > 0) {
    if (!role || !allowedRoles.includes(role)) {
      throw new Response("Forbidden", { status: 403 });
    }
  }

  return { user, role };
}

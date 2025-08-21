import { auth } from "../../firebase";
import { getUserRole, refreshRole } from "./rbac";

export async function requireAuth(allowedRoles?: string[]) {
  const user = auth.currentUser;
  if (!user) throw new Response("Unauthorized", { status: 403 });

  await refreshRole();

  let role = getUserRole();
  const start = Date.now();
  while (!role && Date.now() - start < 3000) {
    // wait max 3s
    await new Promise((r) => setTimeout(r, 100));
    role = getUserRole();
  }

  if (!role || (allowedRoles && !allowedRoles.includes(role))) {
    throw new Response("Forbidden", { status: 403 });
  }

  return { user, role };
}

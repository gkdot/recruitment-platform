import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../lib/rbac";

/**
 * Redirects user if their role does not match the allowed roles.
 *
 * @param allowedRoles - Roles that are permitted to view this page.
 * @param redirectPath - Path to redirect unauthorized users to.
 */
export function useRoleGuard(
  allowedRoles: string[],
  redirectPath: string = "/"
) {
  const role = useRole().role;
  const navigate = useNavigate();

  useEffect(() => {
    if (role === null) return; // still loading, don’t redirect yet
    if (!allowedRoles.includes(role)) {
      navigate(redirectPath, { replace: true });
    }
  }, [role, allowedRoles, navigate]);

  return role;
}

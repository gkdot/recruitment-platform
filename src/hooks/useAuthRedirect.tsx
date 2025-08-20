import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRole, isAdmin, isApplicant } from "../lib/rbac";

// Automatically redirect users based on their role after login or signup.
export function useAuthRedirect() {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading || roleLoading) return;

    if (!user) {
      navigate("/", { replace: true });
      return;
    }

    if (isAdmin(role)) {
      navigate("/admin", { replace: true });
    } else if (isApplicant(role)) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true }); // fallback
    }
  }, [authLoading, roleLoading, user, role, navigate]);
}

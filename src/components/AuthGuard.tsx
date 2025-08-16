import { useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { getUserRole, subscribeToRole, type Role } from "../lib/rbac";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";

interface AuthGuardProps {
  allowedRoles?: Role[];
  children: ReactNode;
}

export default function AuthGuard({ allowedRoles, children }: AuthGuardProps) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/unauthorized");
        return;
      }

      const role = getUserRole();

      if (allowedRoles?.length) {
        console.log(`User ${user.displayName} is assigned role ${role}`);
        if (!role || !allowedRoles.includes(role)) {
          navigate("/unauthorized");
          return;
        }
      }

      setAuthorized(true);
      setLoading(false);
    });

    // Also listen for role changes mid-session (e.g., admin demotion)
    const unsubscribeRole = subscribeToRole((role) => {
      if (allowedRoles?.length && (!role || !allowedRoles.includes(role))) {
        navigate("/unauthorized");
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeRole();
    };
  }, [navigate, allowedRoles]);

  if (loading) return <Loading />;
  return authorized ? <>{children}</> : null;
}

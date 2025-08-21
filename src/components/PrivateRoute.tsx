import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRole, isAdmin, isApplicant } from "../lib/rbac";
import type { JSX } from "react";
import Loading from "../pages/Loading";

export function AdminRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (loading || roleLoading) return <Loading />;
  if (!user || !isAdmin(role)) return <Navigate to="/" replace />;

  return children;
}

export function ApplicantRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (loading || roleLoading) return <Loading />;
  if (!user || !isApplicant(role)) return <Navigate to="/" replace />;

  return children;
}

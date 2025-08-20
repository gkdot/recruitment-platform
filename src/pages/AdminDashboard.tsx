import { Outlet, Link } from "react-router-dom";
import { useRoleGuard } from "../hooks/useRoleGuard";
import { isAdmin } from "../lib/rbac";
import Layout from "../components/Layout";
import Loading from "./Loading";
import { Roles } from "../types/role";

export default function AdminDashboard() {
  const role = useRoleGuard([Roles.Admin, Roles.SuperAdmin], "/forbidden");

  if (role === null || !isAdmin(role)) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
        <nav className="flex gap-4 mb-6">
          <Link to="users" className="text-blue-600 hover:underline">
            Manage Users
          </Link>
          <Link to="settings" className="text-blue-600 hover:underline">
            Settings
          </Link>
        </nav>
        {/* Dashboard renders here */}
        <Outlet />
      </div>
    </Layout>
  );
}

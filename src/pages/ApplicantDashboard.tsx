import { Outlet, Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function ApplicantDashboard() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
        <nav className="flex gap-4 mb-6">
          <Link to="users" className="text-blue-600 hover:underline">
            Manage Application
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

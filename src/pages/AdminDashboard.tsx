import { Outlet, Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
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
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRole, isAdmin, isApplicant } from "../lib/rbac";

export function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const navigate = useNavigate();
  const { user, signOut, signIn } = useAuth();
  // Get current role for redirect after sign-in
  const { role, loading: roleLoading } = useRole();

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await signIn();
      setSignedIn(true);
    } catch (err) {
      console.error("Sign in failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Wait for role to load after sign-in, then redirect
  // Only redirect if user just signed in
  // Don't close modal until after navigation
  useEffect(() => {
    if (signedIn && !roleLoading && role) {
      if (isAdmin(role)) {
        navigate("/admin");
      } else if (isApplicant(role)) {
        navigate("/dashboard");
      } else {
        navigate("/dashboard"); // fallback
      }
    }
  }, [signedIn, roleLoading, role, navigate]);

  if (!user) {
    return (
      <button onClick={handleClick} className="rounded-lg">
        Sign in
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex items-center gap-2"
      >
        <img
          src={"/avatar.png"}
          alt={user.displayName || "User"}
          className="w-6 h-6 rounded-full"
        />
        <span className="hidden sm:inline">{user.displayName}</span>
      </button>

      {menuOpen && (
        <div className="absolute right-0 max-w-xs w-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden">
          <div
            className="px-4 py-2 truncate max-w-full"
            title={user.email ?? ""}
          >
            {user.email}
          </div>
          <button
            onClick={async () => {
              await signOut();
              navigate("/");
              window.location.reload();
            }}
            className="w-full text-left px-4 py-2 text-red-600 hover:text-red-700"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

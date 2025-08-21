import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

export function UserProfile() {
  const { user, signOut, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useAuthRedirect();

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await signIn();
      navigate("/auth");
    } catch (err) {
      console.error("Sign in failed:", err);
    } finally {
      setLoading(false);
    }
  };

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
            onClick={signOut}
            className="w-full text-left px-4 py-2 text-red-600 hover:text-red-700"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

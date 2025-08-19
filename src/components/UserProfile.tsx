import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function UserProfile() {
  const { user, signOut, signIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) {
    return (
      <button onClick={signIn} className="rounded-lg">
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
        <div className="absolute right-0 w-38 bg-gray-100 shadow-lg rounded-lg">
          <div className="px-4 py-2">{user.email}</div>
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

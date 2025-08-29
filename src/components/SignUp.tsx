import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useRole, isAdmin, isApplicant } from "../lib/rbac";

interface SignUpFormProps {
  onClose: () => void;
}

export default function SignUp({ onClose }: SignUpFormProps) {
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const navigate = useNavigate();
  const { signIn } = useAuth();
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
      onClose();
    }
  }, [signedIn, roleLoading, role, navigate, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        role="button"
        tabIndex={0}
        aria-label="Close"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        className="absolute inset-0 bg-black/60"
      ></div>

      <div className="relative z-10 bg-white rounded-3xl shadow-lg px-10 py-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
        <button
          type="button"
          onClick={handleClick}
          className="text-green-900 font-medium mb-6"
        >
          {loading ? "Signing in..." : "Sign up with Google"}
        </button>
      </div>
    </div>
  );
}

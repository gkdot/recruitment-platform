import { loginWithGoogle } from "../lib/auth";
import AuthForm from "./forms/AuthForm";

interface SignUpFormProps {
  onClose: () => void;
}

export default function SignUp({ onClose }: SignUpFormProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        role="button"
        tabIndex={0}
        aria-label="Close"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose();
          }
        }}
        className="absolute inset-0 bg-black/60"
      ></div>

      <div className="relative z-10 bg-white rounded-3xl shadow-lg px-10 py-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-2">Sign up</h2>

        <button
          type="button"
          onClick={loginWithGoogle}
          className="text-green-900 font-medium mb-6"
        >
          Sign up with Google
        </button>

        <div className="space-y-4">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}

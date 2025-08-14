import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SignUpFormProps {
  onClose: () => void;
}

export default function SignUp({ onClose }: SignUpFormProps) {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (user) {
      navigate("/dashboard");
    } else {
      await signIn();
      navigate("/dashboard");
    }
  };

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
            handleClick();
          }
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
          Sign up with Google
        </button>
      </div>
    </div>
  );
}

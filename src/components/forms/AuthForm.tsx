import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthFormValues } from "../../schemas/authSchema";

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormValues) => {
    console.log("Submitting AuthForm with:", data);
    // TODO: Replace with API call or React Query mutation
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="text-left">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-500 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="block w-full rounded-xl border border-gray-300 focus:border-green-700 focus:ring-green-700 p-2"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="text-left">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-500 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="block w-full rounded-xl border border-gray-300 focus:border-green-700 focus:ring-green-700 p-2"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full border border-green-700 text-green-900 py-2 rounded-full font-medium hover:bg-green-50 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

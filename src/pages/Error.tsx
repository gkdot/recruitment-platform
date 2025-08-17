import { Link } from "react-router-dom";

type ErrorType = "unauthorized" | "notfound";

interface ErrorPageProps {
  type: ErrorType;
}

export default function ErrorPage({ type }: ErrorPageProps) {
  const config = {
    unauthorized: {
      code: "403",
      title: "Unauthorized",
      message: "You don't have permission to view this page.",
    },
    notfound: {
      code: "404",
      title: "Page Not Found",
      message: "The page you're looking for doesn't exist.",
    },
  };

  const { code, title, message } = config[type];

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">{code}</h1>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-lg mb-6">{message}</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

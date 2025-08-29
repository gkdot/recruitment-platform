import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  let code = "Error";
  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    code = error.status.toString();
    title = error.statusText;

    if (error.status == 403) {
      message = "You don't have permission to view this page.";
    } else if (error.status === 404) {
      message = "The page you're looking for doesn't exist.";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen text-center">
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

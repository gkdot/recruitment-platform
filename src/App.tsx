import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { requireAuth } from "./lib/loaders";

const Landing = lazy(() => import("./pages/Landing/Landing"));
const Loading = lazy(() => import("./pages/Loading"));
const ErrorPage = lazy(() => import("./pages/Error"));
const ApplicantDashboard = lazy(() => import("./pages/ApplicantDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/applicant",
    element: <ApplicantDashboard />,
    loader: () => requireAuth(["applicant"]),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    loader: () => requireAuth(["admin", "super_admin"]),
    errorElement: <ErrorPage />,
    // children: [
    //   { path: "users", element: <AdminUsers /> },
    //   { path: "settings", element: <AdminSettings /> },
    // ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

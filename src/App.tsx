import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { requireAuth } from "./lib/loaders";
import { startRoleListener } from "./lib/rbac";
import { Roles } from "./types/role";
import { AdminRoute, ApplicantRoute } from "./components/PrivateRoute";
import { useAuthRedirect } from "./hooks/useAuthRedirect";

const Landing = lazy(() => import("./pages/Landing/Landing"));
const Loading = lazy(() => import("./pages/Loading"));
const ErrorPage = lazy(() => import("./pages/Error"));
const ApplicantDashboard = lazy(() => import("./pages/ApplicantDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function PostLogin() {
  useAuthRedirect();
  return <Loading />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/post-login",
    element: <PostLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <ApplicantRoute>
        <ApplicantDashboard />
      </ApplicantRoute>
    ),
    loader: () => requireAuth([Roles.Applicant]),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
    loader: () => requireAuth([Roles.Admin, Roles.SuperAdmin]),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default function App() {
  useEffect(() => startRoleListener(), []);
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

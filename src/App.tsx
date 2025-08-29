import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { requireAuth } from "./lib/loaders";
import { startRoleListener } from "./lib/rbac";
import { Roles } from "./types/role";

const Landing = lazy(() => import("./pages/Landing/Landing"));
const Loading = lazy(() => import("./pages/Loading"));
const Error = lazy(() => import("./pages/Error"));
const ApplicantDashboard = lazy(() => import("./pages/ApplicantDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <ApplicantDashboard />,
    loader: () => requireAuth([Roles.Applicant]),
    errorElement: <Error />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    loader: () => requireAuth([Roles.Admin, Roles.SuperAdmin]),
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <Error />,
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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthGuard from "./components/AuthGuard";
import "./App.css";

const Landing = lazy(() => import("./pages/Landing/Landing"));
const Loading = lazy(() => import("./pages/Loading"));
const Error = lazy(() => import("./pages/Error"));
const ApplicantDashboard = lazy(() => import("./pages/ApplicantDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Error type={"notfound"} />} />
          <Route
            path="/unauthorized"
            element={<Error type={"unauthorized"} />}
          />

          <Route
            path="/dashboard"
            element={
              <AuthGuard allowedRoles={["applicant"]}>
                <ApplicantDashboard />
              </AuthGuard>
            }
          />

          <Route
            path="/admin"
            element={
              <AuthGuard allowedRoles={["admin", "super_admin"]}>
                <AdminDashboard />
              </AuthGuard>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

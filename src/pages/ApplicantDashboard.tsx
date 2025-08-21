import { useState } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Send,
  User,
} from "lucide-react";
import { useRoleGuard } from "../hooks/useRoleGuard";
import { isApplicant } from "../lib/rbac";
import { Roles } from "../types/role";
import ApplicationForm from "./ApplicationForm";
import ProcessPanel from "./ProcessPanel";
import Layout from "../components/Layout";
import Loading from "../pages/Loading";

const ApplicantDashboard = () => {
  const [hasSubmittedApplication, setHasSubmittedApplication] = useState(false);

  const role = useRoleGuard([Roles.Applicant], "/forbidden");
  if (role === null || !isApplicant(role)) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Application Status */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <User className="h-5 w-5 text-blue-600" />
                Your Application Status
              </h2>
              <p className="text-sm text-gray-500">
                {hasSubmittedApplication
                  ? "Track your application progress below"
                  : "Complete your application to get started"}
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                hasSubmittedApplication
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {hasSubmittedApplication ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Submitted
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4" />
                  Draft
                </>
              )}
            </span>
          </div>
        </div>

        {!hasSubmittedApplication ? (
          <>
            {/* Application Form */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-1">
                <FileText className="h-5 w-5 text-blue-600" />
                Complete Your Application
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Fill out all required fields to submit your application
              </p>
              <ApplicationForm
                onSubmit={() => setHasSubmittedApplication(true)}
              />
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Ready to Apply?</h3>
                  <p className="text-sm text-blue-100">
                    Submit your application to start the review process
                  </p>
                </div>
                <Send className="h-8 w-8" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Progress Overview */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold">Application Progress</h3>
              <p className="text-sm text-gray-500 mb-4">
                Your application is currently being reviewed
              </p>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Application Submitted</span>
                  <span>Expected completion in 2-3 weeks</span>
                </div>
              </div>
            </div>

            {/* Process Panel */}
            <ProcessPanel />

            {/* Next Steps */}
            <div className="bg-white border-l-4 border-blue-600 rounded-2xl shadow p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Next Steps
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                  <div>
                    <p className="font-medium">
                      Prepare for Technical Interview
                    </p>
                    <p className="text-sm text-gray-500">
                      Review the job requirements and prepare examples of your
                      work
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-400 mt-2" />
                  <div>
                    <p className="font-medium">
                      Keep Your Contact Information Updated
                    </p>
                    <p className="text-sm text-gray-500">
                      We&apos;ll contact you via email for next steps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ApplicantDashboard;

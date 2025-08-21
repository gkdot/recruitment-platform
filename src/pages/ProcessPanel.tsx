import {
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  FileCheck,
  Trophy,
} from "lucide-react";

const ProcessPanel = () => {
  const processStages = [
    {
      id: 1,
      title: "Application Received",
      description: "Your application has been successfully submitted",
      status: "completed",
      date: "2024-01-15",
      icon: FileCheck,
    },
    {
      id: 2,
      title: "Initial Review",
      description: "HR team is reviewing your application materials",
      status: "completed",
      date: "2024-01-16",
      icon: User,
    },
    {
      id: 3,
      title: "Technical Interview",
      description: "Technical assessment with the engineering team",
      status: "current",
      date: "2024-01-22",
      scheduledTime: "10:00 AM - 11:00 AM",
      icon: Clock,
    },
    {
      id: 4,
      title: "Team Interview",
      description: "Meet with your potential team members",
      status: "pending",
      date: "TBD",
      icon: User,
    },
    {
      id: 5,
      title: "Final Decision",
      description: "Final review and decision making",
      status: "pending",
      date: "TBD",
      icon: Trophy,
    },
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      completed: {
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-100",
        badge: "bg-green-100 text-green-700",
        label: "Completed",
      },
      current: {
        icon: Clock,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        badge: "bg-blue-100 text-blue-700",
        label: "In Progress",
      },
      pending: {
        icon: AlertCircle,
        color: "text-gray-500",
        bgColor: "bg-gray-100",
        badge: "bg-gray-200 text-gray-600",
        label: "Pending",
      },
    };

    return configs[status as keyof typeof configs];
  };

  return (
    <div className="rounded-2xl border bg-white shadow p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Calendar className="h-5 w-5 text-blue-600" />
          Interview Process Timeline
        </h2>
        <p className="text-sm text-gray-500">
          Track your progress through our interview process
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {processStages.map((stage, index) => {
          const config = getStatusConfig(stage.status);
          const StatusIcon = config.icon;

          return (
            <div key={stage.id} className="flex items-start gap-4">
              {/* Timeline connector */}
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full ${config.bgColor}`}>
                  <StatusIcon className={`h-5 w-5 ${config.color}`} />
                </div>
                {index < processStages.length - 1 && (
                  <div
                    className={`w-0.5 h-12 mt-2 ${
                      stage.status === "completed"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                )}
              </div>

              {/* Stage content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-800">{stage.title}</h4>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${config.badge}`}
                  >
                    {config.label}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  {stage.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {stage.status === "completed"
                        ? `Completed ${new Date(stage.date).toLocaleDateString()}`
                        : stage.status === "current"
                          ? `Scheduled for ${new Date(stage.date).toLocaleDateString()}`
                          : "Date TBD"}
                    </span>
                    {stage.scheduledTime && stage.status === "current" && (
                      <span className="text-blue-600 font-medium">
                        {stage.scheduledTime}
                      </span>
                    )}
                  </div>

                  {stage.status === "current" && (
                    <button className="text-sm border rounded px-3 py-1 hover:bg-gray-50">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-medium text-gray-800">
              Next Step: Technical Interview
            </h5>
            <p className="text-sm text-gray-600">
              Prepare for your technical assessment on January 22nd
            </p>
          </div>
          <button className="rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm text-white font-medium hover:opacity-90">
            Prepare for Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcessPanel;

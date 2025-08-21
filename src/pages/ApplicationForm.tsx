import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Save, Send } from "lucide-react";
import { generateArrayOfYears } from "../utils/utils";

interface ApplicationFormProps {
  onSubmit: () => void;
}

const ApplicationForm = ({ onSubmit }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    graduationYear: "",
    courses: "",
    workshops: "",
    referral: [] as string[],
    teams: [] as string[],
    interest: "",
    experience: "",
    resume: null as File | null,
  });

  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const graduationYears = generateArrayOfYears();
  const workshopsOptions = ["0", "1", "2 or more"];
  const referralOptions = [
    "Workshops",
    "Website",
    "Club/CS Department Fair",
    "Social Media",
    "Classroom Visits",
    "Friends",
    "Flyers",
    "Student Happenings",
    "CS Departmental Email",
    "Other",
  ];
  const teamOptions = [
    "Student Leadership Development",
    "Global Americas",
    "Campus Escort Mobile App",
    "Flat Hat Games",
    "Recruitment Project",
  ];

  const calculateProgress = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "graduationYear",
      "courses",
      "workshops",
      "teams",
      "interest",
      "experience",
    ];
    const completedFields = requiredFields.filter((field) => {
      const value = formData[field as keyof typeof formData];
      if (Array.isArray(value)) return value.length > 0;
      return value;
    });
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (
    field: "referral" | "teams",
    option: string
  ) => {
    setFormData((prev) => {
      const current = prev[field];
      return {
        ...prev,
        [field]: current.includes(option)
          ? current.filter((item) => item !== option)
          : [...current, option],
      };
    });
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
      setNotification({
        type: "success",
        message: `${file.name} uploaded successfully.`,
      });
    }
  };

  const handleSaveDraft = () => {
    setNotification({ type: "info", message: "Draft saved successfully." });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const progress = calculateProgress();

    if (progress < 100) {
      setNotification({
        type: "error",
        message: "Please complete all required fields before submitting.",
      });
      return;
    }

    setNotification({
      type: "success",
      message: "Application submitted! We’ll review it soon.",
    });
    onSubmit();
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div
          className={`p-3 rounded-lg text-sm ${
            notification.type === "success"
              ? "bg-green-100 text-green-700"
              : notification.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Progress Indicator */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Application Progress</span>
          <span>{progress}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="block text-sm font-medium">First Name *</div>
              <input
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
            <div>
              <div className="block text-sm font-medium">Last Name *</div>
              <input
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full border rounded-lg p-2"
                required
              />
            </div>
          </div>
          <div>
            <div className="block text-sm font-medium">Email *</div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
        </div>

        {/* Graduation Year */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="block text-sm font-medium">Graduation Year *</div>
          <select
            value={formData.graduationYear}
            onChange={(e) =>
              handleInputChange("graduationYear", e.target.value)
            }
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Select year</option>
            {graduationYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Courses */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="block text-sm font-medium">
            What computer science courses have you taken? *
          </div>
          <textarea
            value={formData.courses}
            onChange={(e) => handleInputChange("courses", e.target.value)}
            className="w-full border rounded-lg p-2 min-h-[100px]"
            required
          />
        </div>

        {/* Workshops */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="block text-sm font-medium">
            How many GDSC technical workshops have you attended? *
          </div>
          <select
            value={formData.workshops}
            onChange={(e) => handleInputChange("workshops", e.target.value)}
            className="w-full border rounded-lg p-2"
            required
          >
            <option value="">Select</option>
            {workshopsOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Referral */}
        <div className="bg-white shadow rounded-lg p-6 space-y-2">
          <div className="block text-sm font-medium">
            How did you hear about us? (Select all that apply)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {referralOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.referral.includes(opt)}
                  onChange={() => handleCheckboxChange("referral", opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* Teams */}
        <div className="bg-white shadow rounded-lg p-6 space-y-2">
          <div className="block text-sm font-medium">
            Which team(s) are you interested in joining? *
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {teamOptions.map((team) => (
              <label key={team} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.teams.includes(team)}
                  onChange={() => handleCheckboxChange("teams", team)}
                />
                {team}
              </label>
            ))}
          </div>
        </div>

        {/* Interest */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="block text-sm font-medium">
            Why are you interested in joining the team(s) indicated above? *
          </div>
          <textarea
            value={formData.interest}
            onChange={(e) => handleInputChange("interest", e.target.value)}
            className="w-full border rounded-lg p-2 min-h-[100px]"
            required
          />
        </div>

        {/* Experience */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="block text-sm font-medium">
            What previous software development experience do you have? *
          </div>
          <textarea
            value={formData.experience}
            onChange={(e) => handleInputChange("experience", e.target.value)}
            className="w-full border rounded-lg p-2 min-h-[100px]"
            required
          />
        </div>

        {/* Resume */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="block text-sm font-medium">
            Please attach your resume as a PDF (if applicable)
          </div>
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".pdf"
            className="rounded text-sm bg-gray-200 text-gray-600"
          />
          {formData.resume && (
            <p className="text-green-600 text-sm mt-1">
              ✓ {formData.resume.name}
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            <Save className="h-4 w-4" />
            Save as Draft
          </button>
          <button
            type="submit"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
              progress < 100
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={progress < 100}
          >
            <Send className="h-4 w-4" />
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;

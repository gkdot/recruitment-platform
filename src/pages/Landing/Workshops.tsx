export default function WorkshopsSection() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">
        We also host technical workshops.
      </h2>
      <p className="text-md mb-4">
        Our Fall {new Date().getFullYear()} workshops begin{" "}
        <b>Tuesday, September 4th.</b> No previous technical experience is
        required. Even if you&apos;ve never taken a computer science class in
        your life, we start from square one, and have our Core Team Consultants
        on-hand to assist and explain.
      </p>
      <p className="text-md mb-4">
        To see the code for past and current projects, check out our Github
        below. If this description all seems too overwhelming, come to a
        workshop and we&apos;ll walk through it step by step.
      </p>
      <p className="text-md mb-4">
        For any further questions on workshops, please reach out to{" "}
        <a
          href="mailto:developerstudentclubwm@gmail.com"
          className="text-blue-400 hover:text-blue-500 font-semibold"
        >
          developerstudentclubwm@gmail.com
        </a>
        .
      </p>
      <a
        href="https://lists.wm.edu/wws/info/gdsc-announcements"
        className="text-md text-blue-400 hover:text-blue-500 font-semibold"
      >
        RSVP for upcoming workshops
      </a>
    </div>
  );
}

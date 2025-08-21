import { Link } from "react-router-dom";

interface HeroSectionProps {
  onSignUp: () => void;
}

export default function HeroSection({ onSignUp }: HeroSectionProps) {
  return (
    <section className="bg-white rounded-lg shadow p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Welcome to GDSC@W&M.
      </h1>
      <p className="text-base md:text-lg mb-6">
        Our mission is to work with other Developer Student Clubs around the
        world to bring computer science to the forefront of academics on campus.
      </p>
      <p className="text-base md:text-lg mb-6">
        William and Mary prides itself on its liberal arts approach to
        education; it&apos;s one of the first things you learn when you come to
        campus. This means biologists take creative writing, data scientists
        complete geology field work, and comedian Patton Oswald (&apos;91) jokes
        about his experience in Physics for Poets.
      </p>
      <p className="text-base md:text-lg mb-6">
        William and Mary&apos;s DSC aims to build another bridge between
        computer science and the other disciplines through educational workshop
        series and consulting projects with research groups on campus.{" "}
        <b>
          Fall 2025 recruitment for these projects is open until Tuesday,
          September 30.
        </b>
      </p>
      <div className="flex gap-4 mt-8">
        <Link
          to="#"
          onClick={onSignUp}
          className="bg-green-900 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-green-800"
        >
          Start your application
        </Link>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";

interface HeroSectionProps {
  onSignUp: () => void;
}

export default function HeroSection({ onSignUp }: HeroSectionProps) {
  return (
    <div className="w-[80%] bg-gray-50 p-4 overflow-y-auto space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold mb-6">Welcome to GDSC@WM.</h1>
        <p className="text-lg mb-8">
          Our mission is to work with other Developer Student Clubs around the
          world to bring computer science to the forefront of academics on
          campus.
        </p>
        <p className="text-lg mb-8">
          William and Mary prides itself on its liberal arts approach to
          education; it&apos;s one of the first things you learn when you come
          to campus. This means biologists take creative writing, data
          scientists complete geology field work, and comedian Patton Oswald
          (&apos;91) jokes about his experience in Physics for Poets.
        </p>
        <p className="text-lg mb-8">
          William and Mary&apos;s DSC aims to build another bridge between
          computer science and the other disciplines through education series
          and consulting projects with research groups on campus.
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
      </div>
    </div>
  );
}

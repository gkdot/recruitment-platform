import { useState, type FC } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { FaGoogle, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import Login from "./Login";

const Landing: FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <Layout>
      <main className="flex min-h-screen">
        <div className="w-[80%] bg-gray-50 p-4 overflow-y-auto space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-xl font-bold mb-6">Welcome to GDSC@WM.</h1>
            <p className="text-lg mb-8">
              Our mission is to work with other Developer Student Clubs around
              the world to bring computer science to the forefront of academics
              on campus.
            </p>
            <p className="text-lg mb-8">
              William and Mary prides itself on its liberal arts approach to
              education; it&#39;s one of the first things you learn when you
              come to campus. This means biologists take creative writing, data
              scientists complete geology field work, and comedian Patton Oswald
              (&#39;91) jokes about his experience in Physics for Poets.
            </p>
            <p className="text-lg mb-8">
              William and Mary&#39;s DSC aims to build another bridge between
              computer science and the other disciplines through education
              series and consulting projects with research groups on campus.
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                to="/signup"
                className="bg-green-900 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-green-800"
              >
                Start your application
              </Link>
              <Link
                to="#"
                onClick={() => setShowLogin(true)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full text-lg font-medium hover:bg-gray-300"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 overflow-y-auto space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">
              We also host technical workshops.
            </h2>
            <p className="text-md mb-4">
              Our Fall 2025 workshops begin Tuesday, September 4th, 2025. No
              previous technical experience is required. Even if you&#39;ve
              never taken a computer science class in your life, we start from
              square one, and have Core Team members on-hand to assist and
              explain.
            </p>
            <p className="text-md mb-4">
              To see the code for past and current projects, check out our
              Github below. If this description all seems too overwhelming, come
              to a workshop and we&#39;ll walk through it step by step.
            </p>
            <p className="text-md mb-4">
              For updates on when we will be holding workshops, please reach out
              to{" "}
              <a
                href="mailto:developerstudentclubwm@gmail.com"
                className="text-blue-400 hover:text-blue-500 font-semibold"
              >
                developerstudentclubwm@gmail.com
              </a>
              to join our mailing list.
            </p>
            <a
              href="https://lists.wm.edu/wws/info/gdsc-announcements"
              className="text-md text-blue-400 hover:text-blue-500 font-semibold"
            >
              RSVP for upcoming workshops
            </a>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">
              Take a look at our projects.
            </h2>
            <div className="grid grid-cols-5 gap-4 text-md mb-6">
              {[
                {
                  title: "Flat Hat Games",
                  term: "Fall '24",
                  link: "https://games.flathatnews.com/",
                  image: "/flathat.jpg",
                },
                {
                  title: "Recruitment",
                  term: "Fall '24",
                  link: "/",
                  image: "/recruitment.jpg",
                },
                {
                  title: "SAD",
                  term: "Spring '24",
                  link: "https://github.com/gdscwm/sld",
                  image: "/sld.jpg",
                },
                {
                  title: "Global Americas",
                  term: "Spring '24",
                  link: "https://github.com/gdscwm/Global-Americas",
                  image: "/global.jpg",
                },
                {
                  title: "Campus Escort",
                  term: "Spring '21",
                  link: "https://apps.apple.com/us/app/w-m-campus-escort/id1582947297",
                  image: "/escort.jpeg",
                },
              ].map((proj, i) => (
                <a
                  key={i}
                  href={proj.link}
                  className="relative group bg-gray-800 text-md text-white rounded-lg p-4 flex flex-col min-h-[180px] overflow-hidden transition-transform duration-200 hover:scale-105"
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="font-semibold transition-colors duration-300 group-hover:text-white group-hover:brightness-125">
                      {proj.title}
                    </h3>
                    <span className="mt-auto transition-colors duration-300 group-hover:text-white group-hover:brightness-125">
                      {proj.term}
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <a
              href="https://docs.google.com/document/d/1bvN3zt_BzmtPjl_jkHCu0kWL2yXIZYlfaW7vsbhEos4/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-md text-blue-400 hover:text-blue-500 underline font-semibold"
            >
              Click here for past projects
            </a>
          </div>

          <div className="flex gap-6 mt-6 text-2xl">
            <a
              href="https://gdg.community.dev/gdg-on-campus-william-mary-williamsburg-united-states/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaGoogle />
            </a>
            <a
              href="https://github.com/gdscwm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.facebook.com/developerstudentclubWM/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/dsc_wm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
      </main>
    </Layout>
  );
};

export default Landing;

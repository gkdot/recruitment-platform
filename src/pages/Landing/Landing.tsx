import { useState } from "react";
import { Layout } from "../../components/Layout";
import SignUp from "../../components/SignUp";
import HeroSection from "./Hero.tsx";
import WorkshopsSection from "./Workshops.tsx";
import ProjectsSection from "./Projects.tsx";
import SocialLinks from "./SocialLinks";

export default function Landing() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Layout>
      <main className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-2/5 bg-gray-50 p-4 pl-6">
          <HeroSection onSignUp={() => setShowSignUp(true)} />
        </div>

        <div className="w-full lg:w-3/5 bg-gray-50 p-4 pr-6 space-y-6">
          <WorkshopsSection />
          <ProjectsSection />
          <SocialLinks />
        </div>
      </main>
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
    </Layout>
  );
}

import { useState } from "react";
import { Layout } from "../../components/Layout";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import HeroSection from "./Hero.tsx";
import WorkshopsSection from "./Workshops.tsx";
import ProjectsSection from "./Projects.tsx";
import SocialLinks from "./SocialLinks";

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <Layout>
      <main className="flex min-h-screen">
        <HeroSection onSignUp={() => setShowSignUp(true)} />
        <div className="bg-gray-50 p-4 overflow-y-auto space-y-8">
          <WorkshopsSection />
          <ProjectsSection />
          <SocialLinks />
        </div>
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
        {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
      </main>
    </Layout>
  );
}

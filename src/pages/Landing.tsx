import React from "react";
import { Layout } from "../components/Layout";

export const Landing: React.FC = () => {
  return (
    <Layout>
      <div>
        <p className="text-2xl font-semibold">Welcome to GDSC@WM</p>
        <p>This is where your app content will go.</p>
      </div>
    </Layout>
  );
};

export default Landing;

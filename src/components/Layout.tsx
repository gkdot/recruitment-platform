import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="relative bg-white border-b border-gray-300 px-6 py-3 flex items-center">
        <img src="/logo.svg" alt="logo" className="h-6 w-auto" />
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">
          Recruitment
        </h2>
      </header>
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

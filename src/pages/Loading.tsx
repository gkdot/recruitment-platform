import { Layout } from "../components/Layout";

export default function Loading() {
  return (
    <Layout>
      <main
        role="main"
        aria-label="Loading content"
        className="min-h-dvh bg-white text-gray-900 flex flex-col items-center justify-center gap-6"
      >
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg font-medium transition-opacity duration-500 ease-in-out">
          Loading...
        </p>
      </main>
    </Layout>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | GoharOnline",
  description: "Terms and conditions for using GoharOnline website and services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black pt-24">
      <section className="mx-auto max-w-4xl px-6 pb-16 text-gray-200">
        <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        <p className="mt-4 text-sm leading-7 text-gray-300">
          By using GoharOnline, you agree to use the website and services lawfully. Course,
          article, and subscription content is for educational purposes. We may update these
          terms to maintain quality and security.
        </p>
      </section>
    </main>
  );
}
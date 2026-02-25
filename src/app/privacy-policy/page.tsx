import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GoharOnline",
  description: "Privacy policy for GoharOnline website and services.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black pt-24">
      <section className="mx-auto max-w-4xl px-6 pb-16 text-gray-200">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-7 text-gray-300">
          We collect basic information you submit through forms (such as contact, tutor application,
          and subscription details) to provide services, communicate updates, and improve user experience.
          We do not sell personal information to third parties.
        </p>
      </section>
    </main>
  );
}
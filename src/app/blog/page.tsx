import type { Metadata } from "next";
import Link from "next/link";
import BlogFeed from "../components/BlogFeed";
import InlineEmailSubscribe from "../components/notifications/InlineEmailSubscribe";

const siteUrl = "https://www.gohar.online";

export const metadata: Metadata = {
  title: "Weekly Study Notes and Blog Posts | GoharOnline Academy",
  description:
    "Read weekly study notes, exam strategies, and educational updates from GoharOnline for A Level, O Level, Science, Computer Science, and Quran studies.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "GoharOnline Blog | Weekly Notes and Exam Tips",
    description:
      "Explore weekly learning notes, exam tips, and student guidance published by GoharOnline Academy.",
    url: `${siteUrl}/blog`,
    siteName: "GoharOnline",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black pt-24">
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-3xl font-bold text-white md:text-5xl">GoharOnline Blog</h1>
          <p className="mt-3 max-w-3xl text-sm text-gray-300 md:text-base">
            Weekly learning content for students and parents. Read notes, revision tips, and exam
            preparation guides published by our academic team.
          </p>
          <div className="mt-5 flex flex-wrap items-start gap-3">
            <Link
              href="/blog/student-submit"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              Submit Student Article
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Request Topic Notes
            </Link>
            <InlineEmailSubscribe />
          </div>
        </div>
      </section>

      <BlogFeed compact />
    </main>
  );
}

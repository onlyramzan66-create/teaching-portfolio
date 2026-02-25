import type { Metadata } from "next";
import Link from "next/link";

import AboutSection from "./components/Mission";
import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";
import GoharTestimonials from "./components/TestimonialCards";
import Instructors from "./components/Instructors";
import BlogFeed from "./components/BlogFeed";
import SubscriptionCard from "./components/notifications/SubscriptionCard";

/* ===== SEO METADATA ===== */
export const metadata: Metadata = {
  title: "GoharOnline Academy | A Level & O Level Tuition Pakistan",
  description:
    "GoharOnline offers online and home tuition in Pakistan for A/O Level students in Science, Mathematics, Computer Science, Quran studies, and Web Development.",
  keywords: [
    "GoharOnline",
    "A Level tuition",
    "O Level tuition",
    "online academy",
    "Quran online classes",
    "science tuition online",
    "A Level Chemistry",
    "A Level Physics",
    "A Level Mathematics",
    "computer science courses",
    "web development training",
    "online tutoring platform",
  ],
  authors: [{ name: "GoharOnline Academy" }],
  creator: "GoharOnline",
  publisher: "GoharOnline",
  metadataBase: new URL("https://www.gohar.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GoharOnline | A/O Level Online and Home Tuition Pakistan",
    description:
      "Join GoharOnline for online and home tuition in Pakistan across Science, Quran studies, Computer Science, and Web Development with expert teachers.",
    url: "https://www.gohar.online",
    siteName: "GoharOnline",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "GoharOnline Online Academy",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ===== PAGE ===== */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black antialiased">
      <HeroSection />

      <section className="py-6 border-y border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-sm md:text-base text-gray-200 text-center lg:text-left">
            Online + Home Tutor in Pakistan | O Level, A Level, Matric, FSC, Quran, Computer Science
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition"
            >
              Book Free Demo
            </Link>
            <Link
              href="/home-tutor-pakistan"
              className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Home Tutor Pakistan
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "1000+", label: "Students Enrolled" },
              { value: "95%", label: "Parent Satisfaction" },
              { value: "50+", label: "Verified Tutors" },
              { value: "24/7", label: "Support Team" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <div className="text-2xl font-bold text-emerald-300">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Home Tutor Coverage in Pakistan
            </h2>
            <p className="mt-3 text-gray-300">
              Available in Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, and Multan.
              Online support is available nationwide and internationally.
            </p>
            <div className="mt-5">
              <Link
                href="/home-tutor-pakistan"
                className="inline-flex items-center rounded-full bg-white text-slate-900 px-5 py-2 text-sm font-semibold hover:bg-gray-200 transition"
              >
                View Home Tutor Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            How It Works
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              {
                title: "1. Share Requirements",
                text: "Tell us grade, subjects, city, and preferred class timings.",
              },
              {
                title: "2. Tutor Matching",
                text: "We shortlist suitable tutors based on goals and board requirements.",
              },
              {
                title: "3. Start Trial Class",
                text: "Begin with a guided trial and continue with a structured monthly plan.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-lg text-gray-200 mb-4 text-center">
            Exam Boards & Curriculum We Support
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "Cambridge",
              "Edexcel",
              "Oxford AQA",
              "FBISE",
              "Punjab Board",
              "Sindh Board",
              "Matric",
              "FSC",
            ].map((board) => (
              <span
                key={board}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-gray-200"
              >
                {board}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            GoharOnline helps students build strong foundations and boosts
            confidence through personalised lessons, regular assessments, and
            supportive mentoring - ideal for parents seeking reliable online
            tuition for A Level and O Level success.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Built for Students and Parents
            </h2>
            <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
              We combine academic progress tracking, parent updates, and
              practical exam preparation so families always know how the student
              is improving.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Weekly Parent Reports",
                text: "Simple progress reports with attendance, homework score, and unit completion status.",
              },
              {
                title: "Exam Pattern Practice",
                text: "Topical and past-paper style practice for A Level and O Level boards with targeted feedback.",
              },
              {
                title: "1-to-1 Mentorship",
                text: "Personal study plans to improve weak areas and build confidence for final exams.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Unit-Wise Course Content
            </h2>
            <p className="text-gray-300 max-w-3xl">
              Students learn chapter by chapter with clear outcomes, quizzes,
              and revision checkpoints at the end of each unit.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-5">
              <div className="rounded-xl bg-black/30 border border-white/10 p-5">
                <h3 className="text-emerald-300 font-semibold mb-3">
                  Mathematics Units
                </h3>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>Algebra and Functions</li>
                  <li>Trigonometry and Geometry</li>
                  <li>Statistics and Probability</li>
                </ul>
              </div>

              <div className="rounded-xl bg-black/30 border border-white/10 p-5">
                <h3 className="text-blue-300 font-semibold mb-3">
                  Science Units
                </h3>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>Mechanics and Electricity</li>
                  <li>Organic and Physical Chemistry</li>
                  <li>Cell Biology and Human Systems</li>
                </ul>
              </div>

              <div className="rounded-xl bg-black/30 border border-white/10 p-5">
                <h3 className="text-purple-300 font-semibold mb-3">
                  Computer Units
                </h3>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>Programming Fundamentals</li>
                  <li>Data Structures and Logic</li>
                  <li>Databases and Web Basics</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-emerald-500 px-6 py-3 text-black font-semibold hover:bg-emerald-400 transition"
              >
                Request Full Unit Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Home Tutor Service Available in Pakistan
            </h2>
            <p className="mt-4 text-gray-300 max-w-3xl">
              We now offer home tutoring support for Pakistani students in
              selected cities, along with online classes nationwide. Parents can
              choose online, home tutor, or a hybrid model.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-gray-200">
                Available for: Lahore, Karachi, Islamabad, Rawalpindi,
                Faisalabad, Multan.
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-gray-200">
                Subjects: O/A Level Science, Mathematics, Computer Science,
                Quran studies, and foundational English support.
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/10 transition"
              >
                Book a Home Tutor Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-xl text-gray-300 mb-4">Explore GoharOnline</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/matric" className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">Matric Programs</Link>
            <Link href="/fsc" className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">FSC Programs</Link>
            <Link href="/o-a-level" className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">O/A Level Programs</Link>
            <Link href="/blog" className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">Blog</Link>
            <Link href="/become-tutor" className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">Become a Tutor</Link>
            <Link href="/contact" className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">Contact</Link>
            <Link href="/about" className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">About Us</Link>
            <Link href="/quran" className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">Quran Online Teaching</Link>
            <Link href="/matric" className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">All Courses</Link>
          </div>
        </div>
      </section>

      <section className="py-2">
        <div className="max-w-7xl mx-auto px-6">
          <SubscriptionCard />
        </div>
      </section>

      <BlogFeed />

      <AboutSection />
      <WhyChooseUs />
      <GoharTestimonials />
      <Instructors />
    </main>
  );
}

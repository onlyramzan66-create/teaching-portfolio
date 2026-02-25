import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Home,
  BookOpen,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Home Tutor Pakistan | GoharOnline Academy",
  description:
    "Book verified home tutors in Pakistan for O Level, A Level, Matric, FSC, and Quran studies. Available in major cities with flexible schedules.",
};

const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
];

const subjects = [
  "O Level / A Level Science",
  "Mathematics",
  "Computer Science",
  "Quran Studies",
  "English Foundation Support",
];

export default function HomeTutorPakistanPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <section className="pt-28 pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            <Home className="w-4 h-4" />
            Dedicated Home Tutor Service
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
            Home Tutor Service for
            <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Pakistani Students
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-gray-300 text-lg leading-relaxed">
            GoharOnline now offers in-person tutoring in selected cities across
            Pakistan. Parents can choose home tutoring, online classes, or a
            hybrid plan based on student needs and timetable.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-400 transition"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Request Tutor Matching
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              Cities We Cover
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-gray-200 text-sm">
              {cities.map((city) => (
                <li key={city} className="rounded-lg bg-black/30 px-3 py-2">
                  {city}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              Subjects Available
            </h2>
            <ul className="mt-5 space-y-3 text-gray-200 text-sm">
              {subjects.map((subject) => (
                <li key={subject} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-400" />
                  <span>{subject}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Share Your Requirement",
                text: "Tell us class level, subjects, location, and preferred timings.",
                icon: BookOpen,
              },
              {
                title: "Tutor Matching",
                text: "We shortlist tutors based on subject expertise and student goals.",
                icon: ShieldCheck,
              },
              {
                title: "Start Learning",
                text: "Begin regular classes with progress updates and parent support.",
                icon: Clock,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <item.icon className="w-6 h-6 text-emerald-400 mb-4" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto rounded-3xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-8 md:p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Book a Home Tutor in Pakistan?
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Contact us for quick tutor matching and a personalized study plan.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-emerald-500 px-7 py-3 text-black font-semibold hover:bg-emerald-400 transition"
            >
              Talk to Academic Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

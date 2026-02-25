import Link from "next/link";

const streams = [
  {
    title: "FSC Pre-Medical",
    description: "Biology, Chemistry, and Physics with board-targeted preparation strategy.",
    href: "/science",
  },
  {
    title: "FSC Pre-Engineering",
    description: "Mathematics, Physics, and Chemistry for strong conceptual and numerical skills.",
    href: "/science",
  },
  {
    title: "FSC ICS",
    description: "Computer Science, Mathematics, and Physics with practical problem-solving.",
    href: "/computer",
  },
  {
    title: "FSC Chemistry Focus",
    description: "Detailed chapter breakdown, MCQ drills, and board paper pattern practice.",
    href: "/chemistry",
  },
];

export default function FscPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black pt-28 pb-16">
      <section className="mx-auto max-w-7xl px-6">
        <h1 className="text-4xl font-bold text-white">FSC Programs</h1>
        <p className="mt-3 max-w-3xl text-gray-300">
          Select your FSC stream and access focused support for board exams, past papers, and chapter tests.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {streams.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20"
            >
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-300">{item.description}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex rounded-full border border-emerald-300/40 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
              >
                View Stream Details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
import Link from "next/link";

const subjects = [
  {
    title: "Matric Mathematics",
    description: "Algebra, Trigonometry, and exam-focused preparation for board papers.",
    href: "/science",
  },
  {
    title: "Matric Physics",
    description: "Conceptual mechanics, numericals, and chapter-wise board revision.",
    href: "/science",
  },
  {
    title: "Matric Chemistry",
    description: "Theory and practice with structured notes and topical tests.",
    href: "/chemistry",
  },
  {
    title: "Matric Computer Science",
    description: "Programming basics, logic building, and practical exam support.",
    href: "/computer",
  },
];

export default function MatricPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black pt-28 pb-16">
      <section className="mx-auto max-w-7xl px-6">
        <h1 className="text-4xl font-bold text-white">Matric Courses</h1>
        <p className="mt-3 max-w-3xl text-gray-300">
          Choose Matric-level subjects and start a structured study plan with weekly progress tracking.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {subjects.map((subject) => (
            <article
              key={subject.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20"
            >
              <h2 className="text-xl font-semibold text-white">{subject.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-300">{subject.description}</p>
              <Link
                href={subject.href}
                className="mt-5 inline-flex rounded-full border border-emerald-300/40 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
              >
                View Subject Details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
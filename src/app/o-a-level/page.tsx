import Link from "next/link";

const tracks = [
  {
    title: "O Level Sciences",
    description: "Physics, Chemistry, and Biology with Cambridge and Edexcel exam prep.",
    href: "/science",
  },
  {
    title: "O Level Mathematics",
    description: "Core math concepts, worksheet practice, and exam technique training.",
    href: "/science",
  },
  {
    title: "A Level Sciences",
    description: "Advanced level concept clarity with topical tests and paper discussions.",
    href: "/science",
  },
  {
    title: "O / A Level Chemistry",
    description: "Organic, inorganic, and physical chemistry with past-paper techniques.",
    href: "/chemistry",
  },
  {
    title: "A/O Level Computer Science",
    description: "Programming, algorithms, and pseudocode practice for exam excellence.",
    href: "/computer",
  },
];

export default function OALevelPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black pt-28 pb-16">
      <section className="mx-auto max-w-7xl px-6">
        <h1 className="text-4xl font-bold text-white">O / A Level Programs</h1>
        <p className="mt-3 max-w-3xl text-gray-300">
          Browse O Level and A Level tracks and choose subject pathways aligned with Cambridge and Edexcel boards.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {tracks.map((item) => (
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
                View Track Details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

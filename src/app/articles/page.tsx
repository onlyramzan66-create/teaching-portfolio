"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StudentArticle, fetchStudentArticles } from "@/lib/blogApi";
import InlineEmailSubscribe from "../components/notifications/InlineEmailSubscribe";

function formatDate(date: string | null) {
  if (!date) return "Recent";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Recent";
  return parsed.toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" });
}

export default function ArticlesPage() {
  const [items, setItems] = useState<StudentArticle[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchStudentArticles(page, limit, query);
        if (!mounted) return;
        setItems(data.items);
        setTotalPages(data.totalPages);
      } catch {
        if (!mounted) return;
        setError("Student articles are temporarily unavailable.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void load();
    return () => {
      mounted = false;
    };
  }, [page, limit, query]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-white md:text-5xl">Student Articles</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-300 md:text-base">
              Approved student submissions published by our admin team.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setPage(1);
                setQuery(search.trim());
              }}
              className="flex items-center gap-2"
            >
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search articles..."
                className="w-52 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white outline-none"
              />
              <button
                type="submit"
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Search
              </button>
            </form>

            <Link
              href="/blog/student-submit"
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
            >
              Submit Article
            </Link>

            <InlineEmailSubscribe />
          </div>
        </div>

        {loading && <p className="text-sm text-gray-300">Loading articles...</p>}
        {!loading && error && <p className="rounded-lg bg-rose-500/15 px-4 py-3 text-sm text-rose-200">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article key={item.id} className="rounded-2xl border border-white/10 bg-[#0f172a]/80 overflow-hidden">
                  <div className="h-48 w-full bg-slate-800/80">
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-slate-300">Article Image</div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wide text-emerald-300">By {item.studentName}</p>
                    <h2 className="mt-2 line-clamp-2 text-xl font-bold text-white">{item.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm text-gray-300">{item.article}</p>
                    <p className="mt-3 text-xs text-gray-400">Published {formatDate(item.approvedAt)}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page <= 1}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-gray-200">
                Page {page} of {Math.max(1, totalPages)}
              </span>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page >= totalPages}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-40"
              >
                Next
              </button>
            </div>

          </>
        )}
      </section>
    </main>
  );
}

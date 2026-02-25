"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogPost, fetchPosts } from "@/lib/blogApi";

function formatDate(date: string | null) {
  if (!date) return "Recent";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Recent";

  return parsed.toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function previewText(post: BlogPost) {
  const source = (post.content || "").replace(/\s+/g, " ").trim();
  return source || "Open this post to read detailed notes and guidance.";
}

export default function BlogFeed({ compact = false }: { compact?: boolean }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchPosts(page, limit, query);
        if (!isMounted) return;
        setPosts(data.items);
        setTotalPages(data.totalPages);
      } catch {
        if (!isMounted) return;
        setError("Blog posts are temporarily unavailable.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadPosts();
    return () => {
      isMounted = false;
    };
  }, [limit, page, query]);

  const sectionPadding = compact ? "py-0" : "py-12";
  const wrapperClass = compact ? "" : "mx-auto max-w-7xl px-6";
  const showSearch = true;

  return (
    <section className={sectionPadding}>
      <div className={wrapperClass}>
        {!compact && (
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">Latest Notes & Articles</h2>
              <p className="mt-2 max-w-2xl text-sm text-gray-300 md:text-base">
                Student-focused articles, revision notes, and exam preparation insights.
              </p>
            </div>
          </div>
        )}

        {showSearch && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setPage(1);
              setQuery(search.trim());
            }}
            className={compact ? "mb-6 flex items-center gap-2 px-6" : "mb-6 flex items-center gap-2"}
          >
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search blog posts..."
              className="w-full max-w-sm rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white outline-none"
            />
            <button
              type="submit"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Search
            </button>
          </form>
        )}

        {loading && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-300">
            Loading latest posts...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-6 text-sm text-rose-100">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 shadow-xl transition hover:-translate-y-0.5 hover:border-emerald-400/50"
                >
                  <div className="h-52 w-full overflow-hidden bg-slate-800/80">
                    {post.featureImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.featureImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-wide text-slate-300">
                        Featured Image
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                      {formatDate(post.publishedAt)}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-tight text-white">{post.title}</h3>
                    <p className="mt-3 line-clamp-2 text-sm font-medium text-gray-200">
                      {post.excerpt || "Student article and study notes."}
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm text-gray-300">{previewText(post)}</p>

                    <div className="mt-5 flex items-center justify-between gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
                      >
                        Read More
                      </Link>
                      {post.notesPdfUrl && (
                        <a
                          href={post.notesPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-full border border-white/30 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
                        >
                          Notes PDF
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page <= 1}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
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
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}

        {!compact && (
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Need Notes for a Topic? Contact Us
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

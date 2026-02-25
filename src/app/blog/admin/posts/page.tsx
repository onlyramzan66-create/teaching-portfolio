"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { clearAuth, getAuth } from "@/lib/blogAuth";
import {
  BlogPost,
  StudentArticle,
  approveStudentArticle,
  fetchAdminPosts,
  fetchAdminStudentArticles,
  getBlogApiBase,
  rejectStudentArticle,
} from "@/lib/blogApi";

function formatDate(date: string | null) {
  if (!date) return "-";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" });
}

function AdminPostsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [articles, setArticles] = useState<StudentArticle[]>([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [postQuery, setPostQuery] = useState("");
  const [articleQuery, setArticleQuery] = useState("");
  const [postsPage, setPostsPage] = useState(1);
  const [postsTotalPages, setPostsTotalPages] = useState(1);
  const [articlesPage, setArticlesPage] = useState(1);
  const [articlesTotalPages, setArticlesTotalPages] = useState(1);
  const POSTS_PER_PAGE = 10;
  const ARTICLES_PER_PAGE = 10;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState<"posts" | "articles">("posts");
  const [seoDrafts, setSeoDrafts] = useState<
    Record<number, { seoTitle: string; seoDescription: string; canonicalUrl: string; seoImage: string }>
  >({});

  const postsEndpoint = useMemo(() => `${getBlogApiBase()}/posts`, []);

  const loadData = useCallback(async (authToken: string) => {
    setLoading(true);
    setError("");
    try {
      const [allPosts, pendingArticles] = await Promise.all([
        fetchAdminPosts(authToken, 200),
        fetchAdminStudentArticles(authToken, {
          status: statusFilter,
          q: articleQuery,
          page: articlesPage,
          limit: ARTICLES_PER_PAGE,
        }),
      ]);

      const filteredPosts = postQuery.trim()
        ? allPosts.filter((post) => {
            const hay = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();
            return hay.includes(postQuery.trim().toLowerCase());
          })
        : allPosts;

      const postPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
      const safePostsPage = Math.min(postsPage, postPages);
      const pagedPosts = filteredPosts.slice(
        (safePostsPage - 1) * POSTS_PER_PAGE,
        safePostsPage * POSTS_PER_PAGE,
      );

      setPosts(pagedPosts);
      setPostsTotalPages(postPages);
      if (safePostsPage !== postsPage) {
        setPostsPage(safePostsPage);
      }

      setArticles(pendingArticles.items);
      setArticlesTotalPages(pendingArticles.totalPages);
    } catch {
      setError("Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  }, [ARTICLES_PER_PAGE, POSTS_PER_PAGE, articleQuery, articlesPage, postQuery, postsPage, statusFilter]);

  useEffect(() => {
    const auth = getAuth();
    if (!auth || auth.user.role !== "admin") {
      router.replace("/blog/admin/auth");
      return;
    }

    setIsAdmin(true);
    setToken(auth.accessToken);
    void loadData(auth.accessToken);
  }, [loadData, router]);

  useEffect(() => {
    if (!token) return;
    void loadData(token);
  }, [token, statusFilter, articleQuery, postQuery, postsPage, articlesPage, loadData]);

  useEffect(() => {
    const savedSlug = searchParams.get("saved");
    if (savedSlug) {
      setMessage(`Saved successfully: ${savedSlug}`);
    }
  }, [searchParams]);

  async function deletePost(id: number) {
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${postsEndpoint}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Delete failed");
      setMessage("Post deleted successfully.");
      await loadData(token);
    } catch {
      setError("Unable to delete post.");
    }
  }

  async function approve(id: number) {
    setError("");
    setMessage("");
    try {
      const draft = seoDrafts[id];
      await approveStudentArticle(token, id, draft);
      setMessage("Student article approved and published.");
      await loadData(token);
    } catch {
      setError("Unable to approve student article.");
    }
  }

  async function reject(id: number) {
    setError("");
    setMessage("");
    try {
      await rejectStudentArticle(token, id);
      setMessage("Student article rejected.");
      await loadData(token);
    } catch {
      setError("Unable to reject student article.");
    }
  }

  function logout() {
    clearAuth();
    router.replace("/blog/admin/auth");
  }

  function getSeoDraft(article: StudentArticle) {
    return (
      seoDrafts[article.id] ?? {
        seoTitle: article.seoTitle || "",
        seoDescription: article.seoDescription || "",
        canonicalUrl: article.canonicalUrl || "",
        seoImage: article.seoImage || article.imageUrl || "",
      }
    );
  }

  function setSeoDraftField(
    articleId: number,
    field: "seoTitle" | "seoDescription" | "canonicalUrl" | "seoImage",
    value: string,
  ) {
    setSeoDrafts((prev) => {
      const current = prev[articleId] ?? {
        seoTitle: "",
        seoDescription: "",
        canonicalUrl: "",
        seoImage: "",
      };
      return {
        ...prev,
        [articleId]: {
          ...current,
          [field]: value,
        },
      };
    });
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black pt-24">
        <section className="mx-auto max-w-3xl px-6 pb-16">
          <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5 text-amber-100">
            <p className="text-sm">Checking admin access...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Admin Post Listing</h1>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:gap-2">
            <Link href="/blog/admin/create" className="rounded-full border border-blue-400/35 px-4 py-2 text-center text-sm font-semibold text-blue-300 transition hover:bg-blue-500/10">
              Create Post
            </Link>
            <Link href="/blog/admin/tutors" className="rounded-full border border-emerald-400/35 px-4 py-2 text-center text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/10">
              Tutor Applications
            </Link>
            <Link href="/blog/admin/subscribers" className="rounded-full border border-cyan-400/35 px-4 py-2 text-center text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/10">
              Subscribers
            </Link>
            <button type="button" onClick={logout} className="rounded-full border border-rose-400/35 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10">
              Logout
            </button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveView("posts")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeView === "posts"
                ? "bg-emerald-500 text-black"
                : "border border-white/25 text-white hover:bg-white/10"
            }`}
          >
            All Posts
          </button>
          <button
            type="button"
            onClick={() => setActiveView("articles")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeView === "articles"
                ? "bg-emerald-500 text-black"
                : "border border-white/25 text-white hover:bg-white/10"
            }`}
          >
            Student Articles
          </button>
        </div>

        <div className="grid gap-6">
          {activeView === "posts" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-white sm:text-xl">All Posts</h2>
              <input
                value={postQuery}
                onChange={(event) => {
                  setPostsPage(1);
                  setPostQuery(event.target.value);
                }}
                placeholder="Search posts..."
                className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white outline-none sm:w-56"
              />
            </div>
            {loading ? (
              <p className="text-sm text-gray-300">Loading...</p>
            ) : posts.length === 0 ? (
              <p className="text-sm text-gray-300">No posts found.</p>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-semibold text-white">{post.title}</p>
                      <span className="text-xs text-gray-300">{post.isPublished ? formatDate(post.publishedAt) : "Draft"}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-300">{post.excerpt || post.slug}</p>
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
                      <Link href={`/blog/admin/create?edit=${post.id}`} className="rounded-full bg-blue-500/20 px-3 py-1 text-center text-xs font-semibold text-blue-200">Edit</Link>
                      <button type="button" onClick={() => void deletePost(post.id)} className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-200">Delete</button>
                      <Link href={`/blog/${post.slug}`} className="rounded-full border border-white/25 px-3 py-1 text-center text-xs font-semibold text-white">View</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && postsTotalPages > 1 && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPostsPage((prev) => Math.max(1, prev - 1))}
                  disabled={postsPage <= 1}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-gray-200">
                  Page {postsPage} of {postsTotalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPostsPage((prev) => Math.min(postsTotalPages, prev + 1))}
                  disabled={postsPage >= postsTotalPages}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
          )}

          {activeView === "articles" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-white sm:text-xl">Student Article Submissions</h2>
              <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto sm:gap-2">
                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setArticlesPage(1);
                    setStatusFilter(event.target.value);
                  }}
                  className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <input
                  value={articleQuery}
                  onChange={(event) => {
                    setArticlesPage(1);
                    setArticleQuery(event.target.value);
                  }}
                  placeholder="Search student articles..."
                  className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white outline-none sm:w-56"
                />
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-gray-300">Loading...</p>
            ) : articles.length === 0 ? (
              <p className="text-sm text-gray-300">No student submissions.</p>
            ) : (
              <div className="space-y-3">
                {articles.map((article) => (
                  <div key={article.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
                    {(() => {
                      const seo = getSeoDraft(article);
                      return (
                        <>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-semibold text-white">{article.title}</p>
                      <span className="text-xs uppercase text-gray-300">{article.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-emerald-200">By: {article.studentName}</p>
                    <p className="mt-2 line-clamp-3 text-xs text-gray-300">{article.article}</p>
                    {article.status === "pending" && (
                      <div className="mt-3 rounded-lg border border-white/10 p-2">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-300">SEO Before Approve</p>
                        <input
                          value={seo.seoTitle}
                          onChange={(event) => setSeoDraftField(article.id, "seoTitle", event.target.value)}
                          placeholder="SEO Title (max 70)"
                          className="mb-2 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-xs text-white outline-none"
                          maxLength={70}
                        />
                        <textarea
                          value={seo.seoDescription}
                          onChange={(event) => setSeoDraftField(article.id, "seoDescription", event.target.value)}
                          placeholder="SEO Description (max 180)"
                          className="mb-2 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-xs text-white outline-none"
                          rows={2}
                          maxLength={180}
                        />
                        <input
                          value={seo.canonicalUrl}
                          onChange={(event) => setSeoDraftField(article.id, "canonicalUrl", event.target.value)}
                          placeholder="Canonical URL (optional)"
                          className="mb-2 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-xs text-white outline-none"
                        />
                        <input
                          value={seo.seoImage}
                          onChange={(event) => setSeoDraftField(article.id, "seoImage", event.target.value)}
                          placeholder="SEO Image URL (optional)"
                          className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>
                    )}
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                      {article.imageUrl && (
                        <a href={article.imageUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 px-3 py-1 text-center text-xs font-semibold text-white">Image</a>
                      )}
                      {article.notesPdfUrl && (
                        <a href={article.notesPdfUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 px-3 py-1 text-center text-xs font-semibold text-white">PDF</a>
                      )}
                      {article.status === "pending" && (
                        <>
                          <button type="button" onClick={() => void approve(article.id)} className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">Approve</button>
                          <button type="button" onClick={() => void reject(article.id)} className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-200">Reject</button>
                        </>
                      )}
                    </div>
                        </>
                      );
                    })()}
                  </div>
                ))}
              </div>
            )}

            {!loading && articlesTotalPages > 1 && (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setArticlesPage((prev) => Math.max(1, prev - 1))}
                  disabled={articlesPage <= 1}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-gray-200">
                  Page {articlesPage} of {articlesTotalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setArticlesPage((prev) => Math.min(articlesTotalPages, prev + 1))}
                  disabled={articlesPage >= articlesTotalPages}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
          )}
        </div>

        {error && <p className="mt-4 rounded-lg bg-rose-500/15 px-4 py-3 text-sm text-rose-200">{error}</p>}
        {message && <p className="mt-4 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm text-emerald-200">{message}</p>}
      </section>
    </main>
  );
}

export default function AdminPostsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black pt-24">
          <section className="mx-auto max-w-7xl px-6 pb-16">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              Loading admin posts...
            </div>
          </section>
        </main>
      }
    >
      <AdminPostsPageContent />
    </Suspense>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAuth, getAuth } from "@/lib/blogAuth";
import {
  EmailSubscriber,
  fetchAdminEmailSubscribers,
  updateEmailSubscriberStatus,
} from "@/lib/blogApi";

const PAGE_SIZE = 20;

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" });
}

export default function AdminSubscribersPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [items, setItems] = useState<EmailSubscriber[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadData = useCallback(async (authToken: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminEmailSubscribers(authToken, {
        page,
        limit: PAGE_SIZE,
        q: query,
      });
      setItems(data.items);
      setTotalPages(data.totalPages);
    } catch {
      setError("Unable to load subscribers.");
    } finally {
      setLoading(false);
    }
  }, [page, query]);

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
  }, [loadData, token, page, query]);

  function logout() {
    clearAuth();
    router.replace("/blog/admin/auth");
  }

  async function toggleSubscriber(id: number, nextValue: boolean) {
    setError("");
    setMessage("");
    try {
      await updateEmailSubscriberStatus(token, id, nextValue);
      setMessage("Subscriber updated.");
      await loadData(token);
    } catch {
      setError("Unable to update subscriber.");
    }
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
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Subscribers</h1>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:gap-2">
            <Link href="/blog/admin/posts" className="rounded-full border border-white/25 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10">
              Back to Admin
            </Link>
            <button type="button" onClick={logout} className="rounded-full border border-rose-400/35 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10">
              Logout
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-white sm:text-xl">Email Subscribers</h2>
            <input
              value={query}
              onChange={(event) => {
                setPage(1);
                setQuery(event.target.value);
              }}
              placeholder="Search email..."
              className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white outline-none sm:w-64"
            />
          </div>

          {loading ? (
            <p className="text-sm text-gray-300">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-gray-300">No subscribers found.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-white">{item.email}</p>
                    <span className="text-xs text-gray-300">{formatDate(item.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-300">Source: {item.source}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void toggleSubscriber(item.id, !item.isActive)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.isActive
                          ? "bg-emerald-500/20 text-emerald-200"
                          : "bg-rose-500/20 text-rose-200"
                      }`}
                    >
                      {item.isActive ? "Active (Click to Deactivate)" : "Inactive (Click to Activate)"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && totalPages > 1 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page <= 1}
                className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-gray-200">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page >= totalPages}
                className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {error && <p className="mt-4 rounded-lg bg-rose-500/15 px-4 py-3 text-sm text-rose-200">{error}</p>}
        {message && <p className="mt-4 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm text-emerald-200">{message}</p>}
      </section>
    </main>
  );
}
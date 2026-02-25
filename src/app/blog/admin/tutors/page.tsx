"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAuth, getAuth } from "@/lib/blogAuth";
import {
  TutorApplication,
  TutorApplicationStatus,
  fetchAdminTutorApplications,
  updateTutorApplicationStatus,
} from "@/lib/blogApi";

const PAGE_SIZE = 10;

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" });
}

export default function AdminTutorApplicationsPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [notesDrafts, setNotesDrafts] = useState<Record<number, string>>({});

  const loadData = useCallback(async (authToken: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminTutorApplications(authToken, {
        status: statusFilter,
        q: query,
        page,
        limit: PAGE_SIZE,
      });
      setApplications(data.items);
      setTotalPages(data.totalPages);
    } catch {
      setError("Unable to load tutor applications.");
    } finally {
      setLoading(false);
    }
  }, [page, query, statusFilter]);

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
  }, [token, page, query, statusFilter, loadData]);

  function logout() {
    clearAuth();
    router.replace("/blog/admin/auth");
  }

  async function onUpdateStatus(id: number, status: TutorApplicationStatus) {
    setMessage("");
    setError("");
    try {
      await updateTutorApplicationStatus(token, id, {
        status,
        adminNotes: notesDrafts[id] || "",
      });
      setMessage("Application updated successfully.");
      await loadData(token);
    } catch {
      setError("Unable to update application status.");
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
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Tutor Applications</h1>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:gap-2">
            <Link href="/blog/admin/posts" className="rounded-full border border-white/25 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10">
              Back to Posts
            </Link>
            <button type="button" onClick={logout} className="rounded-full border border-rose-400/35 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10">
              Logout
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 grid gap-2 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-white sm:text-xl">Applications</h2>
            <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:w-auto sm:gap-2">
              <select
                value={statusFilter}
                onChange={(event) => {
                  setPage(1);
                  setStatusFilter(event.target.value);
                }}
                className="rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white outline-none"
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
              <input
                value={query}
                onChange={(event) => {
                  setPage(1);
                  setQuery(event.target.value);
                }}
                placeholder="Search by name, email, city..."
                className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white outline-none sm:w-64"
              />
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-gray-300">Loading...</p>
          ) : applications.length === 0 ? (
            <p className="text-sm text-gray-300">No tutor applications found.</p>
          ) : (
            <div className="space-y-3">
              {applications.map((application) => (
                <div key={application.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-white">{application.fullName}</p>
                    <span className="text-xs uppercase text-gray-300">{application.status}</span>
                  </div>

                  <div className="mt-2 grid gap-1 text-xs text-gray-300 sm:grid-cols-2">
                    <p>Email: {application.email}</p>
                    <p>Phone: {application.phone}</p>
                    <p>City: {application.city}</p>
                    <p>Mode: {application.teachingMode}</p>
                    <p>Subjects: {application.subjects}</p>
                    <p>Experience: {application.experience}</p>
                    <p>Availability: {application.availability}</p>
                    <p>Applied: {formatDate(application.createdAt)}</p>
                  </div>

                  <p className="mt-2 text-xs text-gray-200">{application.coverMessage}</p>

                  <textarea
                    value={notesDrafts[application.id] ?? application.adminNotes ?? ""}
                    onChange={(event) =>
                      setNotesDrafts((prev) => ({
                        ...prev,
                        [application.id]: event.target.value,
                      }))
                    }
                    placeholder="Admin notes (optional)"
                    rows={2}
                    className="mt-3 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-xs text-white outline-none"
                  />

                  <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                    {application.resumeUrl && (
                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/25 px-3 py-1 text-center text-xs font-semibold text-white"
                      >
                        View Resume
                      </a>
                    )}
                    <button type="button" onClick={() => void onUpdateStatus(application.id, "reviewed")} className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">Reviewed</button>
                    <button type="button" onClick={() => void onUpdateStatus(application.id, "shortlisted")} className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">Shortlist</button>
                    <button type="button" onClick={() => void onUpdateStatus(application.id, "hired")} className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-200">Hire</button>
                    <button type="button" onClick={() => void onUpdateStatus(application.id, "rejected")} className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-200">Reject</button>
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
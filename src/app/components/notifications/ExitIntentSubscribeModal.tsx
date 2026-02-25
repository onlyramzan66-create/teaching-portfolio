"use client";

import { FormEvent, useEffect, useState } from "react";
import { subscribeEmail } from "@/lib/blogApi";
import {
  canShowExitModal,
  dismissExitModalForToday,
  getSubscriberOptIn,
  markSubscriberOptIn,
} from "@/lib/subscriberFunnel";

export default function ExitIntentSubscribeModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;
    if (getSubscriberOptIn() || !canShowExitModal()) return;

    const handler = (event: MouseEvent) => {
      if (event.clientY <= 12) {
        setOpen(true);
      }
    };

    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, []);

  function closeAndSnooze() {
    dismissExitModalForToday();
    setOpen(false);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Enter email to continue.");
      return;
    }
    setLoading(true);
    try {
      await subscribeEmail({ email: email.trim(), source: "exit-intent" });
      markSubscriberOptIn();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to subscribe.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-slate-950 p-6 text-white shadow-2xl">
        <h3 className="text-xl font-bold">Before You Leave</h3>
        <p className="mt-2 text-sm text-gray-300">
          Get free notes, revision tips, and new article alerts in your inbox.
        </p>

        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-sm text-white outline-none"
          />

          {error && <p className="text-xs text-rose-300">{error}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
            >
              {loading ? "Saving..." : "Get Updates"}
            </button>
            <button
              type="button"
              onClick={closeAndSnooze}
              className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white"
            >
              No Thanks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

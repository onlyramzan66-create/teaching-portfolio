"use client";

import { FormEvent, useEffect, useState } from "react";
import { subscribeEmail } from "@/lib/blogApi";
import { getSubscriberOptIn, markSubscriberOptIn } from "@/lib/subscriberFunnel";

export default function StickySubscribeBar() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!getSubscriberOptIn()) {
        setVisible(true);
      }
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Enter email to subscribe.");
      return;
    }
    setLoading(true);
    try {
      await subscribeEmail({ email: email.trim(), source: "sticky-bar" });
      markSubscriberOptIn();
      setVisible(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to subscribe.");
    } finally {
      setLoading(false);
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[65] border-t border-white/15 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-gray-200">
          Get new study notes and exam alerts in your inbox.
        </p>

        <form onSubmit={onSubmit} className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email address"
            className="w-full rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-white outline-none sm:w-64"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-3 sm:px-6">
        {error && <p className="mt-1 text-xs text-rose-300">{error}</p>}
      </div>
    </div>
  );
}

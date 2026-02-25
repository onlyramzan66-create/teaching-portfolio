"use client";

import { FormEvent, useState } from "react";
import { subscribeEmail } from "@/lib/blogApi";
import { markSubscriberOptIn } from "@/lib/subscriberFunnel";

export default function InlineEmailSubscribe() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter email.");
      return;
    }

    setLoading(true);
    try {
      await subscribeEmail({ email: email.trim(), source: "blog-inline" });
      markSubscriberOptIn();
      setMessage("Subscribed.");
      setEmail("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to subscribe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email address"
          className="h-10 w-full min-w-0 rounded-full border border-white/20 bg-black/30 px-4 text-sm text-white outline-none sm:w-56"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-10 rounded-full bg-emerald-500 px-4 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {error && <p className="mt-1 text-xs text-rose-300">{error}</p>}
      {message && <p className="mt-1 text-xs text-emerald-300">{message}</p>}
    </div>
  );
}
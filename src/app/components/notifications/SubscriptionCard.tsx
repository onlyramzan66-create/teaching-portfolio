"use client";

import { FormEvent, useEffect, useState } from "react";
import { Mail } from "lucide-react";
import {
  getPushPublicKey,
  savePushSubscription,
  subscribeEmail,
} from "@/lib/blogApi";
import { markSubscriberOptIn } from "@/lib/subscriberFunnel";

const COOKIE_STORAGE_KEY = "site_cookie_preferences";

function getCookieAccepted() {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw) as { accepted?: boolean };
    return Boolean(parsed.accepted);
  } catch {
    return false;
  }
}

function base64UrlToUint8Array(base64Url: string) {
  const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    output[i] = raw.charCodeAt(i);
  }
  return output;
}

export default function SubscriptionCard() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(false);

  useEffect(() => {
    const sync = () => setCookieAccepted(getCookieAccepted());
    sync();
    window.addEventListener("cookie-preferences-updated", sync);
    return () => window.removeEventListener("cookie-preferences-updated", sync);
  }, []);

  async function enablePushSilently(optionalEmail?: string) {
    if (!cookieAccepted) return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      const { publicKey } = await getPushPublicKey();
      if (!publicKey) return;

      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64UrlToUint8Array(publicKey),
        });
      }

      const json = subscription.toJSON();
      if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) return;

      await savePushSubscription({
        email: optionalEmail,
        enabled: true,
        subscription: {
          endpoint: json.endpoint,
          keys: {
            p256dh: json.keys.p256dh,
            auth: json.keys.auth,
          },
        },
      });
    } catch {
      // Best effort only; do not block email signup or show push errors.
    }
  }

  async function handleEmailSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter email.");
      return;
    }

    setSubscribing(true);
    try {
      await subscribeEmail({ email: email.trim(), source: "website" });
      void enablePushSilently(email.trim());
      markSubscriberOptIn();
      setMessage("Subscribed successfully.");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to subscribe email.");
    } finally {
      setSubscribing(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-black p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-500/20 text-emerald-200">
          <Mail className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
          <p className="mt-1 text-sm text-gray-300">
            Get new notes and article updates in your inbox.
          </p>
        </div>
      </div>

      <form onSubmit={handleEmailSubscribe} className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Enter your email address"
          className="h-11 w-full rounded-xl border border-white/20 bg-black/40 px-4 text-sm text-white outline-none ring-0 transition focus:border-emerald-300/60"
        />
        <button
          type="submit"
          disabled={subscribing}
          className="h-11 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60"
        >
          {subscribing ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
      {message && <p className="mt-3 text-sm text-emerald-300">{message}</p>}
    </section>
  );
}

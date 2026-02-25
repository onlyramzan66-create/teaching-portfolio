"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getBlogApiBase } from "@/lib/blogApi";
import { AuthResponse, saveAuth } from "@/lib/blogAuth";

type Mode = "login" | "signup";

export default function BlogAdminAuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  const apiBase = getBlogApiBase();

  const endpoint = useMemo(() => {
    return mode === "login" ? `${apiBase}/auth/login` : `${apiBase}/auth/signup`;
  }, [apiBase, mode]);

  const onGoogleAuth = useCallback(async (credential: string) => {
    setGoogleLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`${apiBase}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      const data = (await response.json()) as Partial<AuthResponse> & { message?: string };
      if (!response.ok || !data.accessToken || !data.user) {
        throw new Error(data.message ?? "Google authentication failed");
      }

      saveAuth({ accessToken: data.accessToken, user: data.user });
      setMessage(`Logged in as ${data.user.email} (${data.user.role}).`);
      if (data.user.role === "admin") {
        router.push("/blog/admin/posts");
      } else {
        router.push("/blog");
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to authenticate");
    } finally {
      setGoogleLoading(false);
    }
  }, [apiBase, router]);

  useEffect(() => {
    if (!googleClientId) return;

    const scriptId = "google-identity-script";
    const existing = document.getElementById(scriptId);
    if (!existing) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const interval = window.setInterval(() => {
      const google = (window as Window & {
        google?: {
          accounts: {
            id: {
              initialize: (options: {
                client_id: string;
                callback: (response: { credential?: string }) => void;
              }) => void;
              renderButton: (
                parent: HTMLElement,
                options: Record<string, string | number>,
              ) => void;
            };
          };
        };
      }).google;

      const container = document.getElementById("google-auth-btn");
      if (!google || !container) return;

      container.innerHTML = "";
      google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (response: { credential?: string }) => {
          if (response.credential) {
            void onGoogleAuth(response.credential);
          }
        },
      });
      google.accounts.id.renderButton(container, {
        theme: "outline",
        size: "large",
        width: 320,
      });
      window.clearInterval(interval);
    }, 300);

    return () => window.clearInterval(interval);
  }, [googleClientId, onGoogleAuth]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const payload: Record<string, string> = { email, password };
      if (mode === "signup") {
        payload.name = name;
        if (adminSecret.trim()) payload.adminSecret = adminSecret.trim();
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as Partial<AuthResponse> & { message?: string };

      if (!response.ok || !data.accessToken || !data.user) {
        throw new Error(data.message ?? "Authentication failed");
      }

      saveAuth({ accessToken: data.accessToken, user: data.user });
      setMessage(`Logged in as ${data.user.email} (${data.user.role}).`);
      if (data.user.role === "admin") {
        router.push("/blog/admin/posts");
      } else {
        router.push("/blog");
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to authenticate");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black pt-24">
      <section className="mx-auto max-w-xl px-6 pb-16">
        <h1 className="text-3xl font-bold text-white">Admin Access</h1>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              mode === "login" ? "bg-emerald-500 text-black" : "border border-white/30 text-white"
            }`}
          >
            Login
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          {mode === "signup" && (
            <label className="block text-sm text-gray-200">
              Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
              />
            </label>
          )}

          <label className="block text-sm text-gray-200">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
            />
          </label>

          <label className="block text-sm text-gray-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
            />
          </label>

          {mode === "signup" && (
            <label className="block text-sm text-gray-200">
              Admin Secret (optional)
              <input
                value={adminSecret}
                onChange={(event) => setAdminSecret(event.target.value)}
                className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
              />
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Signup"}
          </button>

          {mode === "login" && googleClientId && (
            <div className="pt-2">
              <p className="mb-2 text-center text-xs uppercase tracking-wide text-gray-300">Or continue with</p>
              <div className="flex justify-center">
                <div id="google-auth-btn" />
              </div>
              {googleLoading && <p className="mt-2 text-center text-xs text-gray-300">Signing in with Google...</p>}
            </div>
          )}
        </form>

        {error && <p className="mt-4 rounded-lg bg-rose-500/15 px-4 py-3 text-sm text-rose-200">{error}</p>}
        {message && <p className="mt-4 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm text-emerald-200">{message}</p>}

        {mode === "login" ? (
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-sm font-semibold text-emerald-300 hover:text-emerald-200"
            >
              New user? Signup
            </button>
          </div>
        ) : (
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-sm font-semibold text-emerald-300 hover:text-emerald-200"
            >
              Already have account? Login
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

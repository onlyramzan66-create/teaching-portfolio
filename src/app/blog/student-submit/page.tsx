"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { submitStudentArticle, uploadStudentArticleImage } from "@/lib/blogApi";
import { getAuth } from "@/lib/blogAuth";

type FormState = {
  studentName: string;
  title: string;
  article: string;
  imageUrl: string;
  notesPdfUrl: string;
};

const initialForm: FormState = {
  studentName: "",
  title: "",
  article: "",
  imageUrl: "",
  notesPdfUrl: "",
};

export default function StudentSubmitPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [token, setToken] = useState("");
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    const auth = getAuth();
    if (!auth) {
      router.replace("/blog/admin/auth");
      return;
    }
    setToken(auth.accessToken);
    setField("studentName", auth.user.name || auth.user.email.split("@")[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function onUploadImage(file: File | null) {
    if (!file) return;
    if (!token) return;
    setUploading(true);
    setError("");

    try {
      const url = await uploadStudentArticleImage(token, file);
      setField("imageUrl", url);
      setMessage("Image uploaded successfully.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        token,
        studentName: form.studentName,
        title: form.title,
        article: form.article,
        imageUrl: form.imageUrl || undefined,
        notesPdfUrl: form.notesPdfUrl || undefined,
      };

      const response = await submitStudentArticle(payload);
      setMessage(response.message || "Article submitted for admin review.");
      setForm(initialForm);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Submission failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black pt-24">
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h1 className="text-3xl font-bold text-white">Submit Student Article</h1>
        <p className="mt-2 text-sm text-gray-300">
          Share your article with your name. Admin will review and publish approved submissions.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <label className="block text-sm text-gray-200">
            Student Name
            <input
              value={form.studentName}
              onChange={(event) => setField("studentName", event.target.value)}
              required
              disabled
              className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
            />
          </label>

          <label className="block text-sm text-gray-200">
            Article Title
            <input
              value={form.title}
              onChange={(event) => setField("title", event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
            />
          </label>

          <label className="block text-sm text-gray-200">
            Article Content
            <textarea
              value={form.article}
              onChange={(event) => setField("article", event.target.value)}
              required
              minLength={20}
              rows={10}
              className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
            />
          </label>

          <div className="rounded-xl border border-white/10 p-3">
            <p className="text-sm font-semibold text-white">Article Image</p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setImageMode("url")}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  imageMode === "url" ? "bg-emerald-500 text-black" : "border border-white/30 text-white"
                }`}
              >
                By URL
              </button>
              <button
                type="button"
                onClick={() => setImageMode("upload")}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  imageMode === "upload" ? "bg-emerald-500 text-black" : "border border-white/30 text-white"
                }`}
              >
                Upload
              </button>
            </div>

            {imageMode === "url" ? (
              <input
                value={form.imageUrl}
                onChange={(event) => setField("imageUrl", event.target.value)}
                placeholder="https://..."
                className="mt-3 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
              />
            ) : (
              <div className="mt-3">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(event) => void onUploadImage(event.target.files?.[0] ?? null)}
                  className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white"
                />
                {uploading && <p className="mt-2 text-xs text-gray-300">Uploading image...</p>}
              </div>
            )}
          </div>

          <label className="block text-sm text-gray-200">
            Notes PDF URL (optional)
            <input
              value={form.notesPdfUrl}
              onChange={(event) => setField("notesPdfUrl", event.target.value)}
              placeholder="https://.../notes.pdf"
              className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60"
          >
            {sending ? "Submitting..." : "Submit for Review"}
          </button>
        </form>

        <div className="mt-4">
          <Link href="/blog" className="text-sm font-semibold text-emerald-300 hover:text-emerald-200">
            Back to Blog
          </Link>
        </div>

        {error && <p className="mt-4 rounded-lg bg-rose-500/15 px-4 py-3 text-sm text-rose-200">{error}</p>}
        {message && <p className="mt-4 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm text-emerald-200">{message}</p>}
      </section>
    </main>
  );
}

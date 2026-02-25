"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { clearAuth, getAuth } from "@/lib/blogAuth";
import { fetchAdminPostById, getBlogApiBase, uploadAdminPostImage } from "@/lib/blogApi";

type FormState = {
  title: string;
  excerpt: string;
  content: string;
  featureImage: string;
  notesPdfUrl: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  seoImage: string;
  isPublished: boolean;
};

const initialForm: FormState = {
  title: "",
  excerpt: "",
  content: "",
  featureImage: "",
  notesPdfUrl: "",
  seoTitle: "",
  seoDescription: "",
  canonicalUrl: "",
  seoImage: "",
  isPublished: true,
};

const contentTemplate = `Introduction
Scoring high marks is not only about studying more hours, it is about using the right method. This guide helps students build a clear, repeatable study system for Science and Mathematics subjects so they can improve concepts, solve more questions, and perform better in board and Cambridge-style exams.

Who This Guide Is For
- Matric students preparing chapter-wise tests and board exams.
- FSC students handling heavy syllabus and numerical practice.
- O / A Level students aiming for strong conceptual and paper-based answers.

Key Concepts
1. Active learning beats passive reading: after every topic, write key points in your own words and solve 5-10 questions.
2. Small daily consistency builds long-term retention: 90 focused minutes daily is better than irregular long sessions.
3. Test-based revision improves final results: weekly timed practice reveals weak areas early.

Step-by-Step Study Plan
1. Weekly target planning:
   - Select 2 chapters (or 1 large chapter) per subject.
   - Define outcomes: definitions, formulas, and question types to master.
2. Daily practice routine:
   - 30 min concept review.
   - 40 min solved examples + exercise questions.
   - 20 min error log update.
3. Revision checkpoints and self-testing:
   - End of week: 30-45 min quiz without notes.
   - Mark mistakes and revise only weak points the same day.

Common Mistakes to Avoid
- Mistake 1: Reading chapters repeatedly without solving questions.
  Fix: Solve topic questions immediately after theory.
- Mistake 2: Ignoring weak chapters until final month.
  Fix: Add one weak-topic session every week.

Exam Strategy
1. Paper attempt order:
   - Start from the section you are strongest in to build momentum.
2. Time management:
   - Divide paper time by marks and keep 10 minutes at end for review.
3. Final review checklist:
   - Check units in numericals.
   - Recheck MCQ bubbling/marking.
   - Confirm all compulsory parts are attempted.

Quick Notes
- Key formula rule: Write formula, define each variable, then apply values carefully.
- Definition rule: Keep board-friendly wording and include one short example where possible.
- MCQ improvement tip: Practice at least 20 mixed MCQs per day from past papers and topical sheets.

Conclusion
Follow this plan for 4-6 weeks with discipline and track your weekly test score. If your score is not improving, adjust only one variable at a time (time, topic load, or practice type). Consistent smart effort will produce visible academic progress.
`;

function BlogCreatePostPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = Number(searchParams.get("edit") || 0) || null;

  const [form, setForm] = useState<FormState>(initialForm);
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [titleTouched, setTitleTouched] = useState(false);
  const [seoTitleTouched, setSeoTitleTouched] = useState(false);
  const [seoDescriptionTouched, setSeoDescriptionTouched] = useState(false);
  const [canonicalTouched, setCanonicalTouched] = useState(false);
  const [seoImageTouched, setSeoImageTouched] = useState(false);

  const postsEndpoint = useMemo(() => `${getBlogApiBase()}/posts`, []);

  useEffect(() => {
    const auth = getAuth();
    if (!auth || auth.user.role !== "admin") {
      router.replace("/blog/admin/auth");
      return;
    }

    setIsAdmin(true);
    setToken(auth.accessToken);
  }, [router]);

  useEffect(() => {
    if (!token || !editId) return;

    let mounted = true;
    setLoadingPost(true);
    setError("");

    void fetchAdminPostById(token, editId)
      .then((post) => {
        if (!mounted) return;
        setTitleTouched(false);
        setSeoTitleTouched(false);
        setSeoDescriptionTouched(false);
        setCanonicalTouched(false);
        setSeoImageTouched(false);
        setForm({
          title: post.title,
          excerpt: post.excerpt || "",
          content: post.content,
          featureImage: post.featureImage || "",
          notesPdfUrl: post.notesPdfUrl || "",
          seoTitle: post.seoTitle || "",
          seoDescription: post.seoDescription || "",
          canonicalUrl: post.canonicalUrl || "",
          seoImage: post.seoImage || "",
          isPublished: post.isPublished,
        });
      })
      .catch(() => {
        if (!mounted) return;
        setError("Unable to load selected post for editing.");
      })
      .finally(() => {
        if (mounted) setLoadingPost(false);
      });

    return () => {
      mounted = false;
    };
  }, [token, editId]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function buildSuggestedSeoTitle(title: string, content: string) {
    const cleanTitle = title.trim();
    if (cleanTitle) {
      return cleanTitle.slice(0, 70);
    }

    const cleanContent = content
      .replace(/\s+/g, " ")
      .replace(/[#*_`>-]/g, "")
      .trim();
    if (!cleanContent) return "";

    const sentence = cleanContent.split(/[.!?]/)[0]?.trim() || cleanContent;
    return sentence.slice(0, 70);
  }

  function buildSuggestedTitle(content: string) {
    const cleanContent = content
      .replace(/\s+/g, " ")
      .replace(/[#*_`>-]/g, "")
      .trim();
    if (!cleanContent) return "";

    const sentence = cleanContent.split(/[.!?]/)[0]?.trim() || cleanContent;
    return sentence.slice(0, 90);
  }

  function buildCanonicalUrl(title: string) {
    const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!slug) return "";
    return `${base}/blog/${slug}`;
  }

  function buildSuggestedSeoDescription(excerpt: string, content: string) {
    const cleanExcerpt = excerpt.trim();
    if (cleanExcerpt) {
      return cleanExcerpt.slice(0, 180);
    }

    const cleanContent = content
      .replace(/\s+/g, " ")
      .replace(/[#*_`>-]/g, "")
      .trim();
    if (!cleanContent) return "";

    return cleanContent.slice(0, 180);
  }

  function applyTemplate() {
    const defaultExcerpt = "Structured study guide with concepts, mistakes, and exam strategy.";
    setForm((prev) => {
      const nextTitle =
        titleTouched && prev.title.trim() ? prev.title : prev.title || buildSuggestedTitle(contentTemplate);
      const nextExcerpt = prev.excerpt || defaultExcerpt;
      return {
        ...prev,
        title: nextTitle,
        excerpt: nextExcerpt,
        content: contentTemplate,
        canonicalUrl:
          canonicalTouched && prev.canonicalUrl.trim()
            ? prev.canonicalUrl
            : prev.canonicalUrl || buildCanonicalUrl(nextTitle),
        seoImage:
          seoImageTouched && prev.seoImage.trim()
            ? prev.seoImage
            : prev.seoImage || prev.featureImage,
        seoTitle:
          seoTitleTouched && prev.seoTitle.trim()
            ? prev.seoTitle
            : buildSuggestedSeoTitle(nextTitle, contentTemplate),
        seoDescription:
          seoDescriptionTouched && prev.seoDescription.trim()
            ? prev.seoDescription
            : buildSuggestedSeoDescription(nextExcerpt, contentTemplate),
      };
    });
    setMessage("Template applied. Customize sections for your topic.");
    setError("");
  }

  async function onUploadImage(file: File | null) {
    if (!file || !token) return;
    setUploadingImage(true);
    setError("");

    try {
      const url = await uploadAdminPostImage(token, file);
      setForm((prev) => ({
        ...prev,
        featureImage: url,
        seoImage: !seoImageTouched && !prev.seoImage.trim() ? url : prev.seoImage,
      }));
      setMessage("Image uploaded successfully.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(editId ? `${postsEndpoint}/${editId}` : postsEndpoint, {
        method: editId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { slug?: string; message?: string };
      if (!response.ok) {
        throw new Error(data.message ?? "Unable to save post");
      }

      setMessage(editId ? "Post updated successfully." : "Post created successfully.");
      if (!editId) {
        setTitleTouched(false);
        setSeoTitleTouched(false);
        setSeoDescriptionTouched(false);
        setCanonicalTouched(false);
        setSeoImageTouched(false);
        setForm(initialForm);
      }
      if (data.slug) {
        router.push(`/blog/admin/posts?saved=${encodeURIComponent(data.slug)}`);
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Request failed");
    } finally {
      setSaving(false);
    }
  }

  function logout() {
    clearAuth();
    router.replace("/blog/admin/auth");
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
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-3xl font-bold text-white">{editId ? "Edit Post" : "Create Post"}</h1>
          <div className="flex gap-2">
            <Link
              href="/blog/admin/posts"
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              All Posts
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-rose-400/35 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10"
            >
              Logout
            </button>
          </div>
        </div>

        {loadingPost ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">Loading post...</div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <label className="block text-sm text-gray-200">
              Title
              <input
                value={form.title}
                onChange={(event) => {
                  setTitleTouched(true);
                  const nextTitle = event.target.value;
                  setForm((prev) => {
                    const next = { ...prev, title: nextTitle };
                    if (!canonicalTouched && !prev.canonicalUrl.trim()) {
                      next.canonicalUrl = buildCanonicalUrl(nextTitle);
                    }
                    if (!seoTitleTouched && !prev.seoTitle.trim()) {
                      next.seoTitle = buildSuggestedSeoTitle(nextTitle, prev.content);
                    }
                    if (!seoDescriptionTouched && !prev.seoDescription.trim()) {
                      next.seoDescription = buildSuggestedSeoDescription(prev.excerpt, prev.content);
                    }
                    return next;
                  });
                }}
                required
                className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
              />
            </label>

            <div className="rounded-xl border border-white/10 p-3">
              <p className="text-sm font-semibold text-white">Feature Image</p>
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
                  value={form.featureImage}
                  onChange={(event) => {
                    const nextFeatureImage = event.target.value;
                    setForm((prev) => ({
                      ...prev,
                      featureImage: nextFeatureImage,
                      seoImage:
                        !seoImageTouched && !prev.seoImage.trim()
                          ? nextFeatureImage
                          : prev.seoImage,
                    }));
                  }}
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
                  {uploadingImage && <p className="mt-2 text-xs text-gray-300">Uploading image...</p>}
                </div>
              )}

              {form.featureImage && (
                <div className="mt-3 overflow-hidden rounded-lg border border-white/15">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.featureImage} alt="Selected" className="h-40 w-full object-cover" />
                </div>
              )}
            </div>

            <label className="block text-sm text-gray-200">
              Excerpt
              <input
                value={form.excerpt}
                onChange={(event) => setField("excerpt", event.target.value)}
                className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
              />
            </label>

            <label className="block text-sm text-gray-200">
              Notes PDF URL
              <input
                value={form.notesPdfUrl}
                onChange={(event) => setField("notesPdfUrl", event.target.value)}
                placeholder="https://.../notes.pdf"
                className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
              />
            </label>

            <div className="rounded-xl border border-white/10 p-3">
              <p className="text-sm font-semibold text-white">SEO Settings</p>

              <label className="mt-3 block text-sm text-gray-200">
                SEO Title ({form.seoTitle.length}/70)
                <input
                  value={form.seoTitle}
                  onChange={(event) => {
                    setSeoTitleTouched(true);
                    setField("seoTitle", event.target.value);
                  }}
                  placeholder="Custom meta title"
                  maxLength={70}
                  className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
                />
              </label>

              <label className="mt-3 block text-sm text-gray-200">
                SEO Description ({form.seoDescription.length}/180)
                <textarea
                  value={form.seoDescription}
                  onChange={(event) => {
                    setSeoDescriptionTouched(true);
                    setField("seoDescription", event.target.value);
                  }}
                  placeholder="Custom meta description"
                  maxLength={180}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
                />
              </label>

              <label className="mt-3 block text-sm text-gray-200">
                Canonical URL
                <input
                  value={form.canonicalUrl}
                  onChange={(event) => {
                    setCanonicalTouched(true);
                    setField("canonicalUrl", event.target.value);
                  }}
                  placeholder="https://your-domain.com/blog/your-post"
                  className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
                />
              </label>

              <label className="mt-3 block text-sm text-gray-200">
                SEO Image URL (Open Graph)
                <input
                  value={form.seoImage}
                  onChange={(event) => {
                    setSeoImageTouched(true);
                    setField("seoImage", event.target.value);
                  }}
                  placeholder="https://.../seo-image.jpg"
                  className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
                />
              </label>
            </div>

            <label className="block text-sm text-gray-200">
              Content
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={applyTemplate}
                  className="rounded-full border border-blue-400/35 px-3 py-1 text-xs font-semibold text-blue-200 transition hover:bg-blue-500/10"
                >
                  Use Content Template
                </button>
              </div>
              <textarea
                value={form.content}
                onChange={(event) => {
                  const nextContent = event.target.value;
                  setForm((prev) => {
                    const next = { ...prev, content: nextContent };
                    if (!titleTouched && !prev.title.trim()) {
                      next.title = buildSuggestedTitle(nextContent);
                    }
                    if (!seoTitleTouched && !prev.seoTitle.trim()) {
                      next.seoTitle = buildSuggestedSeoTitle(next.title || prev.title, nextContent);
                    }
                    if (!seoDescriptionTouched && !prev.seoDescription.trim()) {
                      next.seoDescription = buildSuggestedSeoDescription(prev.excerpt, nextContent);
                    }
                    if (!canonicalTouched && !prev.canonicalUrl.trim()) {
                      next.canonicalUrl = buildCanonicalUrl(next.title || prev.title);
                    }
                    return next;
                  });
                }}
                required
                minLength={10}
                rows={12}
                className="mt-1 w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-200">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(event) => setField("isPublished", event.target.checked)}
              />
              Publish now
            </label>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {saving ? "Saving..." : editId ? "Update Post" : "Create Post"}
            </button>
          </form>
        )}

        {error && <p className="mt-4 rounded-lg bg-rose-500/15 px-4 py-3 text-sm text-rose-200">{error}</p>}
        {message && <p className="mt-4 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm text-emerald-200">{message}</p>}
      </section>
    </main>
  );
}

export default function BlogCreatePostPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black pt-24">
          <section className="mx-auto max-w-4xl px-6 pb-16">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              Loading editor...
            </div>
          </section>
        </main>
      }
    >
      <BlogCreatePostPageContent />
    </Suspense>
  );
}

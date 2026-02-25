"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPostComment, fetchPostComments, PostComment } from "@/lib/blogApi";
import { getAuth } from "@/lib/blogAuth";

type PostCommentsSectionProps = {
  slug: string;
};

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Recent";
  return parsed.toLocaleDateString("en-PK", { year: "numeric", month: "short", day: "numeric" });
}

export default function PostCommentsSection({ slug }: PostCommentsSectionProps) {
  const router = useRouter();
  const [comments, setComments] = useState<PostComment[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadComments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPostComments(slug, 1, 20);
      setComments(data.items);
    } catch {
      setError("Unable to load comments.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!content.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    const auth = getAuth();
    if (!auth) {
      router.push("/blog/admin/auth");
      return;
    }

    setSending(true);
    try {
      await createPostComment(auth.accessToken, slug, content.trim());
      setMessage("Comment posted successfully.");
      setContent("");
      await loadComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to post comment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-xl font-semibold text-white">Comments</h2>
      <p className="mt-1 text-sm text-gray-300">Login required to add a comment.</p>

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={3}
          placeholder="Share your thoughts..."
          className="w-full rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-white outline-none"
        />
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-60"
        >
          {sending ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
      {message && <p className="mt-3 text-sm text-emerald-300">{message}</p>}

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-sm text-gray-300">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-gray-300">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-xl border border-white/10 bg-black/30 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">{comment.userName}</p>
                <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="mt-2 text-sm text-gray-200">{comment.content}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

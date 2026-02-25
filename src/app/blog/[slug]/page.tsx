import type { Metadata } from "next";
import Link from "next/link";
import PostCommentsSection from "@/app/components/blog/PostCommentsSection";
import PremiumNotesDownload from "@/app/components/blog/PremiumNotesDownload";
import SubscriptionCard from "@/app/components/notifications/SubscriptionCard";
import { fetchPostBySlug } from "@/lib/blogApi";

const siteUrl = "https://www.gohar.online";

type BlogPostDetailPageProps = {
  params: {
    slug: string;
  };
};

function formatDate(date: string | null) {
  if (!date) return "Recent";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Recent";

  return parsed.toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: BlogPostDetailPageProps): Promise<Metadata> {
  try {
    const post = await fetchPostBySlug(params.slug, "force-cache");
    const title = post.seoTitle?.trim() || `${post.title} | GoharOnline Blog`;
    const description =
      post.seoDescription?.trim() ||
      post.excerpt?.trim() ||
      "Read this detailed educational note and guidance from GoharOnline.";
    const canonicalPath = post.canonicalUrl?.trim() || `/blog/${post.slug}`;
    const postUrl = post.canonicalUrl?.trim() || `${siteUrl}/blog/${post.slug}`;
    const socialImage = post.seoImage || post.featureImage;

    return {
      title,
      description,
      alternates: { canonical: canonicalPath },
      openGraph: {
        title,
        description,
        url: postUrl,
        type: "article",
        images: socialImage
          ? [
              {
                url: socialImage,
                alt: post.title,
              },
            ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: socialImage ? [socialImage] : undefined,
      },
    };
  } catch {
    return {
      title: "Blog Post | GoharOnline",
      description: "Read the latest post from GoharOnline.",
    };
  }
}

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const apiBase =
    process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

  try {
    const response = await fetch(`${apiBase}/posts?page=1&limit=1000`, {
      method: "GET",
      cache: "force-cache",
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as
      | { items?: Array<{ slug?: string | null }> }
      | Array<{ slug?: string | null }>;

    const items = Array.isArray(data) ? data : data.items ?? [];

    return items
      .map((post) => post.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const post = await fetchPostBySlug(params.slug, "force-cache");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black pt-24">
      <article className="mx-auto max-w-4xl px-6 pb-12">
        <Link href="/blog" className="text-sm font-medium text-emerald-300 hover:text-emerald-200">
          Back to Blog
        </Link>

        <p className="mt-4 text-xs uppercase tracking-wide text-emerald-300">
          {formatDate(post.publishedAt)}
        </p>

        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white md:text-5xl">{post.title}</h1>

        {post.excerpt && <p className="mt-4 text-lg text-gray-300">{post.excerpt}</p>}

        {post.featureImage && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.featureImage}
              alt={post.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {post.notesPdfUrl && (
          <PremiumNotesDownload notesPdfUrl={post.notesPdfUrl} />
        )}

        <div className="mt-8 whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/5 p-6 text-base leading-relaxed text-gray-100">
          {post.content}
        </div>

        <div className="mt-8">
          <SubscriptionCard />
        </div>

        <PostCommentsSection slug={post.slug} />
      </article>
    </main>
  );
}

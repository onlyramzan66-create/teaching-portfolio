import type { ReactNode } from "react";

type BlogSlugLayoutProps = {
  children: ReactNode;
};

const apiBase =
  process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
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

export default function BlogSlugLayout({ children }: BlogSlugLayoutProps) {
  return children;
}

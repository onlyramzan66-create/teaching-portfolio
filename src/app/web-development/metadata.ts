import type { Metadata } from "next";

const siteUrl = "https://www.gohar.online";

export const metadata: Metadata = {
  title: "Web Development Training and Services | GoharOnline",
  description:
    "Learn with web development training and services including portfolios, business websites, APIs, and full-stack applications for students and businesses.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/web-development" },
  openGraph: {
    title: "Web Development Training & Services - GoharOnline",
    description:
      "Get modern, scalable web development training and services from GoharOnline for portfolios, business sites, and production-ready web apps.",
    url: `${siteUrl}/web-development`,
    siteName: "GoharOnline",
    type: "website",
  },
};

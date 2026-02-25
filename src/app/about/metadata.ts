import type { Metadata } from "next";

const siteUrl = "https://www.gohar.online";

export const metadata: Metadata = {
  title: "About GoharOnline | A Level & O Level Tutor Academy",
  description:
    "Learn about GoharOnline, an online and home tutor academy supporting A Level and O Level students in Science, Mathematics, Computer Science, and Quran studies.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About GoharOnline Tutor Academy",
    description:
      "Discover GoharOnline's teaching model for A Level and O Level students with online classes and selected city home tutor support in Pakistan.",
    url: `${siteUrl}/about`,
    siteName: "GoharOnline",
    images: [
      {
        url: `${siteUrl}/images/about-og.jpg`,
        width: 1200,
        height: 630,
        alt: "About GoharOnline",
      },
    ],
    type: "website",
  },
};

import type { Metadata } from "next";

const siteUrl = "https://www.gohar.online";

export const metadata: Metadata = {
  title: "Online Quran Classes with Tajweed | GoharOnline Academy",
  description:
    "Join online Quran classes with qualified teachers for Nazra, Tajweed, Hifz, and Islamic studies with flexible schedules for kids, teens, and adults.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/quran" },
  openGraph: {
    title: "Online Quran Classes - GoharOnline Academy",
    description:
      "Structured Quran classes with qualified teachers for children and adults, with one-to-one sessions and progress-focused lesson planning.",
    url: `${siteUrl}/quran`,
    siteName: "GoharOnline",
    type: "website",
  },
};

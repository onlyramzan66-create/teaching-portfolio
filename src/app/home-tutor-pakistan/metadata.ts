import type { Metadata } from "next";

const siteUrl = "https://www.gohar.online";

export const metadata: Metadata = {
  title: "Home Tutor Services in Pakistan | GoharOnline Academy",
  description:
    "Book verified home tutor services in selected Pakistani cities for A/O Level, Matric, FSC, Science, Mathematics, Computer Science, and related subjects.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/home-tutor-pakistan" },
  openGraph: {
    title: "Home Tutor Services Pakistan - GoharOnline",
    description:
      "Home tutoring support in selected Pakistani cities with expert subject tutors, structured plans, and regular progress tracking for parents.",
    url: `${siteUrl}/home-tutor-pakistan`,
    siteName: "GoharOnline",
    type: "website",
  },
};

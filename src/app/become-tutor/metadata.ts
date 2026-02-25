import type { Metadata } from "next";

const siteUrl = "https://www.gohar.online";

export const metadata: Metadata = {
  title: "Become a Tutor at GoharOnline | Teach A/O Level Courses",
  description:
    "Apply to join GoharOnline as a tutor and teach A Level and O Level students in Science, Mathematics, Computer Science, and Quran studies online or onsite.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/become-tutor" },
  openGraph: {
    title: "Become a Tutor at GoharOnline Academy",
    description:
      "Join our tutor team and support O Level and A Level learners through structured lesson plans, student mentoring, and flexible teaching options.",
    url: `${siteUrl}/become-tutor`,
    siteName: "GoharOnline",
    images: [
      {
        url: `${siteUrl}/images/become-tutor.jpg`,
        width: 1200,
        height: 630,
        alt: "Become a Tutor at GoharOnline",
      },
    ],
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

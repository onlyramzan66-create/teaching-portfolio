import type { Metadata } from "next";

const siteUrl = "https://www.gohar.online";

export const metadata: Metadata = {
  title: "Science Tuition for A Level & O Level | GoharOnline",
  description:
    "A Level and O Level Science tuition for Physics, Chemistry, Biology, Mathematics, and Computer Science with exam-focused preparation and past-paper practice.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/science",
  },
  keywords: [
    "A Level science tuition",
    "O Level science tuition",
    "online physics tutor",
    "online chemistry tutor",
    "online biology tutor",
    "A Level mathematics tutor",
    "O Level computer science tutor",
    "science exam preparation",
  ],
  openGraph: {
    title: "A/O Level Science Tuition - GoharOnline Academy",
    description:
      "Exam-focused A Level and O Level science tutoring with past-paper practice, structured lessons, and expert teachers.",
    url: `${siteUrl}/science`,
    siteName: "GoharOnline",
    images: [
      {
        url: `${siteUrl}/images/science-og.jpg`,
        width: 1200,
        height: 630,
        alt: "A Level and O Level Science",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A/O Level Science Tuition - GoharOnline Academy",
    description:
      "A Level and O Level science tutoring with weekly assessments, topic tests, and exam strategy support from expert teachers.",
    images: [`${siteUrl}/images/science-og.jpg`],
  },
};

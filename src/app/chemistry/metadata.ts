import type { Metadata } from "next";

const siteUrl = "https://www.gohar.online";

export const metadata: Metadata = {
  title: "Chemistry Tuition for A/O Level Students | GoharOnline",
  description:
    "Get A Level and O Level Chemistry tuition with concept clarity, structured practice, and exam-focused preparation for school assessments and board exams.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/chemistry" },
  openGraph: {
    title: "Chemistry Tuition for O/A Level | GoharOnline",
    description:
      "Expert Chemistry tutoring with past-paper strategy, topic-wise revision, and clear explanations for O Level and A Level students.",
    url: `${siteUrl}/chemistry`,
    siteName: "GoharOnline",
    type: "website",
  },
};

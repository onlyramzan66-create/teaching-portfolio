import type { Metadata } from "next";

const siteUrl = "https://www.gohar.online";

export const metadata: Metadata = {
  title: "Computer Science Tuition for A/O Level | GoharOnline",
  description:
    "Learn A Level and O Level Computer Science with structured lessons, coding practice, and exam-focused guidance for stronger concepts and better grades.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/computer" },
  openGraph: {
    title: "Computer Science Tuition A/O Level - GoharOnline",
    description:
      "A Level and O Level Computer Science tutoring with practical training, topic tests, and past-paper practice to improve exam performance.",
    url: `${siteUrl}/computer`,
    siteName: "GoharOnline",
    type: "website",
  },
};

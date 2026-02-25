import type { Metadata } from "next";

const siteUrl = "https://www.gohar.online";

export const metadata: Metadata = {
  title: "Contact GoharOnline | A Level & O Level Tuition Support",
  description:
    "Contact GoharOnline for A Level and O Level tuition, free trial class requests, admission guidance, and support for online or home tutoring in Pakistan.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact GoharOnline",
    description:
      "Get in touch with GoharOnline for course enquiries, trial classes, fee details, and tutor matching for online and home tuition.",
    url: `${siteUrl}/contact`,
    siteName: "GoharOnline",
    images: [
      {
        url: `${siteUrl}/images/contact-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact GoharOnline",
      },
    ],
    type: "website",
  },
};

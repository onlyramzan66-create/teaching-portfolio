import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieConsentBanner from "./components/notifications/CookieConsentBanner";
import ExitIntentSubscribeModal from "./components/notifications/ExitIntentSubscribeModal";
import StickySubscribeBar from "./components/notifications/StickySubscribeBar";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import StructuredData from "./components/StructuredData";
import CoursesStructuredData from "./components/CoursesStructuredData";
import ThemeInitializer from "./components/ui/ThemeInitializer";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = "https://www.gohar.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "GoharOnline Academy | Online & Home Tutor in Pakistan",
  description:
    "GoharOnline offers online classes worldwide and home tutor services in Pakistan for O Level, A Level, Matric, FSC, Quran, Mathematics, Science, Computer Science, and Web Development.",
  authors: [{ name: "GoharOnline Academy" }],
  keywords: [
    "GoharOnline",
    "home tutor Pakistan",
    "online tuition",
    "O Level tuition",
    "A Level tuition",
    "Matric FSC tutor",
    "Quran online classes",
    "Math classes online",
    "Physics tuition online",
    "Chemistry courses",
    "Computer Science online",
    "Web development training",
    "Cambridge Edexcel tutor",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "en-PK": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "GoharOnline Academy | Online & Home Tutor in Pakistan",
    description:
      "Learn with expert tutors for O/A Level, Matric, FSC, Quran, and Computer Science. Online classes worldwide and home tutor service in Pakistan.",
    url: siteUrl,
    siteName: "GoharOnline",
    images: [
      {
        url: `${siteUrl}/images/home-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "GoharOnline Academy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoharOnline Academy | Online & Home Tutor in Pakistan",
    description:
      "Expert tutoring for O/A Level, Matric, FSC, Quran, and Computer Science. Online worldwide and home tutor support in Pakistan.",
    images: [`${siteUrl}/images/home-banner.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} w-full max-w-full overflow-x-hidden`}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
        <ThemeInitializer />
        <Navbar />
        <main className="min-h-screen w-full max-w-full overflow-x-clip">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsentBanner />
        <ExitIntentSubscribeModal />
        <StickySubscribeBar />
        <StructuredData />
        <CoursesStructuredData />
      </body>
    </html>
  );
}

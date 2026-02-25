import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.gohar.online";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/science/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/computer/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/quran/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/web-development/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/become-tutor/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/home-tutor-pakistan/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/chemistry/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}

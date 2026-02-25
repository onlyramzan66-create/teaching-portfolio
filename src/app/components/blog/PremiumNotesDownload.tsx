"use client";

import { useRouter } from "next/navigation";
import { getAuth } from "@/lib/blogAuth";

type PremiumNotesDownloadProps = {
  notesPdfUrl: string;
};

export default function PremiumNotesDownload({ notesPdfUrl }: PremiumNotesDownloadProps) {
  const router = useRouter();

  function handleDownload() {
    const auth = getAuth();
    if (!auth) {
      router.push("/blog/admin/auth");
      return;
    }

    window.open(notesPdfUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
      <p className="text-sm text-emerald-100">
        Premium student notes are available in PDF format. Login is required to download.
      </p>
      <button
        type="button"
        onClick={handleDownload}
        className="mt-3 inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
      >
        Download Premium Notes PDF
      </button>
    </div>
  );
}
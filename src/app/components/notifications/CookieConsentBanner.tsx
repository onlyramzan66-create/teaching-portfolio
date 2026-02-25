"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "site_cookie_preferences";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  function savePreference(accepted: boolean) {
    const payload = JSON.stringify({
      accepted,
      updatedAt: new Date().toISOString(),
    });

    localStorage.setItem(STORAGE_KEY, payload);
    document.cookie = `site_cookie_preferences=${encodeURIComponent(payload)}; path=/; max-age=31536000; SameSite=Lax`;
    window.dispatchEvent(new Event("cookie-preferences-updated"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-3 z-[70] mx-auto w-[95%] max-w-4xl rounded-2xl border border-white/15 bg-neutral-950/95 p-4 text-white shadow-2xl backdrop-blur-xl">
      <p className="text-sm text-gray-200">
        We use cookies to remember preferences and enable notifications. You can accept all or keep essential only.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => savePreference(true)}
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black"
        >
          Accept All
        </button>
        <button
          type="button"
          onClick={() => savePreference(false)}
          className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white"
        >
          Essential Only
        </button>
      </div>
    </div>
  );
}
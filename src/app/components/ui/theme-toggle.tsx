"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const ls = localStorage.getItem("theme");
      const cookie = document.cookie
        .split("; ")
        .find((r) => r.startsWith("theme="))
        ?.split("=")[1];
      const preferred =
        ls ||
        cookie ||
        (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      setTheme(preferred === "dark" ? "dark" : "light");
    } catch (e) {
      setTheme("light");
    } finally {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
      document.cookie = `theme=${theme};path=/;max-age=${60 * 60 * 24 * 365}`;
    } catch (e) {}
  }, [theme, mounted]);

  function toggle() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <button
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      onClick={toggle}
      className={
        "inline-flex items-center justify-center rounded-full p-3 md:p-2 bg-white/5 hover:bg-white/10 transition " +
        (className || "")
      }
    >
      {!mounted ? (
        <span className="w-6 h-6 md:w-5 md:h-5" aria-hidden="true" />
      ) : theme === "dark" ? (
        <Sun className="w-6 h-6 md:w-5 md:h-5 text-yellow-400" />
      ) : (
        <Moon className="w-6 h-6 md:w-5 md:h-5 text-gray-300" />
      )}
    </button>
  );
}

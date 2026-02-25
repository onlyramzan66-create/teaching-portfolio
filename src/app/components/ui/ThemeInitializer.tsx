"use client";
import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    try {
      const getCookie = (n: string) =>
        document.cookie
          .split("; ")
          .find((r) => r && r.indexOf(n + "=") === 0)
          ?.split("=")[1];
      const t = localStorage.getItem("theme") || getCookie("theme");
      if (t === "dark") {
        document.documentElement.classList.add("dark");
      } else if (t === "light") {
        document.documentElement.classList.remove("dark");
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.documentElement.classList.add("dark");
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return null;
}

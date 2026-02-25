"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, GraduationCap, Menu as MenuIcon, X } from "lucide-react";
import ThemeToggle from "./ui/theme-toggle";
import SiteSettings from "./ui/site-settings";
import { cn } from "../utils/cn";
import { BLOG_AUTH_CHANGED_EVENT, clearAuth, getAuth } from "@/lib/blogAuth";

const mainLinks = [
  { label: "Web Development", href: "/web-development" },
  { label: "Become Tutor", href: "/become-tutor" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Home Tutor PK", href: "/home-tutor-pakistan" },
];

const courseLinks = [
  { label: "Matric", href: "/matric" },
  { label: "FSC", href: "/fsc" },
  { label: "O / A Level", href: "/o-a-level" },
];

const desktopLinkClass =
  "rounded-lg px-2.5 py-1.5 text-sm font-medium text-neutral-200 transition hover:bg-white/5 hover:text-white";

const mobileLinkClass =
  "block rounded-lg px-3 py-2 text-sm text-neutral-200 transition hover:bg-white/10 hover:text-white";

function Navbar({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileCoursesOpen(false);
  };

  useEffect(() => {
    const syncAuth = () => {
      const auth = getAuth();
      setIsLoggedIn(Boolean(auth));
      setIsAdmin(auth?.user.role === "admin");
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener(BLOG_AUTH_CHANGED_EVENT, syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener(BLOG_AUTH_CHANGED_EVENT, syncAuth);
    };
  }, []);

  function logout() {
    clearAuth();
    closeMobileMenu();
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg px-1 py-1 text-white transition hover:bg-white/5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold tracking-wide sm:text-base">GoharOnline</span>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          <Link href="/" className={desktopLinkClass}>
            Home
          </Link>

          <div className="group relative">
            <button
              type="button"
              className={cn(desktopLinkClass, "inline-flex items-center gap-1")}
            >
              Our Courses
              <ChevronDown className="h-4 w-4" />
            </button>

            <div className="pointer-events-none absolute left-0 top-full w-72 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="rounded-xl border border-white/10 bg-neutral-950/95 p-3 shadow-2xl">
                {courseLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/blog" className={desktopLinkClass}>
            Blog
          </Link>

          <Link href="/articles" className={desktopLinkClass}>
            Articles
          </Link>

          {isAdmin && (
            <Link href="/blog/admin/posts" className={desktopLinkClass}>
              Admin Posts
            </Link>
          )}

          <Link
            href="/blog/student-submit"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/10 hover:text-emerald-200"
          >
            Submit Article
          </Link>

          {mainLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={desktopLinkClass}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <SiteSettings />
          <ThemeToggle />
          {!isLoggedIn ? (
            <Link
              href="/blog/admin/auth"
              className="inline-flex items-center rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Login
            </Link>
          ) : (
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center rounded-full border border-rose-400/35 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/10"
            >
              Logout
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <SiteSettings />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition hover:bg-white/5"
          >
            {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-neutral-950/95 xl:hidden">
          <div className="mx-auto max-h-[calc(100vh-4rem)] max-w-7xl space-y-3 overflow-y-auto p-3 sm:p-4">
            <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-2">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={mobileLinkClass}
              >
                Home
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileCoursesOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-left text-sm font-medium text-white"
            >
              Our Courses
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", mobileCoursesOpen && "rotate-180")}
              />
            </button>

            {mobileCoursesOpen && (
              <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-2">
                {courseLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={mobileLinkClass}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-2">
              <Link href="/blog" onClick={closeMobileMenu} className={mobileLinkClass}>Blog</Link>
              <Link href="/articles" onClick={closeMobileMenu} className={mobileLinkClass}>Articles</Link>
              {isAdmin && (
                <Link href="/blog/admin/posts" onClick={closeMobileMenu} className={mobileLinkClass}>Admin Posts</Link>
              )}
              <Link href="/blog/student-submit" onClick={closeMobileMenu} className="block rounded-lg px-3 py-2 text-sm text-emerald-300 transition hover:bg-white/10 hover:text-emerald-200">Submit Article</Link>
            </div>

            <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-2">
              {mainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={mobileLinkClass}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-2 rounded-xl border border-white/10 bg-white/5 p-2">
              {!isLoggedIn ? (
                <Link
                  href="/blog/admin/auth"
                  onClick={closeMobileMenu}
                  className="rounded-lg border border-white/20 px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  Login
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg border border-rose-400/35 px-3 py-2 text-center text-sm font-semibold text-rose-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

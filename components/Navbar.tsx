"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSelector } from "./LanguageSelector";
import { AuthButton } from "./AuthButton";
import { Landmark, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/chat",     label: "AI Assistant" },
  { href: "/timeline", label: "Timeline" },
  { href: "/polling",  label: "Polling Map" },
  { href: "/quiz",     label: "Quiz" },
  { href: "/stats",    label: "My Stats" },
];

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-primary/10 bg-surface/80 backdrop-blur-md safe-top">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            <Landmark className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold text-primary">CivicIQ</span>
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <div className="flex items-center gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary rounded p-1 transition-colors",
                    pathname === link.href ? "text-accent font-semibold" : "hover:text-accent"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-4 w-px bg-primary/20" />
              <AuthButton />
              <LanguageSelector />
            </div>
          )}

          {/* Mobile: hamburger */}
          {isMobile && (
            <button
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className="flex items-center justify-center w-11 h-11 rounded-lg hover:bg-primary/5 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            className={cn(
              "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
              drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          />

          {/* Drawer */}
          <aside
            className={cn(
              "fixed top-0 right-0 z-50 h-full w-72 bg-surface shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
              drawerOpen ? "translate-x-0" : "translate-x-full"
            )}
            aria-label="Mobile navigation"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-primary/10 shrink-0">
              <span className="font-display text-lg font-bold text-primary">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center w-11 h-11 rounded-lg hover:bg-primary/5 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className={cn(
                    "flex items-center w-full min-h-[56px] px-4 rounded-xl text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-accent/10 text-accent font-semibold"
                      : "hover:bg-primary/5 text-text"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bottom: Auth + Language */}
            <div className="px-4 py-6 border-t border-primary/10 space-y-3 safe-bottom shrink-0">
              <LanguageSelector />
              <AuthButton />
            </div>
          </aside>
        </>
      )}
    </>
  );
}

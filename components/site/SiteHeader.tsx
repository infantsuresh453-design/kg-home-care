"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waHref, bookingMessage, telHref, PHONE_DISPLAY } from "@/lib/contact";

const NAV = [
  { href: "/",         label: "Home"     },
  { href: "/about",    label: "About"    },
  { href: "/services", label: "Services" },
  { href: "/contact",  label: "Contact"  },
];

export function SiteHeader() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function isActive(href: string) {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  }

  return (
    <>
      <header
        className={[
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 shadow-[0_2px_24px_-4px_rgba(15,23,42,0.10)] backdrop-blur-lg"
            : "bg-white/80 backdrop-blur-md",
        ].join(" ")}
      >
        {/* accent line */}
        <div className="h-[3px] w-full bg-gradient-to-r from-primary via-blue-400 to-primary/60" />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 flex-col leading-none" aria-label="KG Home Care">
            <span className="text-[15px] font-extrabold tracking-tight text-foreground">KG Home Care</span>
            <span className="text-[10px] font-medium tracking-wide text-muted-foreground">Washing Machine Experts</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center lg:flex" aria-label="Primary">
            <div className="flex items-center gap-1 rounded-2xl border border-border/60 bg-secondary/40 px-1.5 py-1.5">
              {NAV.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-xl px-4 py-1.5 text-[13px] font-semibold transition-all duration-200",
                    isActive(item.href)
                      ? "bg-white text-primary shadow-soft"
                      : "text-foreground/60 hover:bg-white/70 hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={telHref()}
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2 text-[13px] font-bold text-primary transition-all hover:bg-primary/10"
            >
              <Phone className="h-3.5 w-3.5" />
              Call Now
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-semibold text-white shadow-[0_4px_14px_-2px_rgba(0,87,255,0.35)] transition-all hover:-translate-y-px hover:bg-primary/90"
            >
              Book Now
            </Link>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border/70 bg-white shadow-soft transition-colors hover:bg-secondary lg:hidden"
          >
            <Menu className="h-4.5 w-4.5 h-[18px] w-[18px]" />
          </button>
        </div>
      </header>

      {/* ── Full-screen mobile menu ── */}
      {/* backdrop */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* panel — slides in from right */}
      <div
        className={[
          "fixed inset-y-0 right-0 z-50 flex w-[80vw] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* header row */}
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-5">
          <div>
            <p className="text-base font-extrabold tracking-tight text-foreground">KG Home Care</p>
            <p className="text-[11px] text-muted-foreground">Washing Machine Experts</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-foreground transition-colors hover:bg-border"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* nav links */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={[
                  "group flex items-center justify-between rounded-2xl px-5 py-4 text-base font-semibold transition-all duration-200",
                  active
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-secondary",
                ].join(" ")}
              >
                {item.label}
                <ChevronRight className={["h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5", active ? "text-white/70" : "text-muted-foreground"].join(" ")} />
              </Link>
            );
          })}
        </nav>

        {/* bottom CTAs */}
        <div className="border-t border-border/50 px-4 py-5 space-y-3">
          <a
            href={telHref()}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-border bg-white py-3.5 text-sm font-bold text-foreground shadow-soft transition-colors hover:bg-secondary"
          >
            <Phone className="h-4 w-4 text-primary" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={waHref(bookingMessage({}))}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_-4px_rgba(0,87,255,0.4)] transition-colors hover:bg-primary/90"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book Now on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

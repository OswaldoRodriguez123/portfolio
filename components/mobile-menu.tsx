"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type NavLink = { href: string; label: string };

export function MobileMenu({ links }: { links: NavLink[] }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>
      {open ? (
        <nav
          id={panelId}
          aria-label={t("menu")}
          className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-popover p-2 shadow-lg"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-popover-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}

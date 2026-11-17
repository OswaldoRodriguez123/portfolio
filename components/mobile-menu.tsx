"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type NavLink = { href: string; label: string };

const EXTERNAL = /^(?:mailto:|https?:\/\/)/;

export function MobileMenu({ links }: { links: NavLink[] }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLElement>(null);

  /**
   * El panel es un popover nativo: abrir, cerrar con Escape, cerrar al tocar
   * fuera y devolver el foco los resuelve el navegador. Aquí solo se refleja
   * el estado real en el icono y en la etiqueta del botón, para que un cierre
   * que no pasa por React (Escape, light dismiss) no deje el botón mintiendo.
   */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const onToggle = (event: Event) => {
      setOpen((event as ToggleEvent).newState === "open");
    };

    panel.addEventListener("toggle", onToggle);
    return () => panel.removeEventListener("toggle", onToggle);
  }, []);

  const closeMenu = () => panelRef.current?.hidePopover();

  const itemClass =
    "block rounded-md px-3 py-2 text-sm font-medium text-popover-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2";

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        popoverTarget={panelId}
        popoverTargetAction="toggle"
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? t("closeMenu") : t("openMenu")}
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
      <nav
        ref={panelRef}
        id={panelId}
        popover="auto"
        aria-label={t("menu")}
        className="fixed inset-auto end-4 top-[4.5rem] m-0 w-48 rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-lg sm:hidden"
      >
        {links.map(({ href, label }) =>
          EXTERNAL.test(href) ? (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className={itemClass}
            >
              {label}
            </a>
          ) : (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={itemClass}
            >
              {label}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}

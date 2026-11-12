import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";

/**
 * Work first: the header mirrors the reading order of the home page, so the
 * first anchor after the brand is what the person has shipped for clients.
 * The email is a short label here; the full address lives in the hero and
 * in the contact block, where there is room for it.
 */
export function SiteHeader() {
  const t = useTranslations("nav");

  const navLinks = [
    { href: "/#work", label: t("work") },
    { href: "/#projects", label: t("projects") },
    { href: "/#stack", label: t("stack") },
  ] as const;

  const emailHref = `mailto:${site.email}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-sm"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap rounded-sm font-heading text-lg font-semibold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Oswaldo Rodríguez
        </Link>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <nav aria-label="Main navigation" className="hidden items-center gap-4 pr-2 sm:flex lg:gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {label}
              </Link>
            ))}
            <a
              href={emailHref}
              className="rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t("email")}
            </a>
          </nav>
          <LocaleSwitcher />
          <ThemeToggle />
          <MobileMenu links={[...navLinks, { href: emailHref, label: t("email") }]} />
        </div>
      </div>
    </header>
  );
}

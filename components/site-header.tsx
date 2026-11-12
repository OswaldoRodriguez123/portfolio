import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";

export function SiteHeader() {
  const t = useTranslations("nav");

  const navLinks = [
    { href: "/#featured", label: t("projects") },
    { href: "/#about", label: t("about") },
    { href: "/#contact", label: t("contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-sm"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="rounded-sm font-heading text-lg font-semibold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Oswaldo Rodríguez
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label="Main navigation" className="hidden items-center gap-6 pr-2 sm:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {label}
              </Link>
            ))}
          </nav>
          <LocaleSwitcher />
          <ThemeToggle />
          <MobileMenu links={[...navLinks]} />
        </div>
      </div>
    </header>
  );
}

import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex min-h-16 w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm text-muted-foreground sm:flex-nowrap sm:px-6">
        <p>
          © Oswaldo Rodríguez. {t("rights")}
        </p>
        <nav aria-label={t("navLabel")} className="flex flex-wrap items-center gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}

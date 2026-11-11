import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

export function ContactCta() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-muted p-8 sm:p-10">
      <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
        {t("contactBody")}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t("email")}
        </a>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          GitHub
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

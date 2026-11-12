import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export function Hero() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col gap-6 py-4 sm:py-8">
      <h1 className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
        {site.name}
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
        {t("headline")}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/#featured"
          className="inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t("heroCta")}
        </Link>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex h-11 items-center rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t("email")}
        </a>
      </div>
    </div>
  );
}

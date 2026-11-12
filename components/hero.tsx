import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export function Hero() {
  const t = useTranslations("home");

  return (
    <div className="bg-forest text-on-forest">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {t("heroRole")}
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-on-forest/90 sm:text-xl">
          {t("heroBody")}
        </p>
        <p className="mt-4 text-sm text-on-forest/80">{t("heroStack")}</p>
        <p className="mt-10 max-w-2xl border-t border-on-forest/20 pt-4 text-sm text-on-forest/80">
          {t("heroNow")}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-11 items-center rounded-sm bg-on-forest px-5 text-sm font-medium text-forest transition-[background-color] hover:bg-on-forest/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-forest"
          >
            {t("email")}
          </a>
          <Link
            href="/#projects"
            className="inline-flex h-11 items-center rounded-sm border border-on-forest/30 px-5 text-sm font-medium text-on-forest transition-[background-color,border-color] hover:bg-on-forest/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-forest"
          >
            {t("heroCtaWork")}
          </Link>
        </div>
      </div>
    </div>
  );
}

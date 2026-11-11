import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-5 px-4 py-20 sm:px-6">
      <p className="font-heading text-6xl font-semibold tracking-tight text-muted-foreground">
        404
      </p>
      <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
        {t("title")}
      </h1>
      <p className="text-base leading-relaxed text-muted-foreground">
        {t("description")}
      </p>
      <Link
        href="/"
        className="inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {t("home")}
      </Link>
    </div>
  );
}

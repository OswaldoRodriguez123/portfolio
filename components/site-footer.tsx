import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:px-6">
        <p>
          © Oswaldo Rodríguez. {t("rights")}
        </p>
        <p className="font-heading font-medium text-foreground">{t("role")}</p>
      </div>
    </footer>
  );
}

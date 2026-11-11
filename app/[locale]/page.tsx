import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { HomeContent } from "@/components/home-content";
import { isLocale, routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <HomeContent locale={locale} />;
}

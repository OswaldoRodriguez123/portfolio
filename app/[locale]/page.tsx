import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeContent } from "@/components/home-content";
import { buildMetadata } from "@/lib/seo";
import { isLocale, routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "meta" });

  return buildMetadata({
    locale,
    absoluteTitle: t("title"),
    description: t("description"),
    path: "/",
  });
}

export default async function HomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <ViewTransition enter="auto" exit="auto" default="none">
      <div>
        <HomeContent locale={locale} />
      </div>
    </ViewTransition>
  );
}

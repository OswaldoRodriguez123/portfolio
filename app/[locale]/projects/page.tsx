import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsIndex } from "@/components/projects-index";
import { buildMetadata } from "@/lib/seo";
import { isLocale, routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "projects" });

  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/projects",
  });
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <ViewTransition enter="auto" exit="auto" default="none">
      <div>
        <ProjectsIndex locale={locale} />
      </div>
    </ViewTransition>
  );
}

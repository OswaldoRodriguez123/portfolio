import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CaseStudy } from "@/components/case-study";
import { getProject } from "@/lib/content";
import { projects } from "@/content/projects";
import { isLocale, routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const project = getProject(slug, locale);
  if (!project) {
    notFound();
  }

  return {
    title: project.content.title,
    description: project.content.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const project = getProject(slug, locale);
  if (!project) {
    notFound();
  }

  return <CaseStudy project={project} locale={locale} />;
}

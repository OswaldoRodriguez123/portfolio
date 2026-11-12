import type { Metadata, MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://oswaldorodriguez.is-a.dev"
).replace(/\/+$/, "");

export const siteTitle = `${site.name} — AI and Full-stack Engineer`;

export const siteDescription =
  "AI and full-stack engineer in Santiago, Chile. Ten years building production web systems and applied AI: TypeScript, PHP, AWS, React and LLM services, with Zumba as a client since 2023.";

const STATIC_ROUTES = ["", "/projects"] as const;

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${siteUrl}/${locale}${route}`,
        changeFrequency: route === "" ? "monthly" : "weekly",
        priority: route === "" ? 1 : 0.8,
      });
    }
    for (const project of projects) {
      entries.push({
        url: `${siteUrl}/${locale}/projects/${project.slug}`,
        changeFrequency: "yearly",
        priority: 0.7,
      });
    }
  }

  return entries;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "AI and Full-stack Engineer",
    url: siteUrl,
    sameAs: [site.github, site.linkedin],
    worksFor: {
      "@type": "Organization",
      name: "Paretisa",
    },
    knowsAbout: [
      "TypeScript",
      "PHP",
      "React",
      "Next.js",
      "REST APIs",
      "PostgreSQL",
      "LLM",
      "RAG and embeddings",
      "OpenAI",
      "AWS",
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    url: siteUrl,
  };
}

export function buildMetadata({
  locale,
  title,
  absoluteTitle,
  description,
  path,
}: {
  locale: string;
  title?: string;
  absoluteTitle?: string;
  description: string;
  path: string;
}): Metadata {
  const normalizedPath = path === "/" ? "" : path;
  const urlFor = (l: string) => `${siteUrl}/${l}${normalizedPath}`;
  const canonical = urlFor(locale);
  const ogTitle = absoluteTitle ?? title ?? siteTitle;

  return {
    ...(absoluteTitle
      ? { title: { absolute: absoluteTitle } }
      : title
        ? { title }
        : {}),
    description,
    alternates: {
      canonical,
      languages: {
        en: urlFor("en"),
        es: urlFor("es"),
        "x-default": urlFor("en"),
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === "es" ? "es_CL" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

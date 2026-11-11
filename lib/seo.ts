import type { Metadata, MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://oswaldorodriguez.vercel.app"
).replace(/\/+$/, "");

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
    jobTitle: "AI & Full-stack Engineer",
    url: siteUrl,
    sameAs: [
      "https://github.com/OswaldoRodriguez123",
      // TODO(linkedin): add LinkedIn profile URL once the user provides it
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — AI & Full-stack Engineer`,
    url: siteUrl,
  };
}

export function buildMetadata({
  locale,
  title,
  description,
  path,
}: {
  locale: string;
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const normalizedPath = path === "/" ? "" : path;
  const urlFor = (l: string) => `${siteUrl}/${l}${normalizedPath}`;
  const canonical = urlFor(locale);
  const ogTitle = title ?? `${site.name} — AI & Full-stack Engineer`;

  return {
    ...(title ? { title } : {}),
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

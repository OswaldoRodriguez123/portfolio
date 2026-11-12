export type Locale = "en" | "es";

export type LocalizedContent = {
  title: string;
  tagline: string;
  role: string;
  problem: string[];
  approach: { title: string; body: string[] }[];
  results: string[];
};

export type Project = {
  slug: string;
  year: number;
  stack: string[];
  links: { live?: string; repo?: string; repoUi?: string };
  featured: boolean;
  cover?: string;
  en: LocalizedContent;
  es: LocalizedContent;
};

export type ProjectView = Project & { content: LocalizedContent };

export type WorkEntry = {
  company: string;
  /** End client, when the company is a consultancy. */
  client?: string;
  role: string;
  period: string;
  location?: string;
  summary?: Record<Locale, string>;
  highlights?: Record<Locale, string[]>;
};

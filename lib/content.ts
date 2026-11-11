import { projects } from "@/content/projects";
import { work } from "@/content/work";
import type { Locale, Project, ProjectView, WorkEntry } from "@/content/types";

function toView(project: Project, locale: Locale): ProjectView {
  return { ...project, content: project[locale] };
}

export function getAllProjects(locale: Locale): ProjectView[] {
  return [...projects]
    .sort((a, b) => b.year - a.year)
    .map((project) => toView(project, locale));
}

export function getProject(slug: string, locale: Locale): ProjectView | null {
  const project = projects.find((candidate) => candidate.slug === slug);
  return project ? toView(project, locale) : null;
}

export function getFeaturedProjects(
  locale: Locale,
  limit = 3,
): ProjectView[] {
  return getAllProjects(locale)
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getWorkEntries(): WorkEntry[] {
  return work;
}

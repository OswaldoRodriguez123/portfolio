import path from "node:path";
import { projects } from "@/content/projects";
import { work } from "@/content/work";
import { applyFacts, loadFacts, repoNameFromUrl } from "@/lib/github";
import type { Locale, Project, ProjectView, WorkEntry } from "@/content/types";

/**
 * Snapshot written by `npm run sync:github` (part of `prebuild`). When it is
 * missing — tests, offline build, or a failed GitHub call — the site renders
 * exactly what is in `content/projects/*`.
 */
const facts = loadFacts(
  process.env.GITHUB_SNAPSHOT ??
    path.join(process.cwd(), "content", "github-snapshot.json"),
);

function withFacts(project: Project): Project {
  const repo = repoNameFromUrl(project.links.repo);
  return applyFacts(project, repo ? facts.get(repo) : undefined);
}

function toView(project: Project, locale: Locale): ProjectView {
  return { ...project, content: project[locale] };
}

export function getAllProjects(locale: Locale): ProjectView[] {
  return projects
    .map(withFacts)
    .sort((a, b) => b.year - a.year)
    .map((project) => toView(project, locale));
}

export function getProject(slug: string, locale: Locale): ProjectView | null {
  const project = projects.find((candidate) => candidate.slug === slug);
  return project ? toView(withFacts(project), locale) : null;
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

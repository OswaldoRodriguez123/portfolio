import type { Project } from "@/content/types";
import { project as psicoYerma } from "./psico-yerma";
import { project as bailoteca } from "./bailoteca";
import { project as mailTriage } from "./mail-triage";
import { project as mapsGlutenRag } from "./maps-gluten-rag";
import { project as arithmeticCalculator } from "./arithmetic-calculator";

const LOCALES = ["en", "es"] as const;
const REQUIRED_STRINGS = ["title", "tagline", "role"] as const;

export function validateProject(project: Project): void {
  const fail = (field: string): never => {
    throw new Error(`Invalid project content: ${project?.slug ?? "unknown"}.${field}`);
  };

  if (!project.slug?.trim()) fail("slug");
  if (!Number.isFinite(project.year)) fail("year");
  if (!Array.isArray(project.stack) || project.stack.length === 0) fail("stack");
  if (project.stack?.some((item) => !item.trim())) fail("stack");

  for (const locale of LOCALES) {
    const content = project[locale];
    if (!content) fail(`${locale}`);

    for (const field of REQUIRED_STRINGS) {
      if (!content[field]?.trim()) fail(`${locale}.${field}`);
    }

    if (
      !Array.isArray(content.problem) ||
      content.problem.length === 0 ||
      content.problem.some((item) => !item.trim())
    ) {
      fail(`${locale}.problem`);
    }

    if (
      !Array.isArray(content.approach) ||
      content.approach.length < 3 ||
      content.approach.some(
        (section) =>
          !section.title?.trim() ||
          !Array.isArray(section.body) ||
          section.body.length === 0 ||
          section.body.some((paragraph) => !paragraph.trim()),
      )
    ) {
      fail(`${locale}.approach`);
    }

    if (
      !Array.isArray(content.results) ||
      content.results.length < 2 ||
      content.results.some((item) => !item.trim())
    ) {
      fail(`${locale}.results`);
    }
  }
}

export const projects: Project[] = [
  psicoYerma,
  bailoteca,
  mailTriage,
  mapsGlutenRag,
  arithmeticCalculator,
];

projects.forEach(validateProject);

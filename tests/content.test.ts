import { describe, expect, it } from "vitest";
import {
  getAllProjects,
  getFeaturedProjects,
  getProject,
  getWorkEntries,
} from "@/lib/content";
import { projects, validateProject } from "@/content/projects";

describe("content", () => {
  it("carga los 5 proyectos", () => {
    expect(getAllProjects("en")).toHaveLength(5);
  });

  it("ordena por año descendente", () => {
    const years = getAllProjects("en").map((p) => p.year);
    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it("devuelve el contenido del locale pedido", () => {
    expect(getProject("psico-yerma", "es")?.content.title).not.toBe(
      getProject("psico-yerma", "en")?.content.title,
    );
  });

  it("devuelve null para un slug inexistente", () => {
    expect(getProject("no-existe", "en")).toBeNull();
  });

  it("todos los proyectos tienen ambos locales completos", () => {
    for (const project of projects) {
      for (const locale of ["en", "es"] as const) {
        const c = project[locale];
        expect(c.title.trim(), `${project.slug}.${locale}.title`).not.toBe("");
        expect(c.tagline.trim(), `${project.slug}.${locale}.tagline`).not.toBe("");
        expect(c.problem.length, `${project.slug}.${locale}.problem`).toBeGreaterThan(0);
        expect(c.approach.length, `${project.slug}.${locale}.approach`).toBeGreaterThanOrEqual(3);
        expect(c.results.length, `${project.slug}.${locale}.results`).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("no hay slugs duplicados", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("getFeaturedProjects respeta el límite", () => {
    expect(getFeaturedProjects("en", 3)).toHaveLength(3);
  });

  it("validateProject nombra el archivo y el campo que falta", () => {
    const broken = {
      ...projects[0]!,
      es: { ...projects[0]!.es, tagline: "  " },
    };
    expect(() => validateProject(broken)).toThrow(
      `Invalid project content: ${broken.slug}.es.tagline`,
    );
  });

  it("muestra la trayectoria completa y respeta LinkedIn", () => {
    const entries = getWorkEntries();
    expect(entries).toHaveLength(6);
    expect(entries[0]).toMatchObject({
      company: "Paretisa",
      client: "Zumba",
      role: "Software Engineer Consultant",
    });
    expect(entries.map((entry) => entry.role)).toContain(
      "Semi Senior Financial Software Engineer",
    );
    expect(entries.at(-1)).toMatchObject({
      company: "BIGWISE",
      role: "Junior Software Programmer",
      period: "Aug 2015 — Apr 2016",
    });
  });

  it("no inventa logros para Easy Dance ni BIGWISE", () => {
    const entries = getWorkEntries().filter((entry) =>
      ["Easy Dance", "BIGWISE"].includes(entry.company),
    );
    expect(entries).toHaveLength(2);
    for (const entry of entries) {
      expect(entry.summary).toBeUndefined();
      expect(entry.highlights ?? []).toHaveLength(0);
    }
  });
});

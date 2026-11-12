import { describe, expect, it } from "vitest";
import { getAllProjects, getFeaturedProjects, getProject } from "@/lib/content";
import { projects, validateProject } from "@/content/projects";

describe("content", () => {
  it("carga los 6 proyectos", () => {
    expect(getAllProjects("en")).toHaveLength(6);
  });

  it("el proyecto privado no enlaza repos ni demos", () => {
    const scaffold = projects.find((project) => project.slug === "private-work-scaffold");
    expect(scaffold, "falta content/projects/private-work-scaffold.ts").toBeDefined();

    expect(scaffold?.links.repo).toBeUndefined();
    expect(scaffold?.links.live).toBeUndefined();
    expect(scaffold?.links.repoUi).toBeUndefined();
    expect(scaffold?.cover).toBeUndefined();
    expect(scaffold?.featured).toBe(false);
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
});

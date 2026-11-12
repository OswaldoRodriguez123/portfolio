import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectsIndex } from "@/components/projects-index";
import { renderWithIntl } from "./render";

describe("ProjectsIndex", () => {
  it("renderiza los 5 proyectos con enlace al case study", () => {
    renderWithIntl(<ProjectsIndex locale="en" />);
    expect(screen.getAllByRole("article")).toHaveLength(5);
    expect(screen.getByRole("link", { name: /psico-yerma/i })).toHaveAttribute(
      "href",
      "/en/projects/psico-yerma",
    );
  });

  it("un proyecto sin cover muestra un placeholder tipográfico con su título", () => {
    const { container } = renderWithIntl(<ProjectsIndex locale="en" />);
    const row = container
      .querySelector('a[href="/en/projects/maps-gluten-rag"]')
      ?.closest("article");
    expect(row).toBeTruthy();
    expect(row!.querySelector("img")).toBeNull();
    // The placeholder is a visible typographic block (title), not initials hidden from AT.
    expect(row!.querySelector('[aria-hidden="true"]')).toBeNull();
    const title = "maps-gluten-rag — Maps list to RAG";
    expect(row!.textContent!.split(title)).toHaveLength(3);
    expect(row!.textContent).not.toMatch(/MGR/);
  });

  it("un proyecto con cover renderiza la imagen con el título como alt", () => {
    const { container } = renderWithIntl(<ProjectsIndex locale="en" />);
    const row = container
      .querySelector('a[href="/en/projects/psico-yerma"]')
      ?.closest("article");
    expect(row).toBeTruthy();
    const img = row!.querySelector("img");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("src", "/projects/psico-yerma.webp");
    expect(img!.getAttribute("alt")).toMatch(/psico-yerma/i);
  });

  it("solo enlaza live y repo cuando la URL existe", () => {
    const { container } = renderWithIntl(<ProjectsIndex locale="en" />);
    const withBoth = container
      .querySelector('a[href="/en/projects/bailoteca"]')
      ?.closest("article");
    expect(withBoth!.querySelectorAll("a[target='_blank']")).toHaveLength(2);

    const repoOnly = container
      .querySelector('a[href="/en/projects/mail-triage"]')
      ?.closest("article");
    const external = repoOnly!.querySelectorAll("a[target='_blank']");
    expect(external).toHaveLength(1);
    expect(external[0]).toHaveAttribute("href", expect.stringMatching(/github\.com/));
    expect(repoOnly!.textContent).not.toMatch(/\bLive\b/);
  });
});

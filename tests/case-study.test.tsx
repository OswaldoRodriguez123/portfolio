import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getProject } from "@/lib/content";
import { CaseStudy } from "@/components/case-study";
import { renderWithIntl } from "./render";

describe("CaseStudy", () => {
  const project = getProject("psico-yerma", "en")!;

  it("renderiza el encabezado con título, tagline, año y rol", () => {
    renderWithIntl(<CaseStudy project={project} locale="en" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/psico-yerma/i);
    expect(screen.getByText(project.content.tagline)).toBeInTheDocument();
    expect(screen.getByText(String(project.year))).toBeInTheDocument();
  });

  it("expone las secciones Problem, Approach y Results", () => {
    renderWithIntl(<CaseStudy project={project} locale="en" />);
    expect(screen.getByRole("heading", { name: /problem/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /approach/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /results/i })).toBeInTheDocument();
  });

  it("enlaza a la demo y al repositorio", () => {
    renderWithIntl(<CaseStudy project={project} locale="en" />);
    expect(screen.getByRole("link", { name: /live/i })).toHaveAttribute(
      "href",
      "https://psico-yerma.vercel.app",
    );
    expect(screen.getByRole("link", { name: /code/i })).toHaveAttribute(
      "href",
      "https://github.com/OswaldoRodriguez123/psico-yerma",
    );
  });
});

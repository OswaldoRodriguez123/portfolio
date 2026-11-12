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

  it("un proyecto sin cover renderiza el placeholder con iniciales, no un <img>", () => {
    const { container } = renderWithIntl(<ProjectsIndex locale="en" />);

    const withoutCover = container
      .querySelector('a[href="/en/projects/maps-gluten-rag"]')
      ?.closest("article");
    expect(withoutCover).toBeTruthy();
    expect(withoutCover!.querySelector("img")).toBeNull();
    expect(
      withoutCover!.querySelector('[aria-hidden="true"]'),
    ).not.toBeNull();

    const withCover = container
      .querySelector('a[href="/en/projects/psico-yerma"]')
      ?.closest("article");
    expect(withCover).toBeTruthy();
    expect(withCover!.querySelector("img")).not.toBeNull();
  });
});

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeContent } from "@/components/home-content";
import { renderWithIntl } from "./render";

describe("HomeContent", () => {
  it("muestra el nombre en el h1 y tres proyectos destacados", () => {
    renderWithIntl(<HomeContent locale="en" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/oswaldo/i);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("enlaza a todos los proyectos y a mailto", () => {
    renderWithIntl(<HomeContent locale="en" />);
    expect(screen.getByRole("link", { name: /view all projects/i })).toHaveAttribute(
      "href",
      "/en/projects",
    );
    const emailLinks = screen.getAllByRole("link", { name: /email/i });
    expect(emailLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of emailLinks) {
      expect(link.getAttribute("href")).toMatch(/^mailto:/);
    }
  });

  it("renderiza las secciones about y contact con sus anchors", () => {
    const { container } = renderWithIntl(<HomeContent locale="en" />);
    expect(container.querySelector("#about")).not.toBeNull();
    expect(container.querySelector("#contact")).not.toBeNull();
  });
});

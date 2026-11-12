import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site-header";
import { renderWithIntl } from "./render";

describe("SiteHeader", () => {
  it("expone navegación principal accesible", () => {
    renderWithIntl(<SiteHeader />);
    expect(screen.getByRole("navigation", { name: /main/i })).toBeInTheDocument();
    // el mock de @/i18n/navigation concatena "/en" + href tal cual → "/en/#work"
    expect(screen.getByRole("link", { name: /work/i })).toHaveAttribute("href", "/en/#work");
    expect(screen.getByRole("link", { name: /projects/i })).toHaveAttribute("href", "/en/#projects");
    expect(screen.getByRole("link", { name: /stack/i })).toHaveAttribute("href", "/en/#stack");
    expect(screen.getByRole("link", { name: /email/i }).getAttribute("href")).toMatch(/^mailto:/);
  });

  it("ordena trabajo antes que proyectos, como la home", () => {
    renderWithIntl(<SiteHeader />);
    const work = screen.getByRole("link", { name: /^work$/i });
    const projects = screen.getByRole("link", { name: /^projects$/i });
    expect(
      work.compareDocumentPosition(projects) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("lleva el email en el menú móvil", () => {
    renderWithIntl(<SiteHeader />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const email = screen
      .getAllByRole("link", { name: /email/i })
      .find((link) => link.closest("nav[aria-label='Menu']"));
    expect(email?.getAttribute("href")).toMatch(/^mailto:/);
  });

  it("incluye un enlace para saltar al contenido", () => {
    renderWithIntl(<SiteHeader />);
    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute("href", "#main");
  });
});

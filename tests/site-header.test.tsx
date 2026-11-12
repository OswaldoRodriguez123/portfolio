import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site-header";
import { renderWithIntl } from "./render";

describe("SiteHeader", () => {
  it("expone navegación principal accesible", () => {
    renderWithIntl(<SiteHeader />);
    expect(screen.getByRole("navigation", { name: /main/i })).toBeInTheDocument();
    // mock de @/i18n/navigation concatena "/en" + href tal cual → "/en/#featured"
    expect(screen.getByRole("link", { name: /projects/i })).toHaveAttribute("href", "/en/#featured");
  });

  it("incluye un enlace para saltar al contenido", () => {
    renderWithIntl(<SiteHeader />);
    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute("href", "#main");
  });
});

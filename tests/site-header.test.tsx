import { screen, within } from "@testing-library/react";
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

  it("traduce el nombre de la navegación principal", () => {
    renderWithIntl(<SiteHeader />, "es");
    expect(
      screen.getByRole("navigation", { name: /navegación principal/i }),
    ).toBeInTheDocument();
  });

  it("ordena trabajo antes que proyectos, como la home", () => {
    renderWithIntl(<SiteHeader />);
    const work = screen.getByRole("link", { name: /^work$/i });
    const projects = screen.getByRole("link", { name: /^projects$/i });
    expect(
      work.compareDocumentPosition(projects) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("engancha el menú móvil al popover nativo y lleva el email dentro", () => {
    renderWithIntl(<SiteHeader />);
    // jsdom no implementa la Popover API, así que aquí se verifica el contrato
    // declarativo; abrir, cerrar y devolver el foco se prueban en
    // e2e/mobile-menu.spec.ts sobre un navegador real.
    const trigger = screen.getByRole("button", { name: /open menu/i });
    const panelId = trigger.getAttribute("popovertarget");
    expect(panelId).toBeTruthy();
    expect(trigger).toHaveAttribute("aria-controls", panelId);

    const panel = document.getElementById(panelId!);
    expect(panel).toHaveAttribute("popover", "auto");
    const email = within(panel!).getByRole("link", { name: /email/i, hidden: true });
    expect(email.getAttribute("href")).toMatch(/^mailto:/);
  });

  it("incluye un enlace para saltar al contenido", () => {
    renderWithIntl(<SiteHeader />);
    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute("href", "#main");
  });
});

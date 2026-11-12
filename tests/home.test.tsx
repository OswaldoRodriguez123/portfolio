import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeContent } from "@/components/home-content";
import { site } from "@/lib/site";
import { renderWithIntl } from "./render";

describe("HomeContent", () => {
  it("abre con el rol, el stack y Zumba; el h1 no es el nombre", () => {
    renderWithIntl(<HomeContent locale="en" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("AI and full-stack engineer");
    expect(h1).not.toHaveTextContent("Oswaldo");
    expect(screen.getByText(/TypeScript, PHP, AWS, React and LLM services/)).toBeInTheDocument();
    expect(screen.getByText(/Since 2023 I build AI products for Zumba through Paretisa/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see the work/i })).toBeInTheDocument();
  });

  it("traduce el rol, el stack y el ahora al español", () => {
    renderWithIntl(<HomeContent locale="es" />, "es");
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Ingeniero de IA y full-stack");
    expect(h1).not.toHaveTextContent("Oswaldo");
    expect(screen.getByText(/TypeScript, PHP, AWS, React y servicios con LLM/)).toBeInTheDocument();
    expect(screen.getByText(/Desde 2023 construyo productos con IA para Zumba a través de Paretisa/)).toBeInTheDocument();
  });

  it("muestra tres proyectos destacados", () => {
    renderWithIntl(<HomeContent locale="en" />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("cada fila muestra problema, resultado y link al case study", () => {
    renderWithIntl(<HomeContent locale="en" />);
    const rows = screen.getAllByRole("article");
    for (const row of rows) {
      expect(row.querySelector("a[href^='/en/projects/']")).not.toBeNull();
    }

    const bailoteca = rows.find((row) =>
      row.querySelector("a[href='/en/projects/bailoteca']"),
    );
    expect(bailoteca).toBeTruthy();
    expect(bailoteca).toHaveTextContent(/bailoteca/i);
    expect(bailoteca).toHaveTextContent(
      /Dance academies in Santiago are scattered across Google Maps/,
    );
    expect(bailoteca).toHaveTextContent(/34 listed at the time of writing/);
    // The two lines are labelled, not distinguished by colour alone (WCAG 1.4.1).
    expect(bailoteca).toHaveTextContent(/Problem:\s*Dance academies in Santiago/);
    expect(bailoteca).toHaveTextContent(/Result:\s*Live in production at bailoteca/);
  });

  it("titula la sección de proyectos como trabajo seleccionado", () => {
    renderWithIntl(<HomeContent locale="en" />);
    expect(
      screen.getByRole("heading", { name: "Selected work" }),
    ).toBeInTheDocument();
  });

  it("enlaza a todos los proyectos y a mailto", () => {
    renderWithIntl(<HomeContent locale="en" />);
    const viewAll = screen.getByRole("link", { name: /view all projects/i });
    expect(viewAll).toHaveAttribute("href", "/en/projects");
    // sin glifos de flecha pegados al texto del link
    expect(viewAll).toHaveTextContent(/^View all projects$/);
    const emailLinks = screen.getAllByRole("link", { name: /email/i });
    expect(emailLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of emailLinks) {
      expect(link.getAttribute("href")).toMatch(/^mailto:/);
    }
  });

  it("lee el trabajo antes que los proyectos y conserva los cinco anchors", () => {
    const { container } = renderWithIntl(<HomeContent locale="en" />);
    const ids = ["work", "projects", "stack", "about", "contact"] as const;
    const nodes = ids.map((id) => container.querySelector(`#${id}`));
    for (const [index, node] of nodes.entries()) {
      expect(node, ids[index]).not.toBeNull();
    }
    for (let i = 0; i < nodes.length - 1; i += 1) {
      expect(
        nodes[i]!.compareDocumentPosition(nodes[i + 1]!) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        `${ids[i]} antes de ${ids[i + 1]}`,
      ).toBeTruthy();
    }
  });

  it("cierra con el email como texto visible y los perfiles", () => {
    renderWithIntl(<HomeContent locale="en" />);
    expect(
      screen.getByText(/Open to full-time and contract roles, remote\. Email is the fastest way to reach me\./),
    ).toBeInTheDocument();
    const email = screen.getByText(site.email);
    expect(email.closest("a")).toHaveAttribute("href", `mailto:${site.email}`);
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", site.linkedin);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", site.github);
  });

  it("traduce el cierre", () => {
    renderWithIntl(<HomeContent locale="es" />, "es");
    expect(
      screen.getByText(/Abierto a roles full-time y por contrato, en remoto\. El email es la vía más rápida\./),
    ).toBeInTheDocument();
  });
});

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeContent } from "@/components/home-content";
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
  });

  it("titula la sección de proyectos como trabajo seleccionado", () => {
    renderWithIntl(<HomeContent locale="en" />);
    expect(
      screen.getByRole("heading", { name: "Selected work" }),
    ).toBeInTheDocument();
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

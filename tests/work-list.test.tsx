import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkList } from "@/components/work-list";
import { renderWithIntl } from "./render";

describe("WorkList", () => {
  it("muestra la consultora y el cliente como cosas distintas", () => {
    renderWithIntl(<WorkList locale="en" />);

    expect(
      screen.getByRole("heading", { name: "Software Engineer Consultant" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Paretisa")).toBeInTheDocument();
    expect(screen.getByText("Client: Zumba")).toBeInTheDocument();
    expect(screen.getByText("2023 — Present")).toBeInTheDocument();
  });

  it("lista las seis etapas de la trayectoria", () => {
    renderWithIntl(<WorkList locale="en" />);

    // Los highlights de una etapa son una lista anidada, así que se cuentan
    // solo las filas del ledger (hijos directos del <ol>).
    const stages = screen
      .getAllByRole("listitem")
      .filter((item) => item.parentElement?.tagName === "OL");

    expect(stages).toHaveLength(6);
    expect(screen.getByText("BIGWISE")).toBeInTheDocument();
  });

  it("traduce la etiqueta del cliente", () => {
    renderWithIntl(<WorkList locale="es" />, "es");

    expect(screen.getByText("Cliente: Zumba")).toBeInTheDocument();
  });
});

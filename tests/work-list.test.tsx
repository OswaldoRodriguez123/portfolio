import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkList } from "@/components/work-list";
import { renderWithIntl } from "./render";

describe("WorkList", () => {
  it("muestra la consultora y el cliente como cosas distintas", () => {
    renderWithIntl(<WorkList locale="en" />);

    expect(
      screen.getByRole("heading", { name: "Software Engineer Consultant · Paretisa" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Client: Zumba")).toBeInTheDocument();
    expect(screen.getByText("2023 — Present")).toBeInTheDocument();
  });

  it("traduce la etiqueta del cliente", () => {
    renderWithIntl(<WorkList locale="es" />, "es");

    expect(screen.getByText("Cliente: Zumba")).toBeInTheDocument();
  });
});

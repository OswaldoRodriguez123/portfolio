import { describe, expect, it } from "vitest";
import { StackList } from "@/components/stack-list";
import { renderWithIntl } from "./render";

function readStack(container: HTMLElement) {
  const terms = Array.from(container.querySelectorAll("dt")).map((dt) => dt.textContent);
  const descriptions = Array.from(container.querySelectorAll("dd")).map(
    (dd) => dd.textContent,
  );
  return { terms, descriptions, joined: descriptions.join(" | ") };
}

describe("StackList", () => {
  it("incluye el stack real de Zumba y el trabajo pre-Zumba", () => {
    const { container } = renderWithIntl(<StackList />);
    const { joined } = readStack(container);

    expect(joined).toContain("PHP");
    expect(joined).toContain("MySQL");
    expect(joined).toContain("AWS CDK");
    expect(joined).toContain("MCP");
  });

  it("agrupa el stack en cinco grupos con sus etiquetas", () => {
    const { container } = renderWithIntl(<StackList />);
    const { terms, descriptions } = readStack(container);

    expect(descriptions).toHaveLength(5);
    expect(terms).toEqual([
      "Languages",
      "Frontend",
      "Backend and data",
      "AI and LLM",
      "Cloud and practices",
    ]);
  });

  it("traduce las etiquetas al español", () => {
    const { container } = renderWithIntl(<StackList />, "es");
    const { terms } = readStack(container);

    expect(terms).toEqual([
      "Lenguajes",
      "Frontend",
      "Backend y datos",
      "IA y LLM",
      "Cloud y prácticas",
    ]);
  });

  it("renderiza el stack como texto, no como chips", () => {
    const { container } = renderWithIntl(<StackList />);
    const { descriptions } = readStack(container);

    expect(container.querySelectorAll(".rounded-md, .rounded-xl, .bg-muted")).toHaveLength(0);
    expect(descriptions[0]).toBe("PHP, TypeScript, Node.js, Python, SQL");
  });
});

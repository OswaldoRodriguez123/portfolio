import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectRow } from "@/components/project-row";
import { getProject } from "@/lib/content";
import { renderWithIntl } from "./render";

/**
 * In a build with a GitHub snapshot (`lib/github.ts` → `applyFacts`), every
 * repo without a hand-made cover gets `https://opengraph.githubassets.com/1/
 * <full_name>`: a 1200×600 auto-generated name plate. `tests/setup.ts` points
 * `GITHUB_SNAPSHOT` at a missing file on purpose, so the content layer never
 * injects that cover in the suite — these tests pass it to the row directly.
 */
const GITHUB_CARD =
  "https://opengraph.githubassets.com/1/OswaldoRodriguez123/mail-triage";

describe("ProjectRow", () => {
  it("ignores GitHub's auto-generated social card and shows the typographic block", () => {
    const base = getProject("mail-triage", "en");
    expect(base).not.toBeNull();
    const project = { ...base!, cover: GITHUB_CARD };
    const title = project.content.title;

    const { container } = renderWithIntl(
      <ProjectRow project={project} locale="en" />,
    );
    const row = container.querySelector("article");
    expect(row).not.toBeNull();

    // (a) No image: the name plate crops into a fragment inside the 4:3 box.
    expect(row!.querySelector("img")).toBeNull();
    expect(row!.innerHTML).not.toContain("opengraph.githubassets.com");

    // (b) The intended fallback is a visible typographic block carrying the
    // year: it adds information instead of repeating the heading below it.
    const block = row!.querySelector("div.aspect-\\[4\\/3\\]");
    expect(block).not.toBeNull();
    expect(block!.textContent!.trim()).toBe(String(project.year));
    const heading = row!.querySelector("h3");
    expect(heading).not.toBeNull();
    expect(block!.textContent).not.toBe(heading!.textContent);
    // Title appears once: the heading only.
    expect(row!.textContent!.split(title)).toHaveLength(2);

    // (c) Navigation survives.
    expect(
      screen.getByRole("link", { name: title }),
    ).toHaveAttribute("href", "/en/projects/mail-triage");
    const repoLink = screen.getByRole("link", {
      name: /^Code \(Opens in a new tab\)$/,
    });
    expect(repoLink).toHaveAttribute(
      "href",
      "https://github.com/OswaldoRodriguez123/mail-triage",
    );
  });

  it("still renders a hand-made cover as an image", () => {
    const base = getProject("psico-yerma", "en");
    expect(base).not.toBeNull();
    const project = { ...base!, cover: "/projects/psico-yerma.webp" };

    const { container } = renderWithIntl(
      <ProjectRow project={project} locale="en" />,
    );
    const row = container.querySelector("article");
    const img = row!.querySelector("img");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("src", "/projects/psico-yerma.webp");
    expect(row!.querySelector("div.aspect-\\[4\\/3\\]")).toBeNull();
  });
});

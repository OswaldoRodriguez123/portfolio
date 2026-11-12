import { describe, expect, it } from "vitest";
import { getSitemapEntries, personJsonLd } from "@/lib/seo";

describe("seo", () => {
  it("el sitemap incluye ambos locales y los case studies", () => {
    const urls = getSitemapEntries().map((e) => e.url);
    expect(urls).toContain("https://oswaldorodriguez.is-a.dev/en");
    expect(urls).toContain(
      "https://oswaldorodriguez.is-a.dev/es/projects/psico-yerma",
    );
  });

  it("el JSON-LD describe a una Person con sameAs", () => {
    const ld = personJsonLd() as Record<string, unknown>;
    expect(ld["@type"]).toBe("Person");
    expect(ld.sameAs).toContain("https://github.com/OswaldoRodriguez123");
  });
});

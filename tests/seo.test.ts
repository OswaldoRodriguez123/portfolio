import { describe, expect, it } from "vitest";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import {
  buildMetadata,
  getSitemapEntries,
  personJsonLd,
  siteDescription,
} from "@/lib/seo";

const EN_DESCRIPTION =
  "AI and full-stack engineer in Santiago, Chile. Ten years building production web systems and applied AI: TypeScript, PHP, AWS, React and LLM services, with Zumba as a client since 2023.";
const ES_DESCRIPTION =
  "Ingeniero de IA y full-stack en Santiago de Chile. Diez años construyendo sistemas web en producción e IA aplicada: TypeScript, PHP, AWS, React y servicios con LLM, con Zumba como cliente desde 2023.";

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

  it("el JSON-LD nombra al empleador y el stack", () => {
    const ld = personJsonLd() as {
      worksFor: { "@type": string; name: string };
      knowsAbout: string[];
    };
    expect(ld.worksFor).toEqual({ "@type": "Organization", name: "Paretisa" });
    for (const skill of ["TypeScript", "PHP", "AWS", "LLM"]) {
      expect(ld.knowsAbout).toContain(skill);
    }
  });

  it("los metadatos en inglés anuncian el rol y el stack", () => {
    const metadata = buildMetadata({
      locale: "en",
      description: en.meta.description,
      path: "/",
    });
    expect(metadata.openGraph?.title).toContain("AI and Full-stack Engineer");
    expect(metadata.openGraph?.description).toBe(EN_DESCRIPTION);
    expect(en.meta.description).toBe(EN_DESCRIPTION);
    expect(siteDescription).toBe(EN_DESCRIPTION);
  });

  it("los metadatos en español usan la descripción en español", () => {
    const metadata = buildMetadata({
      locale: "es",
      description: es.meta.description,
      path: "/",
    });
    expect(metadata.openGraph?.description).toBe(ES_DESCRIPTION);
    expect(es.meta.description).toBe(ES_DESCRIPTION);
  });

  it("el título absoluto localiza la home sin duplicar el nombre", () => {
    const spanish = buildMetadata({
      locale: "es",
      absoluteTitle: es.meta.title,
      description: es.meta.description,
      path: "/",
    });
    expect(spanish.title).toEqual({ absolute: es.meta.title });
    expect(spanish.openGraph?.title).toBe(es.meta.title);
    expect(spanish.twitter?.title).toBe(es.meta.title);
    expect(es.meta.title).toContain("Ingeniero de IA");

    const english = buildMetadata({
      locale: "en",
      absoluteTitle: en.meta.title,
      description: en.meta.description,
      path: "/",
    });
    expect(english.title).toEqual({ absolute: en.meta.title });
    expect(english.openGraph?.title).toBe(en.meta.title);
    expect(en.meta.title).toContain("AI and Full-stack Engineer");
  });
});

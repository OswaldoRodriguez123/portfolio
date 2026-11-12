import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  applyFacts,
  factsFromRepos,
  loadFacts,
  parseSnapshot,
  repoNameFromUrl,
  type GithubRepo,
} from "@/lib/github";
import { projects } from "@/content/projects";

const repo = (over: Partial<GithubRepo> = {}): GithubRepo => ({
  name: "bailoteca",
  full_name: "OswaldoRodriguez123/bailoteca",
  fork: false,
  archived: false,
  topics: [],
  homepage: null,
  html_url: "https://github.com/OswaldoRodriguez123/bailoteca",
  ...over,
});

const bailoteca = projects.find((project) => project.slug === "bailoteca")!;

describe("factsFromRepos", () => {
  it("ignora forks y repos archivados", () => {
    const facts = factsFromRepos([
      repo(),
      repo({ name: "register", fork: true }),
      repo({ name: "viejo", archived: true }),
    ]);

    expect([...facts.keys()]).toEqual(["bailoteca"]);
  });

  it("ignora repos privados", () => {
    const facts = factsFromRepos([
      repo(),
      repo({ name: "babel-ai", full_name: "OswaldoRodriguez123/babel-ai", private: true }),
    ]);

    expect([...facts.keys()]).toEqual(["bailoteca"]);
  });

  it("convierte los topics en etiquetas legibles", () => {
    const facts = factsFromRepos([
      repo({ topics: ["nextjs", "tailwindcss", "github-actions", "rag"] }),
    ]);

    expect(facts.get("bailoteca")?.stack).toEqual([
      "Next.js",
      "Tailwind CSS",
      "GitHub Actions",
      "RAG",
    ]);
  });

  it("toma el homepage del repo como link en vivo", () => {
    const facts = factsFromRepos([repo({ homepage: "https://bailoteca.vercel.app" })]);

    expect(facts.get("bailoteca")?.liveUrl).toBe("https://bailoteca.vercel.app");
  });

  it("no inventa un link en vivo cuando el homepage está vacío", () => {
    const facts = factsFromRepos([repo({ homepage: "" })]);

    expect(facts.get("bailoteca")?.liveUrl).toBeUndefined();
  });

  it("deriva la portada del Open Graph de GitHub", () => {
    const facts = factsFromRepos([repo()]);

    expect(facts.get("bailoteca")?.cover).toBe(
      "https://opengraph.githubassets.com/1/OswaldoRodriguez123/bailoteca",
    );
  });
});

describe("applyFacts", () => {
  it("mantiene el stack local y añade los topics que faltan", () => {
    const facts = factsFromRepos([
      repo({ topics: ["fastapi", "docker", "supabase"] }),
    ]).get("bailoteca");

    const merged = applyFacts(bailoteca, facts);

    expect(merged.stack).toEqual([
      "Python",
      "FastAPI",
      "Angular",
      "PostgreSQL",
      "Supabase",
      "Pydantic",
      "GitHub Actions",
      "Docker",
    ]);
  });

  it("respeta el tope de 8 etiquetas", () => {
    const facts = factsFromRepos([
      repo({
        topics: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
      }),
    ]).get("bailoteca");

    expect(applyFacts(bailoteca, facts).stack.length).toBe(8);
  });

  it("prefiere el link en vivo local aunque GitHub tenga otro", () => {
    const facts = factsFromRepos([
      repo({ homepage: "https://portfolio-delta-gules-66.vercel.app" }),
    ]).get("bailoteca");

    expect(applyFacts(bailoteca, facts).links.live).toBe("https://bailoteca.vercel.app");
  });

  it("rellena el link en vivo y la portada cuando el proyecto no los tiene", () => {
    const mailTriage = projects.find((project) => project.slug === "mail-triage")!;
    const facts = factsFromRepos([
      repo({
        name: "mail-triage",
        full_name: "OswaldoRodriguez123/mail-triage",
        homepage: "https://mail-triage.vercel.app",
        html_url: "https://github.com/OswaldoRodriguez123/mail-triage",
      }),
    ]).get("mail-triage");

    const merged = applyFacts(mailTriage, facts);

    expect(merged.links.live).toBe("https://mail-triage.vercel.app");
    expect(merged.cover).toBe(
      "https://opengraph.githubassets.com/1/OswaldoRodriguez123/mail-triage",
    );
  });

  it("devuelve el proyecto intacto si GitHub no tiene datos del repo", () => {
    expect(applyFacts(bailoteca, undefined)).toEqual(bailoteca);
  });

  it("no cambia un repo que ya tiene portada propia", () => {
    const facts = factsFromRepos([repo()]).get("bailoteca");

    expect(applyFacts(bailoteca, facts).cover).toBe("/projects/bailoteca.webp");
  });
});

describe("parseSnapshot", () => {
  it("lee un snapshot válido", () => {
    const facts = parseSnapshot(
      JSON.stringify({ fetchedAt: "2026-11-12T00:00:00Z", repos: [repo({ topics: ["rag"] })] }),
    );

    expect(facts.get("bailoteca")?.stack).toEqual(["RAG"]);
  });

  it("devuelve un mapa vacío si el JSON está roto", () => {
    expect(parseSnapshot("{no es json").size).toBe(0);
  });

  it("devuelve un mapa vacío si el snapshot no trae repos", () => {
    expect(parseSnapshot(JSON.stringify({ fetchedAt: "" })).size).toBe(0);
  });
});

describe("repoNameFromUrl", () => {
  it("saca el nombre del repo a partir del link de GitHub", () => {
    expect(repoNameFromUrl("https://github.com/OswaldoRodriguez123/bailoteca")).toBe(
      "bailoteca",
    );
  });

  it("tolera una barra final", () => {
    expect(repoNameFromUrl("https://github.com/OswaldoRodriguez123/bailoteca/")).toBe(
      "bailoteca",
    );
  });

  it("devuelve undefined si no hay link", () => {
    expect(repoNameFromUrl(undefined)).toBeUndefined();
  });

  it("devuelve undefined si el link no es una URL válida", () => {
    expect(repoNameFromUrl("oswaldorodriguez.is-a.dev")).toBeUndefined();
  });
});

describe("loadFacts", () => {
  it("lee el snapshot desde disco", () => {
    const dir = mkdtempSync(join(tmpdir(), "github-facts-"));
    const file = join(dir, "github-snapshot.json");
    writeFileSync(file, JSON.stringify({ repos: [repo({ topics: ["rag"] })] }));

    expect(loadFacts(file).get("bailoteca")?.stack).toEqual(["RAG"]);
  });

  it("devuelve un mapa vacío si el archivo no existe", () => {
    expect(loadFacts(join(tmpdir(), "no-existe-github-snapshot.json")).size).toBe(0);
  });
});

describe("content con snapshot de GitHub", () => {
  async function loadContent(topics: string[]) {
    const dir = mkdtempSync(join(tmpdir(), "github-content-"));
    const file = join(dir, "github-snapshot.json");
    writeFileSync(file, JSON.stringify({ repos: [repo({ topics })] }));
    const previous = process.env.GITHUB_SNAPSHOT;
    process.env.GITHUB_SNAPSHOT = file;

    try {
      vi.resetModules();
      return await import("@/lib/content");
    } finally {
      if (previous === undefined) delete process.env.GITHUB_SNAPSHOT;
      else process.env.GITHUB_SNAPSHOT = previous;
    }
  }

  it("enriquece el stack del proyecto con los topics del repo", async () => {
    const { getAllProjects } = await loadContent(["docker"]);
    const bailoteca = getAllProjects("en").find((project) => project.slug === "bailoteca");

    expect(bailoteca?.stack).toContain("Docker");
  });

  it("getProject también recibe los datos del repo", async () => {
    const { getProject } = await loadContent(["docker"]);

    expect(getProject("bailoteca", "en")?.stack).toContain("Docker");
  });
});

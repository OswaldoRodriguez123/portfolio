import type { Project } from "@/content/types";

export const project: Project = {
  slug: "bailoteca",
  year: 2026,
  stack: [
    "Python",
    "FastAPI",
    "Angular",
    "PostgreSQL",
    "Supabase",
    "Pydantic",
    "GitHub Actions",
  ],
  links: {
    live: "https://bailoteca.vercel.app",
    repo: "https://github.com/OswaldoRodriguez123/bailoteca",
  },
  featured: true,
  en: {
    title: "Bailoteca — Dance school directory",
    tagline: "TODO(copy): Dance school directory for Santiago de Chile",
    role: "Solo developer — data pipeline, API and web app",
    problem: [
      "TODO(copy): The problem this project solves, in 2-3 sentences.",
    ],
    approach: [
      {
        title: "TODO(copy): Pipeline",
        body: ["TODO(copy): Describe the discover → filter → enrich → classify approach."],
      },
      {
        title: "TODO(copy): Human-in-the-loop publishing",
        body: ["TODO(copy): Explain the CLI-approval model and RLS-backed Postgres schema."],
      },
      {
        title: "TODO(copy): API and web",
        body: ["TODO(copy): Read-only FastAPI and the Angular SPA on top of the shared schema."],
      },
    ],
    results: [
      "TODO(copy): Real, verifiable outcome #1.",
      "TODO(copy): Real, verifiable outcome #2.",
    ],
  },
  es: {
    title: "Bailoteca — Directorio de escuelas de baile",
    tagline: "TODO(copy): Directorio de escuelas de baile en Santiago de Chile",
    role: "Desarrollo completo — pipeline de datos, API y web",
    problem: [
      "TODO(copy): El problema que resuelve este proyecto, en 2-3 frases.",
    ],
    approach: [
      {
        title: "TODO(copy): Pipeline",
        body: ["TODO(copy): Describir el enfoque discover → filter → enrich → classify."],
      },
      {
        title: "TODO(copy): Publicación con aprobación humana",
        body: ["TODO(copy): Explicar el modelo de aprobación vía CLI y el esquema Postgres con RLS."],
      },
      {
        title: "TODO(copy): API y web",
        body: ["TODO(copy): FastAPI de solo lectura y SPA en Angular sobre el esquema compartido."],
      },
    ],
    results: [
      "TODO(copy): Resultado real y verificable #1.",
      "TODO(copy): Resultado real y verificable #2.",
    ],
  },
};

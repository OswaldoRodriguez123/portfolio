import type { Project } from "@/content/types";

export const project: Project = {
  slug: "maps-gluten-rag",
  year: 2026,
  stack: [
    "Python",
    "Playwright",
    "SQLite",
    "NotebookLM",
    "GitHub Actions",
  ],
  links: {
    repo: "https://github.com/OswaldoRodriguez123/maps-gluten-rag",
  },
  featured: false,
  en: {
    title: "maps-gluten-rag — Places to RAG",
    tagline:
      "TODO(copy): Turns a shared Google Maps list of gluten-free places into RAG-ready files",
    role: "Solo developer — scraper and data pipeline",
    problem: [
      "TODO(copy): The problem this project solves, in 2-3 sentences.",
    ],
    approach: [
      {
        title: "TODO(copy): Robust extraction",
        body: ["TODO(copy): Playwright + the internal entitylist endpoint, with a DOM-row fallback if the endpoint changes."],
      },
      {
        title: "TODO(copy): RAG-ready output",
        body: ["TODO(copy): One markdown block per place plus JSONL for embeddings and menus, ready for NotebookLM or any semantic index."],
      },
      {
        title: "TODO(copy): Weekly automation",
        body: ["TODO(copy): GitHub Actions cron with the SQLite state in the workflow cache; upsert semantics keep saved_on dates."],
      },
    ],
    results: [
      "TODO(copy): Real, verifiable outcome #1.",
      "TODO(copy): Real, verifiable outcome #2.",
    ],
  },
  es: {
    title: "maps-gluten-rag — Lugares a RAG",
    tagline:
      "TODO(copy): Convierte una lista de Google Maps de lugares sin gluten en archivos listos para RAG",
    role: "Desarrollo completo — scraper y pipeline de datos",
    problem: [
      "TODO(copy): El problema que resuelve este proyecto, en 2-3 frases.",
    ],
    approach: [
      {
        title: "TODO(copy): Extracción robusta",
        body: ["TODO(copy): Playwright + el endpoint interno entitylist, con fallback a las filas del DOM si cambia el endpoint."],
      },
      {
        title: "TODO(copy): Salida lista para RAG",
        body: ["TODO(copy): Un bloque markdown por lugar más JSONL para embeddings y cartas, listo para NotebookLM o cualquier índice semántico."],
      },
      {
        title: "TODO(copy): Automatización semanal",
        body: ["TODO(copy): GitHub Actions con cron y el estado SQLite en el cache del workflow; upsert que conserva saved_on."],
      },
    ],
    results: [
      "TODO(copy): Resultado real y verificable #1.",
      "TODO(copy): Resultado real y verificable #2.",
    ],
  },
};

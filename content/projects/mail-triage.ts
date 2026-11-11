import type { Project } from "@/content/types";

export const project: Project = {
  slug: "mail-triage",
  year: 2026,
  stack: [
    "Python",
    "Microsoft Graph",
    "SQLite",
    "OpenCode",
    "Keychain",
  ],
  links: {
    repo: "https://github.com/OswaldoRodriguez123/mail-triage",
  },
  featured: true,
  en: {
    title: "mail-triage — Junk mail triage CLI",
    tagline: "TODO(copy): Local CLI that sorts junk mail into DELETE, RESCUE or REVIEW",
    role: "Solo developer — CLI, classifier and OpenCode skill",
    problem: [
      "TODO(copy): The problem this project solves, in 2-3 sentences.",
    ],
    approach: [
      {
        title: "TODO(copy): Local-first design",
        body: ["TODO(copy): Python stdlib + SQLite + Keychain; nothing leaves the machine."],
      },
      {
        title: "TODO(copy): Classifier with reasons",
        body: ["TODO(copy): Impersonation/phishing detection with an explicit reason per message; legit mail rescued to the Inbox."],
      },
      {
        title: "TODO(copy): Human-in-the-loop",
        body: ["TODO(copy): Explicit confirmation before anything moves; undo; learns from corrections with automatic rules after three matches."],
      },
    ],
    results: [
      "TODO(copy): Real, verifiable outcome #1.",
      "TODO(copy): Real, verifiable outcome #2.",
    ],
  },
  es: {
    title: "mail-triage — Triaje de correo basura",
    tagline: "TODO(copy): CLI local que ordena el correo basura en BORRAR, RESCATAR o REVISAR",
    role: "Desarrollo completo — CLI, clasificador y skill de OpenCode",
    problem: [
      "TODO(copy): El problema que resuelve este proyecto, en 2-3 frases.",
    ],
    approach: [
      {
        title: "TODO(copy): Diseño local primero",
        body: ["TODO(copy): Python stdlib + SQLite + Keychain; nada sale de la máquina."],
      },
      {
        title: "TODO(copy): Clasificador con razones",
        body: ["TODO(copy): Detección de suplantación/phishing con una razón explícita por mensaje; el correo legítimo se rescata a la bandeja."],
      },
      {
        title: "TODO(copy): Humano en el bucle",
        body: ["TODO(copy): Confirmación explícita antes de mover nada; undo; aprende de correcciones con reglas automáticas tras tres coincidencias."],
      },
    ],
    results: [
      "TODO(copy): Resultado real y verificable #1.",
      "TODO(copy): Resultado real y verificable #2.",
    ],
  },
};

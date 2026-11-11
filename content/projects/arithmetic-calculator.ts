import type { Project } from "@/content/types";

export const project: Project = {
  slug: "arithmetic-calculator",
  year: 2023,
  stack: [
    "Node.js",
    "Express",
    "PostgreSQL",
    "Sequelize",
    "JWT",
    "Vue 3",
    "Vite",
  ],
  links: {
    repo: "https://github.com/OswaldoRodriguez123/arithmetic-calculator-api",
  },
  featured: false,
  en: {
    title: "Arithmetic Calculator — API + UI",
    tagline:
      "TODO(copy): JWT-authenticated calculator API with per-operation credits and a Vue 3 SPA",
    role: "Solo developer — API and frontend",
    problem: [
      "TODO(copy): The problem this project solves, in 2-3 sentences.",
    ],
    approach: [
      {
        title: "TODO(copy): Credit-based API",
        body: ["TODO(copy): Express + Sequelize + JWT; operation catalog with per-operation credit cost, records with pagination, sorting, search and soft delete."],
      },
      {
        title: "TODO(copy): OpenAPI contract",
        body: ["TODO(copy): Full contract in api_services_v1.yml (OpenAPI 3.0); Zod for request validation; bcryptjs for credentials."],
      },
      {
        title: "TODO(copy): Vue 3 SPA",
        body: ["TODO(copy): Vue 3 + Vite + Pinia + PrimeVue + Axios; sign-in, dashboard with balance, records table with sorting/search/soft delete; 401 logs the user out."],
      },
    ],
    results: [
      "TODO(copy): Real, verifiable outcome #1.",
      "TODO(copy): Real, verifiable outcome #2.",
    ],
  },
  es: {
    title: "Arithmetic Calculator — API + UI",
    tagline:
      "TODO(copy): API de calculadora con JWT y créditos por operación, con SPA en Vue 3",
    role: "Desarrollo completo — API y frontend",
    problem: [
      "TODO(copy): El problema que resuelve este proyecto, en 2-3 frases.",
    ],
    approach: [
      {
        title: "TODO(copy): API basada en créditos",
        body: ["TODO(copy): Express + Sequelize + JWT; catálogo de operaciones con costo en créditos por operación, registros con paginación, orden, búsqueda y borrado lógico."],
      },
      {
        title: "TODO(copy): Contrato OpenAPI",
        body: ["TODO(copy): Contrato completo en api_services_v1.yml (OpenAPI 3.0); Zod para validar requests; bcryptjs para credenciales."],
      },
      {
        title: "TODO(copy): SPA en Vue 3",
        body: ["TODO(copy): Vue 3 + Vite + Pinia + PrimeVue + Axios; login, dashboard con saldo, tabla de registros con orden/búsqueda/borrado lógico; un 401 cierra la sesión."],
      },
    ],
    results: [
      "TODO(copy): Resultado real y verificable #1.",
      "TODO(copy): Resultado real y verificable #2.",
    ],
  },
};

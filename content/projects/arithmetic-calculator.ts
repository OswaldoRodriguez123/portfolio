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
    "Zod",
    "Vue 3",
    "Vite",
    "Pinia",
    "PrimeVue",
  ],
  links: {
    repo: "https://github.com/OswaldoRodriguez123/arithmetic-calculator-api",
    repoUi: "https://github.com/OswaldoRodriguez123/arithmetic-calculator-ui",
  },
  featured: false,
  en: {
    title: "Arithmetic Calculator — API + Vue SPA",
    tagline:
      "A JWT-authenticated calculator API with per-operation credits and a Vue 3 SPA on top.",
    role: "Solo developer — API and frontend",
    problem: [
      "Most calculator demos are stateless and never answer the harder question: how do you make a compute service multi-user, metered and auditable? I wanted an exercise that forced the real machinery — auth, per-user accounting and a paper trail — not just arithmetic.",
      "The result is an API where each operation has a credit cost charged against the user's balance, and every computation is stored as a record with full pagination, search and audit history.",
    ],
    approach: [
      {
        title: "Credit-based API, not free compute",
        body: [
          "Express + Sequelize + PostgreSQL. A catalog of operations (addition, subtraction, multiplication, division, square root, random string) each declares a credit cost. Creating a record runs the operation, charges the cost and stores the resulting balance. Records support pagination, sorting, text search and soft delete — because destroying an audit trail is usually the wrong default.",
          "I rejected stateless compute endpoints: they make usage unaccountable by design, which is exactly the problem the exercise was about.",
        ],
      },
      {
        title: "OpenAPI contract first",
        body: [
          "The full contract lives in `api_services_v1.yml` (OpenAPI 3.0). Zod validates every request at the boundary, `bcryptjs` hashes passwords, and JWTs authorize the protected routes. Jest + ts-jest cover the API.",
          "I rejected ad-hoc validation scattered through handlers: with a written contract, the Vue UI can be built against the YAML instead of against implementation details.",
        ],
      },
      {
        title: "Vue 3 SPA against the same contract",
        body: [
          "Vue 3 (Options API) + Vite + Pinia + PrimeVue + Axios. Sign-in stores the JWT locally; a dashboard shows available operations and the balance; a DataTable renders records with pagination, search and soft delete; a 401 response logs the user out and clears the token. Vitest covers the UI.",
          "I rejected putting auth decisions in components: a single Axios interceptor owns the 401 handling, so every screen behaves the same way without knowing about sessions.",
        ],
      },
    ],
    results: [
      "Both halves are public and CI-tested (GitHub Actions): the API (OpenAPI 3.0 contract, Jest) and the Vue SPA (Vitest + @vue/test-utils).",
      "Complete OSS reference for metered, multi-user REST: auth, catalog pricing, immutable-ish audit records and soft delete in one small codebase.",
    ],
  },
  es: {
    title: "Arithmetic Calculator — API + SPA en Vue",
    tagline:
      "Una API de calculadora con JWT y créditos por operación, con una SPA Vue 3 encima.",
    role: "Desarrollo completo — API y frontend",
    problem: [
      "La mayoría de las demos de calculadoras son stateless y nunca responden la pregunta difícil: ¿cómo hacer un servicio de cómputo multiusuario, medido y auditable? Quería un ejercicio que forzara la maquinaria real — autenticación, contabilidad por usuario e historial — no solo aritmética.",
      "El resultado es una API donde cada operación tiene un costo en créditos que se descuenta del saldo del usuario, y cada cálculo queda registrado como un record con paginación, búsqueda e historial completo.",
    ],
    approach: [
      {
        title: "API basada en créditos, no cómputo gratis",
        body: [
          "Express + Sequelize + PostgreSQL. Un catálogo de operaciones (suma, resta, multiplicación, división, raíz cuadrada, string aleatorio) declara el costo en créditos de cada una. Crear un record ejecuta la operación, cobra el costo y guarda el saldo resultante. Los records soportan paginación, orden, búsqueda de texto y borrado lógico — porque destruir una pista de auditoría casi nunca es el default correcto.",
          "Descarté endpoints de cómputo stateless: hacen el uso innombrable e incontable por diseño, exactamente el problema que el ejercicio apuntaba a resolver.",
        ],
      },
      {
        title: "Contrato OpenAPI primero",
        body: [
          "El contrato completo vive en `api_services_v1.yml` (OpenAPI 3.0). Zod valida cada request en el borde, `bcryptjs` hashea las contraseñas y los JWT autorizan las rutas protegidas. Jest + ts-jest cubren la API.",
          "Descarté validación ad hoc repartida en los handlers: con el contrato escrito, la UI Vue se construye contra el YAML y no contra detalles de implementación.",
        ],
      },
      {
        title: "SPA Vue 3 contra el mismo contrato",
        body: [
          "Vue 3 (Options API) + Vite + Pinia + PrimeVue + Axios. El login guarda el JWT localmente; un dashboard muestra las operaciones disponibles y el saldo; un DataTable de PrimeVue renderiza los records con paginación, búsqueda y borrado lógico; una respuesta 401 cierra la sesión y limpia el token. Vitest cubre la UI.",
          "Descarté decisiones de auth dentro de los componentes: un único interceptor de Axios posee el manejo del 401, por lo que todas las pantallas se comportan igual sin saber nada de sesiones.",
        ],
      },
    ],
    results: [
      "Ambas mitades son públicas y con CI (GitHub Actions): la API (contrato OpenAPI 3.0, Jest) y la SPA Vue (Vitest + @vue/test-utils).",
      "Referencia OSS completa de REST medido y multiusuario: auth, precios de catálogo, records de auditoría y borrado lógico en un codebase pequeño.",
    ],
  },
};

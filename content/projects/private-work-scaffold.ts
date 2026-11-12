import type { Project } from "@/content/types";

/**
 * Stand-in for non-public work (employer repos): it describes *how* that work
 * gets documented, not a product. Deliberately linkless — the backing repo is
 * private (`private-work-scaffold`) and must never surface here, which the
 * content test enforces alongside the private-repo filter in lib/github.ts.
 * Replace this entry with a real project when one can be shown safely.
 */
export const project: Project = {
  slug: "private-work-scaffold",
  year: 2026,
  stack: ["Documentation"],
  links: {},
  featured: false,
  en: {
    title: "Private work — documentation scaffold",
    tagline:
      "How non-public projects get documented here: the same case-study structure, without employer or client detail.",
    role: "Solo developer — documentation template",
    problem: [
      "Most of my professional work since 2023 lives in private repositories, so it cannot be linked from a portfolio. Hiding it entirely would undersell it; describing it loosely would invite claims nobody can check.",
      "The compromise is a private repository that mirrors the structure of the public case studies — problem, approach decisions, results — written so it can be walked through in an interview, but never published.",
    ],
    approach: [
      {
        title: "Same shape as the public case studies",
        body: [
          "Every non-public project gets a document with the same sections you see on this site: the problem, the approach as explicit decisions (each stating what was rejected and why) and the results. Writing decisions — not feature lists — is what makes a private project discussable without showing code.",
        ],
      },
      {
        title: "Metrics only when traceable",
        body: [
          "No number enters a private case study unless it can be traced to a log, a dashboard or the repository history itself. Anything not yet measured stays as an explicit placeholder until it is — the same rule this portfolio applies publicly.",
        ],
      },
      {
        title: "Nothing identifiable by default",
        body: [
          "The template starts sanitized: no client names, internal hostnames, secrets or screenshots of internal interfaces. Sanitized-by-default means a slip is a structural mistake that is easy to spot, not a judgment call made under deadline pressure.",
        ],
      },
    ],
    results: [
      "A repeatable format: private work gets documented within days of shipping, with the same review bar as these public pages.",
      "Interview-ready: the private case studies can be presented live, screen by screen, without publishing anything or retro-fitting a document.",
    ],
  },
  es: {
    title: "Trabajo privado — scaffold de documentación",
    tagline:
      "Cómo se documenta aquí el trabajo no público: la misma estructura de case study, sin detalles de empleador ni cliente.",
    role: "Desarrollador solo — plantilla de documentación",
    problem: [
      "La mayor parte de mi trabajo profesional desde 2023 vive en repositorios privados, así que no puede enlazarse desde un portfolio. Ocultarlo del todo lo subventa; describirlo a grandes rasgos invita a afirmaciones que nadie puede comprobar.",
      "El compromiso es un repositorio privado que replica la estructura de los case studies públicos — problema, decisiones de enfoque, resultados — escrito para poder recorrerse en una entrevista, pero sin publicarse nunca.",
    ],
    approach: [
      {
        title: "La misma forma que los case studies públicos",
        body: [
          "Cada proyecto no público recibe un documento con las mismas secciones de este sitio: el problema, el enfoque como decisiones explícitas (cada una diciendo qué se rechazó y por qué) y los resultados. Escribir decisiones — no listas de features — es lo que hace un proyecto privado discutible sin mostrar código.",
        ],
      },
      {
        title: "Métricas solo si son trazables",
        body: [
          "Ningún número entra en un case study privado si no se puede trazar a un log, un dashboard o el historial del repositorio. Lo que aún no está medido queda como placeholder explícito hasta que lo esté — la misma regla que aplica este portfolio en público.",
        ],
      },
      {
        title: "Nada identificable por defecto",
        body: [
          "La plantilla nace saneada: sin nombres de clientes, hostnames internos, secretos ni capturas de interfaces internas. Sanear por defecto convierte un descuido en un error estructural fácil de detectar, no en una decisión tomada bajo presión.",
        ],
      },
    ],
    results: [
      "Un formato repetible: el trabajo privado se documenta días después de salir a producción, con la misma barra de revisión que estas páginas públicas.",
      "Listo para entrevistas: los case studies privados se pueden presentar en vivo, pantalla por pantalla, sin publicar nada ni reconstruir un documento de última hora.",
    ],
  },
};

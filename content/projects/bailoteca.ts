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
  cover: "/projects/bailoteca.webp",
  en: {
    title: "Bailoteca — Dance school directory",
    tagline:
      "A directory of dance academies in Santiago de Chile, fed by a human-in-the-loop data pipeline.",
    role: "Solo developer — data pipeline, API and web app",
    problem: [
      "Dance academies in Santiago are scattered across Google Maps, Instagram and word of mouth. Anyone searching 'salsa classes in Ñuñoa' gets a mix of valid schools, aggregators and outdated listings — there is no single, reliable place to look.",
      "I wanted a directory where every published entry was verified, not guessed by a scraper: real address, real website, real dance styles. That rules out fully automatic publishing by design.",
    ],
    approach: [
      {
        title: "Human-in-the-loop publishing",
        body: [
          "The pipeline ends at 'propose', never at 'publish'. A small CLI (`bailoteca review` / `bailoteca approve <id>`) lets a human check each proposal and publish it. I rejected fully automated publishing: scraped data is noisy, and one wrong address erodes trust faster than a missing listing.",
          "Published rows are exposed to the public only through a read-only Postgres role with row-level security, so the API cannot write by accident.",
        ],
      },
      {
        title: "Public sources only — no Instagram scraping",
        body: [
          "The enricher reads the public parts of the web: the academy's site, JSON-LD structured data, Google Maps and OpenStreetMap. For social presence it reads only the public Open Graph preview — never logs in, never walks through posts.",
          "I rejected scraping Instagram feeds: it breaks ToS, it is brittle, and the signals it would add (latest post date) do not justify the maintenance cost.",
        ],
      },
      {
        title: "Rules first, LLM as fallback",
        body: [
          "Style classification is deterministic rules on keywords and structured data; an LLM is used only for the cases the rules cannot resolve. This keeps the pipeline cheap and auditable — every decision can be explained from the input.",
          "I rejected an LLM call per candidate: it multiplies cost per run and makes regressions impossible to pin down.",
        ],
      },
      {
        title: "One schema, three surfaces",
        body: [
          "A shared package (`bailoteca-shared`: connection, Pydantic DTOs, reads) is the single source of truth consumed by the pipeline, the read-only FastAPI and the Angular SPA. If the schema changes, all three fail type-checking together instead of drifting apart.",
          "FastAPI serves the same DTOs the pipeline produces; the Angular app consumes the same API as any external client.",
        ],
      },
    ],
    results: [
      "Live in production at bailoteca.vercel.app with the first batch of real academies (34 listed at the time of writing) — the listing keeps growing because the pipeline proposes and I approve.",
      "Runs at $0/month: Supabase free tier, GitHub Actions and free data sources only.",
      "Read-only API in production at bailoteca-api.vercel.app/docs (OpenAPI via FastAPI).",
    ],
  },
  es: {
    title: "Bailoteca — Directorio de escuelas de baile",
    tagline:
      "Un directorio de academias de baile en Santiago de Chile, alimentado por un pipeline de datos con aprobación humana.",
    role: "Desarrollo completo — pipeline de datos, API y web",
    problem: [
      "Las academias de baile de Santiago están repartidas entre Google Maps, Instagram y el boca a boca. Quien busca «clases de salsa en Ñuñoa» recibe una mezcla de escuelas válidas, agregadores y entradas desactualizadas — no existe un lugar único y confiable.",
      "Quería un directorio donde cada entrada publicada estuviera verificada, no adivinada por un scraper: dirección real, sitio real, estilos reales. Eso descarta de partida la publicación totalmente automática.",
    ],
    approach: [
      {
        title: "Publicación con aprobación humana",
        body: [
          "El pipeline termina en «proponer», nunca en «publicar». Una CLI pequeña (`bailoteca review` / `bailoteca approve <id>`) permite revisar cada propuesta y publicarla. Descarté la publicación totalmente automática: los datos scrape-ados son ruidosos, y una sola dirección equivocada erosiona más la confianza que una entrada faltante.",
          "Las filas publicadas solo están expuestas al público mediante un rol Postgres de solo lectura con row-level security, por lo que la API no puede escribir por accidente.",
        ],
      },
      {
        title: "Fuentes públicas, sin scraping de Instagram",
        body: [
          "El enriquecedor lee las partes públicas de la web: el sitio de la academia, datos estructurados JSON-LD, Google Maps y OpenStreetMap. Para presencia social lee únicamente la vista previa pública (Open Graph) — nunca inicia sesión ni recorre posts.",
          "Descarté scrapear el feed de Instagram: rompe los Términos de Servicio, es frágil y las señales que aportaría no justifican el costo de mantenimiento.",
        ],
      },
      {
        title: "Reglas primero, LLM como respaldo",
        body: [
          "La clasificación de estilos es un set determinista de reglas sobre palabras clave y datos estructurados; un LLM solo se usa para los casos que las reglas no resuelven. Esto mantiene el pipeline barato y auditable — cada decisión se puede explicar desde el input.",
          "Descarté una llamada a LLM por candidato: multiplica el costo por corrida y hace imposible acotar las regresiones.",
        ],
      },
      {
        title: "Un esquema, tres superficies",
        body: [
          "Un paquete compartido (`bailoteca-shared`: conexión, DTOs Pydantic, lecturas) es la única fuente de verdad consumida por el pipeline, la FastAPI de solo lectura y la SPA Angular. Si el esquema cambia, las tres partes fallan el chequeo de tipos juntas en vez de divergir.",
          "FastAPI sirve los mismos DTOs que produce el pipeline; la app Angular consume la misma API que cualquier cliente externo.",
        ],
      },
    ],
    results: [
      "En producción en bailoteca.vercel.app con el primer lote de academias reales (34 publicadas al momento de escribir) — el listado crece porque el pipeline propone y yo apruebo.",
      "Corre a $0/mes: solo tier gratuito de Supabase, GitHub Actions y fuentes de datos gratuitas.",
      "API de solo lectura en producción en bailoteca-api.vercel.app/docs (OpenAPI vía FastAPI).",
    ],
  },
};

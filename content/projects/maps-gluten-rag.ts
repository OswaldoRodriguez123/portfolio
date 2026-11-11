import type { Project } from "@/content/types";

export const project: Project = {
  slug: "maps-gluten-rag",
  year: 2026,
  stack: [
    "Python",
    "Playwright",
    "SQLite",
    "GitHub Actions",
  ],
  links: {
    repo: "https://github.com/OswaldoRodriguez123/maps-gluten-rag",
  },
  featured: false,
  en: {
    title: "maps-gluten-rag — Maps list to RAG",
    tagline:
      "Turns a shared Google Maps list of gluten-free places into RAG-ready files.",
    role: "Solo developer — scraper and data pipeline",
    problem: [
      "I keep a Google Maps list of gluten-free restaurants, but a shared list is a link, not a searchable knowledge base: I cannot ask NotebookLM what it contains, embed it, or trust it without opening Maps every time.",
      "There is no API for someone else's shared list, and exporting by hand does not stay current. I wanted the list extracted, deduplicated and refreshed weekly, fully automatic.",
    ],
    approach: [
      {
        title: "Extract via the internal endpoint, with a fallback",
        body: [
          "The extractor opens the public list with Playwright and reads the internal `entitylist/getlist` endpoint, which returns every place with name, address, coordinates, `ftid` and save date. It then walks the DOM rows to add rating and category, which the endpoint does not include. If the endpoint changes, it falls back to reading the rows directly.",
          "I rejected scraping Google's public HTML search: it is rate-limited, consent-gated and structurally unstable — the internal endpoint plus a DOM fallback is a smaller surface to maintain.",
        ],
      },
      {
        title: "Dedup state in SQLite, kept in the workflow cache",
        body: [
          "The local source of truth is a SQLite file. In GitHub Actions it lives in the workflow cache (git-ignored), so every run upserts instead of appending: it keeps Google's `saved_on` date and only marks as new the places that did not exist before.",
          "I rejected committing the database: a binary file in the repo defeats diff review and grows unbounded; the cache keeps history without polluting the repo.",
        ],
      },
      {
        title: "Weekly cron, daylight-saving proof",
        body: [
          "A GitHub Actions workflow runs every Monday at 13:00 Chile time. It schedules two UTC crons (16:00 and 17:00) and a step checks the local hour, so it stays at 1 pm across daylight saving changes. It publishes the `.md`, `.jsonl` and menus file as artifacts, commits the data files if anything changed, and can copy the result into a Google Doc as a NotebookLM source.",
          "I rejected pinning a single UTC cron: twice a year it would fire at noon or 2 pm, which breaks the 'lunch decision' use case I built this for.",
        ],
      },
    ],
    results: [
      "Runs fully automated and free in a public repo: extraction, dedup, enrichment and publishing, Mondays at 13:00 Chile time.",
      "Three outputs from one list: a NotebookLM-ready Markdown file, `jsonl` for embeddings and a separate `_menus.jsonl` with dishes, prices and allergens.",
      "TODO(metric): places extracted / weekly runs",
    ],
  },
  es: {
    title: "maps-gluten-rag — De lista de Maps a RAG",
    tagline:
      "Convierte una lista compartida de Google Maps de lugares sin gluten en archivos listos para RAG.",
    role: "Desarrollo completo — scraper y pipeline de datos",
    problem: [
      "Mantengo una lista de Google Maps de restaurantes sin gluten, pero una lista compartida es un link, no una base de conocimiento consultable: no puedo preguntarle a NotebookLM qué contiene, embeberla ni confiar en ella sin abrir Maps cada vez.",
      "No hay API para una lista compartida de terceros, y exportar a mano no se mantiene actualizado. Quería la lista extraída, deduplicada y refrescada semanalmente, de forma totalmente automática.",
    ],
    approach: [
      {
        title: "Extracción vía endpoint interno, con fallback",
        body: [
          "El extractor abre la lista pública con Playwright y lee el endpoint interno `entitylist/getlist`, que devuelve cada lugar con nombre, dirección, coordenadas, `ftid` y fecha de guardado. Luego recorre las filas del DOM para agregar valoración y categoría, que el endpoint no incluye. Si el endpoint cambia, cae a leer las filas directamente.",
          "Descarté scrapear el HTML público de búsqueda de Google: tiene límite de tasa, consent-gates e inestabilidad estructural — el endpoint interno más un fallback al DOM es una superficie menor de mantener.",
        ],
      },
      {
        title: "Estado de deduplicación en SQLite, en el cache del workflow",
        body: [
          "La fuente de verdad local es un archivo SQLite. En GitHub Actions vive en el cache del workflow (ignorado por git), por lo que cada corrida hace upsert en vez de agregar: conserva la fecha `saved_on` de Google y solo marca como nuevos los lugares que no existían.",
          "Descarté commitear la base de datos: un binario en el repo rompe la revisión por diff y crece sin límite; el cache mantiene el histórico sin ensuciar el repositorio.",
        ],
      },
      {
        title: "Cron semanal, a prueba de horario de verano",
        body: [
          "Un workflow de GitHub Actions corre cada lunes a las 13:00 hora de Chile. Programa dos crons UTC (16:00 y 17:00) y un paso revisa la hora local, por lo que se mantiene a la 1 pm cruzando los cambios de horario de verano. Publica los archivos `.md`, `.jsonl` y de cartas como artefactos, commitea los datos si cambiaron, y puede copiar el resultado a un Google Doc como fuente de NotebookLM.",
          "Descarté un único cron UTC fijo: dos veces al año dispararía a las 12:00 o a las 14:00, lo que rompe el caso de uso (decidir dónde almorzar) para el que lo construí.",
        ],
      },
    ],
    results: [
      "Corre de forma totalmente automatizada y gratuita en un repo público: extracción, deduplicación, enriquecimiento y publicación, los lunes a las 13:00 hora de Chile.",
      "Tres salidas desde una lista: un Markdown listo para NotebookLM, `jsonl` para embeddings y un `_menus.jsonl` separado con platos, precios y alérgenos.",
      "TODO(metric): lugares extraídos / corridas semanales",
    ],
  },
};

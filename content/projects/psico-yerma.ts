import type { Project } from "@/content/types";

export const project: Project = {
  slug: "psico-yerma",
  year: 2026,
  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS v4",
    "Supabase",
    "Resend",
    "Zod",
    "Vitest",
  ],
  links: {
    live: "https://psico-yerma.vercel.app",
    repo: "https://github.com/OswaldoRodriguez123/psico-yerma",
  },
  featured: true,
  cover: "/projects/psico-yerma.webp",
  en: {
    title: "psico-yerma — Practice site & admin panel",
    tagline:
      "Website and private admin panel for a child and teen psychology practice",
    role: "Solo developer — design, build and deployment",
    problem: [
      "The practice needed a trustworthy Spanish-language home online: services, pricing guidance, FAQ and a contact channel that parents could actually reach — without hiring an agency or maintaining a CMS.",
      "Every inquiry had to be spam-resistant and land somewhere the practice owner could see it, track it and turn into a client record.",
    ],
    approach: [
      {
        title: "Public site, Spanish-first",
        body: [
          "Next.js App Router with static prerendering, localized copy and SEO built in from day one: metadata, sitemap, robots and an Open Graph image.",
          "Content sections designed for anxious parents: services, FAQ, contact form and a private letter page excluded from search engines.",
        ],
      },
      {
        title: "Spam-resistant contact pipeline",
        body: [
          "Contact form posts to a server route with Zod validation and Cloudflare Turnstile verification, stores the inquiry in Supabase (Postgres) and sends an email notification through Resend.",
          "Turnstile rejects bots before any email or database write happens, keeping the practice's inbox clean.",
        ],
      },
      {
        title: "Private admin panel",
        body: [
          "Supabase Auth (email/password) protects every /admin route via proxy: unauthenticated requests redirect to /login.",
          "Dashboard with inquiry stats by status and reason, a filterable contacts table with status changes, and a clients CRUD with validation, tests and Recharts-powered reporting.",
        ],
      },
      {
        title: "Engineering rigor",
        body: [
          "TypeScript strict, Vitest suites around validation and CRUD logic, GitHub Actions CI and Conventional Commits.",
        ],
      },
    ],
    results: [
      "Live in production at psico-yerma.vercel.app, maintained by the practice owner with zero developer involvement for day-to-day use.",
      "Runs on free tiers across Vercel, Supabase and Resend — the client pays nothing for hosting.",
      "Private admin panel with authenticated access, inquiry tracking and client management — previously handled over WhatsApp and notebook paper.",
    ],
  },
  es: {
    title: "psico-yerma — Sitio web y panel de administración",
    tagline:
      "Sitio web y panel administrativo privado para una consulta de psicología infantil y adolescente",
    role: "Desarrollo completo — diseño, construcción y despliegue",
    problem: [
      "La consulta necesitaba presencia online confiable y en español: servicios, orientación sobre precios, preguntas frecuentes y un canal de contacto que los padres pudieran usar — sin contratar una agencia ni mantener un CMS.",
      "Cada consulta debía llegar protegida contra spam y quedar registrada en un lugar donde la dueña pudiera verla, darle seguimiento y convertirla en ficha de cliente.",
    ],
    approach: [
      {
        title: "Sitio público, español primero",
        body: [
          "Next.js App Router con prerender estático, copy localizado y SEO desde el día uno: metadata, sitemap, robots e imagen Open Graph.",
          "Secciones pensadas para padres preocupados: servicios, preguntas frecuentes, formulario de contacto y una carta privada excluida de los buscadores.",
        ],
      },
      {
        title: "Contacto con filtro anti-spam",
        body: [
          "El formulario publica en una ruta de servidor con validación Zod y verificación Cloudflare Turnstile; almacena la consulta en Supabase (Postgres) y envía una notificación por correo con Resend.",
          "Turnstile rechaza bots antes de escribir en la base de datos o enviar correos, manteniendo limpia la bandeja de la consulta.",
        ],
      },
      {
        title: "Panel administrativo privado",
        body: [
          "Supabase Auth (email/contraseña) protege todas las rutas /admin vía proxy: las peticiones sin sesión redirigen a /login.",
          "Dashboard con estadísticas de consultas por estado y motivo, tabla de contactos con cambio de estado y CRUD de clientes con validación, tests y reportes con Recharts.",
        ],
      },
      {
        title: "Rigor de ingeniería",
        body: [
          "TypeScript estricto, tests con Vitest alrededor de la validación y el CRUD, CI en GitHub Actions y Conventional Commits.",
        ],
      },
    ],
    results: [
      "En producción en psico-yerma.vercel.app, mantenido por la dueña de la consulta sin depender de un desarrollador para el día a día.",
      "Opera sobre tiers gratuitos de Vercel, Supabase y Resend — la clienta no paga hosting.",
      "Panel administrativo privado con acceso autenticado, seguimiento de consultas y gestión de clientes — antes resuelto por WhatsApp y cuaderno.",
    ],
  },
};

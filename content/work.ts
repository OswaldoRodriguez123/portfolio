import type { WorkEntry } from "@/content/types";

/**
 * Work history, most recent first. Companies, titles, dates and locations
 * follow the public LinkedIn profile.
 *
 * The current job: employed by Paretisa, working for its client Zumba. The
 * repositories are private, so that entry stays at public-profile level: role,
 * dates, overall stack and public products, with no internal architecture or
 * client infrastructure.
 *
 * Older roles carry a one-line summary only. Easy Dance and BIGWISE have no
 * summary or highlights on purpose: nothing approved exists for them, and this
 * file does not invent achievements.
 */
export const work: WorkEntry[] = [
  {
    company: "Paretisa",
    client: "Zumba",
    role: "Software Engineer Consultant",
    period: "2023 — Present",
    location: "Remote",
    summary: {
      en: "Software engineer consulting for Zumba through Paretisa since 2023: full-stack work on Zumba's web products and the AI features on top of them, with TypeScript, PHP, React and serverless services on AWS.",
      es: "Ingeniero de software consultando para Zumba a través de Paretisa desde 2023: trabajo full stack en los productos web de Zumba y en las funciones de IA que van encima, con TypeScript, PHP, React y servicios serverless en AWS.",
    },
    highlights: {
      en: [
        "AI features in production, built on a shared LLM platform: the Zumba app in ChatGPT, AI Playlists in ZIN™ Play and ClassBuzz 2.0 post generation.",
        "Full-stack product work on Zumba.com and the ZIN™ member area: instructor class management and booking, membership retention, localization.",
        "Serverless TypeScript services on AWS, with infrastructure as code and continuous deployment.",
      ],
      es: [
        "Funciones de IA en producción sobre una plataforma LLM compartida: la app de Zumba en ChatGPT, AI Playlists en ZIN™ Play y la generación de posts de ClassBuzz 2.0.",
        "Trabajo full stack en Zumba.com y el área de miembros ZIN™: gestión y reserva de clases para instructores, retención de membresías, localización.",
        "Servicios serverless en TypeScript sobre AWS, con infraestructura como código y despliegue continuo.",
      ],
    },
  },
  {
    company: "Continuum HQ",
    role: "Semi Senior Financial Software Engineer",
    period: "Sep 2021 — Aug 2023",
    location: "Santiago, Chile",
    summary: {
      en: "Healthcare SaaS at a consultancy: three applications launched for two clients in a year, in a 10-person Scrum team. React, Node.js, TypeScript, PostgreSQL and AWS serverless.",
      es: "SaaS de salud en una consultora: tres aplicaciones lanzadas para dos clientes en un año, en un equipo Scrum de 10 personas. React, Node.js, TypeScript, PostgreSQL y AWS serverless.",
    },
  },
  {
    company: "Sistemas Expertos e Ingeniería de Software Ltda.",
    role: "Semi Senior Healthcare Full Stack Developer",
    period: "Nov 2018 — Sep 2021",
    location: "Santiago, Chile",
    summary: {
      en: "Modules of a hospital information system used to run 15 hospitals in Chile, from analyst requests through a ticket system. PHP, JavaScript and PostgreSQL.",
      es: "Módulos de un sistema de información hospitalario usado en 15 hospitales de Chile, desde pedidos de analistas por un sistema de tickets. PHP, JavaScript y PostgreSQL.",
    },
  },
  {
    company: "Inversiones Cobranding Ltda",
    role: "Junior Software Developer",
    period: "Nov 2017 — Nov 2018",
    location: "Santiago, Chile",
    summary: {
      en: "Internal tools on MySQL and SQL Server.",
      es: "Herramientas internas sobre MySQL y SQL Server.",
    },
  },
  {
    company: "Easy Dance",
    role: "Technical Advisor",
    period: "Apr 2016 — Nov 2017",
    location: "Maracaibo, Venezuela",
  },
  {
    company: "BIGWISE",
    role: "Junior Software Programmer",
    period: "Aug 2015 — Apr 2016",
    location: "Maracaibo, Venezuela",
  },
];

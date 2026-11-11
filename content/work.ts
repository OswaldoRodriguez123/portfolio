import type { WorkEntry } from "@/content/types";

/**
 * Work history: employed by Paretisa, working for its client Zumba. The
 * repositories are private, so the entry stays at public-profile level: role,
 * dates, overall stack and public products, with no internal architecture or
 * client infrastructure. Period comes from the git history.
 */
export const work: WorkEntry[] = [
  {
    company: "Paretisa",
    client: "Zumba",
    role: "Software Engineer Consultant",
    period: "2023 — Present",
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
];

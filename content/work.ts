import type { WorkEntry } from "@/content/types";

/**
 * Work history at Zumba. The repositories are private, so entries describe
 * the system, not a link and not unverified numbers. Periods come from the
 * git history of each repository.
 */
export const work: WorkEntry[] = [
  {
    company: "Zumba",
    role: "Software engineer",
    period: "2023 — Present",
    summary: {
      en: "Backend for the Babel AI project (“The Brain”): a serverless API on AWS Lambda, API Gateway, SNS and Aurora Serverless v2, defined with AWS CDK in TypeScript.",
      es: "Backend del proyecto Babel AI («The Brain»): una API serverless sobre AWS Lambda, API Gateway, SNS y Aurora Serverless v2, definida con AWS CDK en TypeScript.",
    },
    highlights: {
      en: [
        "Pipeline that queues Figma → ClassBuzz template creation requests to the ClassBuzz partner API (POST /v10/buzz/templates).",
        "Per-page import status on the open template batch — queued, done, partly failed or failed — with each failed template’s reason, exposed to the Figma translations widget.",
      ],
      es: [
        "Pipeline que encola las solicitudes de creación de templates Figma → ClassBuzz hacia la API partner de ClassBuzz (POST /v10/buzz/templates).",
        "Estado de importación por página en el batch de templates abierto — queued, done, partly failed o failed — con la razón de cada template fallido, expuesto al widget de traducciones de Figma.",
      ],
    },
  },
  {
    company: "Zumba",
    role: "Software engineer",
    period: "2025 — Present",
    summary: {
      en: "TypeScript backend deployed with AWS CDK for ClassBuzz AI.",
      es: "Backend en TypeScript desplegado con AWS CDK para ClassBuzz AI.",
    },
    highlights: {
      en: [
        "Lambda-based backend built with the CDK + SAM toolchain, same family as the other AI services.",
        "TypeScript project with Docker-based CDK builds for reliable Lambda packaging.",
      ],
      es: [
        "Backend basado en Lambda construido con la cadena CDK + SAM, de la misma familia que los demás servicios de IA.",
        "Proyecto TypeScript con builds de CDK basados en Docker para empaquetar Lambda de forma confiable.",
      ],
    },
  },
  {
    company: "Zumba",
    role: "Software engineer",
    period: "2024 — Present",
    summary: {
      en: "Serverless backend that scrapes contents and analyzes them with AI: AWS Lambda functions, AWS CDK, Postgres 15.",
      es: "Backend serverless que extrae contenidos y los analiza con IA: funciones AWS Lambda, AWS CDK, Postgres 15.",
    },
    highlights: {
      en: [
        "Scraper + AI analysis pipeline packaged as Lambda functions, defined and deployed with AWS CDK.",
        "Local development against Postgres 15 and DynamoDB with Docker; SAM local API for endpoint testing.",
      ],
      es: [
        "Pipeline de scraping + análisis con IA empaquetado como funciones Lambda, definido y desplegado con AWS CDK.",
        "Desarrollo local contra Postgres 15 y DynamoDB con Docker; API local con SAM para probar endpoints.",
      ],
    },
  },
  {
    company: "Zumba",
    role: "Software engineer",
    period: "2024 — Present",
    summary: {
      en: "Serverless backend that scrapes legal contents and analyzes them with AI: AWS Lambda and Step Functions, AWS CDK.",
      es: "Backend serverless que extrae contenidos legales y los analiza con IA: AWS Lambda y Step Functions, AWS CDK.",
    },
    highlights: {
      en: [
        "State-machine orchestration of scrape → analyze with Step Functions instead of one long-running function.",
        "Same CDK + SAM toolchain, Postgres 15 and DynamoDB local development setup as the other AI backends.",
      ],
      es: [
        "Orquestación en máquina de estados scrape → analyze con Step Functions en lugar de una función de ejecución larga.",
        "Misma cadena CDK + SAM y desarrollo local con Postgres 15 y DynamoDB que los demás backends de IA.",
      ],
    },
  },
  {
    company: "Zumba",
    role: "Software engineer",
    period: "2025 — Present",
    summary: {
      en: "Internal MCP server exposing Zumba services to LLM clients: Node.js 24, TypeScript, AWS CDK on AWS Lambda.",
      es: "Servidor MCP interno que expone servicios de Zumba a clientes LLM: Node.js 24, TypeScript, AWS CDK sobre AWS Lambda.",
    },
    highlights: {
      en: [
        "Model Context Protocol server for internal tooling — developed and tested with ngrok and an MCP client toolchain.",
        "TypeScript on Node.js 24, deployed with AWS CDK (Lambda).",
      ],
      es: [
        "Servidor Model Context Protocol para tooling interno — desarrollado y probado con ngrok y una cadena de cliente MCP.",
        "TypeScript sobre Node.js 24, desplegado con AWS CDK (Lambda).",
      ],
    },
  },
  {
    company: "Zumba",
    role: "Software engineer",
    period: "2023 — Present",
    summary: {
      en: "Figma widget for translating Figma files: TypeScript widget code plus a React + Vite iframe UI, bundled with esbuild and documented with Storybook.",
      es: "Widget de Figma para traducir archivos de Figma: código de widget en TypeScript más una UI iframe con React + Vite, empaquetada con esbuild y documentada con Storybook.",
    },
    highlights: {
      en: [
        "Widget sends the page link to babel-ai, which queues ClassBuzz template creation (the front end of the import pipeline).",
        "Widget surface for import status: shows how a page import went instead of leaving failures hidden in the logs.",
      ],
      es: [
        "El widget envía el link de la página a babel-ai, que encola la creación de templates ClassBuzz (la cara visible del pipeline de importación).",
        "Superficie del widget para el estado de importación: muestra cómo fue la importación de una página en lugar de ocultar los fallos en los logs.",
      ],
    },
  },
];

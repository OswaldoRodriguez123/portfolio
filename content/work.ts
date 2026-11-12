import type { WorkEntry } from "@/content/types";

/**
 * Work history at Zumba. The repositories are private, so the entry describes
 * the systems, not a link and not unverified numbers. Period comes from the
 * git history of the repositories.
 */
export const work: WorkEntry[] = [
  {
    company: "Zumba",
    role: "Software engineer",
    period: "2023 — Present",
    summary: {
      en: "Software engineer at Zumba since 2023, building AI products (Babel AI, ClassBuzz AI): serverless TypeScript backends on AWS defined with AWS CDK, and the Figma tooling around them.",
      es: "Software engineer en Zumba desde 2023, construyendo productos con IA (Babel AI, ClassBuzz AI): backends serverless en TypeScript sobre AWS definidos con AWS CDK, y el tooling de Figma a su alrededor.",
    },
    highlights: {
      en: [
        "Serverless backends on AWS (Lambda, API Gateway, Step Functions, SNS, Aurora Serverless v2), defined in TypeScript with AWS CDK.",
        "Babel AI («The Brain») pipeline: queues Figma → ClassBuzz template creation against the ClassBuzz partner API (POST /v10/buzz/templates), with per-page import status exposed to the Figma translations widget.",
        "Scraping + AI analysis backends, including a legal-content pipeline orchestrated with Step Functions; local dev against Postgres 15 and DynamoDB, SAM local API for endpoint testing.",
        "Internal MCP server exposing Zumba services to LLM clients: Node.js 24, TypeScript, AWS CDK on Lambda.",
        "Figma translation widget: TypeScript widget code plus a React + Vite iframe UI, bundled with esbuild and documented with Storybook.",
      ],
      es: [
        "Backends serverless en AWS (Lambda, API Gateway, Step Functions, SNS, Aurora Serverless v2), definidos en TypeScript con AWS CDK.",
        "Pipeline de Babel AI («The Brain»): encola la creación de templates Figma → ClassBuzz contra la API partner de ClassBuzz (POST /v10/buzz/templates), con estado de importación por página expuesto al widget de traducciones de Figma.",
        "Backends de scraping + análisis con IA, incluido un pipeline de contenido legal orquestado con Step Functions; desarrollo local contra Postgres 15 y DynamoDB, API local con SAM para probar endpoints.",
        "Servidor MCP interno que expone servicios de Zumba a clientes LLM: Node.js 24, TypeScript, AWS CDK sobre Lambda.",
        "Widget de Figma para traducir archivos: código de widget en TypeScript más una UI iframe con React + Vite, empaquetada con esbuild y documentada con Storybook.",
      ],
    },
  },
];

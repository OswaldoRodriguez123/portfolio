import { Fragment } from "react";
import { useTranslations } from "next-intl";

type StackKey =
  | "stackLanguages"
  | "stackFrontend"
  | "stackBackend"
  | "stackAI"
  | "stackCloud";

const STACK: { key: StackKey; items: string[] }[] = [
  { key: "stackLanguages", items: ["PHP", "TypeScript", "Node.js", "Python", "SQL"] },
  { key: "stackFrontend", items: ["Vue 3", "React", "Next.js", "Angular", "Tailwind CSS"] },
  { key: "stackBackend", items: ["PHP (CakePHP)", "REST APIs", "PostgreSQL", "MySQL", "Prisma", "pgvector"] },
  { key: "stackAI", items: ["OpenAI", "Anthropic Claude", "Gemini", "Prompt engineering", "RAG and embeddings", "MCP", "n8n"] },
  { key: "stackCloud", items: ["AWS Lambda", "SQS and SNS", "AWS CDK", "Vercel", "GitHub Actions", "PHPUnit, Jest, Vitest"] },
];

export function StackList() {
  const t = useTranslations("home");

  return (
    <dl className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-[10rem_1fr]">
      {STACK.map(({ key, items }) => (
        <Fragment key={key}>
          <dt className="font-display text-sm text-foreground">{t(key)}</dt>
          <dd className="font-serif text-sm text-muted-foreground">{items.join(", ")}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

import { useTranslations } from "next-intl";

const STACK: { key: string; items: string[] }[] = [
  { key: "stackLanguages", items: ["TypeScript", "Python", "SQL"] },
  { key: "stackFrontend", items: ["Next.js", "React", "Angular", "Vue 3", "Tailwind CSS"] },
  { key: "stackBackend", items: ["Node.js", "Express", "FastAPI", "Supabase", "PostgreSQL"] },
  { key: "stackDataAI", items: ["LLM APIs", "RAG pipelines", "Prompt engineering", "Playwright"] },
  { key: "stackInfra", items: ["Vercel", "GitHub Actions", "Cloudflare"] },
];

export function StackList() {
  const t = useTranslations("home");

  return (
    <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {STACK.map(({ key, items }) => (
        <div key={key} className="rounded-xl border border-border bg-card p-5">
          <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t(key as "stackLanguages")}
          </dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {items.map((item) => (
              <span
                key={item}
                className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
              >
                {item}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

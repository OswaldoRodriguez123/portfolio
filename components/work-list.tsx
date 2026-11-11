import { getWorkEntries } from "@/lib/content";
import type { Locale } from "@/content/types";

/**
 * Work history at Zumba. The repositories are private, so entries describe
 * the systems I worked on instead of linking public code.
 */
export function WorkList({ locale }: { locale: Locale }) {
  const entries = getWorkEntries();

  return (
    <ol className="mt-8 space-y-6">
      {entries.map((entry) => (
        <li
          key={entry.summary.en}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-base font-semibold text-foreground">
              {entry.role} · {entry.company}
            </h3>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {entry.period}
            </p>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {entry.summary[locale]}
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
            {entry.highlights[locale].map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

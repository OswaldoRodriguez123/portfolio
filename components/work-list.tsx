import { useTranslations } from "next-intl";
import { getWorkEntries } from "@/lib/content";
import type { Locale } from "@/content/types";

/**
 * Work history as a ledger: dates on a left rail, the stage on the right, one
 * thin rule per stage. The repositories are private, so entries describe the
 * systems I worked on instead of linking public code.
 */
export function WorkList({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  const entries = getWorkEntries();

  return (
    <ol className="mt-8">
      {entries.map((entry) => (
        <li
          key={`${entry.company}-${entry.period}`}
          className="grid gap-x-6 gap-y-1 border-t border-line py-6 sm:grid-cols-[10rem_1fr]"
        >
          <div className="font-display leading-snug">
            <p className="text-sm font-medium tabular-nums text-foreground">
              {entry.period}
            </p>
            {entry.location ? (
              <p className="text-xs text-muted-foreground">{entry.location}</p>
            ) : null}
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
              {entry.role}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {entry.company}
            </p>
            {entry.client ? (
              <p className="text-sm text-muted-foreground">
                {t("clientLabel")}: {entry.client}
              </p>
            ) : null}
            {entry.summary ? (
              <p className="mt-3 max-w-2xl font-serif text-base leading-relaxed text-foreground">
                {entry.summary[locale]}
              </p>
            ) : null}
            {entry.highlights?.[locale].length ? (
              <ul className="mt-3 max-w-2xl list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                {entry.highlights[locale].map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

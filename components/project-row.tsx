import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale, ProjectView } from "@/content/types";

/**
 * GitHub's auto-generated social card (`https://opengraph.githubassets.com/1/
 * <full_name>`), which `lib/github.ts` fills in for repos that have no cover
 * of their own. It is a 1200×600 name plate: cropped into the row's 4:3 box
 * it shows a fragment of the repo name and reads as broken, so the row treats
 * it as "no cover" and keeps the intended typographic block.
 */
const GITHUB_SOCIAL_CARD = /^https:\/\/opengraph\.githubassets\.com\//;

/**
 * One project as a row of the work ledger: a small cover (or a typographic
 * block when there is none), the title, one line of problem, one line of
 * result, the stack and the links. No card, no shadow, no lift.
 */
export function ProjectRow({
  project,
  locale,
}: {
  project: ProjectView;
  locale: Locale;
}) {
  const t = useTranslations("project");
  const tA11y = useTranslations("a11y");
  const { content } = project;
  const titleId = `project-${project.slug}-title`;
  const problem = content.problem[0];
  const result = content.results[0];
  const stack = project.stack.slice(0, 5).join(", ");
  const cover =
    project.cover && !GITHUB_SOCIAL_CARD.test(project.cover)
      ? project.cover
      : undefined;

  return (
    <article
      lang={locale}
      className="grid gap-6 border-t border-line py-8 sm:grid-cols-[minmax(0,14rem)_1fr_auto]"
    >
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, no next/image loader needed
        <img
          src={cover}
          alt={content.title}
          className="aspect-[4/3] w-full border border-line object-cover"
          loading="lazy"
        />
      ) : (
        // No cover: a typographic plate with the year, which the row does not
        // show anywhere else. The heading just below already carries the title.
        <div className="flex aspect-[4/3] w-full items-end border border-line bg-secondary p-4">
          <p className="font-display text-3xl leading-none text-muted-foreground">
            {project.year}
          </p>
        </div>
      )}

      <div className="min-w-0">
        <h3
          id={titleId}
          className="font-display text-xl font-semibold leading-snug tracking-tight text-foreground"
        >
          <Link
            href={`/projects/${project.slug}`}
            className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {content.title}
          </Link>
        </h3>
        {problem ? (
          <p className="mt-2 line-clamp-2 font-serif text-sm leading-relaxed text-foreground">
            <span className="font-display text-xs text-muted-foreground">
              {t("problemLabel")}:{" "}
            </span>
            {problem}
          </p>
        ) : null}
        {result ? (
          <p className="mt-1 line-clamp-2 font-serif text-sm leading-relaxed text-muted-foreground">
            <span className="font-display text-xs text-muted-foreground">
              {t("resultLabel")}:{" "}
            </span>
            {result}
          </p>
        ) : null}
        {stack ? (
          <p className="mt-3 text-xs text-muted-foreground">{stack}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium sm:flex-col sm:items-end">
        {project.links.live ? (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            aria-describedby={titleId}
            className="rounded-sm text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {t("live")}{" "}
            <span className="sr-only">({tA11y("opensInNewTab")})</span>
          </a>
        ) : null}
        {project.links.repo ? (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer"
            aria-describedby={titleId}
            className="rounded-sm text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {t("code")}{" "}
            <span className="sr-only">({tA11y("opensInNewTab")})</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getAllProjects } from "@/lib/content";
import type { Locale, ProjectView } from "@/content/types";
import { Section } from "@/components/section";

/**
 * A case study reads like the rest of the ledger: display sans for titles and
 * metadata, serif for anything that is read as prose, hairline rules instead
 * of cards. Structure, sections and headings stay as they were.
 */
export function CaseStudy({
  project,
  locale,
}: {
  project: ProjectView;
  locale: Locale;
}) {
  const t = useTranslations("project");
  const tA11y = useTranslations("a11y");
  const { content } = project;

  const all = getAllProjects(locale);
  const index = all.findIndex((candidate) => candidate.slug === project.slug);
  const older = index >= 0 ? all[index + 1] : undefined;
  const newer = index >= 0 ? all[index - 1] : undefined;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p>
        <Link
          href="/projects"
          className="rounded-sm font-display text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t("backToProjects")}
        </Link>
      </p>

      <header className="mt-6 flex flex-col gap-4">
        <p className="flex flex-wrap items-center gap-3 font-display text-sm text-muted-foreground">
          <span className="tabular-nums">{project.year}</span>
          <span aria-hidden="true">·</span>
          <span>{content.role}</span>
        </p>
        <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          {content.title}
        </h1>
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {content.tagline}
        </p>
        <ul
          className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-xs text-muted-foreground"
          aria-label="Stack"
        >
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-sm bg-primary px-4 font-display text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t("live")}{" "}
              <span className="sr-only">({tA11y("opensInNewTab")})</span>
            </a>
          ) : null}
          {project.links.repoUi ? (
            <a
              href={project.links.repoUi}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-sm border border-border bg-background px-4 font-display text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t("codeUi")}{" "}
              <span className="sr-only">({tA11y("opensInNewTab")})</span>
            </a>
          ) : null}
          {project.links.repo ? (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-sm border border-border bg-background px-4 font-display text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t("code")}{" "}
              <span className="sr-only">({tA11y("opensInNewTab")})</span>
            </a>
          ) : null}
        </div>
      </header>

      <Section id="problem" title={t("problem")} className="px-0">
        <div className="mt-4 max-w-2xl space-y-4 font-serif text-lg leading-relaxed text-foreground/90">
          {content.problem.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section id="approach" title={t("approach")} className="px-0">
        <div className="mt-6 flex flex-col gap-6">
          {content.approach.map((section, i) => (
            <div key={i} className="max-w-2xl border-l border-line pl-5">
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                {section.title}
              </h3>
              <div className="mt-2 space-y-3 font-serif text-base leading-relaxed text-muted-foreground">
                {section.body.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="results" title={t("results")} className="px-0">
        <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-6 font-serif text-lg leading-relaxed text-foreground/90">
          {content.results.map((result, i) => (
            <li key={i}>{result}</li>
          ))}
        </ul>
      </Section>

      <nav
        aria-label="Projects"
        className="mt-10 flex items-stretch justify-between gap-4 border-t border-line pt-6"
      >
        <div className="flex-1">
          {older ? (
            <Link
              href={`/projects/${older.slug}`}
              className="group flex h-full flex-col rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="font-display text-xs text-muted-foreground">{t("prev")}</span>
              <span className="mt-1 font-display text-lg font-medium text-foreground underline-offset-4 group-hover:underline">
                {older.content.title}
              </span>
            </Link>
          ) : null}
        </div>
        <div className="flex-1 text-right">
          {newer ? (
            <Link
              href={`/projects/${newer.slug}`}
              className="group flex h-full flex-col items-end rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="font-display text-xs text-muted-foreground">{t("next")}</span>
              <span className="mt-1 font-display text-lg font-medium text-foreground underline-offset-4 group-hover:underline">
                {newer.content.title}
              </span>
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  );
}

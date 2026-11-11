import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getAllProjects } from "@/lib/content";
import type { Locale, ProjectView } from "@/content/types";
import { Section } from "@/components/section";

export function CaseStudy({
  project,
  locale,
}: {
  project: ProjectView;
  locale: Locale;
}) {
  const t = useTranslations("project");
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
          className="rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          ← {t("backToProjects")}
        </Link>
      </p>

      <header className="mt-6 flex flex-col gap-4">
        <p className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="tabular-nums">{project.year}</span>
          <span aria-hidden="true">·</span>
          <span>{content.role}</span>
        </p>
        <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          {content.title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {content.tagline}
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t("live")} ↗
            </a>
          ) : null}
          {project.links.repoUi ? (
            <a
              href={project.links.repoUi}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t("codeUi")} ↗
            </a>
          ) : null}
          {project.links.repo ? (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t("code")} ↗
            </a>
          ) : null}
        </div>
      </header>

      <Section id="problem" title={t("problem")} className="px-0">
        <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/90">
          {content.problem.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section id="approach" title={t("approach")} className="px-0">
        <div className="mt-6 flex flex-col gap-6">
          {content.approach.map((section, i) => (
            <div key={i} className="border-l-2 border-border pl-5">
              <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                {section.title}
              </h3>
              <div className="mt-2 space-y-3 text-base leading-relaxed text-muted-foreground">
                {section.body.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="results" title={t("results")} className="px-0">
        <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
          {content.results.map((result, i) => (
            <li key={i}>{result}</li>
          ))}
        </ul>
      </Section>

      <nav
        aria-label="Projects"
        className="mt-10 flex items-stretch justify-between gap-4 border-t border-border pt-6"
      >
        <div className="flex-1">
          {older ? (
            <Link
              href={`/projects/${older.slug}`}
              className="group flex h-full flex-col rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                ← {t("prev")}
              </span>
              <span className="mt-1 font-heading text-base font-medium text-foreground transition-colors group-hover:text-foreground">
                {older.content.title}
              </span>
            </Link>
          ) : null}
        </div>
        <div className="flex-1 text-right">
          {newer ? (
            <Link
              href={`/projects/${newer.slug}`}
              className="group flex h-full flex-col items-end rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t("next")} →
              </span>
              <span className="mt-1 font-heading text-base font-medium text-foreground">
                {newer.content.title}
              </span>
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  );
}

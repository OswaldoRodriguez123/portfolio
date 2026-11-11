import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale, ProjectView } from "@/content/types";

function initials(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function ProjectCard({
  project,
}: {
  project: ProjectView;
  locale: Locale;
}) {
  const t = useTranslations("project");
  const { content } = project;
  const visibleStack = project.stack.slice(0, 4);
  const extraStack = project.stack.length - visibleStack.length;

  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-card text-card-foreground shadow-xs transition-shadow hover:shadow-md">
      {project.cover ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, no next/image loader needed
        <img
          src={project.cover}
          alt={content.title}
          className="aspect-video w-full rounded-t-xl border-b border-border object-cover"
          loading="lazy"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-video w-full items-center justify-center rounded-t-xl border-b border-border bg-muted font-heading text-4xl font-semibold text-muted-foreground"
        >
          {initials(project.slug)}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight">
            <Link
              href={`/projects/${project.slug}`}
              className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {content.title}
            </Link>
          </h3>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
            {project.year}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {content.tagline}
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {visibleStack.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {item}
            </li>
          ))}
          {extraStack > 0 ? (
            <li
              className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
              title={project.stack.slice(4).join(", ")}
            >
              +{extraStack}
            </li>
          ) : null}
        </ul>
        <div className="mt-auto flex items-center gap-3 pt-2 text-sm font-medium">
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t("live")}
            </a>
          ) : null}
          {project.links.repo ? (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t("code")}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

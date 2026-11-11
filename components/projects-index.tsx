import { useTranslations } from "next-intl";
import { getAllProjects } from "@/lib/content";
import type { Locale } from "@/content/types";
import { ProjectCard } from "@/components/project-card";

export function ProjectsIndex({ locale }: { locale: Locale }) {
  const t = useTranslations("projects");
  const projects = getAllProjects(locale);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-2 max-w-2xl text-base text-muted-foreground">
        {t("description")}
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </div>
  );
}

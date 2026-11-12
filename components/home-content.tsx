import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/lib/content";
import type { Locale } from "@/content/types";
import { Section } from "@/components/section";
import { Hero } from "@/components/hero";
import { ProjectRow } from "@/components/project-row";
import { StackList } from "@/components/stack-list";
import { WorkList } from "@/components/work-list";
import { ContactCta } from "@/components/contact-cta";

export function HomeContent({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  const featured = getFeaturedProjects(locale, 3);

  return (
    <>
      <Hero />

      <Section id="featured" title={t("projectsTitle")}>
        <div className="mt-4">
          {featured.map((project) => (
            <ProjectRow key={project.slug} project={project} locale={locale} />
          ))}
        </div>
        <p className="mt-8">
          <Link
            href="/projects"
            className="rounded-sm text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {t("viewAllProjects")} →
          </Link>
        </p>
      </Section>

      <Section id="about" title={t("aboutTitle")}>
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>{t("aboutP1")}</p>
          <p>{t("aboutP2")}</p>
        </div>
      </Section>

      <Section id="work" title={t("workTitle")}>
        <WorkList locale={locale} />
      </Section>

      <Section id="stack" title={t("stackTitle")}>
        <StackList />
      </Section>

      <Section id="contact" title={t("contactTitle")}>
        <div className="mt-6">
          <ContactCta />
        </div>
      </Section>
    </>
  );
}

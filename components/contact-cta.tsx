import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

/**
 * The end of the page is a line of prose and the address itself, not a card
 * with buttons: the fastest path to contact is reading an email and copying it.
 */
export function ContactCta() {
  const t = useTranslations("home");

  return (
    <div className="border-t border-line pt-8">
      <p className="max-w-2xl font-serif text-lg leading-relaxed text-foreground">
        {t("contactBody")}
      </p>
      <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm">
        <a
          href={`mailto:${site.email}`}
          className="break-all rounded-sm font-medium text-foreground underline underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {site.email}
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          LinkedIn
        </a>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

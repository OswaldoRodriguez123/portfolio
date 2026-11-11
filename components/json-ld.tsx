import { personJsonLd, webSiteJsonLd } from "@/lib/seo";

export function JsonLd() {
  const person = JSON.stringify(personJsonLd());
  const website = JSON.stringify(webSiteJsonLd());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: person }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: website }}
      />
    </>
  );
}

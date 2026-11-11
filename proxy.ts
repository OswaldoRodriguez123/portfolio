import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { projects } from "./content/projects";

const intlProxy = createMiddleware(routing);
const projectSlugs = new Set(projects.map((project) => project.slug));

const caseStudyPath = /^\/(en|es)\/projects\/([^/]+)$/;

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Under Cache Components, notFound() inside a page streams after the
  // (already 200) shell is sent. Rewrite unknown case-study slugs to the
  // prerendered /404 route instead, which throws before the response
  // starts and keeps the 404 status. The public URL is unchanged.
  const match = caseStudyPath.exec(pathname);
  const locale = match?.[1];
  const slug = match?.[2];
  if (locale && slug && !projectSlugs.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL(`/${locale}/404`, req.url));
  }

  return intlProxy(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

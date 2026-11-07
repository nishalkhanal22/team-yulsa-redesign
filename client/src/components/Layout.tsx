/*
  MERIDIAN PRECISION page shell: header, main, footer.
  SEO meta is driven by lib/seo.ts, the same data used to prerender each route.
*/
import { useEffect, ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { SITE, canonicalFor, routeSchemaFor, seoFor } from "@/lib/seo";

function setMeta(selector: string, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement(
      selector.startsWith("link") ? "link" : "meta"
    ) as HTMLMetaElement | HTMLLinkElement;
    if (selector.includes("property=")) {
      element.setAttribute("property", selector.split('property="')[1].split('"')[0]);
    } else if (selector.includes("name=")) {
      element.setAttribute("name", selector.split('name="')[1].split('"')[0]);
    } else if (selector.includes("rel=")) {
      element.setAttribute("rel", selector.split('rel="')[1].split('"')[0]);
    }
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

export function usePageMeta(path: string) {
  const meta = seoFor(path);
  const canonical = canonicalFor(path);
  const image = `${SITE.url}${SITE.image}`;

  useEffect(() => {
    document.title = meta.title;

    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('link[rel="canonical"]', "href", canonical);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[property="og:site_name"]', "content", SITE.name);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setMeta('meta[name="twitter:description"]', "content", meta.description);
    setMeta('meta[name="twitter:image"]', "content", image);

    // Keep structured data in sync when navigating client-side.
    let schema = document.getElementById("route-schema") as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "route-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": routeSchemaFor(path),
    });
  }, [meta, canonical, image, path]);
}

export default function Layout({ children, path }: { children: ReactNode; path: string }) {
  usePageMeta(path);
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

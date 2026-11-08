/*
  Build-time prerenderer entry.

  Vite builds this file for Node (`vite build --ssr`), then scripts/postbuild.ts
  imports it and renders every route to real HTML. Crawlers, social scrapers,
  and AI agents get the full page content without executing JavaScript, and the
  browser hydrates that HTML instead of painting an empty div.

  Keep this file free of browser-only imports (no CSS, no document/window).
*/
import { renderToString } from "react-dom/server";
import App from "./App";

// Wouter stores the location with the deploy base included and strips it when
// matching routes, so the prerender path has to carry the same base.
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function render(path: string): string {
  return renderToString(<App ssrPath={`${base}${path}`} />);
}

export default render;

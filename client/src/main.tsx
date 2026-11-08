import { createRoot, hydrateRoot } from "react-dom/client";

// Self-hosted fonts: no third-party request, no render-blocking Google CSS.
import "@fontsource-variable/archivo";
import "@fontsource/libre-caslon-text/400.css";
import "@fontsource/libre-caslon-text/400-italic.css";
import "@fontsource/libre-caslon-text/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";

import App from "./App";
import "./index.css";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

// GitHub Pages serves folder routes with a trailing slash ("/services/").
// Wouter matches exact paths, so normalize before the app reads the location.
const rawPath = window.location.pathname;
if (rawPath.length > base.length + 1 && rawPath.endsWith("/")) {
  window.history.replaceState(
    null,
    "",
    rawPath.replace(/\/+$/, "") + window.location.search + window.location.hash
  );
}

const container = document.getElementById("root")!;

// Every route is prerendered at build time, so hydrate that HTML to keep the
// content on screen. Only hydrate when the HTML belongs to the current URL:
// a host that falls back to index.html (or serves 404.html) for an unknown
// path would otherwise hydrate the wrong page.
const currentPath = window.location.pathname.slice(base.length) || "/";
const normalizedPath =
  currentPath !== "/" ? currentPath.replace(/\/+$/, "") : "/";
const prerenderedPath = container.dataset.prerendered;

if (container.hasChildNodes() && prerenderedPath === normalizedPath) {
  hydrateRoot(container, <App />);
} else {
  container.innerHTML = "";
  createRoot(container).render(<App />);
}

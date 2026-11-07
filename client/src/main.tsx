import { createRoot } from "react-dom/client";

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

// GitHub Pages serves folder routes with a trailing slash ("/services/").
// Wouter matches exact paths, so normalize before the app reads the location.
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const path = window.location.pathname;
if (path.length > base.length + 1 && path.endsWith("/")) {
  window.history.replaceState(
    null,
    "",
    path.replace(/\/+$/, "") + window.location.search + window.location.hash
  );
}

createRoot(document.getElementById("root")!).render(<App />);

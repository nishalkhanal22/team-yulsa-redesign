import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

/*
  Static Vite + React build.

  base is "/" for the production domain (teamyulsa.com). Setting GITHUB_PAGES=true
  builds for the repository subpath instead, so the same code can still be
  previewed on GitHub Pages without changing canonical URLs (those stay on
  teamyulsa.com via client/src/lib/seo.ts).
*/
export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/team-yulsa-redesign/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist", "public"),
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: false,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
});

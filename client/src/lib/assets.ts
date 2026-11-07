/*
  Static asset helper. Respects the Vite base so the same build works at the
  domain root (teamyulsa.com) and under a GitHub Pages project path.

  The optional chaining keeps this module importable from Node build scripts
  (scripts/postbuild.ts), where import.meta.env does not exist.
*/
const base = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? "/";

export function asset(filename: string): string {
  return `${base}assets/${filename}`;
}

export const ASSETS = {
  logo: asset("opt/logo-320.webp"),
  logoSmall: asset("opt/logo-160.webp"),
  heroOffice: asset("opt/hero-1600.webp"),
  heroOfficeSmall: asset("opt/hero-800.webp"),
  processWorkflow: asset("opt/process-1280.webp"),
  processWorkflowSmall: asset("opt/process-640.webp"),
  industriesCollage: asset("opt/industries-1280.webp"),
  industriesCollageSmall: asset("opt/industries-640.webp"),
} as const;

export default asset;

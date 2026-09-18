/*
  GitHub Pages asset helper — keeps local static assets working under the
  /team-yulsa-redesign/ project base and on the Manus preview root.
*/
export function asset(filename: string): string {
  return `${import.meta.env.BASE_URL}assets/${filename}`;
}

export const ASSETS = {
  logo: "/manus-storage/team_yulsa_logo_577bd49d.jpeg",
  heroOffice: asset("hero-office_05c0bd7f.png"),
  processWorkflow: asset("process-workflow_66aa4f70.png"),
  industriesCollage: asset("industries-collage_3c29fe26.png"),
  softwareLogos: asset("software-official-logos_9fc69c90.png"),
} as const;

export default asset;

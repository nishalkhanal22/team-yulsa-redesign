/*
  Team content helpers.

  Team members live in client/src/content/team.json so the client can edit them
  from Pages CMS (/admin) without touching React code. Photos are uploaded to
  client/public/assets/team and optimized at build time by scripts/optimize-images.mjs,
  which writes 160px and 480px WebP variants into assets/team/opt.
*/
import data from "@/content/team.json";

export interface TeamMember {
  name: string;
  role: string;
  note?: string;
  photo: string;
  order: number;
  published?: boolean;
}

export const TEAM: TeamMember[] = (data.members as TeamMember[])
  .filter((member) => member.published !== false)
  .sort((a, b) => a.order - b.order);

export function teamPhoto(member: TeamMember, size: 160 | 480): string {
  // Pages CMS stores the full public path ("/assets/team/name.png"); older
  // entries store just the filename. Both resolve to the same optimized file.
  const file = member.photo.split("/").pop() ?? member.photo;
  const base = file.replace(/\.[^.]+$/, "");
  return `${import.meta.env.BASE_URL}assets/team/opt/${base}-${size}.webp`;
}

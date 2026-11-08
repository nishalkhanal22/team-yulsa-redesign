/*
  Booking time helpers.

  The form asks for the visitor's timezone, date, and time. This module turns
  that wall clock into an exact instant so the page can show the same moment in
  the visitor's zone and in Kathmandu, and so the calendar invite is unambiguous.

  The Apps Script endpoint performs the same conversion server-side; nothing here
  is sent to Google. No timezone library: Intl.DateTimeFormat handles DST.
*/

export const BOOKING = {
  /** Default when the browser will not tell us its zone. */
  defaultTimeZone: "America/New_York",
  /** Where the team sits, shown next to every selection. */
  teamTimeZone: "Asia/Kathmandu",
  teamCity: "Kathmandu",
  /** Length of a discovery call, used for the calendar link. */
  callMinutes: 30,
} as const;

const formatters = new Map<string, Intl.DateTimeFormat>();

function partsFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    formatters.set(timeZone, formatter);
  }
  return formatter;
}

function zonedParts(
  instant: number | Date,
  timeZone: string
): { year: number; month: number; day: number; hour: number; minute: number; second: number } {
  const parts = partsFormatter(timeZone).formatToParts(new Date(instant));
  const read = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value ?? "0");
  return {
    year: read("year"),
    month: read("month"),
    day: read("day"),
    hour: read("hour"),
    minute: read("minute"),
    second: read("second"),
  };
}

/** Offset of `timeZone` from UTC at a given instant, in milliseconds. */
function offsetMs(instant: number, timeZone: string): number {
  const p = zonedParts(instant, timeZone);
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - instant;
}

/**
 * Convert a wall-clock time in `timeZone` to a UTC instant.
 * Two passes: the second corrects around DST boundaries.
 */
export function wallTimeToInstant(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string
): number {
  const guess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const first = guess - offsetMs(guess, timeZone);
  return guess - offsetMs(first, timeZone);
}

export function formatTimeWithZone(instant: number, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(instant);
}

export function formatLongDay(instant: number, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(instant);
}

/** Human label for a zone, e.g. "New York". */
export function zoneCity(timeZone: string): string {
  const city = timeZone.split("/").pop() ?? timeZone;
  return city.replaceAll("_", " ");
}

/**
 * Some browsers still report legacy IANA names (for example "Asia/Katmandu"
 * instead of "Asia/Kathmandu"). Map them to the modern name so the dropdown
 * matches the curated list instead of showing a duplicate option.
 */
const ZONE_ALIASES: Record<string, string> = {
  "Asia/Katmandu": "Asia/Kathmandu",
  "Asia/Calcutta": "Asia/Kolkata",
  "Asia/Rangoon": "Asia/Yangon",
  "Asia/Saigon": "Asia/Ho_Chi_Minh",
  "Europe/Kiev": "Europe/Kyiv",
  "America/Buenos_Aires": "America/Argentina/Buenos_Aires",
  "Pacific/Truk": "Pacific/Chuuk",
  "Pacific/Ponape": "Pacific/Pohnpei",
};

export function normalizeTimeZone(timeZone: string): string {
  return ZONE_ALIASES[timeZone] ?? timeZone;
}

/** Current UTC offset for a zone, e.g. "GMT-5". */
export function zoneOffsetLabel(timeZone: string, instant = Date.now()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(instant);
  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
}

/** Best-effort visitor timezone. Falls back to US Eastern. */
export function detectTimeZone(): string {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zone) return normalizeTimeZone(zone);
  } catch {
    // ignore
  }
  return BOOKING.defaultTimeZone;
}

/** "2026-11-09" and "09:00" to an instant, or null when the input is incomplete. */
export function parseWallClock(
  date: string,
  time: string,
  timeZone: string
): number | null {
  if (!date || !time) return null;
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  if (!year || !month || !day || Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }
  const instant = wallTimeToInstant(year, month, day, hour, minute, timeZone);
  return Number.isNaN(instant) ? null : instant;
}

/*
  Booking time helpers.

  Discovery calls are offered during the team's published hours, expressed in a
  fixed availability timezone (America/New_York by default). Every slot is an
  exact instant, so:

    - the visitor sees it in their own timezone (auto-detected, overridable),
    - the team sees the same instant in Kathmandu time,
    - the calendar invite lands at the correct moment for both.

  No timezone libraries: Intl.DateTimeFormat does the conversion, including DST.
*/

export const BOOKING = {
  /** Calls are offered Mon–Fri inside this window, in `availabilityTimeZone`. */
  availabilityTimeZone: "America/New_York",
  startHour: 9,
  endHour: 17,
  slotMinutes: 30,
  /** Do not offer a slot less than this far ahead. */
  leadTimeHours: 12,
  /** How far ahead the picker looks. */
  horizonDays: 21,
  /** Where the team sits, shown next to every selection. */
  teamTimeZone: "Asia/Kathmandu",
  teamCity: "Kathmandu",
} as const;

export interface Slot {
  /** UTC instant, ISO 8601. */
  iso: string;
  /** Epoch milliseconds. */
  instant: number;
  /** Visitor-local date, YYYY-MM-DD. */
  date: string;
  /** Visitor-local time, HH:mm (24h). */
  time: string;
  /** e.g. "9:00 AM" in the visitor's zone. */
  label: string;
  /** e.g. "7:45 PM" in Kathmandu. */
  teamLabel: string;
  /** e.g. "Mon, Nov 10" in the visitor's zone. */
  dayLabel: string;
  /** YYYY-MM-DD in the visitor's zone, used to group slots. */
  dayKey: string;
}

const pad = (value: number) => String(value).padStart(2, "0");

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

export function zonedParts(
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

export function formatTime(instant: number, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(instant);
}

export function formatTimeWithZone(instant: number, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(instant);
}

export function formatDay(instant: number, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
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
 * instead of "Asia/Kathmandu"). Map them to the modern name so the picker
 * matches the curated list and does not show a duplicate option.
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
  return BOOKING.availabilityTimeZone;
}

export function buildSlots(
  now: number,
  visitorTimeZone: string,
  options: {
    startHour?: number;
    endHour?: number;
    slotMinutes?: number;
    leadTimeHours?: number;
    horizonDays?: number;
    availabilityTimeZone?: string;
  } = {}
): Slot[] {
  const startHour = options.startHour ?? BOOKING.startHour;
  const endHour = options.endHour ?? BOOKING.endHour;
  const slotMinutes = options.slotMinutes ?? BOOKING.slotMinutes;
  const leadTimeHours = options.leadTimeHours ?? BOOKING.leadTimeHours;
  const horizonDays = options.horizonDays ?? BOOKING.horizonDays;
  const availabilityTimeZone =
    options.availabilityTimeZone ?? BOOKING.availabilityTimeZone;

  const earliest = now + leadTimeHours * 60 * 60 * 1000;
  const latest = now + horizonDays * 24 * 60 * 60 * 1000;
  const today = zonedParts(now, availabilityTimeZone);
  const slots: Slot[] = [];

  for (let offset = 0; offset <= horizonDays; offset += 1) {
    // Normalising through UTC keeps month/year rollover correct.
    const cursor = new Date(Date.UTC(today.year, today.month - 1, today.day + offset));
    const year = cursor.getUTCFullYear();
    const month = cursor.getUTCMonth() + 1;
    const day = cursor.getUTCDate();
    const weekday = cursor.getUTCDay();
    if (weekday === 0 || weekday === 6) continue;

    for (
      let minutes = startHour * 60;
      minutes + slotMinutes <= endHour * 60;
      minutes += slotMinutes
    ) {
      const instant = wallTimeToInstant(
        year,
        month,
        day,
        Math.floor(minutes / 60),
        minutes % 60,
        availabilityTimeZone
      );
      if (instant < earliest || instant > latest) continue;

      const visitor = zonedParts(instant, visitorTimeZone);
      slots.push({
        iso: new Date(instant).toISOString(),
        instant,
        date: `${visitor.year}-${pad(visitor.month)}-${pad(visitor.day)}`,
        time: `${pad(visitor.hour)}:${pad(visitor.minute)}`,
        label: formatTime(instant, visitorTimeZone),
        teamLabel: formatTime(instant, BOOKING.teamTimeZone),
        dayLabel: formatDay(instant, visitorTimeZone),
        dayKey: `${visitor.year}-${pad(visitor.month)}-${pad(visitor.day)}`,
      });
    }
  }

  return slots;
}

export interface BusyInterval {
  /** UTC instant, ISO 8601. */
  start: string;
  end: string;
  /** Epoch milliseconds, parsed once for cheap overlap checks. */
  startMs: number;
  endMs: number;
}

interface AvailabilityResponse {
  busy?: Array<{ start?: string; end?: string }>;
}

/**
 * Ask the Apps Script endpoint which windows are already booked.
 * Returns null when the endpoint does not implement availability yet, so the
 * picker degrades gracefully instead of breaking.
 */
export async function fetchBusySlots(
  endpoint: string,
  fromIso: string,
  toIso: string,
  signal?: AbortSignal
): Promise<BusyInterval[] | null> {
  try {
    const url = `${endpoint}?action=availability&from=${encodeURIComponent(
      fromIso
    )}&to=${encodeURIComponent(toIso)}`;
    const response = await fetch(url, { signal });
    if (!response.ok) return null;
    const text = await response.text();
    if (!text.trim().startsWith("{")) return null;
    const data = JSON.parse(text) as AvailabilityResponse;
    if (!Array.isArray(data.busy)) return null;

    return data.busy
      .map((entry) => {
        const start = entry?.start ? new Date(entry.start) : null;
        const end = entry?.end ? new Date(entry.end) : null;
        if (!start || !end) return null;
        const startMs = start.getTime();
        const endMs = end.getTime();
        if (Number.isNaN(startMs) || Number.isNaN(endMs)) return null;
        return {
          start: start.toISOString(),
          end: end.toISOString(),
          startMs,
          endMs,
        };
      })
      .filter((entry): entry is BusyInterval => entry !== null);
  } catch {
    return null;
  }
}

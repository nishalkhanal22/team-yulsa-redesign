/*
  MERIDIAN PRECISION. Contact page.
  Lead-gen focus: discovery call framing and US phone line,
  FAQ accordion with FAQPage JSON-LD (audit fix).

  Booking stays simple: the visitor picks their timezone, date, and time. The
  Apps Script endpoint converts that wall clock + IANA zone into one exact
  instant, so the event lands at the right moment in both calendars.
*/
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { BRAND, FAQS } from "@/lib/siteData";
import { TIMEZONE_OPTIONS } from "@/lib/timezones";
import {
  BOOKING,
  detectTimeZone,
  formatLongDay,
  formatTimeWithZone,
  parseWallClock,
  zoneCity,
  zoneOffsetLabel,
} from "@/lib/booking";
import { asset } from "@/lib/assets";
import { useReveal } from "@/hooks/useReveal";

const SERVICES_SELECT = [
  "Accounting & Bookkeeping",
  "Tax Filing Support",
  "AR & AP Management",
  "Year-End Accounting",
  "Software Migration",
  "Management Reporting",
  "Budgeting & Forecasting",
  "Virtual CFO Services",
  "Not sure. I'd like guidance",
];

interface FormState {
  name: string;
  email: string;
  company: string;
  service: string;
  date: string;
  time: string;
  timeZone: string;
  message: string;
  website: string;
  consent: boolean;
}

interface Confirmation {
  meetLink?: string;
  /** UTC instant of the confirmed call. */
  instant: number;
  /** Visitor timezone at the moment of booking. */
  timeZone: string;
}

export default function Contact() {
  useReveal();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    service: "",
    date: "",
    time: "",
    timeZone: BOOKING.defaultTimeZone,
    message: "",
    website: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  // Default the picker to the visitor's own zone. Runs after hydration, so the
  // prerendered HTML and the first client render stay identical.
  useEffect(() => {
    setForm((prev) => ({ ...prev, timeZone: detectTimeZone() }));
  }, []);

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Small one-line preview: shows the same instant in the visitor's zone and in
  // Kathmandu, without turning the form into a calendar.
  const preview = useMemo(() => {
    const instant = parseWallClock(form.date, form.time, form.timeZone);
    if (instant === null) return null;
    return {
      instant,
      day: formatLongDay(instant, form.timeZone),
      visitor: formatTimeWithZone(instant, form.timeZone),
      team: formatTimeWithZone(instant, BOOKING.teamTimeZone),
    };
  }, [form.date, form.time, form.timeZone]);

  const sameZone = form.timeZone === BOOKING.teamTimeZone;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: real visitors never fill this hidden field.
    if (form.website.trim()) {
      toast.success("Thanks. Your request has been received.");
      return;
    }

    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in your name and email so we can reach you.");
      return;
    }
    if (!form.date || !form.time) {
      toast.error("Please choose your preferred date and time.");
      return;
    }
    if (form.date < minDate) {
      toast.error("Please choose today or a future date.");
      return;
    }
    if (!form.consent) {
      toast.error("Please agree to the privacy policy so we can contact you.");
      return;
    }

    setSubmitting(true);
    try {
      // Apps Script expects JSON and uses the camel-case `timeZone` field.
      // `date` and `time` are the visitor's wall clock; `timeZone` tells the
      // server how to read them, so the event lands on the exact instant.
      // text/plain keeps this a simple cross-origin request (no preflight), and
      // the endpoint returns Access-Control-Allow-Origin: *, so the browser can
      // read the real result: the Google Meet link and confirmed start time.
      const body = JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || "Not provided",
        service: form.service || "General discovery call",
        date: form.date,
        time: form.time,
        timeZone: form.timeZone,
        message: form.message.trim() || "No additional message provided.",
      });

      const response = await fetch(BRAND.bookingEndpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body,
      });

      let data: {
        success?: boolean;
        code?: string;
        message?: string;
        booking?: { meetLink?: string; start?: string };
      } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (data && data.success === false) {
        toast.error(
          data.message || `We could not book that slot. Please email ${BRAND.email}.`
        );
        return;
      }

      const startIso = data?.booking?.start;
      const startInstant = startIso ? new Date(startIso).getTime() : NaN;
      setConfirmation({
        meetLink: data?.booking?.meetLink,
        instant: Number.isNaN(startInstant) ? preview?.instant ?? Date.now() : startInstant,
        timeZone: form.timeZone,
      });
      setForm({
        name: "",
        email: "",
        company: "",
        service: "",
        date: "",
        time: "",
        timeZone: detectTimeZone(),
        message: "",
        website: "",
        consent: false,
      });
    } catch {
      toast.error(
        `We could not confirm your booking in the browser. Please email ${BRAND.email} and we will book the slot for you.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const confirmedEnd = confirmation
    ? confirmation.instant + BOOKING.callMinutes * 60 * 1000
    : null;
  const calendarLink =
    confirmation && confirmedEnd
      ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
          "Team Yulsa discovery call"
        )}&dates=${new Date(confirmation.instant)
          .toISOString()
          .replace(/[-:]/g, "")
          .replace(/\.\d{3}/, "")}/${new Date(confirmedEnd)
          .toISOString()
          .replace(/[-:]/g, "")
          .replace(/\.\d{3}/, "")}&details=${encodeURIComponent(
          "Your 30-minute discovery call with Team Yulsa."
        )}${confirmation.meetLink ? `&location=${encodeURIComponent(confirmation.meetLink)}` : ""}`
      : null;

  return (
    <Layout path="/contact">
      <section className="pt-28 lg:pt-36 pb-12">
        <div className="container grid lg:grid-cols-12 gap-8 lg:gap-0">
          <div className="lg:col-span-7">
            <p className="folio-tag mb-3 reveal">Contact • US &amp; Canada</p>
            <h1 className="font-serif text-4xl lg:text-5xl text-[var(--navy)] leading-tight reveal">
              Let's make your books
              <br />
              run themselves.
            </h1>
            <p className="mt-5 text-base lg:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-xl reveal">
              Pick a 30-minute slot that works for you. You'll get a Google Calendar invite and a
              Meet link instantly, and we'll come prepared to talk about your books, your software,
              and where the time is going.
            </p>

            <div className="mt-8 space-y-4">
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-sm text-[var(--ink)] hover:text-[var(--meridian-text)] transition-colors">
                <Mail className="h-5 w-5 text-[var(--meridian-text)]" />
                <span className="font-medium">{BRAND.email}</span>
              </a>
              {BRAND.phoneDisplay && (
                <a href={BRAND.phoneHref} className="flex items-center gap-3 text-sm text-[var(--ink)] hover:text-[var(--meridian-text)] transition-colors">
                  <Phone className="h-5 w-5 text-[var(--meridian-text)]" />
                  <span className="font-medium">{BRAND.phoneDisplay}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">US &amp; Canada callers</span>
                </a>
              )}
              <span className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                <MapPin className="h-5 w-5 shrink-0" />
                {BRAND.address}
              </span>
              <span className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                <Clock className="h-5 w-5 shrink-0" />
                {BRAND.hours}
              </span>
                            <a href={BRAND.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--navy)] hover:text-[var(--meridian-text)] transition-colors"
              >
                <Linkedin className="h-4 w-4" /> Connect with us on LinkedIn
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 reveal">
          <div className="lg:flex lg:flex-col">
            {confirmation ? (
              <div className="border border-[var(--border)] bg-white p-7 lg:p-8 shadow-sm">
                <p className="folio-tag mb-1">Confirmed</p>
                <h2 className="font-serif text-2xl text-[var(--navy)] mb-3">You're booked.</h2>
                <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                  Your 30-minute discovery call is on the calendar. A Google Calendar invitation is
                  on its way to your inbox.
                </p>
                <div className="mt-4 space-y-1">
                  <p className="text-sm font-semibold text-[var(--navy)]">
                    {formatLongDay(confirmation.instant, confirmation.timeZone)},{" "}
                    {formatTimeWithZone(confirmation.instant, confirmation.timeZone)}
                  </p>
                  {confirmation.timeZone !== BOOKING.teamTimeZone && (
                    <p className="text-sm text-[var(--muted-foreground)]">
                      That's {formatTimeWithZone(confirmation.instant, BOOKING.teamTimeZone)} for us
                      in {BOOKING.teamCity}.
                    </p>
                  )}
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  {confirmation.meetLink && (
                    <a
                      href={confirmation.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97] hover:bg-[oklch(0.28_0.05_265)]"
                      style={{ background: "var(--navy)" }}
                    >
                      Join with Google Meet <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {calendarLink && (
                    <a
                      href={calendarLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold border border-[var(--navy)] text-[var(--navy)] transition-all duration-200 active:scale-[0.97] hover:bg-[var(--navy)] hover:text-white"
                    >
                      Add to my calendar
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setConfirmation(null)}
                    className="text-sm font-semibold text-[var(--meridian-text)] underline-offset-4 hover:underline"
                  >
                    Book another call
                  </button>
                </div>
              </div>
            ) : (
            <form
              onSubmit={onSubmit}
              className="border border-[var(--border)] bg-white p-7 lg:p-8 shadow-sm"
            >
              <p className="folio-tag mb-1">Start here</p>
              <h2 className="font-serif text-2xl text-[var(--navy)] mb-6">
                Request a Discovery Call
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Full name *</span>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian-text)] transition-colors"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Cooper"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Email *</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian-text)] transition-colors"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Company</span>
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian-text)] transition-colors"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name (optional)"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Interested in</span>
                  <select
                    id="service"
                    name="service"
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian-text)] transition-colors"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="">Select a service</option>
                    {SERVICES_SELECT.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Preferred date *</span>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={minDate}
                    required
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian-text)] transition-colors"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Preferred time *</span>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    required
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian-text)] transition-colors"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Your timezone *</span>
                  <select
                    id="timezone"
                    name="timezone"
                    required
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian-text)] transition-colors"
                    value={form.timeZone}
                    onChange={(e) => setForm({ ...form, timeZone: e.target.value })}
                  >
                    {!TIMEZONE_OPTIONS.some((zone) => zone.value === form.timeZone) && (
                      <option value={form.timeZone}>
                        {zoneCity(form.timeZone)} ({zoneOffsetLabel(form.timeZone)})
                      </option>
                    )}
                    {TIMEZONE_OPTIONS.map((zone) => (
                      <option key={zone.value} value={zone.value}>
                        {zoneCity(zone.value)} ({zoneOffsetLabel(zone.value)})
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {preview && (
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
                  {preview.day}, {preview.visitor}
                  {sameZone
                    ? ""
                    : ` — that's ${preview.team} in ${BOOKING.teamCity}`}
                </p>
              )}

              <label className="block mt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Anything else?</span>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian-text)] transition-colors resize-y"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your books: software, transaction volume, deadlines…"
                />
              </label>

              {/* Honeypot: hidden from people, tempting to bots. */}
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />
                </label>
              </div>

              <label className="mt-4 flex items-start gap-2.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--navy)]"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/privacy" className="underline text-[var(--meridian-text)] hover:text-[var(--navy)]">
                    Privacy Policy
                  </Link>{" "}
                  and consent to being contacted about this request.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97] disabled:opacity-60 hover:bg-[oklch(0.28_0.05_265)]"
                style={{ background: "var(--navy)" }}
              >
                {submitting ? "Sending…" : "Request Discovery Call"} <Send className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs text-[var(--muted-foreground)] text-center">
                You'll get a calendar invite and Google Meet link as soon as you submit
              </p>
            </form>
            )}


          </div>
          </div>
        </div>
      </section>

      <section className="pb-14 lg:pb-20 border-t border-[var(--border)]" style={{ background: "color-mix(in oklch, var(--navy) 4%, white)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 reveal">
              <p className="folio-tag mb-3">Get in Touch</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-[var(--navy)] reveal">
                One email is all it takes.
              </h2>
              <p className="mt-4 text-base text-[var(--muted-foreground)] leading-relaxed max-w-xl reveal">
                Email us or request a discovery call. we respond within 1 US business day and
                always reply to a real human, not a chatbot.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(BRAND.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97] hover:opacity-90"
                  style={{ background: "var(--navy)" }}
                >
                  <Mail className="h-4.5 w-4.5" />
                  {BRAND.email}
                </a>
                <div className="flex items-center gap-3">
                  <a
                    href={BRAND.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Team Yulsa on LinkedIn"
                    className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-white text-[var(--navy)] hover:text-[var(--meridian-text)] hover:border-[var(--meridian)] transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={BRAND.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Team Yulsa on X"
                    className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-white text-[var(--navy)] hover:text-[var(--meridian-text)] hover:border-[var(--meridian)] transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={BRAND.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Team Yulsa on WhatsApp"
                    className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-white text-[var(--navy)] hover:text-[var(--meridian-text)] hover:border-[var(--meridian)] transition-colors"
                  >
                    <img src={asset("whatsapp.svg")} alt="" aria-hidden="true" className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 reveal">
              <div className="grid grid-cols-4 gap-6 border border-[var(--border)] bg-white p-6">
                <div>
                  <p className="stat-num text-3xl font-semibold text-[var(--meridian-text)]">30</p>
                  <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-[var(--muted-foreground)] mt-1">min free discovery call</p>
                </div>
                <div>
                  <p className="stat-num text-3xl font-semibold text-[var(--meridian-text)]">5</p>
                  <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-[var(--muted-foreground)] mt-1">business-day close SLA</p>
                </div>
                <div>
                  <p className="stat-num text-3xl font-semibold text-[var(--meridian-text)]">1</p>
                  <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-[var(--muted-foreground)] mt-1">US biz day reply time</p>
                </div>
                <div>
                  <p className="stat-num text-3xl font-semibold text-[var(--meridian-text)]">$0</p>
                  <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-[var(--muted-foreground)] mt-1">no obligation to book</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container max-w-3xl">
          <p className="folio-tag mb-3 reveal">FAQ</p>
          <h2 className="font-serif text-3xl text-[var(--navy)] mb-8 reveal">
            Questions we hear most
          </h2>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {FAQS.map((f, i) => (
              <FAQItem key={f.q} question={f.q} answer={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FAQItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div>
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-serif text-lg text-[var(--navy)]">{question}</span>
        <span
          className={`stat-num text-xl text-[var(--meridian-text)] transition-transform duration-200 shrink-0 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm lg:text-[0.9375rem] text-[var(--muted-foreground)] leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

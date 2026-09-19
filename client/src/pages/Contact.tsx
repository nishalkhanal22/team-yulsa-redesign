/*
  MERIDIAN PRECISION — Contact page.
  Lead-gen focus: discovery call framing and US phone line,
  FAQ accordion with FAQPage JSON-LD (audit fix).
*/
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send, Linkedin, Twitter, CalendarDays } from "lucide-react";
import Layout from "@/components/Layout";
import { BRAND, FAQS } from "@/lib/siteData";
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
  "Not sure — I'd like guidance",
];

const TIMEZONE_OPTIONS = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
  { value: "America/Halifax", label: "Atlantic Time (AT)" },
  { value: "America/Toronto", label: "Canada Eastern Time" },
  { value: "America/Winnipeg", label: "Canada Central Time" },
  { value: "America/Edmonton", label: "Canada Mountain Time" },
  { value: "America/Vancouver", label: "Canada Pacific Time" },
];

export default function Contact() {
  useReveal();

  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", date: "", time: "", timezone: "America/New_York", message: "" });
  const [submitting, setSubmitting] = useState(false);

  // FAQPage structured data (audit fix)
  useEffect(() => {
    let script = document.getElementById("faq-contact") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "faq-contact";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    return () => {
      script?.remove();
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in your name and email so we can reach you.");
      return;
    }
    if (!form.date || !form.time) {
      toast.error("Please choose your preferred date and time.");
      return;
    }

    setSubmitting(true);
    try {
      const body = new URLSearchParams({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        service: form.service,
        date: form.date,
        time: form.time,
        timezone: form.timezone,
        message: form.message.trim(),
      });

      await fetch(BRAND.bookingEndpoint, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      toast.success("Your discovery call has been booked successfully. Check your email for the Google Meet invitation.");
      setForm({ name: "", email: "", company: "", service: "", date: "", time: "", timezone: "America/New_York", message: "" });
    } catch {
      toast.error("We could not submit your booking. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout path="/contact">
      <section className="pt-28 lg:pt-36 pb-12">
        <div className="container grid lg:grid-cols-12 gap-8 lg:gap-0">
          <div className="lg:col-span-7">
            <p className="folio-tag mb-3 reveal">Contact · US &amp; Canada</p>
            <h1 className="font-serif text-4xl lg:text-5xl text-[var(--navy)] leading-tight reveal">
              Let's make your books
              <br />
              run themselves.
            </h1>
            <p className="mt-5 text-base lg:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-xl reveal">
              Book a 30-minute discovery call and tell us about your business, accounting workflow,
              and preferred time. We will review the details and follow up with the next step.
            </p>

            <div className="mt-8 space-y-4">
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-sm text-[var(--ink)] hover:text-[var(--meridian)] transition-colors">
                <Mail className="h-5 w-5 text-[var(--meridian)]" />
                <span className="font-medium">{BRAND.email}</span>
              </a>
              {BRAND.phoneDisplay && (
                <a href={BRAND.phoneHref} className="flex items-center gap-3 text-sm text-[var(--ink)] hover:text-[var(--meridian)] transition-colors">
                  <Phone className="h-5 w-5 text-[var(--meridian)]" />
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--navy)] hover:text-[var(--meridian)] transition-colors"
              >
                <Linkedin className="h-4 w-4" /> Connect with us on LinkedIn
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 reveal">
          <div className="lg:flex lg:flex-col">
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
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian)] transition-colors"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Cooper"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Email *</span>
                  <input
                    type="email"
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian)] transition-colors"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Company</span>
                  <input
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian)] transition-colors"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company name (optional)"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Interested in</span>
                  <select
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian)] transition-colors"
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
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Preferred date</span>
                  <input type="date" className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian)] transition-colors" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Preferred time *</span>
                  <input type="time" className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian)] transition-colors" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Your timezone *</span>
                  <select
                    required
                    className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian)] transition-colors"
                    value={form.timezone}
                    onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                  >
                    {TIMEZONE_OPTIONS.map((zone) => (
                      <option key={zone.value} value={zone.value}>{zone.label}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block mt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Anything else?</span>
                <textarea
                  rows={4}
                  className="mt-1.5 w-full border border-[var(--input)] bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[var(--meridian)] transition-colors resize-y"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your books — software, transaction volume, deadlines…"
                />
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
                We reply within one US business day · preferred times are subject to confirmation
              </p>
            </form>


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
                Email us or request a discovery call — we respond within 1 US business day and
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
                <a
                  href={BRAND.calendar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 text-sm font-semibold border border-[var(--navy)] bg-white text-[var(--navy)] hover:border-[var(--meridian)] hover:text-[var(--meridian)] transition-colors"
                >
                  <CalendarDays className="h-4.5 w-4.5" />
                  Open Google Calendar
                </a>
                <div className="flex items-center gap-3">
                  <a
                    href={BRAND.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Team Yulsa on LinkedIn"
                    className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-white text-[var(--navy)] hover:text-[var(--meridian)] hover:border-[var(--meridian)] transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={BRAND.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Team Yulsa on X"
                    className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-white text-[var(--navy)] hover:text-[var(--meridian)] hover:border-[var(--meridian)] transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 reveal">
              <div className="grid grid-cols-4 gap-6 border border-[var(--border)] bg-white p-6">
                <div>
                  <p className="stat-num text-3xl font-semibold text-[var(--meridian)]">30</p>
                  <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-[var(--muted-foreground)] mt-1">min free discovery call</p>
                </div>
                <div>
                  <p className="stat-num text-3xl font-semibold text-[var(--meridian)]">5</p>
                  <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-[var(--muted-foreground)] mt-1">business-day close SLA</p>
                </div>
                <div>
                  <p className="stat-num text-3xl font-semibold text-[var(--meridian)]">1</p>
                  <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-[var(--muted-foreground)] mt-1">US biz day reply time</p>
                </div>
                <div>
                  <p className="stat-num text-3xl font-semibold text-[var(--meridian)]">$0</p>
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
          className={`stat-num text-xl text-[var(--meridian)] transition-transform duration-200 shrink-0 ${open ? "rotate-45" : ""}`}
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

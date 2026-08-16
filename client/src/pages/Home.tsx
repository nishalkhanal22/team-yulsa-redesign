/*
  MERIDIAN PRECISION — Home page.
  Asymmetric 55/45 hero, folio tags, ledger rules, stat numerals, process rail.
  SEO: single keyword-focused H1 (audit fix). No fabricated testimonials (policy).
*/
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Clock,
  DollarSign,
} from "lucide-react";
import Layout from "@/components/Layout";
import CtaBand from "@/components/CtaBand";
import { SERVICES, INDUSTRIES, PROCESS_STEPS, STATS, BRAND, SOCIALS } from "@/lib/siteData";
import { Calculator, FileSpreadsheet, PiggyBank, ClipboardList, RefreshCcw, Mail, LineChart, FileBarChart, Target, Landmark, Linkedin, Facebook, Instagram, MessageCircle, ArrowUpRight as ArrowUpRightIcon } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useEffect, useRef, useState } from "react";

const HERO_IMG = "/manus-storage/hero-office_05c0bd7f.png";
const PROCESS_IMG = "/manus-storage/process-workflow_66aa4f70.png";
const LOGO = "/manus-storage/yulsa-logo_2bfeef45.png";
const TEAM_PHOTOS = [
  { name: "Sagun Jung Rana", role: "Founder · CA", photo: "/manus-storage/sagun_ca_0b9ac2f3.png" },
  { name: "Prabesh Bhusal", role: "Senior Associate", photo: "/manus-storage/prabesh_57af839c.png" },
  { name: "Nisha Khanal", role: "IFRS Consultant", photo: "/manus-storage/nisha_94569046.png" },
  { name: "Aayush Shah", role: "Senior Associate", photo: "/manus-storage/aayush2_20008bc2.png" },
  { name: "Himal Ayman Karki", role: "Senior Associate", photo: "/manus-storage/himal_485516ec.png" },
  { name: "Sarjan Jung Rana", role: "Tax Associate", photo: "/manus-storage/sarjan_f1cd7225.png" },
];

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Accounting: Calculator,
  "Tax Filing": FileBarChart,
  "Accounts": ClipboardList,
  "Year-end": RefreshCcw,
  Migration: Mail,
  Invoice: FileSpreadsheet,
  Bank: PiggyBank,
  Management: LineChart,
  Budgeting: Target,
  Virtual: Landmark,
};

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="stat-num text-4xl lg:text-5xl font-semibold" style={{ color: "var(--meridian)" }}>
      {display}
      {suffix}
    </span>
  );
}

export default function Home() {
  useReveal();

  return (
    <Layout path="/">
      {/* ── Hero: split with rich photo edge-to-edge ── */}
      <section className="pt-24 lg:pt-32 pb-0 overflow-hidden">
        <div className="container grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7 pb-10 lg:pb-16">
            <p className="folio-tag mb-4 reveal">Bookkeeping · Accounting · Virtual CFO · US &amp; Canada</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.06] text-[var(--navy)] reveal">
              Your books, balanced.
              <br />
              <em className="text-[var(--meridian)]">Your week, back.</em>
            </h1>
            <p className="mt-5 text-base lg:text-lg leading-relaxed text-[var(--muted-foreground)] max-w-xl reveal">
              Team Yulsa is the outsourced accounting team for US and Canadian small businesses
              and CPA firms — QuickBooks and Xero experts who close your books monthly, keep you
              tax-ready year-round, and report in plain English.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 reveal">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97] hover:bg-[oklch(0.28_0.05_265)]"
                style={{ background: "var(--navy)" }}
              >
                Book a Free Discovery Call <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold border border-[var(--navy)] text-[var(--navy)] transition-all duration-200 active:scale-[0.97] hover:bg-[var(--navy)] hover:text-white"
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-[var(--muted-foreground)] reveal">
              <span className="inline-flex items-center gap-1.5"><DollarSign className="h-4 w-4 text-[var(--meridian)]" /> ~40% less than in-house US bookkeeping</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-[var(--meridian)]" /> US &amp; Canada business-hours coverage</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[var(--meridian)]" /> Read-only access · NDA protected</span>
            </div>
          </div>
        </div>
        {/* Trust strip with real team faces */}
        <div className="container pb-6 pt-2">
          <div className="flex items-center gap-4 reveal">
            <div className="flex -space-x-2.5">
              {TEAM_PHOTOS.map((t) => (
                <img
                  key={t.name}
                  src={t.photo}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover object-top ring-2 ring-[oklch(0.99_0.003_85)]"
                  loading="eager"
                />
              ))}
            </div>
            <p className="text-[0.8125rem] leading-snug text-[var(--muted-foreground)]">
              <span className="font-semibold text-[var(--navy)]">9 certified specialists</span> across bookkeeping, tax &amp; reporting
            </p>
          </div>
        </div>
        {/* Full-width photo band beneath the hero text */}
        <div className="relative mt-6 lg:mt-0">
          <img
            src={HERO_IMG}
            alt="Team Yulsa accountants reviewing financial dashboards with a client"
            className="relative w-full h-[300px] lg:h-[380px] object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,25,47,0.55)] via-transparent to-transparent" />
          <div className="absolute bottom-5 left-0 right-0">
            <div className="container flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={LOGO} alt="" className="h-8 w-8" />
                <div>
                  <p className="stat-num text-xl font-semibold text-white leading-none">100%</p>
                  <p className="text-[0.6875rem] uppercase tracking-wider text-white/75">on-time delivery</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-8 text-white/85">
                {["USD & CAD", "US GAAP", "IRS · CRA ready"].map((t) => (
                  <span key={t} className="text-xs font-mono uppercase tracking-[0.15em]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat band ── */}
      <section className="border-y border-[var(--border)] bg-white">
        <div className="container py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="reveal">
              <CountUp value={s.value} suffix={s.suffix} />
              <p className="mt-2 text-xs lg:text-[0.8125rem] leading-snug text-[var(--muted-foreground)] max-w-[24ch]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services overview ── */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div className="max-w-xl">
              <p className="folio-tag mb-3 reveal">01 / Services</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-[var(--navy)] reveal">
                Ten services. One clean ledger.
              </h2>
            </div>
            <Link href="/services" className="text-sm font-semibold text-[var(--navy)] inline-flex items-center gap-1.5 hover:text-[var(--meridian)] transition-colors reveal">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                href="/services"
                className="group bg-white p-6 lg:p-7 hover:bg-[oklch(0.975_0.01_90)] transition-colors duration-200 reveal"
              >
                <p className="folio-tag mb-3">{s.folio}</p>
                {(() => {
                  const Icon = Object.entries(SERVICE_ICONS).find(([k]) => s.title.startsWith(k))?.[1];
                  return Icon ? (
                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.96_0.02_160)] text-[var(--meridian)] transition-colors duration-200 group-hover:bg-[var(--meridian)] group-hover:text-white">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                  ) : null;
                })()}
                <h3 className="font-serif text-xl text-[var(--navy)] group-hover:text-[var(--meridian)] transition-colors">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Team Yulsa (US/Canada angle) ── */}
      <section className="py-16 lg:py-24 bg-white border-t border-[var(--border)]">
        <div className="container grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 reveal">
            <p className="folio-tag mb-3">02 / Why Team Yulsa</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-[var(--navy)] leading-tight">
              Big-firm discipline,
              <br />
              fraction of the cost.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--muted-foreground)]">
              A US-based bookkeeper typically costs $50,000–$80,000 per year plus benefits. Our
              dedicated team delivers the same month-end close, reconciliation rigor, and reporting
              quality at roughly 60% of that cost — because we specialize, standardize, and scale.
            </p>
            <ul className="mt-6 space-y-3.5">
              {[
                ["US & Canada focus", "We work in USD and CAD, follow US GAAP, and support IRS and CRA filing requirements including 1099s, T4s, and sales tax workpapers."],
                ["Certified expertise", "Led by a Chartered Accountant with consultants across IFRS, tax, and software migration."],
                ["Fixed monthly pricing", "One predictable fee based on volume. No surprise invoices, no hourly creep."],
                ["Zero overhead for you", "No recruiting, no training, no benefits — flex up or down as your business changes."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-[var(--meridian)]" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--navy)]">{t}</p>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 reveal">
            <img
              src={PROCESS_IMG}
              alt="Illustration of the four-step Team Yulsa engagement process from discovery to monthly reporting"
              className="w-full rounded-md"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mb-10 max-w-xl">
            <p className="folio-tag mb-3 reveal">03 / Industries</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-[var(--navy)] reveal">
              Industry-specific books, not generic bookkeeping.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind, i) => (
              <Link
                key={ind.id}
                href={`/industries/${ind.slug}`}
                className="group border border-[var(--border)] bg-white p-6 hover:border-[var(--meridian)] hover:shadow-md transition-all duration-200 reveal"
              >
                <p className="folio-tag mb-3">IND 0{i + 1}</p>
                <h3 className="font-serif text-xl text-[var(--navy)] group-hover:text-[var(--meridian)] transition-colors">
                  {ind.name}
                </h3>
                <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">{ind.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--navy)] group-hover:gap-2.5 transition-all">
                  See how we help <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-16 lg:py-24 bg-white border-t border-[var(--border)]">
        <div className="container">
          <div className="mb-10 max-w-xl">
            <p className="folio-tag mb-3 reveal">04 / How it works</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-[var(--navy)] reveal">
              From first call to first clean close in 30 days.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
            {PROCESS_STEPS.map((step) => (
              <div key={step.n} className="bg-white p-6 reveal">
                <p className="stat-num text-2xl font-semibold text-[var(--meridian)] mb-3">{step.n}</p>
                <h3 className="font-serif text-lg text-[var(--navy)]">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-2 text-xs text-[var(--muted-foreground)] reveal">
            <Globe2 className="h-3.5 w-3.5 text-[var(--meridian)]" />
            Onboarding typically completes within 5 business days — secure, read-only, and guided by a kickoff checklist.
          </p>
        </div>
      </section>

      {/* ── Software we work with ── */}
      <section className="py-14 lg:py-18 border-t border-[var(--border)] bg-white">
        <div className="container">
          <p className="folio-tag mb-3 reveal">Tools · Certified Expertise</p>
          <h2 className="font-serif text-2xl lg:text-3xl text-[var(--navy)] max-w-lg reveal">
            Certified on the platforms your business already uses
          </h2>
          <p className="mt-3 text-sm text-[var(--muted-foreground)] max-w-xl leading-relaxed reveal">
            We connect through your accounting software's official accountant channels — read-only
            access, so you keep full control of your data.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 reveal">
            {[
              { name: "QuickBooks Online", sub: "Plus Desktop", color: "var(--meridian)", icon: "QB" },
              { name: "Xero", sub: "Certified Advisor", color: "#13B5EA", icon: "Xr" },
              { name: "FreshBooks", sub: "Accountant Portal", color: "#3350DB", icon: "FB" },
              { name: "Wave", sub: "Advisor Partner", color: "#014980", icon: "Wv" },
              { name: "Power BI", sub: "Reporting", color: "#F2C811", icon: "PB" },
              { name: "ADP Payroll", sub: "Processing", color: "#D0171E", icon: "AD" },
              { name: "Acumatica", sub: "Cloud ERP", color: "#8B5CF6", icon: "Ac" },
              { name: "Zoho Books", sub: "Certified Partner", color: "#E42527", icon: "ZB" },
            ].map((sw) => (
              <div
                key={sw.name}
                className="border border-[var(--border)] bg-white p-4 hover:border-[var(--meridian)] hover:shadow-md transition-all duration-200 reveal"
              >
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md font-bold text-xs text-white mb-3"
                  style={{ background: sw.color }}
                >
                  {sw.icon}
                </span>
                <p className="text-sm font-semibold text-[var(--navy)] leading-tight">{sw.name}</p>
                <p className="mt-0.5 text-[0.6875rem] text-[var(--muted-foreground)]">{sw.sub}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-[var(--muted-foreground)] max-w-2xl reveal">
            We connect through each platform's official accountant channels with read-only access,
            so you keep full control of your data.
          </p>
        </div>
      </section>

      {/* ── Contact section ── */}
      <section className="py-16 lg:py-20 border-t border-[var(--border)]" style={{ background: "color-mix(in oklch, var(--navy) 4%, white)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 reveal">
              <p className="folio-tag mb-3">Get in Touch</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-[var(--navy)] reveal">
                One email is all it takes.
              </h2>
              <p className="mt-4 text-base text-[var(--muted-foreground)] leading-relaxed max-w-xl reveal">
                Email us or book a free discovery call — we respond within 1 US business day and
                always reply to a real human, not a chatbot.
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="mt-6 inline-flex items-center gap-3 px-6 py-4 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97] hover:opacity-90"
                style={{ background: "var(--navy)" }}
              >
                <Mail className="h-4.5 w-4.5" />
                {BRAND.email}
              </a>
              <Link
                href="/contact"
                className="ml-0 lg:ml-4 mt-6 inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold border border-[var(--navy)] text-[var(--navy)] transition-all duration-200 active:scale-[0.97] hover:bg-[var(--navy)] hover:text-white"
              >
                Book a discovery call <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:col-span-5 reveal">
              <div className="border border-[var(--border)] bg-white p-6">
                <p className="folio-tag mb-4">Follow us</p>
                <div className="flex items-center gap-3">
                  {SOCIALS.map((s) => {
                    const Icon = s.name === "WhatsApp" ? MessageCircle : s.name === "LinkedIn" ? Linkedin : s.name === "Facebook" ? Facebook : s.name === "Instagram" ? Instagram : Linkedin;
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Team Yulsa on ${s.name}`}
                        className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] text-[var(--navy)] hover:text-[var(--meridian)] hover:border-[var(--meridian)] transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
                <p className="mt-5 text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {BRAND.hours}
                  <br />
                  {BRAND.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </Layout>
  );
}

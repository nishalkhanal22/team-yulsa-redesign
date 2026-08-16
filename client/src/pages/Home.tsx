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
import { SERVICES, INDUSTRIES, PROCESS_STEPS, STATS } from "@/lib/siteData";
import { useReveal } from "@/hooks/useReveal";
import { useEffect, useRef, useState } from "react";

const HERO_IMG = "/manus-storage/hero-office_05c0bd7f.png";
const PROCESS_IMG = "/manus-storage/process-workflow_66aa4f70.png";
const LOGO = "/manus-storage/yulsa-logo_2bfeef45.png";

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
      {/* ── Hero: asymmetric 55/45 ── */}
      <section className="pt-28 lg:pt-36 pb-14 lg:pb-20">
        <div className="container relative grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-7">
            <p className="folio-tag mb-4 reveal">Bookkeeping · Accounting · Virtual CFO · US &amp; Canada</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-[var(--navy)] reveal">
              Your books, balanced.
              <br />
              Your week, back.
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
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <img
                src={HERO_IMG}
                alt="Team Yulsa accountants reviewing financial dashboards with a client"
                className="relative w-full aspect-[4/3] object-cover"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4 bg-[oklch(0.18_0.04_265)]/95 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
                <img src={LOGO} alt="" className="h-7 w-7" />
                <div>
                  <p className="stat-num text-lg font-semibold text-white leading-none">98%</p>
                  <p className="text-[0.6875rem] uppercase tracking-wider text-white/70">on-time close rate</p>
                </div>
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

      <CtaBand />
    </Layout>
  );
}

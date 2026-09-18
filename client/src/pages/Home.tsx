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
import { BRAND, PROCESS_STEPS, STATS, SOFTWARE_GROUPS } from "@/lib/siteData";
import { ASSETS, asset } from "@/lib/assets";
import { Calculator, FileSpreadsheet, PiggyBank, ClipboardList, RefreshCcw, Mail, LineChart, FileBarChart, Target, Landmark } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const HERO_IMG = ASSETS.heroOffice;
const PROCESS_IMG = ASSETS.processWorkflow;
const LOGO = ASSETS.logo;
const TEAM_PHOTOS = [
  { name: "Sagun Jung Rana", role: "Founder · CA", photo: asset("sagun_ca_0b9ac2f3.png") },
  { name: "Prabesh Bhusal", role: "Senior Associate", photo: asset("prabesh_57af839c.png") },
  { name: "Nisha Khanal", role: "IFRS Consultant", photo: asset("nisha_94569046.png") },
  { name: "Aayush Shah", role: "Senior Associate", photo: asset("aayush2_20008bc2.png") },
  { name: "Himal Ayman Karki", role: "Senior Associate", photo: asset("himal_485516ec.png") },
  { name: "Sarjan Jung Rana", role: "Tax Associate", photo: asset("sarjan_f1cd7225.png") },
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

function CountUp({ display }: { display: string }) {
  return (
    <span className="stat-num text-4xl lg:text-5xl font-semibold" style={{ color: "var(--meridian)" }}>
      {display}
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
              <a
                href={BRAND.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97] hover:bg-[oklch(0.28_0.05_265)]"
                style={{ background: "var(--navy)" }}
              >
                Book a Free Discovery Call <ArrowUpRight className="h-4 w-4" />
              </a>
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
        <div className="container relative mt-6 lg:mt-0 grid lg:grid-cols-12 gap-px bg-[var(--navy)]">
          <div className="relative lg:col-span-7 min-h-[300px] lg:min-h-[380px] overflow-hidden bg-[var(--navy)]">
            <img
              src={HERO_IMG}
              alt="Team Yulsa accountants reviewing financial dashboards with a client"
              className="h-full min-h-[300px] lg:min-h-[380px] w-full object-cover opacity-90"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,25,47,0.7)] via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 lg:left-7 flex items-center gap-3">
              <img src={LOGO} alt="" className="h-8 w-8" />
              <div>
                <p className="stat-num text-xl font-semibold text-white leading-none">100%</p>
                <p className="text-[0.6875rem] uppercase tracking-wider text-white/75">on-time delivery commitment</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 bg-[var(--navy)] p-6 lg:p-8 text-white">
            <div className="flex items-center justify-between gap-3">
              <p className="folio-tag text-white/65">Financial infrastructure</p>
              <ShieldCheck className="h-5 w-5 text-[var(--meridian)]" />
            </div>
            <h2 className="mt-10 font-serif text-2xl lg:text-3xl leading-tight">A clean close gives every next decision a firmer foundation.</h2>
            <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
              {[
                ["Source systems", "QuickBooks · Xero · more"],
                ["Close rhythm", "Monthly, on your schedule"],
                ["Report language", "Plain English, decision-ready"],
                ["Coverage", "USD · CAD · US/Canada hours"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/55">{label}</span>
                  <span className="text-right text-white/90">{value}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-white/60">A human team, structured process, and secure access — working together instead of leaving you to connect the dots.</p>
          </div>
        </div>
      </section>

      {/* ── Stat band ── */}
      <section className="border-y border-[var(--border)] bg-white">
        <div className="container py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="reveal">
              <CountUp display={s.display} />
              <p className="mt-2 text-xs lg:text-[0.8125rem] leading-snug text-[var(--muted-foreground)] max-w-[24ch]">{s.label}</p>
            </div>
          ))}
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

      {/* ── Financial visibility ── */}
      <section className="py-16 lg:py-24 bg-[oklch(0.97_0.01_90)] border-y border-[var(--border)]">
        <div className="container grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 reveal">
            <p className="folio-tag mb-3">03 / Financial visibility</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-[var(--navy)] leading-tight">
              Your books should explain the business, not just record it.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--muted-foreground)]">
              We turn reconciled accounts into a monthly view your owners, operators, and CPAs can actually use — with the right level of detail for your industry.
            </p>
            <div className="mt-7 grid sm:grid-cols-2 gap-3">
              {["Revenue by channel", "Margin by service", "Cash by week", "Plain-English notes"].map((item) => (
                <div key={item} className="flex items-center gap-2 border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--navy)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--meridian)]" />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/how-it-works" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--navy)] hover:text-[var(--meridian)] transition-colors reveal">
              See the reporting journey <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7 reveal">
            <div className="border border-[var(--border)] bg-white shadow-[0_18px_50px_rgba(15,32,55,0.08)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Illustrative monthly view</p>
                  <p className="mt-1 font-serif text-xl text-[var(--navy)]">Management snapshot</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--meridian)]"><ShieldCheck className="h-4 w-4" /> Secure workflow</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-px bg-[var(--border)]">
                {["Income statement", "Balance sheet", "Cash outlook", "Action notes"].map((label, index) => (
                  <div key={label} className="bg-white p-5">
                    <p className="text-xs font-mono uppercase tracking-[0.12em] text-[var(--muted-foreground)]">{label}</p>
                    <div className="mt-5 flex items-end gap-1.5 h-12">
                      {[25, 40, 60, 80, 60, 100].map((width, barIndex) => (
                        <span
                          key={`${label}-${barIndex}`}
                          className="block"
                          style={{
                            width: `${width}%`,
                            height: `${12 + ((barIndex + index) % 4) * 8}px`,
                            background: barIndex === 5 ? "var(--meridian)" : "oklch(0.84 0.04 160)",
                          }}
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-[var(--muted-foreground)]">Built around the accounts and KPIs your team uses.</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--border)] px-5 py-4 text-xs leading-relaxed text-[var(--muted-foreground)]">Example layout only — not client data. Reporting scope is agreed before work begins.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-16 lg:py-24 bg-white border-t border-[var(--border)]">
        <div className="container">
          <div className="mb-10 max-w-xl">
            <p className="folio-tag mb-3 reveal">05 / How it works</p>
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
          <h2 className="font-serif text-2xl lg:text-3xl text-[var(--navy)] max-w-lg reveal">One team across your finance stack</h2>
          <p className="mt-3 text-sm text-[var(--muted-foreground)] max-w-xl leading-relaxed reveal">
            We connect through your accounting software's official accountant channels — read-only
            access, so you keep full control of your data.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 reveal">
            {SOFTWARE_GROUPS.map((group) => (
              <div key={group.label} className="border border-[var(--border)] bg-[oklch(0.99_0.002_85)] p-5">
                <p className="folio-tag mb-4">{group.label}</p>
                <ul className="space-y-2 text-sm font-semibold text-[var(--navy)]">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </Layout>
  );
}

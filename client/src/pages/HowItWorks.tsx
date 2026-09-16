/*
  MERIDIAN PRECISION — How It Works page.
  Editorial service journey with ledger rules, navy/meridian contrast, and practical proof.
  Bench-inspired structure only: Team Yulsa owns the copy, process, and visual system.
*/
import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  FileText,
  LockKeyhole,
  MessageCircleMore,
  ShieldCheck,
} from "lucide-react";
import Layout from "@/components/Layout";
import CtaBand from "@/components/CtaBand";
import { PROCESS_STEPS } from "@/lib/siteData";
import { ASSETS } from "@/lib/assets";
import { useReveal } from "@/hooks/useReveal";

const EXPECTATIONS = [
  {
    icon: ClipboardCheck,
    title: "A focused discovery call",
    text: "We learn how your business earns, pays, reports, and closes. You leave with a clear view of what should happen next.",
  },
  {
    icon: LockKeyhole,
    title: "A secure, guided setup",
    text: "You keep control of your credentials. We use read-only accountant access, a document checklist, and a defined handoff plan.",
  },
  {
    icon: FileText,
    title: "A reporting rhythm that fits",
    text: "Your books are closed on schedule and translated into practical reports your owner, operator, or CPA can use.",
  },
  {
    icon: MessageCircleMore,
    title: "A team that stays reachable",
    text: "Questions do not disappear into a ticket queue. You have a direct channel for context, review, and next-step decisions.",
  },
];

const REPORT_ROWS = [
  { label: "Revenue", value: "By service, channel, or location" },
  { label: "Expenses", value: "Categorized and reconciled" },
  { label: "Cash position", value: "Current and easy to review" },
  { label: "Next decisions", value: "Plain-English notes" },
];

export default function HowItWorks() {
  useReveal();

  return (
    <Layout path="/how-it-works">
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 bg-[oklch(0.97_0.01_90)] border-b border-[var(--border)]">
        <div className="container grid lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="folio-tag mb-4 reveal">How it works · A calmer close</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4.2rem] leading-[1.03] text-[var(--navy)] reveal">
              Clear books start with a
              <br />
              <em className="text-[var(--meridian)]">clear handoff.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-base lg:text-lg leading-relaxed text-[var(--muted-foreground)] reveal">
              Team Yulsa turns the first conversation into a repeatable operating rhythm: understand the business, secure the right access, close the books, and make the numbers easier to act on.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 reveal">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97] hover:bg-[oklch(0.28_0.05_265)]"
                style={{ background: "var(--navy)" }}
              >
                Book a Free Discovery Call <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold border border-[var(--navy)] text-[var(--navy)] transition-all duration-200 active:scale-[0.97] hover:bg-[var(--navy)] hover:text-white"
              >
                See the service scope <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 reveal">
            <div className="relative overflow-hidden border border-[var(--navy)] bg-[var(--navy)] p-7 lg:p-8 text-white">
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full border border-white/15" />
              <div className="absolute right-8 top-8 h-14 w-14 rounded-full border border-[var(--meridian)]/60" />
              <p className="folio-tag text-white/65">The engagement promise</p>
              <p className="mt-8 font-serif text-3xl leading-tight">No black box. No surprise handoff. No guessing what the numbers mean.</p>
              <div className="mt-8 border-t border-white/15 pt-5 text-sm leading-relaxed text-white/70">
                Fixed monthly scope, US/Canada business-hour overlap, and a reporting rhythm built around your decisions.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="mb-10 max-w-2xl">
            <p className="folio-tag mb-3 reveal">01 / The journey</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-[var(--navy)] reveal">Four steps from first conversation to dependable monthly reporting.</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)] reveal">
              The work is structured, but never generic. Each stage is designed to remove one source of friction from your finance function.
            </p>
          </div>
          <div className="grid lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.n} className="bg-white p-6 lg:p-7 reveal" style={{ transitionDelay: `${index * 55}ms` }}>
                <p className="stat-num text-3xl font-semibold text-[var(--meridian)]">{step.n}</p>
                <h3 className="mt-5 font-serif text-xl text-[var(--navy)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">{step.text}</p>
                <div className="mt-6 h-px bg-[var(--border)]" />
                <p className="mt-4 text-[0.7rem] font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Stage {index + 1} of 4</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white border-y border-[var(--border)]">
        <div className="container grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 reveal">
            <p className="folio-tag mb-3">02 / What you receive</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-[var(--navy)] leading-tight">Reports that make the next decision easier.</h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--muted-foreground)]">
              The point of clean books is not another spreadsheet. It is a reliable monthly view of revenue, expenses, cash, and the questions worth asking next.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                "A completed month-end close with reconciled accounts",
                "Financial statements prepared for your business context",
                "Exception notes where something needs your attention",
                "A consistent handoff for your CPA, tax preparer, or leadership team",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  <Check className="h-5 w-5 shrink-0 text-[var(--meridian)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 reveal">
            <div className="border border-[var(--border)] bg-[oklch(0.98_0.004_85)] shadow-[0_18px_50px_rgba(15,32,55,0.08)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-[var(--muted-foreground)]">Illustrative monthly view</p>
                  <p className="mt-1 font-serif text-xl text-[var(--navy)]">Management snapshot</p>
                </div>
                <ShieldCheck className="h-5 w-5 text-[var(--meridian)]" />
              </div>
              <div className="grid sm:grid-cols-2 gap-px bg-[var(--border)]">
                {REPORT_ROWS.map((row) => (
                  <div key={row.label} className="bg-white p-5">
                    <p className="text-xs font-mono uppercase tracking-[0.12em] text-[var(--muted-foreground)]">{row.label}</p>
                    <p className="mt-3 font-serif text-lg text-[var(--navy)]">{row.value}</p>
                    <div className="mt-5 h-1.5 overflow-hidden bg-[oklch(0.93_0.01_90)]"><div className="h-full w-2/3 bg-[var(--meridian)]" /></div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--border)] px-5 py-4 text-xs leading-relaxed text-[var(--muted-foreground)]">
                Example layout only — not client data. Your reporting pack is scoped to the accounts, locations, and KPIs your team actually uses.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 reveal">
            <img src={ASSETS.processWorkflow} alt="Team Yulsa engagement process from discovery to monthly reporting" className="w-full rounded-md" loading="lazy" />
          </div>
          <div className="lg:col-span-6 reveal">
            <p className="folio-tag mb-3">03 / Your side of the handoff</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-[var(--navy)]">You stay in control of the relationship.</h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--muted-foreground)]">
              We do the accounting work, but the context stays with you. A short questionnaire, secure access, and timely answers are usually enough to keep the engagement moving.
            </p>
            <div className="mt-7 grid sm:grid-cols-2 gap-3">
              {["Share business context", "Connect your platform", "Upload requested documents", "Review the monthly pack"].map((item) => (
                <div key={item} className="border border-[var(--border)] bg-white p-4 text-sm font-semibold text-[var(--navy)]">{item}</div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-[var(--muted-foreground)]">Most onboarding checklists are completed within 5 business days. Timing depends on access, documents, and the complexity of your books.</p>
          </div>
        </div>
      </section>

      <CtaBand title="See what a calmer close could look like" sub="Book a free discovery call and we will map the right starting point for your books, software, and reporting needs." primaryLabel="Book a Free Discovery Call" secondaryLabel="Review Security" />
    </Layout>
  );
}

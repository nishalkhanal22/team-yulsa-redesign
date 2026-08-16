/*
  MERIDIAN PRECISION — Data Security page.
  Swiss asymmetric: mono folio rail on left, ledger-rule rows, oversized tabular numerals,
  compliance-coverage data table. No generic shield stock art — owned ledger linework.
*/
import Layout from "@/components/Layout";
import CtaBand from "@/components/CtaBand";
import { useReveal } from "@/hooks/useReveal";
import {
  EyeOff,
  Lock,
  Users,
  FileLock2,
  ClipboardCheck,
  ShieldCheck,
  Check,
} from "lucide-react";

const MEASURES = [
  {
    icon: EyeOff,
    title: "Read-only accountant access",
    text: "We connect through QuickBooks or Xero's official accountant channels with read-only permissions where possible. You keep all passwords and can revoke access in one click, any time.",
    stat: "1",
    statLabel: "click to revoke",
  },
  {
    icon: Lock,
    title: "Encrypted file transfer",
    text: "All documents move through encrypted channels — never personal email or consumer chat apps. Bank statements, payroll files, and tax documents are stored encrypted at rest.",
    stat: "256",
    statLabel: "bit AES encryption at rest",
  },
  {
    icon: Users,
    title: "Role-based team access",
    text: "Each client file is visible only to the team members assigned to your engagement. Access is reviewed quarterly and removed immediately when an engagement ends.",
    stat: "Q",
    statLabel: "arterly access review cycle",
  },
  {
    icon: FileLock2,
    title: "Signed NDAs on every engagement",
    text: "Every client signs a confidentiality agreement before work begins, and every team member is bound by the same agreement covering all client data, indefinitely.",
    stat: "100",
    statLabel: "% of engagements NDA-covered",
  },
  {
    icon: ClipboardCheck,
    title: "Documented procedures",
    text: "Every recurring task follows a written procedure reviewed by our founder — no tribal knowledge, no handoff gaps, and a clear audit trail of who did what, when.",
    stat: "1",
    statLabel: "procedure per recurring task",
  },
  {
    icon: ShieldCheck,
    title: "Client data never sold or reused",
    text: "Your financial data is used solely to perform your engagement. We do not sell, share, or mine client data for any other purpose, ever.",
    stat: "0",
    statLabel: "third-party data sharing — ever",
  },
];

const COVERAGE = [
  ["QuickBooks / Xero official accountant access", "Yes", "Built into onboarding"],
  ["Encrypted document portal (TLS + AES-256 at rest)", "Yes", "All client files"],
  ["Role-based internal permissions", "Yes", "Reviewed quarterly"],
  ["Signed NDA before work begins", "Yes", "Client + team member level"],
  ["Named team members per engagement", "Yes", "No pool-based handling"],
  ["Data deletion & access revocation on request", "Yes", "7-day completion SLA"],
];

export default function Security() {
  useReveal();

  return (
    <Layout path="/security">
      {/* ── Hero: left mono rail + asymmetric split ── */}
      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16">
        <div className="container grid lg:grid-cols-12 gap-8 lg:gap-0">
          {/* Mono folio rail */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-6 border-r border-[var(--border)] pr-6 reveal">
            <p className="folio-tag leading-relaxed">Trust &amp;<br />Security<br />Protocol</p>
            <p className="text-[0.6875rem] font-mono text-[var(--muted-foreground)] leading-relaxed mt-auto">
              SEC / 2026<br />
              v1.1
            </p>
          </div>
          <div className="lg:col-span-10 lg:pl-12">
            <p className="folio-tag mb-3 lg:hidden reveal">Data Security &amp; Confidentiality</p>
            <h1 className="font-serif text-4xl lg:text-[3.2rem] text-[var(--navy)] leading-[1.1] max-w-2xl reveal">
              Your financial data, protected like it's ours
            </h1>
            <p className="mt-5 text-base lg:text-lg text-[var(--muted-foreground)] max-w-xl leading-relaxed reveal">
              Financial data is the most sensitive thing a business owns. Here is exactly how we
              protect it — six commitments, measured and verifiable.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ledger rules rows ── */}
      <section className="pb-14 lg:pb-16">
        <div className="container">
          <div className="ledger-rule mb-0" />
          {MEASURES.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className="grid lg:grid-cols-12 gap-4 lg:gap-8 py-8 border-b border-[var(--border)] items-start reveal"
              >
                <div className="lg:col-span-1">
                  <p className="stat-num text-sm font-semibold text-[var(--muted-foreground)]">
                    SEC 0{i + 1}
                  </p>
                </div>
                <div className="lg:col-span-1">
                  <Icon className="h-6 w-6 text-[var(--meridian)]" />
                </div>
                <div className="lg:col-span-5">
                  <h2 className="font-serif text-xl lg:text-2xl text-[var(--navy)]">{m.title}</h2>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-[0.9375rem] text-[var(--muted-foreground)] leading-relaxed">{m.text}</p>
                </div>
                <div className="lg:col-span-2 lg:justify-self-end">
                  <p className="stat-num text-3xl lg:text-4xl font-semibold text-[var(--meridian)]">
                    {m.stat}
                  </p>
                  <p className="text-[0.6875rem] font-mono uppercase tracking-wider text-[var(--muted-foreground)] mt-1">
                    {m.statLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Compliance coverage table ── */}
      <section className="pb-16 lg:pb-24">
        <div className="container grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 reveal">
            <p className="folio-tag mb-3">Coverage Ledger</p>
            <h2 className="font-serif text-2xl lg:text-3xl text-[var(--navy)] leading-tight">
              Every control, written down
            </h2>
            <p className="mt-4 text-sm lg:text-[0.9375rem] text-[var(--muted-foreground)] leading-relaxed">
              This is the control ledger we hold ourselves to. Ask for the full version of our
              security agreement at any time — you'll receive it before work begins.
            </p>
          </div>
          <div className="lg:col-span-8 reveal">
            <div className="border border-[var(--border)] bg-white overflow-x-auto">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                    <th className="text-left font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold px-5 py-3.5">Control</th>
                    <th className="text-left font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold px-5 py-3.5">Status</th>
                    <th className="text-left font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--muted-foreground)] font-semibold px-5 py-3.5">Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {COVERAGE.map(([control, status, scope]) => (
                    <tr key={control} className="border-b border-[var(--border)] last:border-b-0">
                      <td className="px-5 py-3.5 text-[var(--ink)]">{control}</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--meridian)]">
                          <Check className="h-3.5 w-3.5" /> {status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[var(--muted-foreground)]">{scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Questions about how we'd handle your data?"
        sub="Ask us anything on a free discovery call — including for a copy of our confidentiality agreement before you share a single document."
      />
    </Layout>
  );
}

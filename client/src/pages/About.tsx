/*
  MERIDIAN PRECISION, About page.
  Operational, numbers-first voice (no generic mission/vision/values).
  Swiss asymmetric: mono folio rail, ledger-rule standards rows, team table with roles.
*/
import Layout from "@/components/Layout";
import CtaBand from "@/components/CtaBand";
import { asset } from "@/lib/assets";
import { useReveal } from "@/hooks/useReveal";
import { Check } from "lucide-react";

const STANDARDS = [
  {
    title: "Zero tolerance for financial errors",
    text: "Every month end file passes a two-person review: the assigned specialist closes it, a second reviewer reconciles it. Nothing ships without both signatures in the file.",
  },
  {
    title: "North American accounting readiness",
    text: "Our team works in USD and CAD, follows US GAAP conventions, and prepares the workpapers IRS and CRA filers actually ask for, 1099s, T4s, state and provincial sales tax schedules.",
  },
  {
    title: "Defined turnarounds, published uptime",
    text: "Month-end closes land within 5 business days. Priority requests during US hours get handled within 12 hours on average. Missed deadlines are credited, in writing.",
  },
  {
    title: "Confidentiality discipline",
    text: "Every team member is bound by client confidentiality agreements covering all engagements, indefinitely. Files are named, access is role-based, and revocation takes one click.",
  },
];

const TEAM = [
  { name: "Sagun Jung Rana", role: "Founder • Chartered Accountant", note: "Client strategy & quality review", photo: asset("sagun_ca_0b9ac2f3.png") },
  { name: "Prabesh Bhusal", role: "Senior Associate", note: "Month-end close & management reporting", photo: asset("prabesh_57af839c.png") },
  { name: "Nisha Khanal", role: "IFRS Consultant", note: "Standards compliance & audit readiness", photo: asset("nisha_94569046.png") },
  { name: "Aayush Shah", role: "Senior Associate", note: "Tax-season workflows & filing support", photo: asset("aayush2_20008bc2.png") },
  { name: "Himal Ayman Karki", role: "Senior Associate", note: "Software migrations & transitions", photo: asset("himal_485516ec.png") },
  { name: "Sarjan Jung Rana", role: "Tax Associate", note: "Tax workpapers & compliance", photo: asset("sarjan_f1cd7225.png") },
  { name: "Dinesh Puri", role: "Associate", note: "Reconciliations & AR/AP operations", photo: asset("dinesh_89398095.png") },
  { name: "Sujal Aryal", role: "Associate", note: "Budgeting, forecasting & reporting", photo: asset("sujal_429a0972.png") },
  { name: "Samrat Hamal", role: "IT Associate", note: "Data security, tooling & automation", photo: asset("samrat_746a0552.png") },
  { name: "HR Associate", role: "HR Associate", note: "People operations & team support", photo: "/manus-storage/hr_bdf89b86.jpeg" },
  { name: "Accounting Associate", role: "Accounting Associate", note: "Accounting operations & client support", photo: "/manus-storage/Gemini_Generated_Image_d821g8d821g8d821_d341153c.jpeg" },
];

export default function About() {
  useReveal();

  return (
    <Layout path="/about">
      {/* ── Hero: left mono rail + split ── */}
      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16">
        <div className="container grid lg:grid-cols-12 gap-8 lg:gap-0">
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-6 border-r border-[var(--border)] pr-6 reveal">
            <p className="folio-tag leading-relaxed">About<br />The<br />Practice</p>
            <p className="text-[0.6875rem] font-mono text-[var(--muted-foreground)] leading-relaxed mt-auto">
              YULSA ADVISOR<br />
              PVT. LTD. • KTM
            </p>
          </div>
          <div className="lg:col-span-10 lg:pl-12">
            <p className="folio-tag mb-3 lg:hidden reveal">About Team Yulsa</p>
            <h1 className="font-serif text-4xl lg:text-[3.2rem] text-[var(--navy)] leading-[1.1] max-w-3xl reveal">
              A Kathmandu practice, built to the standard a New York CPA would demand
            </h1>
            <p className="mt-6 text-base lg:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl reveal">
              Team Yulsa (Yulsa Advisor Pvt. Ltd.) serves small businesses and CPA firms across the
              United States and Canada. We do one thing, keep books clean, months closed, and
              reports actionable, and we hold ourselves to standards you can measure.
            </p>
            <p className="mt-4 text-base lg:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl reveal">
              Our founders trained as Chartered Accountants and IFRS consultants, then built a
              specialist team across bookkeeping, tax support, reporting, and financial strategy.
              One rule governs everything: <em className="text-[var(--navy)]">zero tolerance for financial errors</em>.
            </p>
          </div>
        </div>
      </section>

      {/* ── Operating standards: ledger rows ── */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div className="ledger-rule mb-0" />
          {STANDARDS.map((s, i) => (
            <div
              key={s.title}
              className="grid lg:grid-cols-12 gap-4 lg:gap-8 py-8 border-b border-[var(--border)] items-start reveal"
            >
              <div className="lg:col-span-5">
                <h2 className="font-serif text-xl lg:text-2xl text-[var(--navy)] leading-snug">{s.title}</h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-[0.9375rem] text-[var(--muted-foreground)] leading-relaxed">{s.text}</p>
              </div>
              {i === STANDARDS.length - 1 && null}
            </div>
          ))}
        </div>
      </section>

      {/* ── Team: numbered table ── */}
      <section className="pb-16 lg:pb-24 bg-white border-t border-[var(--border)]">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 items-end mb-10">
            <div className="lg:col-span-8">
              <p className="folio-tag mb-3 reveal">The Team</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-[var(--navy)] reveal">
                Certified specialists, not a call center
              </h2>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end reveal">
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                One named team per engagement, you'll always know exactly who is working on your books.
              </p>
            </div>
          </div>

          {/* ── Team photos: single horizontal row ── */}
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
            {TEAM.filter((m) => m.photo).map((m) => (
              <figure key={m.name} className="group relative shrink-0 w-[150px] md:w-[170px] overflow-hidden rounded-lg reveal snap-start">
                <img
                  src={m.photo}
                  alt={`${m.name}, ${m.role}`}
                  className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(10,25,47,0.85)] via-[rgba(10,25,47,0.35)] to-transparent p-3 pt-10">
                  <figcaption>
                    <p className="font-serif text-white text-sm leading-tight">{m.name}</p>
                    <p className="text-[0.625rem] font-mono uppercase tracking-wider text-white/75 mt-0.5">{m.role}</p>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>


          <p className="mt-4 flex items-center gap-2 text-xs text-[var(--muted-foreground)] reveal">
            <Check className="h-3.5 w-3.5 text-[var(--meridian)]" />
            Every team member is bound by client confidentiality agreements covering all engagements, indefinitely.
          </p>
        </div>
      </section>

      <CtaBand
        title="Meet us before you commit"
        sub="Ask the team anything, scope, process, security, pricing. The discovery call is free because confidence should come before contracts."
      />
    </Layout>
  );
}

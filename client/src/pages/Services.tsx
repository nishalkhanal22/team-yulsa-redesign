/*
  MERIDIAN PRECISION — Services page.
  Staggered alternating rows, folio tags, ledger rules. One H1 (audit fix).
*/
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import Layout from "@/components/Layout";
import CtaBand from "@/components/CtaBand";
import { SERVICES } from "@/lib/siteData";
import { useReveal } from "@/hooks/useReveal";

export default function Services() {
  useReveal();

  return (
    <Layout path="/services">
      <section className="pt-28 lg:pt-36 pb-12">
        <div className="container">
          <p className="folio-tag mb-3 reveal">Services · 10 Disciplines</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-[var(--navy)] max-w-3xl leading-tight reveal">
            Outsourced accounting services, built for US &amp; Canadian businesses
          </h1>
          <p className="mt-5 text-base lg:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed reveal">
            We help you increase the efficiency and efficacy of your bookkeeping, reporting,
            forecasting, and customer relationship management — giving you a clear technological
            advantage over your competitors.
          </p>
          <p className="mt-3 text-sm lg:text-base text-[var(--muted-foreground)] max-w-2xl leading-relaxed reveal">
            Every engagement runs on a fixed monthly fee, a defined scope, and a 5-business-day
            month-end close. Pick one service or bundle several — the scope follows your business,
            not the other way around.
          </p>
        </div>
      </section>

      <section className="pb-16 lg:pb-20">
        <div className="container space-y-0">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              className={`grid lg:grid-cols-12 gap-6 lg:gap-10 py-10 border-t border-[var(--border)] ${
                i === 0 ? "border-t-0" : ""
              } ${i % 2 === 1 ? "" : ""}`}
            >
              <div className={`lg:col-span-4 reveal ${i % 2 === 1 ? "lg:order-2 lg:col-start-9" : ""}`}>
                <p className="folio-tag mb-2">{s.folio}</p>
                <h2 className="font-serif text-2xl lg:text-[1.7rem] text-[var(--navy)] leading-snug">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm font-medium text-[var(--meridian)]">{s.short}</p>
              </div>
              <div className={`lg:col-span-8 reveal ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : ""}`}>
                <p className="text-[0.9375rem] leading-relaxed text-[var(--ink)]">{s.detail}</p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-[var(--muted-foreground)]">
                      <Check className="h-4 w-4 shrink-0 mt-0.5 text-[var(--meridian)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container border border-[var(--border)] bg-white p-8 lg:p-10 reveal">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="folio-tag mb-3">Pricing model</p>
              <h2 className="font-serif text-2xl lg:text-3xl text-[var(--navy)]">
                Fixed monthly fees — scoped once, never surprise-changed.
              </h2>
              <p className="mt-3 text-sm lg:text-base text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
                Most small businesses pay <strong className="text-[var(--navy)]">$300–$1,200/month</strong> for
                bookkeeping depending on transaction volume, accounts, and services included.
                Virtual CFO engagements start higher based on scope. After a free scoping call you
                receive a written quote — the number never changes mid-engagement without your approval.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97] hover:bg-[oklch(0.28_0.05_265)]"
                style={{ background: "var(--navy)" }}
              >
                Get My Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which service fits?"
        sub="Tell us about your books in a free 30-minute call and we'll recommend exactly what you need — even if that's doing nothing at all."
      />
    </Layout>
  );
}

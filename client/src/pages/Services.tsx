/*
  MERIDIAN PRECISION — Services page (redesign pass).
  Visual richness: navy icon tiles, alternating white/mist panels, serif authority,
  strong navy text for contrast. No price ranges — fixed monthly pricing only.
*/
import { Link } from "wouter";
import {
  ArrowRight,
  BookOpenCheck,
  FileCheck2,
  ArrowLeftRight,
  CalendarCheck,
  ArrowRightLeft,
  ReceiptText,
  Scale,
  BarChart3,
  TrendingUp,
  Crown,
} from "lucide-react";
import Layout from "@/components/Layout";
import CtaBand from "@/components/CtaBand";
import { SERVICES } from "@/lib/siteData";
import { useReveal } from "@/hooks/useReveal";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpenCheck,
  FileCheck2,
  ArrowLeftRight,
  CalendarCheck,
  ArrowRightLeft,
  ReceiptText,
  Scale,
  BarChart3,
  TrendingUp,
  Crown,
};

export default function Services() {
  useReveal();

  return (
    <Layout path="/services">
      {/* ── Hero with visual anchor ── */}
      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-[0.045]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 27px, var(--navy) 27px, var(--navy) 28px), repeating-linear-gradient(90deg, transparent, transparent 27px, var(--navy) 27px, var(--navy) 28px)",
          }}
        />
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

      {/* ── Services list: alternating panels with icon tiles ── */}
      <section>
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon] ?? BookOpenCheck;
          const tint = i % 2 === 1;
          return (
            <article
              key={s.id}
              className={`py-14 lg:py-16 reveal ${tint ? "bg-[oklch(0.975_0.005_265)]" : "bg-white"}`}
              style={tint ? { background: "color-mix(in oklch, var(--navy) 3%, white)" } : undefined}
            >
              <div className="container">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  <div
                    className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2 lg:col-start-8" : ""}`}
                  >
                    <div className="flex items-start gap-5">
                      <span
                        className="shrink-0 h-16 w-16 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--navy)" }}
                      >
                        <Icon className="h-7 w-7 text-[var(--meridian)]" />
                      </span>
                      <div>
                        <p className="folio-tag mb-2">{s.folio}</p>
                        <h2 className="font-serif text-2xl lg:text-[1.7rem] text-[var(--navy)] leading-snug">
                          {s.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : ""}`}
                  >
                    <Link href={`/services#${s.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--navy)] hover:text-[var(--meridian)]">
                      View service details <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* ── Pricing model (no numbers) ── */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div
            className="rounded-xl text-white p-10 lg:p-14 relative overflow-hidden reveal"
            style={{ background: "var(--navy)" }}
          >
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 23px, white 23px, white 24px)",
              }}
            />
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <p className="folio-tag mb-3 !text-[var(--meridian)]">Pricing model</p>
                <h2 className="font-serif text-2xl lg:text-3xl text-white">
                  Fixed monthly fees — scoped once, never surprise-changed.
                </h2>
                <p className="mt-3 text-sm lg:text-base text-white/75 leading-relaxed max-w-2xl">
                  Your quote is a single fixed monthly fee based on transaction volume, number of
                  accounts, and services included — written down before we start, and it never
                  changes mid-engagement without your approval. Virtual CFO engagements are scoped
                  separately.
                </p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] hover:opacity-90 bg-white text-[var(--navy)]"
                >
                  Get My Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
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

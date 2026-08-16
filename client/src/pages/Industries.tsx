/*
  MERIDIAN PRECISION — Industries hub page (redesign pass).
  Visual richness: tinted number blocks, stronger navy headings, clean hover row states.
  Contrast: headings in solid navy, body copy in readable muted ink.
*/
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import CtaBand from "@/components/CtaBand";
import { INDUSTRIES } from "@/lib/siteData";
import { useReveal } from "@/hooks/useReveal";

export default function Industries() {
  useReveal();

  return (
    <Layout path="/industries">
      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-[0.045]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 27px, var(--navy) 27px, var(--navy) 28px), repeating-linear-gradient(90deg, transparent, transparent 27px, var(--navy) 27px, var(--navy) 28px)",
          }}
        />
        <div className="container grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="folio-tag mb-3 reveal">Industries · 6 Specializations</p>
            <h1 className="font-serif text-4xl lg:text-5xl text-[var(--navy)] leading-tight reveal">
              Industry-specific books, built for how your business actually runs
            </h1>
            <p className="mt-5 text-base lg:text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed reveal">
              Generic bookkeepers categorize transactions. We model your unit economics — margins
              per placement, prime costs per store, profitability per product — because that's
              where decisions get made.
            </p>
          </div>
          <div className="lg:col-span-4 reveal">
            <img
              src="/manus-storage/industries-collage_3c29fe26.png"
              alt="Collage representing staffing, restaurant, ecommerce, lifestyle services, healthcare, and real estate industries served by Team Yulsa"
              className="w-full rounded-md shadow-md"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container">
          {INDUSTRIES.map((ind, i) => (
            <Link
              key={ind.id}
              href={`/industries/${ind.slug}`}
              className="group grid lg:grid-cols-12 gap-4 lg:gap-8 py-9 lg:py-10 border-b border-[var(--border)] items-start lg:items-center transition-colors duration-200 reveal"
              style={{
                background:
                  "color-mix(in oklch, var(--navy) " + (i % 2 === 1 ? "3%" : "0%") + ", white)",
              }}
            >
              <div className="lg:col-span-1 flex lg:block items-center gap-4">
                <span
                  className="stat-num text-xs font-bold text-white h-11 w-11 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: "var(--navy)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="lg:col-span-3">
                <h2 className="font-serif text-2xl lg:text-[1.7rem] text-[var(--navy)] group-hover:text-[var(--meridian)] transition-colors leading-snug">
                  {ind.name}
                </h2>
                <p className="mt-1.5 text-sm font-medium text-[var(--meridian)] hidden lg:block">
                  {ind.short}
                </p>
              </div>
              <div className="lg:col-span-7">
                <p className="text-sm lg:text-[0.9375rem] text-[var(--muted-foreground)] leading-relaxed">
                  {ind.solution}
                </p>
              </div>
              <div className="lg:col-span-1 lg:justify-self-end flex lg:block items-center">
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--navy)] group-hover:text-[var(--meridian)]"
                >
                  View details
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Don't see your industry?"
        sub="We serve most US and Canadian SMBs. Tell us about your business and we'll map the engagement to your workflows."
      />
    </Layout>
  );
}

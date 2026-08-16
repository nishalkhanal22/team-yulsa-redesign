/*
  MERIDIAN PRECISION — Industries hub page.
  Five industry cards linking to dedicated landing pages (audit fix: market-specific pages).
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
      <section className="pt-28 lg:pt-36 pb-12">
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
              className="group grid lg:grid-cols-12 gap-3 lg:gap-8 py-8 lg:py-9 border-b border-[var(--border)] items-center hover:bg-[oklch(0.975_0.01_90)] transition-colors duration-200 reveal px-1"
            >
              <div className="lg:col-span-1">
                <p className="stat-num text-sm font-semibold text-[var(--muted-foreground)]">IND 0{i + 1}</p>
              </div>
              <div className="lg:col-span-3">
                <h2 className="font-serif text-2xl lg:text-[1.7rem] text-[var(--navy)] group-hover:text-[var(--meridian)] transition-colors leading-snug">
                  {ind.name}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-sm lg:text-[0.9375rem] text-[var(--muted-foreground)] leading-relaxed">{ind.solution}</p>
              </div>
              <div className="lg:col-span-1 lg:justify-self-end">
                <ArrowRight className="h-5 w-5 text-[var(--muted-foreground)] group-hover:text-[var(--meridian)] group-hover:translate-x-1 transition-all" />
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

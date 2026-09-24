/*
  MERIDIAN PRECISION. Industry landing pages (SEO fix: market-specific pages).
  Left rail content pattern, pain/solution structure, per-industry FAQ with FAQPage JSON-LD.
*/
import { Link, useParams } from "wouter";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import CtaBand from "@/components/CtaBand";
import { INDUSTRIES, SERVICES } from "@/lib/siteData";
import { useReveal } from "@/hooks/useReveal";

const RELEVANT_SERVICES: Record<string, string[]> = {
  staffing: ["bookkeeping", "ar-ap", "reporting", "budgeting"],
  restaurants: ["bookkeeping", "invoice-mgmt", "reporting", "reconciliations"],
  ecommerce: ["bookkeeping", "reconciliations", "reporting", "ar-ap"],
  healthcare: ["bookkeeping", "ar-ap", "reporting", "tax-filing"],
  "real-estate": ["bookkeeping", "reporting", "reconciliations", "year-end"],
};

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const ind = INDUSTRIES.find((i) => i.slug === slug);
  useReveal();

  useEffect(() => {
    if (!ind) return;
    document.title = `Bookkeeping for ${ind.name} Businesses | Team Yulsa`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", `${ind.short} ${ind.pain} Team Yulsa serves ${ind.name.toLowerCase()} businesses across the US and Canada with industry-specific accounting.`);
  }, [ind]);

  // FAQPage structured data (audit fix: proper schema)
  useEffect(() => {
    if (!ind) return;
    let script = document.getElementById(`faq-${ind.id}`) as HTMLScriptElement | null;
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: `Do you work with ${ind.name.toLowerCase()} businesses in the US and Canada?`, acceptedAnswer: { "@type": "Answer", text: `Yes. ${ind.name} is one of our core specializations. We serve clients across the United States and Canada and understand the specific reporting and compliance needs of this industry.` } },
        { "@type": "Question", name: "What does a typical engagement look like?", acceptedAnswer: { "@type": "Answer", text: "Most clients start with a free discovery call and scoping quote, then move to a fixed monthly fee covering the reporting and reconciliation work their industry needs. Engagements typically onboard within 5 business days." } },
      ],
    };
    if (!script) {
      script = document.createElement("script");
      script.id = `faq-${ind.id}`;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
    return () => {
      script?.remove();
    };
  }, [ind]);

  if (!ind) {
    return (
      <Layout path="/industries">
        <div className="container pt-40 pb-24 text-center">
          <h1 className="font-serif text-3xl text-[var(--navy)]">Industry not found</h1>
          <Link href="/industries" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--meridian)]">
            <ArrowLeft className="h-4 w-4" /> Back to industries
          </Link>
        </div>
      </Layout>
    );
  }

  const relServices = RELEVANT_SERVICES[ind.slug] ?? [];

  return (
    <Layout path={`/industries/${ind.slug}`}>
      <section className="pt-28 lg:pt-36 pb-12">
        <div className="container">
          <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--navy)] transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> All industries
          </Link>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <p className="folio-tag mb-3">Industry Focus</p>
              <h1 className="font-serif text-4xl lg:text-5xl text-[var(--navy)] leading-tight">
                Accounting for {ind.name}
              </h1>
              <p className="mt-5 text-base lg:text-lg text-[var(--muted-foreground)] leading-relaxed">
                {ind.short}
              </p>
            </div>
            <div className="lg:col-span-5 bg-[var(--navy)] text-white p-7 rounded-md self-end">
              <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--meridian)" }}>
                <AlertTriangle className="h-4 w-4" />
                The problem we hear most
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{ind.pain}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 reveal">
            <p className="folio-tag mb-3">Our Approach</p>
            <h2 className="font-serif text-2xl lg:text-3xl text-[var(--navy)] mb-4">
              What we handle for you
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-[var(--ink)]">{ind.solution}</p>
            <ul className="mt-6 space-y-3">
              {ind.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-[var(--ink)]">
                  <Check className="h-4.5 w-4.5 shrink-0 mt-0.5 text-[var(--meridian)]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5 reveal">
            <div className="border border-[var(--border)] bg-white p-6">
              <p className="folio-tag mb-4">Services bundled for {ind.name.split("&")[0]} businesses</p>
              <ul className="space-y-3">
                {SERVICES.filter((s) => relServices.includes(s.id)).map((s) => (
                  <li key={s.id}>
                    <Link href="/services" className="group flex items-start gap-2.5 text-sm">
                      <span className="stat-num text-xs font-semibold text-[var(--meridian)] mt-0.5">{s.folio.split(" ")[1]}</span>
                      <span className="text-[var(--navy)] group-hover:text-[var(--meridian)] transition-colors font-medium">
                        {s.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97] hover:bg-[oklch(0.28_0.05_265)]"
                style={{ background: "var(--navy)" }}
              >
                Discuss My Scope <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title={`Ready for books your ${ind.name.toLowerCase()} business can run on?`}
        sub="A free 30-minute call maps your workflows to our reporting. Fixed pricing, no obligation."
      />
    </Layout>
  );
}

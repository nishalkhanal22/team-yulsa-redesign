/*
  MERIDIAN PRECISION. Service detail pages.
  Each service gets a real URL so the Services index is useful for visitors and SEO.
*/
import { Link, useParams } from "wouter";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, BookOpenCheck } from "lucide-react";
import Layout from "@/components/Layout";
import CtaBand from "@/components/CtaBand";
import { SERVICES } from "@/lib/siteData";
import { useReveal } from "@/hooks/useReveal";

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find((item) => item.id === id);
  useReveal();

  useEffect(() => {
    if (!service) return;
    document.title = `${service.title} | Team Yulsa`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", `${service.short} Team Yulsa provides reliable accounting and bookkeeping support for US and Canadian businesses.`);
  }, [service]);

  if (!service) {
    return (
      <Layout path="/services">
        <div className="container pt-40 pb-24 text-center">
          <h1 className="font-serif text-3xl text-[var(--navy)]">Service not found</h1>
          <Link href="/services" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--meridian)]">
            <ArrowLeft className="h-4 w-4" /> Back to services
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout path={`/services/${service.id}`}>
      <section className="pt-28 lg:pt-36 pb-12 lg:pb-16">
        <div className="container">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--navy)] transition-colors mb-7">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="folio-tag mb-3">{service.folio}</p>
              <h1 className="font-serif text-4xl lg:text-5xl text-[var(--navy)] leading-tight">{service.title}</h1>
              <p className="mt-5 text-base lg:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl">{service.short}</p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <div className="h-20 w-20 rounded-lg flex items-center justify-center" style={{ background: "var(--navy)" }}>
                <BookOpenCheck className="h-9 w-9 text-[var(--meridian)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container grid lg:grid-cols-12 gap-10 lg:gap-16">
          <article className="lg:col-span-7 reveal">
            <p className="folio-tag mb-3">What we handle</p>
            <h2 className="font-serif text-2xl lg:text-3xl text-[var(--navy)] mb-5">A clearer, more reliable finance workflow</h2>
            <p className="text-base leading-relaxed text-[var(--ink)]">{service.detail}</p>
            <ul className="mt-8 space-y-4">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm lg:text-base text-[var(--ink)] leading-relaxed">
                  <Check className="h-5 w-5 shrink-0 mt-0.5 text-[var(--meridian)]" />
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
          <aside className="lg:col-span-5 reveal">
            <div className="border border-[var(--border)] bg-white p-7 lg:p-8">
              <p className="folio-tag mb-4">How we start</p>
              <h2 className="font-serif text-2xl text-[var(--navy)]">Scope it around your business</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)]">Every engagement begins with a discovery call, a review of your current workflow, and a fixed monthly scope written down before work starts.</p>
              <Link href="/contact" className="mt-7 inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white" style={{ background: "var(--navy)" }}>
                Book a Call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand title="Ready for a cleaner close?" sub="Tell us what your business needs and we will map the right service scope on a free discovery call." />
    </Layout>
  );
}

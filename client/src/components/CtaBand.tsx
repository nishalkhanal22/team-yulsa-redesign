/*
  MERIDIAN PRECISION. value-exchange CTA band (navy anchor + meridian accent).
  Value-exchange CTAs per audit fix: no generic "Submit" prompts.
*/
import { Link } from "wouter";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/siteData";

export default function CtaBand({
  title = "Your books, balanced. Your week, back.",
  sub = "Book a free 30-minute discovery call. you'll leave with a clear scope and a fixed monthly price, in writing. No obligation, no sales pressure.",
  primaryLabel = "Book Free Discovery Call",
}: {
  title?: string;
  sub?: string;
  primaryLabel?: string;
}) {
  return (
    <section style={{ background: "var(--navy)" }} className="relative overflow-hidden">
      <div className="container py-16 lg:py-20 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <p className="folio-tag folio-tag--light mb-3">Next Step • 30 minutes</p>
          <h2 className="font-serif text-3xl lg:text-[2.6rem] leading-[1.15] text-white">
            {title}
          </h2>
          <p className="mt-4 text-white/70 max-w-xl text-base lg:text-lg leading-relaxed">{sub}</p>
        </div>
        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3">
          <a
            href={BRAND.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[var(--navy)] transition-all duration-200 active:scale-[0.97] hover:brightness-110 bg-[var(--meridian)]"
          >
            {primaryLabel} <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="hidden lg:flex items-center gap-1.5 text-xs text-white/50 font-mono ml-1">
            Responds within 1 US business day
          </span>
        </div>
      </div>
      <div className="container pb-10 flex items-center gap-2 text-xs text-white/45">
        <ShieldCheck className="h-3.5 w-3.5" />
        Read-only access • Signed NDA • Fixed monthly pricing
      </div>
    </section>
  );
}

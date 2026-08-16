/*
  MERIDIAN PRECISION — deep navy footer with ledger-rule motif.
  Real contact details (valid email — audit fix), US phone, only verified social (LinkedIn).
*/
import { Link } from "wouter";
import { Linkedin, Facebook, Instagram, Mail, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";
import { BRAND, SERVICES, SOCIALS } from "@/lib/siteData";

const LOGO = "/manus-storage/yulsa-logo_2bfeef45.png";

export default function SiteFooter() {
  return (
    <footer style={{ background: "var(--navy-deep)" }} className="text-white">
      <div className="container pt-16 pb-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={LOGO} alt="Team Yulsa logo" className="h-9 w-9" />
              <span className="font-serif text-xl font-bold">Team Yulsa</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70 max-w-xs">
              Outsourced bookkeeping, accounting, and virtual CFO services for small businesses and
              CPA firms across the United States and Canada.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 text-white/80 hover:text-[var(--meridian)] transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                {BRAND.email}
              </a>
              {BRAND.phoneDisplay && (
                <a href={BRAND.phoneHref} className="flex items-center gap-2 text-white/80 hover:text-[var(--meridian)] transition-colors">
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  {BRAND.phoneDisplay}
                </a>
              )}
              <span className="flex items-center gap-2 text-white/60">
                <MapPin className="h-4 w-4 shrink-0" />
                {BRAND.address}
              </span>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="folio-tag mb-4">Services</p>
            <ul className="space-y-2 text-sm text-white/70">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href="/services" className="hover:text-[var(--meridian)] transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="folio-tag mb-4">Site</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/services" className="hover:text-[var(--meridian)] transition-colors">All Services</Link></li>
              <li><Link href="/industries" className="hover:text-[var(--meridian)] transition-colors">Industries</Link></li>
              <li><Link href="/security" className="hover:text-[var(--meridian)] transition-colors">Data Security</Link></li>
              <li><Link href="/about" className="hover:text-[var(--meridian)] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--meridian)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="folio-tag mb-4">Working hours</p>
            <p className="text-sm text-white/70 leading-relaxed mb-5">{BRAND.hours}</p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = s.name === "WhatsApp" ? MessageCircle : s.name === "LinkedIn" ? Linkedin : s.name === "Facebook" ? Facebook : s.name === "Instagram" ? Instagram : Linkedin;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Team Yulsa on ${s.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/20 text-white/80 hover:text-[var(--meridian)] hover:border-[var(--meridian)] transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <a href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--meridian)] hover:gap-2.5 transition-all">
              Book a discovery call <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="ledger-rule my-10 opacity-40" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Team Yulsa · Yulsa Advisor Pvt. Ltd. All rights reserved.</p>
          <p>Serving businesses across the United States &amp; Canada</p>
        </div>
      </div>
    </footer>
  );
}

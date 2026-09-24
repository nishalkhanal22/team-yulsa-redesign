/*
  MERIDIAN PRECISION. sticky nav, opaque on scroll with bottom ledger rule.
  Serif wordmark + mono nav labels. Primary CTA routes visitors to Contact.
*/
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { BRAND } from "@/lib/siteData";
import { ASSETS } from "@/lib/assets";

const LOGO = ASSETS.logo;

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-[72px]">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Team Yulsa home">
          <img src={LOGO} alt="Team Yulsa logo" className="h-11 w-28 lg:h-12 lg:w-32 object-cover object-center" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.8125rem] font-semibold tracking-wide uppercase transition-colors duration-150 hover:text-[var(--meridian)] ${
                location === item.href ? "text-[var(--navy)] border-b-2 border-[var(--meridian)] pb-0.5" : "text-[var(--muted-foreground)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.97] hover:bg-[oklch(0.28_0.05_265)]"
            style={{ background: "var(--navy)" }}
          >
            Book a Free Call
          </Link>
        </div>

        <button className="lg:hidden p-2 text-[var(--navy)]" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[var(--border)] shadow-lg">
          <nav className="container py-4 flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2.5 text-sm font-semibold uppercase tracking-wide ${location === item.href ? "text-[var(--meridian)]" : "text-[var(--navy)]"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="mt-3 inline-flex justify-center px-4 py-3 text-sm font-semibold text-white" style={{ background: "var(--navy)" }}>
              Book a Free Discovery Call
            </Link>
            <Link href="/contact" className="mt-1 mb-1 inline-flex justify-center px-4 py-3 text-sm font-semibold text-[var(--meridian)] border border-[var(--meridian)]">
              Contact Team Yulsa
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

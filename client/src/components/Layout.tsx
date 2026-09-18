/*
  MERIDIAN PRECISION — page shell: header, main, footer.
  SEO title updates per route (audit fix: every page gets a unique title + description).
*/
import { useEffect, ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Team Yulsa — Outsourced Bookkeeping, Accounting & Virtual CFO for US & Canadian Businesses",
    description:
      "Expert outsourced bookkeeping, accounting, and virtual CFO services for small businesses and CPA firms across the US and Canada. QuickBooks & Xero certified.",
  },
  "/services": {
    title: "Accounting & Bookkeeping Services for US & Canadian Businesses | Team Yulsa",
    description:
      "Bookkeeping, tax support, AR/AP, virtual CFO, reporting, and software migration — 10 services for US and Canadian small businesses, priced as fixed monthly fees.",
  },
  "/industries": {
    title: "Industries We Serve — Staffing, Restaurants, Ecommerce, Healthcare, Real Estate | Team Yulsa",
    description:
      "Industry-specialized accounting and bookkeeping for staffing firms, restaurants, ecommerce sellers, healthcare practices, and property managers.",
  },
  "/industries/staffing": {
    title: "Bookkeeping for Staffing & Recruitment Companies | Team Yulsa",
    description:
      "Gross margin tracking, payroll burden reconciliation, and per-client profitability for US staffing and recruitment agencies.",
  },
  "/industries/restaurants": {
    title: "Restaurant Bookkeeping & Multi-Location Accounting | Team Yulsa",
    description:
      "Daily POS reconciliation, weekly prime-cost reporting, and multi-location P&Ls for restaurants and food service businesses.",
  },
  "/industries/ecommerce": {
    title: "Ecommerce Bookkeeping — Shopify, Amazon & Marketplace Accounting | Team Yulsa",
    description:
      "Marketplace settlement reconciliation and product-level profitability for ecommerce and retail brands in the US and Canada.",
  },
  "/industries/healthcare": {
    title: "Healthcare Practice Bookkeeping & Revenue Cycle Support | Team Yulsa",
    description:
      "Insurance and patient receivable reconciliation plus compliance-minded books for medical and allied-health practices.",
  },
  "/industries/real-estate": {
    title: "Property Management Accounting & Owner Statements | Team Yulsa",
    description:
      "Property-level P&Ls, security deposit accounting, and monthly owner statements for property managers and real estate investors.",
  },
  "/security": {
    title: "Data Security & Client Confidentiality | Team Yulsa",
    description:
      "How Team Yulsa protects client financial data: read-only access, encryption, role-based controls, and signed NDAs.",
  },
  "/about": {
    title: "About Team Yulsa — Meet the Accounting Team Behind Your Books | Team Yulsa",
    description:
      "The certified accountants and consultants behind Team Yulsa, serving US and Canadian businesses with precision and integrity.",
  },
  "/contact": {
    title: "Contact Team Yulsa — Book a Discovery Call",
    description:
      "Request a discovery call with Team Yulsa for outsourced bookkeeping and accounting support across the US and Canada. Responses within one US business day.",
  },
  "/how-it-works": {
    title: "How Outsourced Bookkeeping Works | Team Yulsa",
    description:
      "See how Team Yulsa takes US and Canadian businesses from discovery call to secure onboarding, monthly close, and practical financial reporting.",
  },
};

export function usePageMeta(path: string) {
  const meta = PAGE_META[path] ?? PAGE_META["/"];
  useEffect(() => {
    document.title = meta.title;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute("content", meta.description);
    const canon = document.querySelector('link[rel="canonical"]');
    if (canon) {
      const siteOrigin = window.location.hostname.endsWith("github.io")
        ? "https://nishalkhanal22.github.io/team-yulsa-redesign"
        : "https://teamyulsa.com";
      canon.setAttribute("href", `${siteOrigin}${path}`);
    }
  }, [path, meta.title, meta.description]);
}

export default function Layout({ children, path }: { children: ReactNode; path: string }) {
  usePageMeta(path);
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

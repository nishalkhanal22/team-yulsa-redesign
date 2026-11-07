/*
  Single source of truth for per-route SEO.

  Used by the React app (client-side meta updates) and by scripts/postbuild.ts
  (static per-route HTML, sitemap.xml, robots.txt). Keeping it in one module
  means the rendered page and the crawler-facing HTML never disagree.
*/
import { SERVICES, INDUSTRIES, FAQS } from "./siteData";

export const SITE = {
  url: "https://teamyulsa.com",
  name: "Team Yulsa",
  legalName: "Yulsa Advisor Pvt. Ltd.",
  email: "info@teamyulsa.com",
  phone: "+1-914-339-5442",
  description:
    "Outsourced bookkeeping, accounting, and virtual CFO services for small businesses and CPA firms across the United States and Canada.",
  image: "/og-image.jpg",
  twitter: "@TEAMYULSA",
  linkedin: "https://www.linkedin.com/company/team-yulsa/",
  x: "https://x.com/TEAMYULSA",
} as const;

export interface RouteSeo {
  title: string;
  description: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
}

/** Keep meta descriptions within the ~160 character search-result limit. */
function clamp(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

const BASE_ROUTES: Record<string, RouteSeo> = {
  "/": {
    title: "Outsourced Bookkeeping for US & Canada | Team Yulsa",
    description:
      "Dedicated outsourced bookkeeping, accounting, and virtual CFO support for US and Canadian businesses. QuickBooks & Xero certified. Fixed monthly pricing. Book a free call.",
    changefreq: "weekly",
    priority: "1.0",
  },
  "/services": {
    title: "Bookkeeping, Tax & Virtual CFO Services | Team Yulsa",
    description:
      "Bookkeeping, tax support, AR/AP, year-end close, software migration, reporting, budgeting, and virtual CFO services for US and Canadian businesses.",
    changefreq: "monthly",
    priority: "0.9",
  },
  "/industries": {
    title: "Industry-Specific Bookkeeping & Accounting | Team Yulsa",
    description:
      "Specialized accounting for staffing firms, restaurants, ecommerce sellers, lifestyle brands, healthcare practices, and property managers in the US and Canada.",
    changefreq: "monthly",
    priority: "0.9",
  },
  "/security": {
    title: "Data Security & Client Confidentiality | Team Yulsa",
    description:
      "How Team Yulsa protects client financial data: read-only access, encryption, role-based controls, signed NDAs, and revocable permissions.",
    changefreq: "yearly",
    priority: "0.6",
  },
  "/about": {
    title: "About Team Yulsa | Outsourced Accounting Specialists",
    description:
      "Meet the Chartered Accountants and accounting specialists behind Team Yulsa, serving US and Canadian businesses from Kathmandu, Nepal.",
    changefreq: "monthly",
    priority: "0.8",
  },
  "/contact": {
    title: "Book a Free Discovery Call | Team Yulsa",
    description:
      "Request a free 30-minute discovery call. Get a clear scope and a fixed monthly price for outsourced bookkeeping and accounting. Reply within one US business day.",
    changefreq: "monthly",
    priority: "0.9",
  },
  "/how-it-works": {
    title: "How Outsourced Bookkeeping Works | Team Yulsa",
    description:
      "See how Team Yulsa takes US and Canadian businesses from discovery call to secure onboarding, monthly close, and practical financial reporting.",
    changefreq: "monthly",
    priority: "0.9",
  },
  "/privacy": {
    title: "Privacy Policy | Team Yulsa",
    description:
      "How Team Yulsa collects, uses, stores, and protects personal information submitted through this website, including discovery-call requests.",
    changefreq: "yearly",
    priority: "0.3",
  },
};

const SERVICE_ROUTES: Record<string, RouteSeo> = Object.fromEntries(
  SERVICES.map((service) => [
    `/services/${service.id}`,
    {
      title: `${service.title} for US & Canada | Team Yulsa`,
      description: clamp(
        `${service.short} Fixed monthly pricing for US and Canadian businesses.`
      ),
      changefreq: "monthly",
      priority: "0.8",
    },
  ])
);

const INDUSTRY_ROUTES: Record<string, RouteSeo> = Object.fromEntries(
  INDUSTRIES.map((industry) => [
    `/industries/${industry.slug}`,
    {
      title: `${industry.name} Bookkeeping & Accounting | Team Yulsa`,
      description: clamp(
        `${industry.short} Industry-specialized books, reporting, and compliance support for US and Canadian businesses.`
      ),
      changefreq: "monthly",
      priority: "0.8",
    },
  ])
);

export const ROUTES: Record<string, RouteSeo> = {
  ...BASE_ROUTES,
  ...SERVICE_ROUTES,
  ...INDUSTRY_ROUTES,
};

export function seoFor(path: string): RouteSeo {
  return ROUTES[path] ?? BASE_ROUTES["/"];
}

export function canonicalFor(path: string): string {
  return `${SITE.url}${path === "/" ? "/" : path}`;
}

const PAGE_LABELS: Record<string, string> = {
  "/services": "Services",
  "/industries": "Industries",
  "/security": "Security",
  "/about": "About",
  "/contact": "Contact",
  "/how-it-works": "How It Works",
  "/privacy": "Privacy Policy",
};

function pageLabel(path: string): string {
  if (PAGE_LABELS[path]) return PAGE_LABELS[path];
  const service = SERVICES.find((item) => `/services/${item.id}` === path);
  if (service) return service.title;
  const industry = INDUSTRIES.find((item) => `/industries/${item.slug}` === path);
  if (industry) return industry.name;
  return SITE.name;
}

function breadcrumbSchema(path: string): Record<string, unknown> {
  const items: { name: string; item: string }[] = [
    { name: "Home", item: `${SITE.url}/` },
  ];

  if (path !== "/") {
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 1) {
      const parent = `/${segments[0]}`;
      items.push({ name: pageLabel(parent), item: canonicalFor(parent) });
    }
    items.push({ name: pageLabel(path), item: canonicalFor(path) });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

const AREA_SERVED = [
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "Canada" },
];

function serviceSchema(path: string): Record<string, unknown> | null {
  const service = SERVICES.find((item) => `/services/${item.id}` === path);
  const industry = INDUSTRIES.find((item) => `/industries/${item.slug}` === path);

  if (service) {
    return {
      "@type": "Service",
      "@id": `${canonicalFor(path)}#service`,
      name: service.title,
      serviceType: service.title,
      description: service.short,
      url: canonicalFor(path),
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: AREA_SERVED,
      offers: {
        "@type": "Offer",
        description:
          "Fixed monthly pricing, scoped during a free 30-minute discovery call.",
        availability: "https://schema.org/InStock",
      },
    };
  }

  if (industry) {
    return {
      "@type": "Service",
      "@id": `${canonicalFor(path)}#service`,
      name: `${industry.name} Bookkeeping & Accounting`,
      serviceType: "Industry-specific bookkeeping and accounting",
      description: industry.short,
      url: canonicalFor(path),
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: AREA_SERVED,
      offers: {
        "@type": "Offer",
        description:
          "Fixed monthly pricing, scoped during a free 30-minute discovery call.",
        availability: "https://schema.org/InStock",
      },
    };
  }

  return null;
}

function itemListSchema(
  path: string,
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@type": "ItemList",
    "@id": `${canonicalFor(path)}#list`,
    name: pageLabel(path),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

function faqSchema(): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    "@id": `${canonicalFor("/contact")}#faq`,
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/**
 * Route-specific JSON-LD nodes. The site-wide Organization/WebSite/
 * AccountingService graph lives in client/index.html and is shared by every page.
 */
export function routeSchemaFor(path: string): Record<string, unknown>[] {
  const nodes: Record<string, unknown>[] = [breadcrumbSchema(path)];

  if (path === "/") {
    nodes.push({
      "@type": "WebPage",
      "@id": `${canonicalFor(path)}#webpage`,
      url: canonicalFor(path),
      name: seoFor(path).title,
      description: seoFor(path).description,
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": `${SITE.url}/#service` },
      inLanguage: "en-US",
    });
    return nodes;
  }

  if (path === "/services") {
    nodes.push(
      itemListSchema(
        path,
        SERVICES.map((service) => ({
          name: service.title,
          url: canonicalFor(`/services/${service.id}`),
        }))
      )
    );
    return nodes;
  }

  if (path === "/industries") {
    nodes.push(
      itemListSchema(
        path,
        INDUSTRIES.map((industry) => ({
          name: industry.name,
          url: canonicalFor(`/industries/${industry.slug}`),
        }))
      )
    );
    return nodes;
  }

  if (path === "/contact") {
    nodes.push({
      "@type": "ContactPage",
      "@id": `${canonicalFor(path)}#webpage`,
      url: canonicalFor(path),
      name: seoFor(path).title,
      description: seoFor(path).description,
      isPartOf: { "@id": `${SITE.url}/#website` },
    });
    nodes.push(faqSchema());
    return nodes;
  }

  const service = serviceSchema(path);
  if (service) {
    nodes.push(service);
    return nodes;
  }

  const pageType = path === "/about" ? "AboutPage" : "WebPage";
  nodes.push({
    "@type": pageType,
    "@id": `${canonicalFor(path)}#webpage`,
    url: canonicalFor(path),
    name: seoFor(path).title,
    description: seoFor(path).description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    inLanguage: "en-US",
  });

  return nodes;
}

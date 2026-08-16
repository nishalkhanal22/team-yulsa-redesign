/*
  MERIDIAN PRECISION — shared site content
  Single source of truth for services, industries, team, and FAQ.
  Content targets US/Canada buyer intent (audit fix).
*/

export const BRAND = {
  email: "info@teamyulsa.com",
  phone: "", // no US number yet — client to provide a real one before enabling
  phoneHref: "mailto:info@teamyulsa.com",
  phoneDisplay: "",
  address: "Kathmandu, Nepal · Serving clients across the US & Canada",
  hours: "Mon–Fri, 9:00 AM – 5:00 PM (EST) · We work on your time zone",
  linkedin: "https://www.linkedin.com/company/team-yulsa/",
  facebook: "", // no verified profile yet — intentionally omitted from footer
  instagram: "",
};

export interface Service {
  id: string;
  folio: string;
  title: string;
  short: string;
  detail: string;
  bullets: string[];
  icon: string;
}

export const SERVICES: Service[] = [
  {
    id: "bookkeeping",
    folio: "SERV 01",
    title: "Accounting & Bookkeeping",
    short:
      "Clean, current books — reconciled monthly, organized by month-end, ready for your accountant or tax preparer.",
    detail:
      "We keep your QuickBooks or Xero files accurate and current all year long: categorizing transactions, reconciling bank and credit card accounts, managing the month-end close, and producing clean financials your US or Canadian accountant can rely on. Most clients hand over reconciliation work entirely and get a monthly close package within 5 business days.",
    bullets: [
      "Monthly bank & credit card reconciliations",
      "Expense categorization aligned with your chart of accounts",
      "Month-end close within 5 business days",
      "Clean books handed to your tax preparer — no year-end scramble",
    ],
    icon: "BookOpenCheck",
  },
  {
    id: "tax-filing",
    folio: "SERV 02",
    title: "Tax Filing Support",
    short:
      "Year-round readiness for IRS and CRA deadlines — books organized so tax season takes days, not weeks.",
    detail:
      "We prepare complete, well-organized tax packages for US and Canadian filers: categorized P&Ls, balance sheets, depreciation schedules, sales tax workpapers, and T4/T5 and 1099-ready records. Your CPA or tax preparer gets exactly what they need, when they need it.",
    bullets: [
      "Tax-ready financial statements by jurisdiction",
      "1099, T4, and T5 preparation support",
      "Sales tax & VAT workpapers (state, provincial, and federal)",
      "Deadline calendar for IRS / CRA filings",
    ],
    icon: "FileCheck2",
  },
  {
    id: "ar-ap",
    folio: "SERV 03",
    title: "Accounts Receivable & Payable",
    short:
      "Chase what's owed, pay what's due, and keep cash flowing — without adding headcount.",
    detail:
      "Our AR/AP team handles invoicing, collections follow-up, vendor bill entry, and payment runs inside your accounting platform. Clients typically see faster collections and fewer late fees within the first 90 days.",
    bullets: [
      "Invoice creation and delivery on your schedule",
      "Collections follow-up sequences that stay on-brand",
      "Vendor bill entry, coding, and payment runs",
      "Aging reports and cash-flow visibility weekly",
    ],
    icon: "ArrowLeftRight",
  },
  {
    id: "year-end",
    folio: "SERV 04",
    title: "Year-End Accounting",
    short:
      "Fiscal and calendar year-end close, audit-ready schedules, and clean cutoffs — every time.",
    detail:
      "We manage the full year-end process: closing open periods, adjusting entries, accruals, fixed asset schedules, and preparing the complete audit or review package your external accountant requests.",
    bullets: [
      "Full year-end close and adjusting entries",
      "Audit & review-ready schedules",
      "Accruals, deferrals, and cutoff work",
      "Fixed asset & depreciation schedules",
    ],
    icon: "CalendarCheck",
  },
  {
    id: "migration",
    folio: "SERV 05",
    title: "Accounting Software Migration",
    short:
      "Move from spreadsheets, legacy desktop, or a competitor to QuickBooks Online or Xero — safely, with clean history.",
    detail:
      "We migrate historical data, customers, vendors, and open balances into QuickBooks Online, QuickBooks Desktop, or Xero, then validate every account against source records before go-live. Clients typically transition in 2–4 weeks with zero downtime.",
    bullets: [
      "QuickBooks Online, Desktop, and Xero migrations",
      "Historical data cleanup before import",
      "Chart of accounts redesign for your industry",
      "Post-migration validation & staff training",
    ],
    icon: "ArrowRightLeft",
  },
  {
    id: "invoice-mgmt",
    folio: "SERV 06",
    title: "Invoice Management",
    short:
      "Every invoice tracked, coded, approved, and filed — nothing lost between the inbox and the ledger.",
    detail:
      "From invoice capture to coding to approval routing, we keep your payable pipeline moving and ensure every bill is matched to the right job, cost center, or property.",
    bullets: [
      "Invoice capture from email, portal, and mail",
      "Coding to jobs, classes, and locations",
      "Approval workflows matched to your policy",
      "Duplicate detection and discrepancy flags",
    ],
    icon: "ReceiptText",
  },
  {
    id: "reconciliations",
    folio: "SERV 07",
    title: "Bank Reconciliations",
    short:
      "Every account, every month, every discrepancy found and resolved — the foundation everything else stands on.",
    detail:
      "We reconcile all bank, credit card, loan, and merchant accounts monthly, investigate breaks, resolve timing differences, and report exceptions before they become problems.",
    bullets: [
      "Monthly reconciliation of all accounts",
      "Break investigation and resolution",
      "Merchant fee & payment processor audits",
      "Exception reporting with root-cause notes",
    ],
    icon: "Scale",
  },
  {
    id: "reporting",
    folio: "SERV 08",
    title: "Management Reporting",
    short:
      "Dashboards and reports that tell you where the business stands — revenue by line, margin by location, cash by week.",
    detail:
      "We build the reports leadership actually reads: monthly management packs, KPI dashboards in Power BI, department P&Ls, and location-level performance. Delivered on schedule, in the format you choose.",
    bullets: [
      "Monthly management reporting pack",
      "Power BI dashboards with live data",
      "Department, location & line-of-business P&Ls",
      "KPI scorecards tailored to your industry",
    ],
    icon: "BarChart3",
  },
  {
    id: "budgeting",
    folio: "SERV 09",
    title: "Budgeting & Forecasting",
    short:
      "Annual budgets, rolling forecasts, and scenario models that help you plan instead of react.",
    detail:
      "We build annual budgets with your leadership, then maintain rolling 12-month forecasts with actual-vs-budget variance analysis each month — so you always know where the year is heading.",
    bullets: [
      "Annual budget build with department input",
      "Rolling 12-month forecasts",
      "Monthly actual-vs-budget variance analysis",
      "Scenario & sensitivity modeling",
    ],
    icon: "TrendingUp",
  },
  {
    id: "virtual-cfo",
    folio: "SERV 10",
    title: "Virtual CFO Services",
    short:
      "CFO-level strategy — cash planning, fundraising prep, pricing, and board reporting — at a fraction of the cost.",
    detail:
      "Our virtual CFO engagement gives growing businesses strategic financial leadership: cash-flow planning, capital strategy, pricing analysis, lender and investor reporting, and monthly advisory sessions. Fractional cost, full expertise.",
    bullets: [
      "Monthly cash-flow planning & 13-week cash model",
      "Lender, investor & board reporting packages",
      "Pricing, unit economics & profitability analysis",
      "Quarterly strategy sessions with senior leadership",
    ],
    icon: "Crown",
  },
];

export interface Industry {
  id: string;
  name: string;
  short: string;
  slug: string;
  pain: string;
  solution: string;
  bullets: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    id: "staffing",
    name: "Staffing & Recruitment",
    short: "Payroll complexity handled so you can focus on placing people.",
    slug: "staffing",
    pain:
      "Staffing firms live on margins measured in basis points: gross vs. net payroll, W-2 vs. 1099 workers, multi-state tax registrations, and billings that change weekly.",
    solution:
      "We track gross margin per assignment, reconcile payroll and burden weekly, manage client billings and collections, and produce per-client profitability reports — so you know exactly which placements make money.",
    bullets: [
      "Gross margin analysis per assignment & client",
      "Payroll burden reconciliation (taxes, benefits, workers' comp)",
      "W-2 / 1099 / contract-worker cost tracking",
      "Weekly billing & collections dashboards",
    ],
  },
  {
    id: "restaurants",
    name: "Restaurants & Food Service",
    short: "Prime-cost visibility and multi-location reporting, done weekly.",
    slug: "restaurants",
    pain:
      "Restaurants run on thin margins where food cost, labor, and waste decide everything — and multi-location operators drown in POS systems and daily cash deposits.",
    solution:
      "We reconcile POS and payment data daily, track prime costs weekly against budget, manage vendor AP across locations, and produce per-store P&Ls your franchise or ownership group can act on.",
    bullets: [
      "Daily POS & payment processor reconciliation",
      "Weekly prime-cost (food + labor) reporting",
      "Multi-location P&L and consolidation",
      "Vendor AP, invoice capture & food-cost tracking",
    ],
  },
  {
    id: "ecommerce",
    name: "Ecommerce & Retail",
    short: "Channel-level profitability across Shopify, Amazon, and marketplaces.",
    slug: "ecommerce",
    pain:
      "Ecommerce sellers juggle Shopify, Amazon, ad spend, returns, and inventory — and usually can't tell which product or channel is actually profitable after fees.",
    solution:
      "We reconcile marketplace settlements and payment gateways, track COGS and inventory, allocate ad spend by channel, and build true product-level profitability reports.",
    bullets: [
      "Marketplace & gateway settlement reconciliation",
      "Product-level & channel-level profitability",
      "Inventory & COGS tracking",
      "Ad spend, returns & refund accruals",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare Practices",
    short: "Clean revenue-cycle support and compliance-minded books.",
    slug: "healthcare",
    pain:
      "Medical and allied-health practices deal with insurance remits, patient balances, and compliance documentation that generalist bookkeepers avoid.",
    solution:
      "We reconcile insurance payments and patient receivables, track denied claims as receivable follow-up data, manage payroll across provider types, and keep books ready for lenders and acquirers.",
    bullets: [
      "Insurance & patient receivable reconciliation",
      "Denials tracking tied to AR follow-up",
      "Provider payroll & 1099 management",
      "Lender- and acquisition-ready financials",
    ],
  },
  {
    id: "real-estate",
    name: "Property Management & Real Estate",
    short: "Property-level P&Ls, security deposit accounting, and owner distributions.",
    slug: "real-estate",
    pain:
      "Property managers track rent rolls, security deposits, vendor maintenance costs, and owner distributions across dozens of units — usually in spreadsheets that don't tie out.",
    solution:
      "We maintain property-level accounting in your PM software or QuickBooks, reconcile trust and operating accounts, prepare owner statements, and produce portfolio-level performance reports.",
    bullets: [
      "Property-level P&L and rent-roll reconciliation",
      "Security deposit & trust account accounting",
      "Monthly owner statements & distributions",
      "Portfolio consolidation & performance reports",
    ],
  },
];

export const TEAM = [
  { name: "Sagun Jung Rana", role: "Founder · CA", note: "Leads client strategy and quality review across all engagements." },
  { name: "Prabesh Bhusal", role: "Senior Associate", note: "Oversees month-end close and management reporting." },
  { name: "Nisha Khanal", role: "IFRS Consultant", note: "Leads standards compliance and audit-readiness." },
  { name: "Aayush Shah", role: "Senior Associate", note: "Manages tax-season workflows and filing support." },
  { name: "Himal Ayman Karki", role: "Senior Associate", note: "Leads software migrations and system transitions." },
  { name: "Dinesh Puri", role: "Associate", note: "Handles reconciliations and AR/AP operations." },
  { name: "Sujal Aryal", role: "Associate", note: "Supports budgeting, forecasting, and reporting." },
  { name: "Samrat Hamal", role: "IT Associate", note: "Owns data security, tooling, and automation." },
];

export const STATS = [
  { value: 250, suffix: "+", label: "Financial records reconciled monthly across client engagements" },
  { value: 100, suffix: "%", label: "On-time delivery commitment — month-end closes land on schedule" },
  { value: 12, suffix: "h", label: "Average turnaround on priority requests during US business hours" },
  { value: 40, suffix: "%", label: "Typical cost saving vs. hiring in-house US bookkeeping staff" },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discovery call",
    text: "A 30-minute call to understand your books, software, deadlines, and where the pain is. No obligation.",
  },
  {
    n: "02",
    title: "Scope & fixed quote",
    text: "We quote a fixed monthly fee based on transaction volume and scope — no surprise invoices, ever.",
  },
  {
    n: "03",
    title: "Secure onboarding",
    text: "Read-only access via your accounting platform, secure document portal, and a kickoff checklist completed within 5 days.",
  },
  {
    n: "04",
    title: "Run & report",
    text: "We close your books monthly, send a plain-English report, and hold a quarterly review to keep improving.",
  },
];

export const FAQS = [
  {
    q: "How much does outsourced bookkeeping cost?",
    a: "Most small businesses pay between $300 and $1,200 per month depending on transaction volume, number of accounts, and services included. We quote a fixed monthly fee after a free scoping call — you always know the exact number before we start, and it never changes mid-engagement without your approval.",
  },
  {
    q: "Do you work with US and Canadian businesses specifically?",
    a: "Yes — the US and Canada are our core markets. We work in US dollars and Canadian dollars, follow US GAAP and CRA standards, and support IRS and CRA filing requirements including 1099s, T4s, and state/provincial sales tax workpapers.",
  },
  {
    q: "Which accounting software do you support?",
    a: "We are experts in QuickBooks Online, QuickBooks Desktop, and Xero, and we also work with FreshBooks, Wave, Acumatica, and Bill.com. We can migrate you from spreadsheets or a legacy system to any of these platforms.",
  },
  {
    q: "How do you handle my financial data securely?",
    a: "We use read-only accountant access to your accounting platform (you keep control of credentials), encrypted file transfer, role-based access within our team, and signed NDAs with every client. See our Data Security page for full details.",
  },
  {
    q: "What time zone do you work in?",
    a: "Our team works a schedule that overlaps core US and Canada business hours. Most clients get responses within the same business day, and urgent requests during US hours are handled within 12 hours on average.",
  },
  {
    q: "Can you replace my current bookkeeper or help my CPA firm?",
    a: "Both, regularly. Many clients transition from an in-house bookkeeper or a costly local firm; we handle the handover. We also serve CPA firms as overflow partners, taking on preparation work so your team can focus on review and advisory.",
  },
  {
    q: "Is there a contract or minimum commitment?",
    a: "Engagements start with a simple service agreement. Many clients begin with a single month of bookkeeping cleanup to see the quality first, then move to a monthly engagement. No multi-year lock-ins.",
  },
  {
    q: "What does the free bookkeeping health check include?",
    a: "We review your last 1–3 months of books, check reconciliations, categorization, and closing status, and return a short report with issues found and a fix plan — even if you never hire us.",
  },
];

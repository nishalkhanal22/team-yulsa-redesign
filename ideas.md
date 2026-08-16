# Team Yulsa — Website Redesign Brainstorm

## Business context
Team Yulsa (Yulsa Advisor Pvt. Ltd.) is a Kathmandu-based accounting/bookkeeping outsourcing firm targeting SMBs in the US & Canada, especially staffing, restaurants, ecommerce, healthcare, and real estate/property management. Services: bookkeeping, tax support, AR/AP, virtual CFO, reporting, budgeting, software migration. The current site has critical trust/SEO failures; this redesign must radiate credibility, precision, and North-American-market readiness.

## Three stylistic approaches

### 1. Ledger Editorial
**Intro:** A refined "financial broadsheet" aesthetic — cream paper backgrounds, serif display headlines, thin rule lines like ledger rows, muted ink blues. Feels like a trusted financial newspaper; instantly premium and credible.
**Probability:** 0.04

### 2. Meridian Precision
**Intro:** A crisp Swiss-international-style system with deep navy canvas, bright ledger-green accents, oversized numerals, and grid-driven asymmetric layouts. Feels like a modern fintech: precise, data-driven, globally capable.
**Probability:** 0.03

### 3. Boardroom Warmth
**Intro:** A warm, human consultant aesthetic — taupe/sand tones, warm charcoal, soft photography, rounded editorial cards. Feels like a boutique advisory boutique; approachable over intimidating.
**Probability:** 0.02

## CHOSEN: Meridian Precision

**Design Movement:** Swiss International Style (grid systems, typographic clarity) crossed with contemporary fintech design language (Stripe/Plaid-era polish). Precision is the product; the design must look exact.

**Core Principles:**
1. Grid discipline — everything aligns to a visible 12-col logic; section rules like ledger lines.
2. Numeric authority — oversized statistics, real numbers, tabular data treatments as decorative elements.
3. Deep calm — predominantly light, quiet canvases with one deep navy anchor and one signal accent.
4. No ambiguity — every section states value clearly; CTAs are verbs with outcomes.

**Color Philosophy:** Deep navy (oklch ~0.24 0.05 265) as the authority anchor — it says "financial institution" without being corporate gray. A vivid meridian green (oklch ~0.72 0.17 165) as the single signal accent — growth, accuracy, "in the black". Warm paper-white canvas (oklch ~0.985 0.003 90) keeps it light and readable for a B2B audience reading long-form financial content. No purple, no gradients-for-decoration.

**Layout Paradigm:** Asymmetric split sections — hero is 55/45 text/image split; services use staggered alternating rows; industry pages use a left rail + right content pattern. Section numbers ("01 / Services") run in the margin like ledger folios. Avoid fully-centered hero stacks.

**Signature Elements:**
1. Ledger-line motif — thin horizontal rules with small tick marks dividing sections.
2. Oversized stat numerals in the accent green with tabular-nums tracking.
3. "Folio tags" — small uppercase mono-style labels (e.g., "SERV 02 · BOOKKEEPING") above headings.

**Interaction Philosophy:** Restrained and instant. Hovers shift underline/ink color and lift cards 2–4px with soft shadow. No playful bounce; motion confirms precision (crisp 160–240ms ease-out). Sticky nav becomes opaque white with a bottom rule on scroll.

**Animation:** Scroll-triggered fades/rises (12px, 250ms, staggered 60ms). Stat counters animate once on first view. Buttons scale(0.97) on active. Respect prefers-reduced-motion.

**Typography System:**
- Display: "Libre Caslon Text" — a confident, trustworthy serif for H1/H2 (editorial authority).
- Body/UI: "Inter Tight" or "Archivo" — clean grotesque for body, nav, buttons, data labels.
- Data/mono accents: "IBM Plex Mono" for folio tags and stat labels.
- Hierarchy: mono folio tag (11px uppercase, tracked) → serif headline → sans body (16–18px, relaxed leading).

**Brand Essence:** "The offshore accounting team your books deserve" — for US/Canadian SMB owners and CPA firms who want Big-Firm quality at a fraction of the cost. Personality: precise, candid, dependable.

**Brand Voice:** Direct, numbers-first, zero fluff. Headlines state outcomes. CTAs promise value exchanges, never "Submit".
- Example headline: "Your books, balanced. Your week, back."
- Example CTA: "Get your free bookkeeping health check →"

**Wordmark & Logo:** "Team Yulsa" set in Libre Caslon with a distinctive mark: a mint-green upward tick/check integrated into a ledger-square glyph (a square with an ascending stroke — precision + growth). No text in the glyph.

**Signature Brand Color:** Meridian Green (oklch(0.72 0.17 165)) — the single unmistakable accent against navy.

## Audit fixes baked into this build (ground truth)
- Valid email info@teamyulsa.com everywhere (placeholder for real inbox), US phone +1 (888) placeholder line, working real social links (LinkedIn), corrected address.
- Real stats (years of experience, projects, clients) — no "0+" counters; use honest, edit-friendly figures.
- Trust section: process, security, US/Canada compliance (US GAAP, IRS/CRA), QuickBooks/Xero certified expertise.
- Per-industry landing pages (5 industries) + per-service pages (10 services) + insights/blog framework with proper SEO titles/meta (US buyer intent).
- Value-exchange CTAs ("Free Bookkeeping Health Check", "Book a Discovery Call"), FAQ with FAQPage schema, full JSON-LD with US/Canada service areas.
- One H1 per page, keyword-focused; sitemap.xml + robots.txt in client/public.
- Testimonials: NO fabricated reviews — use a trust/process section instead ("How we work", security commitments, certifications). Do not invent client names/stars.

## Style Decisions
- Every page must include at least one visible Meridian Precision signature: ledger-line/tick motif, mono folio rail, oversized tabular numeral, or data-table treatment.
- Interior pages should favor asymmetric Swiss layouts with a left rail or split composition; avoid default equal-card grids unless visibly tied to ledger rules and numbered folios.
- Imagery/illustration must be owned-brand financial infrastructure: ledger squares, document flows, data grids, the mint-green upward check glyph — avoid generic shield/check stock art as the dominant visual.

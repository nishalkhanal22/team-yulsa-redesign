# Team Yulsa Redesign — Current Round

## Tasks
- [ ] Move "Get in Touch" contact section from Home.tsx (after software section, before CtaBand) to Contact.tsx
- [ ] Build Software We Use section on Home styled like Services/Industries sections with original brand logos
- [ ] Source official software logos (QuickBooks, Xero, FreshBooks, Wave, Power BI, ADP, Acumatica, Zoho Books)
- [ ] TypeScript check + screenshots
- [ ] Checkpoint + deliver

## State
- Contact section to move: Home.tsx (~after software section, before <CtaBand />) — "One email is all it takes."
- Software tile grid currently Home.tsx (brand-color boxes) — replace with real logo images
- Project path: /home/ubuntu/team-yulsa-redesign
- Static assets dir: /home/ubuntu/webdev-static-assets/ (upload via manus-upload-file --webdev)

## ROUND STATE (current task)
DONE: contact section moved from Home.tsx to Contact.tsx (before FAQ section, at line ~223). Home imports cleaned (Mail kept for hero? check tsc). ArrowUpRight in first import block — verify tsc clean.

REMAINING:
1. Build Software We Use section on Home with OFFICIAL logos (user wants original software logos). Need to source/generate logo images for: QuickBooks (green), Xero (#13B5EA), FreshBooks (#3350DB), Wave (#014980), Power BI (#F2C811), ADP (#D0171E), Acumatica (#8B5CF6 or orange), Zoho Books (#E42527). Option: generate one image with official-style logos via generate_image, or build SVG/CSS text logos with brand colors (safer). Decide: use a generated image row like before but user wants "original logo" look → generate detailed image with accurate logos.
2. tsc check, screenshots (Home, Contact), checkpoint, deliver.

Note: previous software-tiles image (/manus-storage/software-tiles_42130be0.png) was replaced by brand-color boxes last round; user now wants real logo look.

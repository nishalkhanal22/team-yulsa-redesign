import Layout from "@/components/Layout";
import { BRAND } from "@/lib/siteData";

const UPDATED = "November 7, 2026";

export default function Privacy() {
  return (
    <Layout path="/privacy">
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="container max-w-3xl">
          <p className="folio-tag mb-3">Legal</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-[var(--navy)] leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[var(--muted-foreground)]">
            Last updated: {UPDATED}
          </p>

          <div className="mt-10 space-y-8 text-[0.9375rem] leading-relaxed text-[var(--muted-foreground)]">
            <div>
              <h2 className="font-serif text-xl text-[var(--navy)] mb-3">Who we are</h2>
              <p>
                Team Yulsa is operated by Yulsa Advisor Pvt. Ltd., a company registered in
                Kathmandu, Nepal. We provide outsourced bookkeeping, accounting, tax support, and
                virtual CFO services to businesses in the United States and Canada. For privacy
                questions, contact{" "}
                <a className="text-[var(--meridian-text)] underline" href={`mailto:${BRAND.email}`}>
                  {BRAND.email}
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[var(--navy)] mb-3">Information we collect</h2>
              <p>When you submit the discovery-call form, we collect:</p>
              <ul className="mt-3 list-disc pl-5 space-y-1.5">
                <li>Your name, email address, and company name</li>
                <li>The service you are interested in</li>
                <li>Your preferred date, time, and time zone</li>
                <li>Any message or details you choose to share</li>
              </ul>
              <p className="mt-3">
                Our hosting provider may also record standard technical data such as your IP
                address, browser type, and the pages you request, for security and reliability.
                This site does not currently use advertising or analytics cookies.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[var(--navy)] mb-3">How we use it</h2>
              <ul className="mt-3 list-disc pl-5 space-y-1.5">
                <li>To respond to your request and schedule a discovery call</li>
                <li>To prepare a scope and proposal if you ask for one</li>
                <li>To deliver and support services you engage us for</li>
                <li>To meet legal, tax, and accounting obligations</li>
                <li>To keep the site secure and prevent abuse</li>
              </ul>
              <p className="mt-3">
                We do not sell your personal information, and we do not use it for third-party
                advertising.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[var(--navy)] mb-3">Who we share it with</h2>
              <p>
                We share information only with service providers that help us operate: our email
                and scheduling provider (Google Workspace), our website host, and professional
                advisers such as accountants and lawyers where required. These providers process
                data on our instructions. We may also disclose information if required by law or to
                protect our legal rights.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[var(--navy)] mb-3">International transfers</h2>
              <p>
                We are based in Nepal and work with clients in the United States and Canada. Your
                information may be processed in Nepal, the United States, or other countries where
                our providers operate. We use contractual and access controls to protect it during
                those transfers.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[var(--navy)] mb-3">How long we keep it</h2>
              <p>
                Discovery-call inquiries are kept for up to 24 months so we can follow up. If you
                become a client, engagement records are kept for the period required by applicable
                accounting, tax, and professional rules. You can ask us to delete inquiry data
                sooner, unless we are required to keep it.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[var(--navy)] mb-3">Your choices and rights</h2>
              <p>
                Depending on where you live, you may have the right to access, correct, delete, or
                restrict the use of your personal information, or to withdraw consent. To exercise
                any of these rights, email{" "}
                <a className="text-[var(--meridian-text)] underline" href={`mailto:${BRAND.email}`}>
                  {BRAND.email}
                </a>
                . We will respond within a reasonable period and may need to verify your identity.
                You may also have the right to complain to your local data-protection authority.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[var(--navy)] mb-3">Security</h2>
              <p>
                We use encryption in transit, role-based access, read-only access to client
                accounting files where possible, and confidentiality agreements for every team
                member. No method of transmission or storage is completely secure, but we work to
                protect your information and to limit access to those who need it.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[var(--navy)] mb-3">Children</h2>
              <p>
                This site is intended for businesses and is not directed to children under 16. We
                do not knowingly collect personal information from children.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[var(--navy)] mb-3">Changes</h2>
              <p>
                We may update this policy as our services or legal requirements change. The date at
                the top of this page shows the latest revision. Material changes will be posted
                here before they take effect.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

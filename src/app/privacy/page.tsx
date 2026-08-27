import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | KeyWRD",
  description:
    "Learn how KeyWRD collects, uses, protects, and manages personal information.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | KeyWRD",
    description:
      "Learn how KeyWRD collects, uses, protects, and manages personal information.",
    url: "/privacy",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | KeyWRD",
    description:
      "Learn how KeyWRD collects, uses, protects, and manages personal information.",
    images: [],
  },
};

const sections = [
  {
    title: "1. Scope of this policy",
    content: (
      <>
        <p>
          This Privacy Policy explains how 18053588 CANADA INC., the company
          responsible for the KeyWRD website (“KeyWRD,” “we,” “us,” or “our”),
          collects, uses, discloses, retains, and protects personal information
          through keywrd.ca and through direct communications with us.
        </p>
        <p>
          It applies to information handled in the course of our commercial
          activities. It does not apply to websites or services operated by
          third parties.
        </p>
      </>
    ),
  },
  {
    title: "2. Information we collect",
    content: (
      <>
        <p>We limit collection to information reasonably needed for the purposes described in this policy. This may include:</p>
        <ul>
          <li><strong>Information you provide:</strong> your name, email address, company name, website, advertising budget range, and the content of messages you send through our follow-up form.</li>
          <li><strong>AI assistant conversations:</strong> questions and other information you choose to enter in the Ask KeyWRD chat.</li>
          <li><strong>Business and campaign information:</strong> information you choose to share when requesting an audit, proposal, or advertising service.</li>
          <li><strong>Technical information:</strong> basic server logs that may include an IP address, browser type, device type, requested pages, and access times.</li>
        </ul>
        <p>We do not ask you to create an account or submit payment information through this website.</p>
      </>
    ),
  },
  {
    title: "3. How we use information",
    content: (
      <>
        <p>We may use personal information to:</p>
        <ul>
          <li>respond to questions, audit requests, and business inquiries;</li>
          <li>generate answers to questions submitted through the AI assistant;</li>
          <li>process and route requested follow-ups;</li>
          <li>understand your advertising goals and recommend relevant services;</li>
          <li>prepare proposals and provide requested services;</li>
          <li>operate, secure, troubleshoot, and improve our website;</li>
          <li>maintain appropriate business and service records; and</li>
          <li>meet legal, regulatory, or contractual obligations.</li>
        </ul>
        <p>We will not use personal information for a new incompatible purpose without providing notice and obtaining consent where required.</p>
      </>
    ),
  },
  {
    title: "4. Cookies and analytics",
    content: (
      <>
        <p>
          KeyWRD does not currently use advertising pixels, behavioural
          profiling tools, or non-essential analytics cookies on this website.
          Our hosting provider may process limited technical information needed
          to deliver, secure, and maintain the site.
        </p>
        <p>
          If we introduce analytics, advertising technologies, or other
          non-essential tracking tools, we will update this policy and provide
          consent choices where required by applicable law.
        </p>
      </>
    ),
  },
  {
    title: "5. Consent",
    content: (
      <p>
        We obtain consent where required for the collection, use, and disclosure
        of personal information. You may withdraw consent, subject to legal or
        contractual restrictions and reasonable notice. Withdrawing consent may
        affect our ability to respond to a request or provide a service.
      </p>
    ),
  },
  {
    title: "6. When we share information",
    content: (
      <>
        <p>We do not sell personal information. We may share limited information with:</p>
        <ul>
          <li><strong>Service providers</strong> that support hosting, email delivery, spam protection, the AI assistant, security, professional services, or business operations, only as needed to perform their work;</li>
          <li><strong>Advertising platforms and technology providers</strong> when necessary to provide services you have requested and with appropriate account access or authorization;</li>
          <li><strong>Legal or regulatory authorities</strong> when required by law or reasonably necessary to protect rights, safety, and security; or</li>
          <li><strong>A successor organization</strong> in connection with a proposed or completed business transaction, subject to appropriate safeguards.</li>
        </ul>
      </>
    ),
  },
  {
    title: "7. Processing outside your province or Canada",
    content: (
      <p>
        Some service providers, including providers supporting email delivery,
        spam protection, and the AI assistant, may process information in other provinces or
        countries. In those locations, information may be subject to local laws
        and lawful access by courts or authorities. We use reasonable measures
        to require service providers to protect information appropriately. Do
        not submit passwords, payment details, or other sensitive information
        through the follow-up form or AI assistant.
      </p>
    ),
  },
  {
    title: "8. Retention",
    content: (
      <p>
        We retain personal information only for as long as reasonably necessary
        for the purposes described in this policy, to provide services, maintain
        appropriate business records, and meet legal obligations. We then delete,
        destroy, or anonymize it where appropriate.
      </p>
    ),
  },
  {
    title: "9. Safeguards",
    content: (
      <p>
        We use reasonable administrative, technical, and organizational measures
        appropriate to the sensitivity of the information. No method of electronic
        transmission or storage is completely secure, so absolute security cannot
        be guaranteed.
      </p>
    ),
  },
  {
    title: "10. Your privacy rights",
    content: (
      <>
        <p>Subject to applicable law, you may ask to:</p>
        <ul>
          <li>learn whether we hold personal information about you;</li>
          <li>access the personal information we hold;</li>
          <li>correct information that is inaccurate or incomplete;</li>
          <li>withdraw consent where applicable; or</li>
          <li>raise a question or complaint about our privacy practices.</li>
        </ul>
        <p>We may need to verify your identity before completing a request. Legal exceptions may limit access or deletion in some circumstances.</p>
      </>
    ),
  },
  {
    title: "11. Marketing communications",
    content: (
      <p>
        KeyWRD does not currently offer a marketing newsletter through this
        website. If we send commercial electronic messages, we will do so in
        accordance with applicable requirements and provide an unsubscribe method
        where required.
      </p>
    ),
  },
  {
    title: "12. Third-party websites",
    content: (
      <p>
        Our website may link to third-party websites or platforms. Their privacy
        practices are governed by their own policies, and KeyWRD is not responsible
        for how they handle information.
      </p>
    ),
  },
  {
    title: "13. Children’s privacy",
    content: (
      <p>
        This website and our services are intended for businesses and are not
        directed to children. We do not knowingly collect personal information
        from children through this website.
      </p>
    ),
  },
  {
    title: "14. Changes to this policy",
    content: (
      <p>
        We may update this Privacy Policy as our services, technologies, or legal
        obligations change. The revised version will be posted here with a new
        “Last updated” date. We will provide additional notice when required.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="privacy-header">
        <div className="container privacy-header-inner">
          <Link href="/" aria-label="KeyWRD home">
            <Image src="/keywrd-logo.svg" alt="KeyWRD" width={154} height={43} priority />
          </Link>
          <Link className="privacy-back" href="/">← Back to website</Link>
        </div>
      </header>

      <main className="privacy-page">
        <section className="privacy-hero">
          <div className="container privacy-hero-inner">
            <p className="eyebrow">Your information matters</p>
            <h1>Privacy Policy</h1>
            <p>
              A clear explanation of what KeyWRD collects, why we collect it,
              and the choices available to you.
            </p>
            <span>Last updated: August 25, 2026</span>
          </div>
        </section>

        <section className="privacy-content">
          <div className="container privacy-layout">
            <aside className="privacy-summary" aria-label="Privacy summary">
              <p>At a glance</p>
              <ul>
                <li>We collect only what we reasonably need.</li>
                <li>We do not sell personal information.</li>
                <li>No advertising or analytics cookies are currently used.</li>
                <li>You may contact us about your information.</li>
              </ul>
            </aside>

            <article className="privacy-article">
              <div className="privacy-intro">
                <p>
                  KeyWRD is committed to handling personal information responsibly
                  and transparently. This policy is written to be practical and
                  understandable.
                </p>
              </div>

              {sections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.content}
                </section>
              ))}

              <section className="privacy-contact" id="privacy-contact">
                <p className="eyebrow">Questions or requests</p>
                <h2>15. Contact the Privacy Officer</h2>
                <p>
                  Direct privacy questions, access or correction requests, and
                  complaints to the person responsible for privacy at KeyWRD:
                </p>
                <p>
                  <strong>Privacy Officer</strong><br />
                  18053588 CANADA INC.<br />
                  KeyWRD website<br />
                  Email: <a href="mailto:mc@keywrd.ca?subject=Privacy%20Request">mc@keywrd.ca</a><br />
                </p>
                <p>
                  We will review and respond to privacy inquiries in accordance with
                  applicable law. You may also have the right to contact the privacy
                  regulator that applies in your jurisdiction.
                </p>
              </section>
            </article>
          </div>
        </section>
      </main>

      <footer className="privacy-footer">
        <div className="container">
          <span>© 2026 KeyWRD. All rights reserved.</span>
          <Link href="/">Return to KeyWRD</Link>
        </div>
      </footer>
    </>
  );
}

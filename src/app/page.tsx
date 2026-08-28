import Image from "next/image";
import Link from "next/link";
import AiChat from "./ai-chat";
import ContactForm, { OpenContactButton, OpenContactLink } from "./contact-form";
import MobileNav from "./mobile-nav";

const services = [
  {
    icon: "↗",
    title: "Paid Search Advertising",
    text: "Capture high-intent demand across the search channels that fit your market.",
  },
  {
    icon: "◎",
    title: "Paid Social Advertising",
    text: "Build awareness and demand with audience-focused social campaigns.",
  },
  {
    icon: "#",
    title: "Campaign Management",
    text: "Hands-on monitoring, testing, and optimization focused on your goals.",
  },
  {
    icon: "✓",
    title: "Audience & Channel Strategy",
    text: "Put the right message in front of the right people on the right channels.",
  },
  {
    icon: "◫",
    title: "Conversion Tracking & Analytics",
    text: "Connect media investment to leads, sales, and meaningful business actions.",
  },
  {
    icon: "▶",
    title: "Remarketing & Video",
    text: "Stay visible and turn attention into action across the customer journey.",
  },
];

const faqs = [
  {
    question: "How much should I spend on digital advertising?",
    answer:
      "The right budget depends on your market, goals, competition, and the value of a new customer. An audit can help establish a realistic starting point before you commit spend.",
  },
  {
    question: "How much does campaign management cost?",
    answer:
      "Management is scoped around the size and complexity of your campaigns. Contact KeyWRD for a clear recommendation based on what your account actually needs.",
  },
  {
    question: "Do I keep ownership of my advertising accounts?",
    answer:
      "Account access and ownership are important details to clarify at the start of any engagement. Ask us about the setup that best protects your business and its campaign history.",
  },
  {
    question: "How quickly can campaigns launch?",
    answer:
      "Timing depends on account readiness, tracking, creative, and campaign complexity. After an initial review, we can outline a practical launch timeline for your business.",
  },
  {
    question: "Do you work with existing advertising accounts?",
    answer:
      "Yes. Existing accounts can be reviewed to identify structural, creative, targeting, tracking, and budget opportunities before a management plan is recommended.",
  },
  {
    question: "Which advertising platforms can you manage?",
    answer:
      "The right channel mix depends on your audience, offer, and goals. KeyWRD can discuss search, social, display, and video opportunities and recommend where your investment is most likely to matter.",
  },
];

const process = [
  ["01", "Audit", "Analyze the account, market, competitors, and opportunities."],
  ["02", "Strategy", "Develop the channel mix, campaign structure, targeting, and budgets."],
  ["03", "Launch", "Configure campaigns, creative, and conversion tracking."],
  ["04", "Optimize", "Continuously improve performance based on real data."],
];

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className="logo" href="#top" aria-label="KeyWRD home">
      <Image
        src={inverse ? "/keywrd-logo-white.svg" : "/keywrd-logo.svg"}
        alt="KeyWRD"
        width={154}
        height={43}
        priority
      />
    </a>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`section-heading ${align === "left" ? "align-left" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function Header() {
  const navItems: Array<[string, string]> = [
    ["Services", "#services"],
    ["Why KeyWRD", "#why"],
    ["Process", "#process"],
    ["ClickSensei", "#technology"],
    ["FAQ", "#faq"],
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <OpenContactButton className="button button-small header-cta" reason="Free Performance Audit">Get a Free Performance Audit <Arrow /></OpenContactButton>
        <MobileNav navItems={navItems} />
      </div>
    </header>
  );
}

function HeroDashboard() {
  return (
    <div className="hero-visual" aria-label="Illustrative cross-channel advertising performance dashboard">
      <div className="keyword-float keyword-one"><span>⌕</span> cross-channel performance</div>
      <div className="keyword-float keyword-two"><span></span> ClickSensei signal</div>
      <div className="dashboard hero-dashboard">
        <div className="dashboard-top">
          <div>
            <span className="dashboard-kicker">Campaign overview</span>
            <strong>Performance</strong>
          </div>
          <span className="live-pill"><i></i> Active</span>
        </div>
        <div className="dashboard-metrics">
          <div><span>Conversions</span><strong>84</strong><em>+31%</em></div>
          <div><span>Cost / Lead</span><strong>$27.40</strong><em className="down">−18%</em></div>
          <div><span>Conv. Rate</span><strong>7.8%</strong><small>↑ 1.4%</small></div>
          <div><span>ROAS</span><strong>4.6x</strong><small>On target</small></div>
        </div>
        <div className="mini-chart" aria-hidden="true">
          <div className="chart-labels"><span>Campaign performance</span><span>Last 30 days</span></div>
          <div className="chart-area">
            <i style={{ height: "27%" }}></i><i style={{ height: "38%" }}></i>
            <i style={{ height: "34%" }}></i><i style={{ height: "54%" }}></i>
            <i style={{ height: "49%" }}></i><i style={{ height: "68%" }}></i>
            <i style={{ height: "63%" }}></i><i style={{ height: "83%" }}></i>
            <i style={{ height: "78%" }}></i><i style={{ height: "96%" }}></i>
          </div>
        </div>
        <div className="dashboard-footer-row">
          <span><i className="status-dot"></i> Paid media — Sales</span>
          <strong>6.8% CTR</strong>
        </div>
      </div>
      <div className="search-ad-float">
        <span>ClickSensei insight</span>
        <strong>Opportunity detected</strong>
        <small>Prioritize the next best optimization.</small>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero section">
          <div className="hero-glow" aria-hidden="true"></div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Performance-Driven Advertising Agency</p>
              <h1>Smarter campaigns. <span>Stronger results.</span></h1>
              <p className="hero-lede">Performance advertising powered by sharper strategy, innovative technology, and decisions built around measurable growth.</p>
              <div className="hero-actions">
                <OpenContactButton className="button" reason="Free Performance Audit">Get a Free Performance Audit <Arrow /></OpenContactButton>
                <a className="button button-secondary" href="#process">See How It Works <span aria-hidden="true">↓</span></a>
              </div>
              <p className="trust-line"><span>✓</span> No commitment <i>·</i> Clear recommendations <i>·</i> Direct communication</p>
            </div>
            <HeroDashboard />
          </div>
        </section>

        <section className="channel-strip" aria-label="Advertising channels">
          <div className="container channel-row">
            <span className="channel-label">Built for performance across</span>
            {[
              ["G", "Google Ads"], ["S", "Search"], ["D", "Display"], ["▶", "YouTube"], ["M", "Meta Ads"],
            ].map(([mark, label]) => <span className="channel" key={label}><i>{mark}</i>{label}</span>)}
          </div>
        </section>

        <section className="section problem-section">
          <div className="container">
            <SectionHeading eyebrow="Clarity over guesswork" title="Advertising shouldn’t feel like gambling." body="Too many businesses invest across channels without knowing which campaigns, audiences, or messages are producing real results. We bring structure, visibility, and intent to every dollar." />
            <div className="problem-grid">
              {[
                ["01", "Wasted Ad Spend", "Stop investing in traffic that does not move the business forward."],
                ["02", "Disconnected Campaigns", "Build a channel mix around real customer intent."],
                ["03", "No Clear ROI", "Understand exactly where your advertising budget goes."],
              ].map(([num, title, text]) => (
                <article className="problem-card" key={title}>
                  <span>{num}</span><div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <SectionHeading eyebrow="Focused expertise" title="Everything your advertising needs to perform." body="One specialized partner for multichannel strategy, launch, measurement, and continuous improvement." />
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <span className="service-icon" aria-hidden="true">{service.icon}</span>
                  <div><h3>{service.title}</h3><p>{service.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section why-section" id="why">
          <div className="container why-grid">
            <div className="why-copy">
              <SectionHeading align="left" eyebrow="A better agency experience" title="Your advertising budget deserves attention." body="KeyWRD is built for businesses that want focused expertise, a clear line of communication, and a campaign strategy tied to real goals." />
              <a className="text-link" href="#about">Meet KeyWRD <Arrow /></a>
            </div>
            <div className="comparison" aria-label="Comparison of a big agency and KeyWRD">
              <article className="comparison-card agency-card">
                <p>Big Agency</p><h3>More layers.<br />Less clarity.</h3>
                <ul>
                  {[
                    "Multiple account layers", "Generic campaign structures", "Slow communication", "Reports without explanation", "Client becomes another account",
                  ].map((item) => <li key={item}><span>×</span>{item}</li>)}
                </ul>
              </article>
              <article className="comparison-card keywrd-card">
                <p><i></i> KeyWRD</p><h3>Direct attention.<br />Clear direction.</h3>
                <ul>
                  {[
                    "Direct communication", "Customized strategy", "ClickSensei-supported insights", "Continuous optimization", "Campaigns built around your goals",
                  ].map((item) => <li key={item}><span>✓</span>{item}</li>)}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="container">
            <SectionHeading eyebrow="Simple by design" title="From strategy to stronger sales." body="A clear four-step process keeps your campaigns aligned, accountable, and moving toward meaningful growth." />
            <div className="process-grid">
              {process.map(([num, title, text]) => (
                <article className="process-step" key={num}>
                  <strong className="process-number">{num}</strong>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section data-section" id="technology">
          <div className="container data-grid">
            <div className="data-copy">
              <SectionHeading align="left" eyebrow="The ClickSensei advantage" title="Technology that sharpens every decision." body="ClickSensei is the new performance technology in the KeyWRD workflow. It helps us turn campaign data into clearer priorities, smarter optimizations, and a stronger path toward growth." />
              <ul>
                <li><span>✓</span> A clearer view of campaign performance</li>
                <li><span>✓</span> Faster identification of optimization opportunities</li>
                <li><span>✓</span> Human strategy strengthened by better intelligence</li>
              </ul>
              <a className="text-link" href="https://clicksensei.com/">
                Learn more about ClickSensei <Arrow />
              </a>
            </div>
            <div className="data-dashboard">
              <div className="demo-label">Illustrative demo data</div>
              <div className="data-dashboard-head">
                <div><span>ClickSensei</span><strong>Performance intelligence</strong></div>
                <button type="button" aria-label="Selected reporting period: last 30 days">Last 30 days <span>⌄</span></button>
              </div>
              <div className="data-metrics">
                <div><span>Sales actions</span><strong>84</strong><em>+31%</em></div>
                <div><span>Cost / Result</span><strong>$27.40</strong><em>−18%</em></div>
                <div><span>Conversion Rate</span><strong>7.8%</strong><small>+1.4 pts</small></div>
                <div><span>ROAS</span><strong>4.6x</strong><small>On target</small></div>
              </div>
              <div className="large-chart">
                <div className="chart-side"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
                <div className="chart-main" aria-label="Illustrative rising conversion trend">
                  <div className="grid-line"></div><div className="grid-line"></div><div className="grid-line"></div><div className="grid-line"></div>
                  <div className="trend-fill"></div>
                  <div className="trend-line"></div>
                  <i className="trend-dot dot-a"></i><i className="trend-dot dot-b"></i><i className="trend-dot dot-c"></i>
                </div>
              </div>
              <div className="chart-months"><span>May 1</span><span>May 8</span><span>May 15</span><span>May 22</span><span>May 30</span></div>
            </div>
          </div>
        </section>

        <section className="section help-section">
          <div className="container">
            <SectionHeading eyebrow="Built to fit" title="Performance advertising built around your business." body="Different businesses need different channels, audiences, and campaign structures. Your strategy should reflect how your customers actually buy." />
            <div className="help-grid">
              {[
                ["⌖", "Local Businesses", "Generate calls, bookings, and qualified local leads."],
                ["▣", "E-commerce", "Connect product demand to measurable online sales."],
                ["◇", "B2B", "Reach decision-makers with longer buying journeys."],
                ["✦", "Specialized & Niche", "Build focused demand in precise, competitive markets."],
              ].map(([icon, title, text]) => (
                <article key={title}><span aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{text}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div>
              <p className="eyebrow">About KeyWRD</p>
              <h2>Expert strategy.<br /><span>Smarter technology.</span></h2>
            </div>
            <div className="about-copy">
              <p>KeyWRD combines direct, transparent campaign management with ClickSensei, our new performance technology, to help businesses push advertising and sales further.</p>
              <p>Technology does not replace strategy—it strengthens it. Every decision starts with your goals, then data, execution, optimization, and reporting stay connected.</p>
              <div className="about-flow" aria-label="KeyWRD approach">
                {['Strategy', 'Management', 'Optimization', 'Reporting'].map((item, index) => (
                  <span key={item}>{item}{index < 3 && <i aria-hidden="true">→</i>}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container faq-grid">
            <div className="faq-intro">
              <p className="eyebrow">Frequently asked questions</p>
              <h2>Good questions deserve clear answers.</h2>
              <p>Still wondering whether KeyWRD is the right fit?</p>
              <OpenContactLink className="text-link">Let’s talk <Arrow /></OpenContactLink>
            </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}<span aria-hidden="true"></span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ContactForm />
      </main>

      <footer>
        <div className="container footer-top">
          <div><Logo inverse /><p>Performance advertising powered by direct expertise and smarter technology.</p></div>
          <div className="footer-links"><a href="#services">Advertising Management</a><a href="#technology">ClickSensei</a><Link href="/privacy#top" scroll>Privacy</Link><OpenContactLink>Contact</OpenContactLink></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 KeyWRD. All rights reserved.</span><span>Smarter campaigns. Stronger results.</span></div>
      </footer>
      <AiChat />
    </>
  );
}

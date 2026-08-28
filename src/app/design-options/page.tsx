import Link from "next/link";
import styles from "./design-options.module.css";

const processSteps = [
  ["01", "Audit", "Analyze the account, market, competitors, and opportunities."],
  ["02", "Strategy", "Develop the channel mix, campaign structure, targeting, and budgets."],
  ["03", "Launch", "Configure campaigns, creative, and conversion tracking."],
  ["04", "Optimize", "Continuously improve performance based on real data."],
];

const businessTypes = [
  ["⌖", "Local Businesses", "Generate calls, bookings, and qualified local leads."],
  ["▣", "E-commerce", "Connect product demand to measurable online sales."],
  ["◇", "B2B", "Reach decision-makers with longer buying journeys."],
  ["✦", "Specialized & Niche", "Build focused demand in precise, competitive markets."],
];

function OptionHeading({ number, title, note }: { number: string; title: string; note: string }) {
  return (
    <div className={styles.optionHeading}>
      <span>Option {number}</span>
      <div><h2>{title}</h2><p>{note}</p></div>
    </div>
  );
}

export default function DesignOptionsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/">← Back to KeyWRD</Link>
        <p>Design preview</p>
        <h1>Choose the layouts that feel right.</h1>
        <p className={styles.intro}>These are visual previews only. The current homepage layout has not been replaced.</p>
      </header>

      <section className={styles.group}>
        <div className={styles.groupTitle}><span>01</span><div><p>Process section</p><h2>From strategy to stronger sales.</h2></div></div>

        <article className={styles.option}>
          <OptionHeading number="1" title="Compact numbered cards" note="Recommended — tighter, centered, and easy to scan." />
          <div className={styles.processCards}>
            {processSteps.map(([number, title, text]) => (
              <div key={number}><strong>{number}</strong><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </article>

        <article className={styles.option}>
          <OptionHeading number="2" title="Two-by-two process grid" note="Larger steps with the number placed beside the text." />
          <div className={styles.processSplit}>
            {processSteps.map(([number, title, text]) => (
              <div key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{text}</p></div></div>
            ))}
          </div>
        </article>

        <article className={styles.option}>
          <OptionHeading number="3" title="Vertical timeline" note="A more editorial sequence with a strong sense of progression." />
          <div className={styles.timeline}>
            {processSteps.map(([number, title, text]) => (
              <div key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{text}</p></div></div>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.group}>
        <div className={styles.groupTitle}><span>02</span><div><p>Performance advertising section</p><h2>Built around your business.</h2></div></div>

        <article className={styles.option}>
          <OptionHeading number="1" title="Icon left, text right" note="Recommended — compact, balanced, and visually consistent." />
          <div className={styles.businessRows}>
            {businessTypes.map(([icon, title, text]) => (
              <div key={title}><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></div>
            ))}
          </div>
        </article>

        <article className={styles.option}>
          <OptionHeading number="2" title="Borderless two-column list" note="Minimal and premium, using subtle lines instead of cards." />
          <div className={styles.businessList}>
            {businessTypes.map(([icon, title, text]) => (
              <div key={title}><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></div>
            ))}
          </div>
        </article>

        <article className={styles.option}>
          <OptionHeading number="3" title="Compact horizontal tiles" note="Keeps the four-column structure while removing excess height." />
          <div className={styles.businessTiles}>
            {businessTypes.map(([icon, title, text]) => (
              <div key={title}><div><span>{icon}</span><h3>{title}</h3></div><p>{text}</p></div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

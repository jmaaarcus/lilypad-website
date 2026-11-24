import { Check, X } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router";
import { Faq, type FaqItem } from "./Faq";
import { Reveal } from "./Reveal";
import {
  COMPETITORS,
  COMPETITOR_ROWS,
  FREE_FEATURES,
  FREE_VS_PRO,
  PERIODS,
  PRO_FEATURES,
  type PeriodId,
} from "../content/pricing";

const SECTION_TITLE = "display text-[clamp(2rem,1.25rem+2.8vw,3.35rem)] leading-[1.05]";

export function PricingSection() {
  const [period, setPeriod] = useState<PeriodId>("yearly");

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="pricing-section scroll-mt-0">
      <div className="pricing-band">
        <div className="pricing-inner mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
          <header className="pricing-heading">
            <div>
              <h2 id="pricing-title" className="display max-w-[11ch] text-[clamp(3.1rem,1.8rem+5vw,5.7rem)] leading-[0.94]">
                Start with the essentials. Make room for more.
              </h2>
            </div>
            <div className="mx-auto max-w-xl text-center lg:pb-2">
              <p className="mx-auto max-w-[43ch] text-center text-lg leading-relaxed text-ink-2">
                The free plan gives you a place to begin. Pro adds more notebooks, more space and tools for deeper work.
              </p>
            </div>
          </header>

          <div className="pricing-plan-toolbar">
            <BillingToggle value={period} onChange={setPeriod} />
          </div>

          <div className="pricing-plans grid">
            <Reveal y={18}>
              <FreePlan />
            </Reveal>
            <Reveal delay={0.1} y={18}>
              <ProPlan period={period} />
            </Reveal>
          </div>
        </div>
      </div>

      <FreeVsPro />
      <Competitors />

    </section>
  );
}

export function PricingFaqSection() {
  return (
    <section id="good-to-know" aria-labelledby="pricing-faq-title" className="good-to-know-section mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-7 md:pb-28 md:pt-24 lg:px-10">
      <div className="good-to-know-layout grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <header className="good-to-know-heading">
          <h2 id="pricing-faq-title" className={`${SECTION_TITLE} max-w-[10ch]`}>Good to know.</h2>
          <p className="mt-5 max-w-[34ch] leading-relaxed text-ink-2">Clear answers about subscriptions, your notebooks and using Lilypad on iPad.</p>
        </header>
        <div className="good-to-know-questions">
          <Faq items={PRICING_FAQ} />
        </div>
      </div>
    </section>
  );
}

function BillingToggle({ value, onChange }: { value: PeriodId; onChange: (period: PeriodId) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = PERIODS.findIndex((period) => period.id === value);

  const onKey = (event: KeyboardEvent) => {
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    const next = (index + direction + PERIODS.length) % PERIODS.length;
    onChange(PERIODS[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div role="radiogroup" aria-label="Billing period" onKeyDown={onKey} className="billing-switcher grid w-full max-w-md grid-cols-3 sm:w-auto">
      {PERIODS.map((period, itemIndex) => {
        const active = period.id === value;
        return (
          <button
            key={period.id}
            ref={(element) => { refs.current[itemIndex] = element; }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(period.id)}
            className={`billing-option flex min-w-0 flex-col items-center px-3 py-3 text-center transition-colors sm:min-w-[112px] ${active ? "is-active" : ""}`}
          >
            <span className="billing-option-label">{period.label}</span>
            <span className="billing-option-note">
              {period.save ? `Save ${period.save}%` : "Flexible"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function CheckItem({ children, inverse = false }: { children: string; inverse?: boolean }) {
  return (
    <li className={`pricing-check-item flex items-start gap-3 text-sm leading-relaxed ${inverse ? "pricing-check-item-inverse" : "text-ink-2"}`}>
      <Check size={17} weight="bold" className={`mt-0.5 shrink-0 ${inverse ? "" : "text-accent"}`} aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

/** Both tiers share exactly the same header, card and feature layout. */
function PlanCard({ id, name, eyebrow, description, price, unit, billing, included, features }: {
  id: string; name: string; eyebrow: string; description: string; price: string;
  unit: string; billing?: string; included: string; features: readonly string[];
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      aria-labelledby={`${id}-plan-title`}
      className={`pricing-plan ${id === "free" ? "pricing-plan-free" : "pricing-plan-pro"} h-full`}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <div className="pricing-plan-head">
        <div className="pricing-plan-identity">
          <p className="eyebrow">{eyebrow}</p>
          <h3 id={`${id}-plan-title`} className="pricing-plan-name">{name}</h3>
        </div>
        <div className="pricing-price-block" aria-live="polite" aria-atomic="true">
          <p className="pricing-price">
            <motion.span
              key={price}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {price}
            </motion.span>
            <small>{unit}</small>
          </p>
          {billing && <p className="pricing-billing-line">{billing}</p>}
        </div>
      </div>
      <p className="pricing-plan-description">{description}</p>
      <p className="pricing-includes">{included}</p>
      <ul className="pricing-feature-list grid">
        {features.map((feature) => <CheckItem key={feature}>{feature}</CheckItem>)}
      </ul>
    </motion.article>
  );
}

function FreePlan() {
  return <PlanCard id="free" name="Free" eyebrow="No subscription" description="A good place to start, with the essentials already included." price="$0" unit="forever" included="Included" features={FREE_FEATURES} />;
}

function ProPlan({ period }: { period: PeriodId }) {
  const selected = PERIODS.find((item) => item.id === period)!;
  return <PlanCard id="pro" name={`Pro ${selected.id.charAt(0).toUpperCase() + selected.id.slice(1)}`} eyebrow="For bigger projects" description="More space for your notebooks, plus the tools for deeper work." price={selected.price} unit={`per ${selected.duration}`} included="Everything in Free, plus:" features={PRO_FEATURES} />;
}

function Yes({ label = "Included", inverse = false }: { label?: string; inverse?: boolean }) {
  return (
    <span className={`inline-grid h-6 w-6 place-items-center ${inverse ? "comparison-yes-inverse" : "text-accent"}`}>
      <Check size={16} weight="bold" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

function No({ label = "Not included", inverse = false }: { label?: string; inverse?: boolean }) {
  return (
    <span className={`inline-flex ${inverse ? "comparison-no-inverse" : "text-ink-3/60"}`}>
      <X size={16} weight="regular" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

function FreeVsPro() {
  return (
    <section className="pricing-detail-section mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
      <div className="free-pro-comparison overflow-x-auto" tabIndex={0} role="region" aria-label="Free and Pro plan comparison">
        <table className="free-pro-table w-full min-w-[30rem] table-fixed border-collapse text-left">
          <caption className="sr-only">Features and limits in the Free and Lilypad Pro plans</caption>
          <colgroup>
            <col className="w-[64%]" />
            <col className="w-[18%]" />
            <col className="w-[18%]" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="px-4 py-4">Feature</th>
              <th scope="col" className="px-4 py-4 text-center">Free</th>
              <th scope="col" className="px-4 py-4 text-center">Pro</th>
            </tr>
          </thead>
          {FREE_VS_PRO.map((group) => (
            <tbody key={group.title}>
              <tr>
                <th scope="rowgroup" colSpan={3} className="free-pro-group-heading px-4 text-left">
                  {group.title}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="free-pro-feature px-4 py-3 text-left">{row.label}</th>
                  <td className="free-pro-value px-4 py-3">
                    <PlanComparisonValue value={row.free} label={row.label} />
                  </td>
                  <td className="free-pro-value px-4 py-3">
                    <PlanComparisonValue value={row.pro} label={row.label} />
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-3 md:hidden">Swipe sideways to compare plans.</p>
    </section>
  );
}

function PlanComparisonValue({ value, label }: { value: boolean | string; label: string }) {
  if (value === true) return <Yes label={`${label}: included`} />;
  if (value === false) return <No label={`${label}: not included`} />;
  return <span className="tabular-nums">{value}</span>;
}

function Competitors() {
  return (
    <section aria-labelledby="competitors-title" className="pricing-detail-section mx-auto max-w-6xl px-5 sm:px-7 lg:px-10">
      <header className="grid gap-4 pb-7 md:grid-cols-[0.85fr_1.15fr] md:items-end md:gap-12">
        <div>
          <h2 id="competitors-title" className={SECTION_TITLE}>A fair look at the features.</h2>
        </div>
      </header>
      <div className="comparison-scroll mt-5 overflow-x-auto" tabIndex={0} role="region" aria-label="Competitor comparison table, scrolls horizontally">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <caption className="sr-only">Lilypad Pro compared with Goodnotes Essential, Notability Plus and CollaNote Premium</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-[1] w-[19%] bg-bg px-4 py-5"><span className="sr-only">Feature</span></th>
              {COMPETITORS.map((competitor) => (
                <th key={competitor} scope="col" className="px-4 py-5 text-sm font-semibold text-ink">
                  {competitor}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPETITOR_ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="sticky left-0 z-[1] bg-bg px-4 py-3.5 text-sm font-medium text-ink">{row.label}</th>
                {row.values.map((value, index) => {
                  const isBest = row.best?.includes(index) ?? false;
                  return (
                    <td key={index} className={`px-4 py-3.5 text-sm ${isBest ? "comparison-best-cell" : "text-ink-2"}`}>
                      <Value value={value} />
                      {isBest ? <span className="sr-only">Clear advantage</span> : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-ink-3 md:hidden">Swipe sideways to compare the columns.</p>
    </section>
  );
}

function Value({ value }: { value: boolean | string }) {
  if (value === true) return <Yes label="Yes" />;
  if (value === false || value === "-") return <span className="comparison-dash" aria-label="Not available">-</span>;
  return <span>{value}</span>;
}

const PRICING_FAQ: FaqItem[] = [
  {
    q: "How does billing work?",
    a: "Your subscription renews automatically at the selected interval. To avoid the next charge, turn off auto-renew at least 24 hours before the current period ends.",
  },
  {
    q: "How do I cancel Pro?",
    a: "To cancel, open Settings, tap your name, then Subscriptions and Lilypad Pro. Turn off auto-renew at least 24 hours before the current period ends.",
  },
  {
    q: "What happens to my notebooks if Pro ends?",
    a: "Your notebooks stay on your device and you can still open, view and export them. Pro tools stop working, and the free plan limits apply again.",
  },
  {
    q: "Can I try Pro before subscribing?",
    a: "Pro doesn't have a free trial. The free plan has no time limit, so you can keep using 3 notebooks and 1 whiteboard for as long as you like.",
  },
  {
    q: "Can I use Lilypad on iPhone or Mac?",
    a: "No. Lilypad is made for iPad and requires iPadOS 26 or later.",
  },
  {
    q: "Where are my notebooks stored?",
    a: (
      <>
        Your notebooks stay on your iPad and sync through iCloud when it's enabled. Each Apple ID has its own notebooks, and we can't see what's inside. You can read more in the{" "}
        <Link to="/privacy" className="text-accent underline underline-offset-4">Privacy Policy</Link>.
      </>
    ),
  },
];

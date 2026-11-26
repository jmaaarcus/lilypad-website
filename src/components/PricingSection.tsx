import { Check, Question, Tag, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { Faq, type FaqItem } from "./Faq";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import {
  COMPETITORS,
  COMPETITOR_NOTE,
  COMPETITOR_ROWS,
  FREE_FEATURES,
  FREE_VS_PRO,
  PERIODS,
  PRO_FEATURES,
  type PeriodId,
} from "../content/pricing";

export function PricingSection() {
  const [period, setPeriod] = useState<PeriodId>("yearly");

  return (
    <Section id="pricing" tone="orange" icon={Tag} eyebrow="Pricing" title="Start with the essentials." lead="Pro adds more notebooks, more space and tools for deeper work.">
        <div className="mt-10 flex md:mt-12">
          <BillingToggle value={period} onChange={setPeriod} />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Reveal y={30}>
            <PlanCard
                id="free"
                name="Free"
                description="A good place to start, with the essentials already included."
                price="$0"
                unit="forever"
                included="Included"
                features={FREE_FEATURES}
              />
          </Reveal>
          <Reveal delay={0.1} y={30}>
            <ProCard period={period} />
          </Reveal>
        </div>

        <FreeVsPro />
        <Competitors />
    </Section>
  );
}

export function PricingFaqSection() {
  return (
    <Section id="good-to-know" tone="indigo" icon={Question} eyebrow="Questions" title="Good to know." lead="Clear answers about subscriptions, your notebooks and using Lilypad on iPad." edge="end">
      <div className="mt-10 md:mt-12"><Faq items={PRICING_FAQ} /></div>
    </Section>
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
    <div role="radiogroup" aria-label="Billing period" onKeyDown={onKey} className="grid w-full max-w-md grid-cols-3 rounded-[10px] border border-line bg-surface-2 p-1">
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
            className="relative flex flex-col items-center rounded-[8px] px-3 py-2 text-center"
          >
            {active && <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-[8px] border border-line bg-surface shadow-soft" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <span className="relative text-sm font-semibold text-ink">{period.label}</span>
            <span className={`relative text-xs ${active && period.save ? "font-medium text-tone" : "text-ink-3"}`}>{period.save ? `Save ${period.save}%` : "Flexible"}</span>
          </button>
        );
      })}
    </div>
  );
}

function PlanCard({ id, name, description, price, unit, included, features, accent = false }: {
  id: string; name: string; description: string; price: string; unit: string;
  included: string; features: readonly string[]; accent?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <article
      aria-labelledby={`${id}-plan-title`}
      className={`relative flex h-full flex-col overflow-hidden rounded-card border bg-surface p-7 sm:p-8 ${accent ? "border-tone/40 shadow-[0_0_0_4px_color-mix(in_srgb,var(--tone)_10%,transparent)]" : "border-line"}`}
    >
      {accent && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--tone),var(--tone-2))]" />}
      <div className="flex items-start justify-between gap-6">
        <h3 id={`${id}-plan-title`} className="title-card">{name}</h3>
        <p className="text-right" aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={price}
              className="block text-5xl font-semibold tracking-[-0.05em] tabular-nums"
              initial={reduce ? false : { opacity: 0, y: 14, rotateX: -60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14, rotateX: 60 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {price}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm text-ink-3">{unit}</span>
        </p>
      </div>
      <p className="mt-6 leading-relaxed text-ink-2">{description}</p>
      <p className="mt-8 border-t border-line pt-6 text-sm font-semibold">{included}</p>
      <ul className="mt-4 grid gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-ink-2">
            <span className="check mt-0.5"><Check size={12} weight="bold" aria-hidden="true" /></span>
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProCard({ period }: { period: PeriodId }) {
  const selected = PERIODS.find((item) => item.id === period)!;
  return (
    <PlanCard
      id="pro"
      name={`Pro ${selected.label}`}
      description="More space for your notebooks, plus the tools for deeper work."
      price={selected.price}
      unit={`per ${selected.duration}`}
      included="Everything in Free, plus:"
      features={PRO_FEATURES}
      accent
    />
  );
}

function Mark({ value, label }: { value: boolean | string; label: string }) {
  if (value === true) return <span className="check"><Check size={12} weight="bold" aria-hidden="true" /><span className="sr-only">{label}: included</span></span>;
  if (value === false) return <span className="inline-flex text-ink-3/70"><X size={15} aria-hidden="true" /><span className="sr-only">{label}: not included</span></span>;
  return <span className="tabular-nums">{value}</span>;
}

function TableShell({ label, children, hint }: { label: string; children: ReactNode; hint: string }) {
  return (
    <>
      <div className="table-card mt-4 w-full overflow-x-auto" tabIndex={0} role="region" aria-label={label}>{children}</div>
      <p className="mt-2 text-xs text-ink-3 md:hidden">{hint}</p>
    </>
  );
}

function FreeVsPro() {
  return (
    <Reveal className="mt-12">
      <h3 className="title-card">Free and Pro, side by side.</h3>
      <TableShell label="Free and Pro plan comparison" hint="Swipe sideways to compare plans.">
        <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
          <caption className="sr-only">Features and limits in the Free and Lilypad Pro plans</caption>
          <thead>
            <tr className="text-ink-3">
              <th scope="col" className="px-5 py-3 font-medium">Feature</th>
              <th scope="col" className="w-40 px-4 py-3 text-center font-medium">Free</th>
              <th scope="col" className="w-40 px-4 py-3 text-center font-medium">Pro</th>
            </tr>
          </thead>
          <tbody>
            {FREE_VS_PRO.flatMap((group) => group.rows).map((row) => (
              <tr key={row.label} className="border-t border-line/70">
                <th scope="row" className="px-5 py-2.5 font-medium text-ink">{row.label}</th>
                <td className="px-4 py-2.5 text-center"><Mark value={row.free} label={row.label} /></td>
                <td className="px-4 py-2.5 text-center"><Mark value={row.pro} label={row.label} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableShell>
    </Reveal>
  );
}

function Competitors() {
  return (
    <Reveal className="mt-12">
      <h3 id="competitors-title" className="title-card">A fair look at the features.</h3>
      <TableShell label="Competitor comparison table, scrolls horizontally" hint="Swipe sideways to compare the columns.">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <caption className="sr-only">Lilypad Pro compared with Goodnotes Essential, Notability Plus and CollaNote Premium</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-[1] w-[22%] bg-surface-2 px-5 py-3"><span className="sr-only">Feature</span></th>
              {COMPETITORS.map((competitor, index) => (
                <th key={competitor} scope="col" className={`whitespace-nowrap px-4 py-3 font-semibold ${index === 0 ? "text-tone" : "text-ink"}`}>{competitor}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPETITOR_ROWS.map((row) => (
              <tr key={row.label} className="border-t border-line/70">
                <th scope="row" className="sticky left-0 z-[1] bg-surface px-5 py-2.5 font-medium text-ink">{row.label}</th>
                {row.values.map((value, index) => {
                  const best = row.best?.includes(index) ?? false;
                  return (
                    <td key={index} className={`px-4 py-2.5 ${best ? "bg-[color-mix(in_srgb,var(--tone)_9%,white)] font-medium text-ink" : "text-ink-2"}`}>
                      {value === true ? <Mark value label="Yes" /> : value === false || value === "-" ? <span className="text-ink-3" aria-label="Not available">-</span> : value}
                      {best && <span className="sr-only">Clear advantage</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </TableShell>
      <p className="mt-3 max-w-[70ch] text-sm text-ink-3">{COMPETITOR_NOTE}</p>
    </Reveal>
  );
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
    a: "No. Lilypad is made for iPad and requires iPadOS 18 or later.",
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

import { Check, Minus, Sparkle } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router";
import { AppStoreButton } from "../components/AppStoreButton";
import { Faq, type FaqItem } from "../components/Faq";
import { LiquidHeading } from "../components/LiquidHeading";
import { Reveal } from "../components/Reveal";
import { COMPETITORS, COMPETITOR_NOTE, COMPETITOR_ROWS, FREE_FEATURES, FREE_VS_PRO, PERIODS, PRO_FEATURES, type PeriodId } from "../content/pricing";

const H2 = "text-[clamp(2rem,1.3rem+2.6vw,3.2rem)] leading-[1.05]";

export function Pricing() {
  const [period, setPeriod] = useState<PeriodId>("yearly");
  return (
    <>
      <header className="relative mx-auto max-w-6xl px-5 pt-10 text-center sm:px-6 md:pt-14">
        <div aria-hidden="true" className="aurora pointer-events-none absolute left-1/2 w-screen -translate-x-1/2 -top-40 -z-10 h-[620px]" />
        <p className="eyebrow">Pricing</p>
        <LiquidHeading as="h1" write text="Start Free. Go Pro When You Need It." breaks={[1]} muted={[2, 3, 4, 5, 6, 7]} className="mx-auto mt-4 text-[clamp(2.6rem,1.4rem+4.6vw,5rem)] leading-[1]" />
        <p className="mx-auto mt-6 max-w-[46ch] text-lg text-ink-2">Lilypad Pro is an auto-renewing App Store subscription. Cancel anytime in your Apple ID settings.</p>
      </header>

      <section aria-label="Plans" className="mx-auto max-w-5xl px-5 pt-12 sm:px-6">
        <div className="flex justify-center">
          <BillingToggle value={period} onChange={setPeriod} />
        </div>
        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2">
          <FreeCard />
          <ProCard period={period} />
        </div>
        <p className="mt-6 text-center text-sm text-ink-3">Prices in US dollars. If Pro ends, your notebooks stay viewable and exportable.</p>
      </section>

      <FreeVsPro />
      <Competitors />

      <section aria-labelledby="faq-h" className="mx-auto max-w-3xl px-5 pt-16 sm:px-6 md:pt-24">
        <h2 id="faq-h" className={`display ${H2}`}>Questions, Answered</h2>
        <div className="mt-10">
          <Faq items={PRICING_FAQ} />
        </div>
      </section>
    </>
  );
}

function BillingToggle({ value, onChange }: { value: PeriodId; onChange: (p: PeriodId) => void }) {
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const idx = PERIODS.findIndex((p) => p.id === value);
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (idx + d + PERIODS.length) % PERIODS.length;
    onChange(PERIODS[n].id);
    refs.current[n]?.focus();
  };
  return (
    <div role="radiogroup" aria-label="Billing period" onKeyDown={onKey} className="glass grid w-full max-w-md grid-cols-3 gap-1 rounded-full p-1">
      {PERIODS.map((p, i) => {
        const active = p.id === value;
        return (
          <button
            key={p.id}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(p.id)}
            className={`relative flex flex-col items-center rounded-full px-3 py-2 text-sm transition-colors ${active ? "text-accent-ink" : "text-ink-2 hover:text-ink"}`}
          >
            {active && <motion.span layoutId="period-pill" className="absolute inset-0 rounded-full bg-accent" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative font-medium">{p.label}</span>
            <span className={`relative text-[0.72rem] ${active ? "text-accent-ink/85" : p.save ? "text-accent" : "text-ink-3"}`}>{p.save ? `Save ${p.save}%` : "Flexible"}</span>
          </button>
        );
      })}
    </div>
  );
}

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
        <Check size={12} weight="bold" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </li>
  );
}

function FreeCard() {
  return (
    <Reveal className="h-full">
      <article aria-labelledby="free-h" className="card flex h-full flex-col p-6 sm:p-8">
        <h2 id="free-h" className="text-lg font-semibold">Free</h2>
        <p className="mt-1 text-sm text-ink-3">Everything you need to get started.</p>
        <p className="mt-6 flex items-baseline gap-2">
          <span className="text-5xl font-semibold tracking-[-0.04em]">$0</span>
        </p>
        <p className="mt-1 text-sm text-ink-3">No subscription needed</p>
        <ul className="mt-8 grid flex-1 content-start gap-3 text-ink-2">
          {FREE_FEATURES.map((f) => <CheckItem key={f}>{f}</CheckItem>)}
        </ul>
        <p className="mt-8 rounded-2xl bg-surface-2 px-4 py-3 text-center text-sm text-ink-2">Included when you download Lilypad.</p>
      </article>
    </Reveal>
  );
}

function ProCard({ period }: { period: PeriodId }) {
  const reduce = useReducedMotion();
  const p = PERIODS.find((x) => x.id === period)!;
  return (
    <Reveal delay={0.08} className="h-full">
      <article aria-labelledby="pro-h" className="card relative flex h-full flex-col overflow-hidden p-7 ring-2 ring-accent sm:p-9">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 id="pro-h" className="flex items-center gap-2 text-lg font-semibold">
              Lilypad Pro <Sparkle size={16} weight="fill" className="text-accent" aria-hidden="true" />
            </h2>
            <p className="mt-1 text-sm text-ink-3">Unlimited notebooks and every tool.</p>
          </div>
          <AnimatePresence mode="popLayout" initial={false}>
            {p.id === "yearly" && (
              <motion.span key="best" initial={reduce ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-ink">
                Best Value
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-baseline gap-2" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={p.id}
              initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl font-semibold tabular-nums tracking-[-0.04em]"
            >
              {p.perMonth}
            </motion.span>
          </AnimatePresence>
          <span className="text-ink-3">/ month</span>
        </div>
        <p className="mt-1 text-sm text-ink-3">
          {p.price} {p.billed}
          {p.save ? <span className="ml-2 font-medium text-accent">Save {p.save}% vs Monthly</span> : null}
        </p>

        <p className="mt-8 text-sm font-medium text-ink">Everything in Free, plus:</p>
        <ul className="mt-4 grid flex-1 content-start gap-3 text-ink-2">
          {PRO_FEATURES.map((f) => <CheckItem key={f}>{f}</CheckItem>)}
        </ul>
        <AppStoreButton variant="accent" primary className="mt-8 w-full" />
      </article>
    </Reveal>
  );
}

function Yes({ label = "Included" }: { label?: string }) {
  return (
    <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-accent-soft text-accent">
      <Check size={13} weight="bold" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
function No({ label = "Not included" }: { label?: string }) {
  return (
    <span className="inline-flex text-ink-3/60">
      <Minus size={16} weight="bold" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

function FreeVsPro() {
  return (
    <section aria-labelledby="fvp-h" className="mx-auto max-w-4xl px-5 pt-16 sm:px-6 md:pt-24">
      <h2 id="fvp-h" className={`display text-center ${H2}`}>Free and Pro, Side by Side</h2>
      <div className="card mt-10 overflow-hidden px-5 py-3 sm:px-8">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Free plan compared with Lilypad Pro</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[56%] py-4"><span className="sr-only">Feature</span></th>
              <th scope="col" className="py-4 text-center text-sm font-semibold">Free</th>
              <th scope="col" className="py-4 text-center text-sm font-semibold text-accent">Pro</th>
            </tr>
          </thead>
          {FREE_VS_PRO.map((g) => (
            <tbody key={g.title}>
              <tr>
                <th colSpan={3} scope="colgroup" className="pb-2 pt-6 text-left text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">{g.title}</th>
              </tr>
              {g.rows.map((r) => (
                <tr key={r.label} className="border-t border-line">
                  <th scope="row" className="py-3.5 pr-4 font-normal text-ink-2">{r.label}</th>
                  {[r.free, r.pro].map((v, i) => (
                    <td key={i} className="py-3.5 text-center">
                      {v === true ? <Yes /> : v === false ? <No /> : <span className="text-sm font-medium">{v}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
}

function Competitors() {
  return (
    <section aria-labelledby="cmp-h" className="mx-auto max-w-6xl px-5 pt-16 sm:px-6 md:pt-24">
      <div className="text-center">
        <h2 id="cmp-h" className={`display ${H2}`}>How Lilypad Compares</h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-lg text-ink-2">iPad apps on their yearly-equivalent plans. Where Lilypad falls short, it says so.</p>
      </div>
      <div className="card mt-10 overflow-x-auto" tabIndex={0} role="region" aria-label="Competitor comparison table, scrolls horizontally">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <caption className="sr-only">Lilypad Pro compared with Goodnotes Essential, Notability Plus and CollaNote Premium</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-[1] w-[19%] bg-surface px-6 py-5"><span className="sr-only">Feature</span></th>
              {COMPETITORS.map((c, i) => (
                <th key={c} scope="col" className={`px-4 py-5 text-sm font-semibold ${i === 0 ? "bg-accent-soft text-accent" : "text-ink"}`}>
                  {i === 0 ? (
                    <span className="inline-flex items-center gap-2">
                      <img src={`${import.meta.env.BASE_URL}brand/app-icon-64.png`} alt="" width={22} height={22} className="h-[22px] w-[22px] rounded-[6px]" />
                      {c}
                    </span>
                  ) : (
                    c
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPETITOR_ROWS.map((r) => (
              <tr key={r.label} className="border-t border-line">
                <th scope="row" className="sticky left-0 z-[1] bg-surface px-6 py-3.5 text-sm font-medium text-ink">{r.label}</th>
                {r.values.map((v, i) => (
                  <td key={i} className={`px-4 py-3.5 text-sm ${i === 0 ? "bg-accent-soft font-medium text-ink" : "text-ink-2"}`}>
                    <Value v={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-5 text-center text-sm text-ink-3">{COMPETITOR_NOTE}</p>
    </section>
  );
}

function Value({ v }: { v: boolean | string }) {
  if (v === true) return <Yes label="Yes" />;
  if (v === false) return <No label="No" />;
  if (v === "not yet") return <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-ink-2 ring-1 ring-line">Not yet</span>;
  return <span>{v}</span>;
}

const PRICING_FAQ: FaqItem[] = [
  {
    q: "How does billing work?",
    a: "Lilypad Pro is an auto-renewing subscription bought through the App Store, billed monthly, every 3 months or yearly. Payment is charged to your Apple account when you confirm, and it renews at the same price and period unless you turn off auto-renew at least 24 hours before the current period ends.",
  },
  {
    q: "How do I cancel?",
    a: "Cancel anytime in your Apple account settings: Settings → [your name] → Subscriptions. Refunds are handled by Apple under its policies.",
  },
  {
    q: "What happens to my notebooks when Pro ends?",
    a: "They stay with you. Your notebooks remain viewable and exportable; only the Pro features stop working.",
  },
  {
    q: "Is there a free trial?",
    a: "There is no trial for Pro. The free version has no time limit, so you can try Lilypad with 3 notebooks and a whiteboard for as long as you like.",
  },
  {
    q: "Does Lilypad work on iPhone or Mac?",
    a: "Not yet. Lilypad is for iPad only, on iPadOS 26 or later, and is built for Apple Pencil first.",
  },
  {
    q: "Where are my notebooks stored?",
    a: (
      <>
        On your iPad, synced through your own private iCloud. Each Apple ID has its own notebooks, never merged between accounts, and we never see them. More in the{" "}
        <Link to="/privacy" className="text-accent underline underline-offset-4">Privacy Policy</Link>.
      </>
    ),
  },
];

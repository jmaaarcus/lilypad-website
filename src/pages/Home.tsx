import {
  ArrowRight, Check, Cloud, Cpu, Cube, DeviceTablet, EyeSlash, Layout, ListBullets, MagnifyingGlass,
  PencilSimpleLine, PresentationChart, SquareSplitHorizontal, Stack, TextAa, UserCircle, Waveform,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { AppStoreButton } from "../components/AppStoreButton";
import { LiquidHeading } from "../components/LiquidHeading";
import { Reveal } from "../components/Reveal";
import { IPadFrame, Screenshot } from "../components/Screenshot";
import { SHOTS } from "../content/screenshots";
import { asset } from "../content/site";

export function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <Bento />
      <ForWhom />
      <Privacy />
      <FinalCta />
    </>
  );
}

const H2 = "text-[clamp(2.1rem,1.3rem+3vw,3.6rem)] leading-[1.04]";

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // The iPad leans back in perspective and flattens as you scroll into it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 0.45], [0, -24]);

  return (
    <section ref={ref} aria-label="Introduction" className="relative overflow-x-clip">
      <div aria-hidden="true" className="aurora pointer-events-none absolute inset-x-0 -top-24 h-[780px]" />

      <div className="relative mx-auto max-w-6xl px-5 pt-10 sm:px-6 md:pt-14">
        <Reveal>
          <div className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4">
            <img src={asset("brand/app-icon-64.png")} alt="" width={28} height={28} className="h-7 w-7 rounded-[8px]" />
            <span className="text-sm font-medium text-ink-2">Lilypad for iPad</span>
          </div>
        </Reveal>
        <LiquidHeading
          as="h1"
          write
          text="Handwritten Notes. Kept Yours."
          breaks={[1]}
          muted={[2, 3]}
          className="mt-7 text-[clamp(2.8rem,1.4rem+5.4vw,5.9rem)] leading-[0.98]"
        />
        <Reveal delay={0.2} className="mt-6 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[40ch] text-lg leading-relaxed text-ink-2">A notebook for iPad and Apple Pencil, with PDF study, audio and STEM tools built in.</p>
          <AppStoreButton primary />
        </Reveal>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl px-5 sm:px-6 md:mt-12" style={{ perspective: 1600 }}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[8%] top-[18%] bottom-0 rounded-[50%] bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-3xl" />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div style={reduce ? undefined : { rotateX, scale, y, transformOrigin: "50% 0%" }}>
            <IPadFrame shot={SHOTS.hero} priority />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const STRIP = [
  { i: PencilSimpleLine, t: "Apple Pencil first" },
  { i: ListBullets, t: "Automatic PDF outlines" },
  { i: MagnifyingGlass, t: "Ranked PDF search" },
  { i: TextAa, t: "On-device OCR" },
  { i: SquareSplitHorizontal, t: "Split View" },
  { i: Waveform, t: "Audio synced to ink" },
  { i: Cube, t: "3D shapes" },
  { i: Layout, t: "Infinite whiteboard" },
  { i: Stack, t: "Ink layers" },
  { i: PresentationChart, t: "Presentation mode" },
];

/** Breadth of features at a glance. The site's single marquee. */
function FeatureStrip() {
  const items = [...STRIP, ...STRIP];
  return (
    <section aria-label="Feature highlights" className="pt-12 md:pt-16">
      <ul className="sr-only">{STRIP.map((s) => <li key={s.t}>{s.t}</li>)}</ul>
      <div aria-hidden="true" className="marquee overflow-hidden">
        <div className="marquee-track flex w-max gap-3 pr-3">
          {items.map(({ i: I, t }, n) => (
            <span key={n} className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-medium text-ink-2 shadow-card ring-1 ring-[var(--hairline)]">
              <I size={17} weight="bold" className="text-accent" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Card with a soft highlight that follows the pointer (CSS variables, no re-render). */
function Tile({ className = "", children }: { className?: string; children: ReactNode }) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <article onPointerMove={onMove} className={`card spotlight flex flex-col overflow-hidden p-6 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 sm:p-8 ${className}`}>
      {children}
    </article>
  );
}

function TileText({ title, body, onAccent = false }: { title: string; body: string; onAccent?: boolean }) {
  return (
    <div>
      <h3 className={`text-[1.3rem] font-semibold leading-tight tracking-[-0.025em] ${onAccent ? "text-white" : "text-ink"}`}>{title}</h3>
      <p className={`mt-2 max-w-[44ch] leading-relaxed ${onAccent ? "text-white/85" : "text-ink-2"}`}>{body}</p>
    </div>
  );
}

function IconBadge({ children, onAccent = false }: { children: ReactNode; onAccent?: boolean }) {
  return (
    <span className={`grid h-12 w-12 place-items-center rounded-2xl ${onAccent ? "bg-white/15 text-white ring-1 ring-white/20" : "bg-accent-soft text-accent"}`}>{children}</span>
  );
}

function Bento() {
  return (
    <section aria-label="Features" className="mx-auto max-w-6xl px-5 pt-16 sm:px-6 md:pt-24">
      <LiquidHeading as="h2" text="Everything a Notebook Should Do." muted={[4, 5]} className={`max-w-[16ch] ${H2}`} />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-6">
        <Reveal className="md:col-span-6 lg:col-span-4 lg:row-span-2">
          <Tile className="h-full bg-[linear-gradient(165deg,var(--accent-soft),var(--surface)_52%)]">
            <TileText
              title="Study PDFs Properly"
              body="Automatic outlines from the table of contents or detected headings. Ranked search that jumps to the line and highlights it. On-device OCR for scanned pages."
            />
            <ul className="mt-5 flex flex-wrap gap-2 text-sm text-ink-2">
              {[
                { i: ListBullets, t: "Automatic outlines" },
                { i: MagnifyingGlass, t: "Ranked search" },
                { i: TextAa, t: "On-device OCR" },
              ].map(({ i: I, t }) => (
                <li key={t} className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 ring-1 ring-line">
                  <I size={15} weight="bold" className="text-accent" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <Screenshot shot={SHOTS.pdf} className="mt-8 translate-y-10 shadow-card" />
          </Tile>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-3 lg:col-span-2">
          <Tile className="h-full justify-between gap-10">
            <IconBadge><SquareSplitHorizontal size={24} weight="bold" aria-hidden="true" /></IconBadge>
            <TileText title="Split View" body="Two notebooks side by side in one tab, with a divider you can drag." />
          </Tile>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-3 lg:col-span-2">
          <Tile className="h-full justify-between gap-10 !bg-[linear-gradient(150deg,#3b78e5,#1f4fb3)]">
            <IconBadge onAccent><Waveform size={24} weight="bold" aria-hidden="true" /></IconBadge>
            <TileText onAccent title="Audio Synced to Ink" body="Record while you write. Recordings sit on the page as playable chips, linked to your handwriting." />
          </Tile>
        </Reveal>

        <Reveal className="md:col-span-3">
          <Tile className="h-full">
            <TileText title="Graphs, Geometry and 3D" body="Graphing, geometry and 3D solids like cubes, cylinders and cones, right on the page." />
            <Screenshot shot={{ ...SHOTS.stem, ratio: "16 / 10" }} className="mt-7 translate-y-10" />
          </Tile>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-3">
          <Tile className="dot-grid h-full">
            <TileText title="An Infinite Whiteboard" body="An endless canvas with ink layers, shape recognition and Apple Pencil Pro squeeze." />
            <Screenshot shot={{ ...SHOTS.whiteboard, ratio: "16 / 10" }} className="mt-7 translate-y-10 shadow-card" />
          </Tile>
        </Reveal>
      </div>
    </section>
  );
}

const AUDIENCES = [
  {
    id: "students",
    label: "Students",
    title: "Lecture PDFs, Finally Searchable.",
    body: "Import the slides, let Lilypad build the outline, and jump straight to the line you need. Record the lecture while you annotate.",
    points: ["Automatic PDF outlines", "Ranked search inside PDFs", "Audio linked to your handwriting"],
    shot: SHOTS.pdf,
  },
  {
    id: "stem",
    label: "STEM",
    title: "Math That Looks Like Math.",
    body: "Plot graphs, construct geometry and place 3D solids on the page, right next to your working.",
    points: ["Graphing", "Geometry tools", "3D cubes, cylinders and cones"],
    shot: SHOTS.stem,
  },
  {
    id: "teachers",
    label: "Teachers",
    title: "Present From Your Notebook.",
    body: "Show your pages on an external display, point with a laser pointer and hide what is not ready with the privacy mask.",
    points: ["Presentation mode", "Laser pointer", "Privacy mask"],
    shot: SHOTS.present,
  },
] as const;

function ForWhom() {
  const [active, setActive] = useState<(typeof AUDIENCES)[number]["id"]>("students");
  const reduce = useReducedMotion();
  const a = AUDIENCES.find((x) => x.id === active)!;
  return (
    <section aria-label="Who It's For" className="mx-auto max-w-6xl px-5 pt-16 sm:px-6 md:pt-24">
      <LiquidHeading as="h2" text="Made for How You Learn." muted={[3, 4]} className={H2} />
      <div role="tablist" aria-label="Who it's for" className="glass mt-6 inline-flex rounded-full p-1">
        {AUDIENCES.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={active === x.id}
            aria-controls={`panel-${x.id}`}
            onClick={() => setActive(x.id)}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${active === x.id ? "text-accent-ink" : "text-ink-2 hover:text-ink"}`}
          >
            {active === x.id && <motion.span layoutId="who-pill" className="absolute inset-0 rounded-full bg-accent" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }} />}
            <span className="relative">{x.label}</span>
          </button>
        ))}
      </div>

      <div id={`panel-${a.id}`} role="tabpanel" aria-labelledby={`tab-${a.id}`} className="card mt-6 grid overflow-hidden lg:grid-cols-[1fr_1.4fr]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={a.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center p-7 sm:p-10"
          >
            <h3 className="text-[1.7rem] font-semibold leading-tight tracking-[-0.03em]">{a.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-2">{a.body}</p>
            <ul className="mt-6 grid gap-2.5">
              {a.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-ink-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check size={12} weight="bold" aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <div className="aurora bg-surface-2 p-5 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={a.id} initial={reduce ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <IPadFrame shot={a.shot} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const PRIVACY = [
  { icon: Cpu, title: "On-Device", text: "Search, text recognition and PDF processing run on your iPad." },
  { icon: Cloud, title: "Your iCloud", text: "Notebooks sync through your own private iCloud." },
  { icon: UserCircle, title: "Separate Accounts", text: "Each Apple ID keeps its own notebooks. Never merged." },
  { icon: EyeSlash, title: "No Tracking", text: "No ads, no analytics, no third-party tracking." },
];

function Privacy() {
  return (
    <section aria-labelledby="privacy-h" className="mx-auto max-w-6xl px-5 pt-16 sm:px-6 md:pt-24">
      <div className="card relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div>
            <p className="text-sm font-medium text-accent">Private by design</p>
            <h2 id="privacy-h" className={`display mt-3 max-w-[15ch] ${H2}`}>
              Your Notebooks Stay With You. <span className="text-ink-3">We Never See Them.</span>
            </h2>
            <Link to="/privacy" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline">
              Read the Privacy Policy <ArrowRight size={14} weight="bold" aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {PRIVACY.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <li className="h-full rounded-[var(--radius-media)] bg-surface-2 p-5">
                  <Icon size={24} weight="bold" className="text-accent" aria-hidden="true" />
                  <p className="mt-4 font-semibold tracking-[-0.01em]">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Compact pricing band. No download button here: the hero owns that, the nav carries it after. */
function FinalCta() {
  return (
    <section aria-labelledby="cta-h" className="mx-auto max-w-6xl px-5 pt-16 sm:px-6 md:pt-24">
      <Reveal>
        <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-5">
            <img src={asset("brand/app-icon-256.png")} alt="" width={64} height={64} className="h-16 w-16 shrink-0 rounded-[16px] shadow-card" />
            <div>
              <h2 id="cta-h" className="text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">
                Free to Start. <span className="text-ink-3">$9.99 a Year for Pro.</span>
              </h2>
              <p className="mt-1.5 inline-flex items-center gap-2 text-sm text-ink-3">
                <DeviceTablet size={15} weight="bold" aria-hidden="true" /> 3 notebooks and a whiteboard free. For iPadOS 26 or later.
              </p>
            </div>
          </div>
          <Link to="/pricing" className="btn btn-ghost h-11 shrink-0 self-start px-5 text-[0.95rem] sm:self-auto">
            See Pricing <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

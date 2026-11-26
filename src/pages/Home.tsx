import { BookOpenText, Cloud, Columns, Cube, EyeSlash, ShieldCheck } from "@phosphor-icons/react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Component, Suspense, lazy, useCallback, useRef, useState, type ReactNode } from "react";
import { AppStoreButton } from "../components/AppStoreButton";
import { Device } from "../components/Device";
import { PricingFaqSection, PricingSection } from "../components/PricingSection";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { SHOTS, type Shot } from "../content/screenshots";

const HeroScene = lazy(() => import("../components/HeroScene"));
const EASE = [0.16, 1, 0.3, 1] as const;

export function Home() {
  return (
    <>
      <Hero />
      {SHOWCASES.map((showcase, index) => <Showcase key={showcase.id} {...showcase} edge={index === 0 ? "start" : undefined} flip={index % 2 === 1} />)}
      <Privacy />
      <PricingSection />
      <PricingFaqSection />
    </>
  );
}

/* Hero: left-aligned message, the 3D iPad on a stage, then the plain facts. */

function canUseWebGL() {
  if (typeof window === "undefined" || !window.matchMedia("(min-width: 768px)").matches) return false;
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const FACTS = [
  { value: "Free", label: "3 notebooks and 1 whiteboard" },
  { value: "$9.99", label: "a year for Pro" },
  { value: "iPadOS 18", label: "or later" },
  { value: "0", label: "ads or trackers" },
];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(ref, { margin: "120px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [webgl, setWebgl] = useState(canUseWebGL);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section ref={ref} aria-labelledby="home-title" className="tone-blue relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(60%_60%_at_15%_0%,rgb(59_120_229/0.16),transparent),radial-gradient(50%_50%_at_90%_10%,rgb(139_92_246/0.12),transparent)]" />

      <motion.div className="page pt-16 md:pt-24" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.09 } } }}>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.h1 id="home-title" variants={item} className="display title-page max-w-[11ch]">
            Think beyond <span className="bg-[linear-gradient(100deg,#2b67d6,#8b5cf6)] bg-clip-text text-transparent">the page.</span>
          </motion.h1>
          <motion.div variants={item} className="lg:max-w-[26rem] lg:pb-3">
            <p className="lede">Read, write, sketch and record in one connected workspace on your iPad.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AppStoreButton />
              <a href="#pricing" className="btn btn-ghost h-12 px-5 text-sm">See Pricing</a>
            </div>
          </motion.div>
        </div>

        <motion.div variants={item} className="stage mt-12 aspect-[4/3] md:mt-16 md:aspect-[2.1/1]">
          <motion.div
            className="absolute inset-[8%_6%_10%] flex items-center justify-center [perspective:1800px] md:inset-[9%_22%_13%]"
            animate={{ opacity: ready ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="w-full" initial={reduce ? false : { rotateX: 26, y: 40 }} animate={{ rotateX: 12, y: 0 }} transition={{ duration: 1.1, ease: EASE }}>
              <Device shot={SHOTS.split} priority />
            </motion.div>
          </motion.div>
          {webgl && (
            <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.8 }}>
              <SceneBoundary onError={() => setWebgl(false)}>
                <Suspense fallback={null}>
                  <HeroScene file={SHOTS.split.file} progress={scrollYProgress} animate={!reduce} active={inView} onReady={onReady} />
                </Suspense>
              </SceneBoundary>
            </motion.div>
          )}
        </motion.div>

        <motion.dl variants={item} className="grid grid-cols-2 border-b border-line md:grid-cols-4">
          {FACTS.map((fact) => (
            <div key={fact.value} className="py-7 md:py-9">
              <dt className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">{fact.value}</dt>
              <dd className="mt-1 text-sm text-ink-2">{fact.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}

/* Showcases: one per feature area, each a stage with the screenshot and three tiles. */

type ShowcaseData = {
  id: string;
  tone: "blue" | "violet" | "green";
  icon: typeof BookOpenText;
  eyebrow: string;
  title: string;
  lead: string;
  shot: Shot;
  tiles: { title: string; body: string }[];
};

const SHOWCASES: ShowcaseData[] = [
  {
    id: "features",
    tone: "blue",
    icon: BookOpenText,
    eyebrow: "Read",
    title: "Stay with the page.",
    lead: "Outlines, search and text recognition get you to the part you need.",
    shot: SHOTS.pdf,
    tiles: [
      { title: "Automatic outlines", body: "Lilypad builds an outline from a PDF's contents or its detected headings." },
      { title: "Search and jump", body: "Search for a word, jump to the match and see it highlighted on the page." },
      { title: "Text recognition", body: "Scanned pages can be read with text recognition that runs right on your iPad." },
    ],
  },
  {
    id: "split-audio",
    tone: "violet",
    icon: Columns,
    eyebrow: "Write",
    title: "Two notebooks side by side.",
    lead: "Keep your sources open and your recordings close to your notes.",
    shot: SHOTS.split,
    tiles: [
      { title: "Split View", body: "Open two notebooks at once, like a textbook next to your own notes." },
      { title: "Room to work", body: "Move the divider to give whichever notebook you need more space." },
      { title: "Linked recordings", body: "Record while you write. Your recordings stay linked to the notes on the page." },
    ],
  },
  {
    id: "stem-tools",
    tone: "green",
    icon: Cube,
    eyebrow: "Shape",
    title: "Give complex ideas a shape.",
    lead: "Graphs, geometry and 3D shapes live on the same page as your working.",
    shot: SHOTS.stem,
    tiles: [
      { title: "Graphs", body: "Plot a graph right on the page and keep it next to your written steps." },
      { title: "Geometry", body: "Draw a geometry problem with tools made for clean, exact shapes." },
      { title: "3D shapes", body: "Add cubes, cylinders, cones and other solids, then turn them to see every side." },
    ],
  },
];

function Showcase({ id, tone, icon, eyebrow, title, lead, shot, tiles, edge, flip }: ShowcaseData & { edge?: "start"; flip: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 22, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : flip ? 10 : -10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1]);

  return (
    <Section id={id} tone={tone} icon={icon} eyebrow={eyebrow} title={title} lead={lead} edge={edge}>
      <div ref={stage} className="stage mt-10 px-[6%] pt-[6%] [perspective:1800px] md:mt-12 md:px-[12%] md:pt-[5%]">
        <motion.div style={{ rotateX, rotateY, scale }} className="origin-bottom translate-y-[4%]">
          <Device shot={shot} />
        </motion.div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {tiles.map((tile, index) => (
          <Reveal key={tile.title} delay={index * 0.06} className="tile">
            <h3 className="title-card">{tile.title}</h3>
            <p className="mt-2 leading-relaxed text-ink-2">{tile.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* Privacy: three facts from the Privacy Policy. */

const PRIVACY = [
  { icon: Cloud, title: "Your notebooks stay yours.", body: "They are stored on your device and in iCloud, and we cannot see them." },
  { icon: ShieldCheck, title: "Smart features run on your iPad.", body: "Search, text recognition, outlines and PDF processing happen on your device." },
  { icon: EyeSlash, title: "No ads. No tracking.", body: "Lilypad has no advertising, no analytics tools and no third-party tracking." },
];

function Privacy() {
  return (
    <Section id="privacy" tone="teal" icon={ShieldCheck} eyebrow="Privacy" title="Private by design." lead="What you write is yours, and Lilypad is built so it stays that way.">
      <ul className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3">
        {PRIVACY.map(({ icon: Icon, title, body }, index) => (
          <li key={title}>
            <Reveal delay={index * 0.06} className="tile h-full">
              <span className="tile-icon"><Icon size={20} weight="duotone" aria-hidden="true" /></span>
              <h3 className="title-card mt-5">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

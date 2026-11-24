import { ArrowRight } from "@phosphor-icons/react";
import { AppStoreButton } from "../components/AppStoreButton";
import { Reveal } from "../components/Reveal";
import { IPadFrame } from "../components/Screenshot";
import { TiltCard } from "../components/TiltCard";
import { PricingFaqSection, PricingSection } from "../components/PricingSection";
import { SHOTS, type Shot } from "../content/screenshots";

const SECTION_TITLE = "display text-[clamp(2.1rem,1.25rem+3vw,3.55rem)] leading-[1.04]";

export function Home() {
  return (
    <>
      <Hero />
      <FeatureStories />
      <PricingSection />
      <PricingFaqSection />
    </>
  );
}
function Hero() {
  return (
    <section aria-labelledby="home-title" className="home-hero neo-hero relative isolate overflow-hidden">
      <div aria-hidden="true" className="home-hero-glow pointer-events-none absolute inset-0" />

      <div className="hero-centered-layout relative mx-auto grid max-w-7xl items-center px-5 sm:px-7 lg:px-10 neo-hero-layout">
        <div className="hero-centered-copy relative z-10 mx-auto max-w-5xl neo-hero-copy">
          <Reveal>
            <h1 id="home-title" className="display mt-6">
              Think beyond<br /><span className="hero-title-accent">the page.</span>
            </h1>
            <p className="hero-copy mt-6">
              Read, write, sketch and record in one connected workspace.
            </p>
            <div className="hero-centered-actions mt-8 flex flex-wrap items-center">
              <AppStoreButton primary className="hero-download-button" />
              <a href="#features" className="hero-pricing-link inline-flex h-11 items-center gap-2 border-b pb-1 text-sm font-medium transition-colors">
                Explore Lilypad <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="hero-product-column relative z-[1] mx-auto w-full max-w-5xl">
          <div className="hero-product-stage hero-product-stage-centered neo-hero-stage">
            <TiltCard className="hero-device hero-device--main" limit={12}>
              <IPadFrame
                shot={SHOTS.split}
                priority
                className="hero-product-image relative z-[1] mx-auto w-full max-w-5xl"
              />
            </TiltCard>
          </div>
        </div>
      </div>

    </section>
  );
}
type FeatureRowProps = {
  id: string;
  title: string;
  body: string;
  points: string[];
  shot: Shot;
  reverse?: boolean;
};

function FeatureRow({ id, title, body, points, shot, reverse = false }: FeatureRowProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`feature-story feature-story-${id} grid scroll-mt-24 items-center border-t border-line lg:grid-cols-2`}>
      <Reveal className={`feature-story-copy ${reverse ? "lg:order-2" : ""}`}>
        <h3 id={`${id}-title`} className="display">{title}</h3>
        <p className="feature-story-body mt-5 text-ink-2">{body}</p>
        <ul className="feature-points grid">
          {points.map((point, index) => (
            <li key={point} className="feature-point">
              <span className="feature-point-number tabular-nums text-accent">0{index + 1}</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.08} className={`feature-story-media ${reverse ? "lg:order-1" : ""}`}>
        <div className={`feature-visual feature-device-stage feature-visual-${id}`}>
          <TiltCard className="feature-device-tilt" limit={15}>
            <IPadFrame shot={shot} />
          </TiltCard>
        </div>
      </Reveal>
    </section>
  );
}

function FeatureStories() {
  return (
    <section aria-labelledby="features-title" id="features" className="feature-stories neo-feature-stories mx-auto max-w-6xl px-5 pt-16 sm:px-7 md:pt-24 lg:px-10">
      <header className="feature-stories-header neo-feature-heading grid gap-5 pb-8 md:grid-cols-[0.95fr_1.05fr] md:items-end md:gap-16 md:pb-12">
        <div>
          <h2 id="features-title" className={`${SECTION_TITLE} max-w-[13ch]`}>
            One workspace. Many ways to think.
          </h2>
        </div>
        <p className="text-ink-2">
          Move from a textbook to a handwritten note to a graph without losing the thread. The tools you need stay close to the page.
        </p>
      </header>

      <FeatureRow
        id="pdf-study"
        title="Stay with the page."
        body="Open a PDF and get to the part you need. Lilypad can build an outline from its contents or detected headings. Search for a word, jump to the match and see it highlighted. Scanned pages can be read with on-device text recognition."
        points={["An outline built from the contents or headings", "Search, jump to a match and see it highlighted", "Text recognition for scanned pages, right on your iPad"]}
        shot={SHOTS.pdf}
      />
      <FeatureRow
        id="split-audio"
        title="Two notebooks side by side. Your recordings stay close."
        body="Keep two notebooks open side by side and move the divider to give each one room. You can also record while you write. Your recordings stay linked to the notes on the page."
        points={["Two notebooks in Split View", "A divider you can move to make space", "Recordings that stay with your notes"]}
        shot={SHOTS.split}
        reverse
      />
      <FeatureRow
        id="stem-tools"
        title="Give complex ideas a shape."
        body="Plot a graph, draw a geometry problem or add a 3D shape to the page. Keep your diagrams and written steps together as you work."
        points={["Graphing and geometry tools", "Cubes, cylinders, cones and other 3D shapes", "Keep diagrams and written steps together"]}
        shot={SHOTS.stem}
      />
    </section>
  );
}

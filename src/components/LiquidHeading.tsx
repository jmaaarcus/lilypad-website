// Headline with a word-by-word rise: each word slides up from behind a mask, in sequence,
// when the heading enters the viewport (or on mount with `write`). Two-tone via `muted`.
// Static under reduced motion. Screen readers get the plain text via aria-label.
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment, type ElementType } from "react";

interface Props {
  as?: "h1" | "h2" | "h3";
  text: string;
  className?: string;
  /** Animate on mount instead of on entering the viewport (page titles). */
  write?: boolean;
  /** Line break after these word indexes. */
  breaks?: number[];
  /** Word indexes rendered in the muted tone (two-tone headline). */
  muted?: number[];
  label?: string;
  /** Kept for call-site compatibility with the old weight animation; unused. */
  rest?: number;
  edge?: number;
}

const container: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.055 } } };
const word: Variants = {
  hidden: { y: "105%", opacity: 0 },
  shown: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function LiquidHeading({ as = "h2", text, className = "", write = false, breaks = [], muted = [], label }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as ElementType;
  const words = text.split(" ");
  const trigger = reduce ? {} : write ? { initial: "hidden", animate: "shown" } : { initial: "hidden", whileInView: "shown", viewport: { once: true, amount: 0.5 } };

  return (
    <Tag aria-label={label ?? text} className={`display ${className}`} variants={container} {...trigger}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {/* pb/-mb reserve keeps descenders (g, y, p) from being clipped by the mask. */}
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <motion.span variants={reduce ? undefined : word} className={`inline-block whitespace-nowrap ${muted.includes(i) ? "text-ink-3" : ""}`}>
              {w}
            </motion.span>
          </span>
          {breaks.includes(i) ? <br /> : i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}

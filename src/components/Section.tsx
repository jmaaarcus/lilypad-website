import type { Icon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export type Tone = "blue" | "violet" | "green" | "teal" | "orange" | "indigo";

/** A home section on the rail: glowing node, eyebrow, two-tone heading, then full-width content. */
export function Section({ id, tone, icon: IconMark, eyebrow, title, lead, edge, children }: {
  id: string;
  tone: Tone;
  icon: Icon;
  eyebrow: string;
  title: string;
  lead: string;
  edge?: "start" | "end";
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`tone-${tone} ${edge ? `rail-${edge}` : ""}`}>
      <div className="page rail-grid">
        <div className="rail" aria-hidden="true">
          <span className="rail-top" />
          <span className="rail-node"><IconMark size={18} weight="bold" /></span>
          <motion.span
            className="rail-line"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div className="rail-body">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-title`} className="rail-title"><strong>{title}</strong> {lead}</h2>
          </Reveal>
          {children}
        </div>
      </div>
    </section>
  );
}

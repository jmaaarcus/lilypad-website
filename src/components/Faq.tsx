import { CaretDown } from "@phosphor-icons/react";
import { useId, useState, type ReactNode } from "react";

export interface FaqItem { q: string; a: ReactNode }

/** A simple editorial accordion with clear dividers and no nested cards. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        const id = `${base}-${index}`;

        return (
          <section key={item.q} className="faq-item">
            <h3>
              <button
                type="button"
                id={`${id}-q`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a`}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-medium tracking-[-0.015em] text-ink transition-colors hover:text-accent sm:py-6 sm:text-[1.05rem]"
              >
                <span>{item.q}</span>
                <CaretDown size={18} weight="regular" aria-hidden="true" className={`shrink-0 text-ink-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div
              id={`${id}-a`}
              role="region"
              aria-labelledby={`${id}-q`}
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="max-w-[68ch] pb-6 pr-8 leading-relaxed text-ink-2 sm:pb-7">
                  {item.a}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

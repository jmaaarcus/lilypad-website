import { CaretDown } from "@phosphor-icons/react";
import { useId, useState, type ReactNode } from "react";

export interface FaqItem { q: string; a: ReactNode }

/** Accordion. Height animates with the grid-rows 0fr -> 1fr technique (CSS only). */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="grid gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div key={item.q} className="card overflow-hidden !rounded-[20px]">
            <h3>
              <button
                type="button"
                id={`${id}-q`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[1.05rem] font-medium tracking-[-0.01em]"
              >
                {item.q}
                <CaretDown size={18} weight="bold" aria-hidden="true" className={`shrink-0 text-ink-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="max-w-[68ch] px-6 pb-6 leading-relaxed text-ink-2">{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

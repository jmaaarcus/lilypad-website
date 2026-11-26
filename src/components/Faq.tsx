import { Plus } from "@phosphor-icons/react";
import { useId, useState, type ReactNode } from "react";

export interface FaqItem { q: string; a: ReactNode }

/** Hairline accordion inside a bordered card; the open answer expands smoothly. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="table-card divide-y divide-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        const id = `${base}-${index}`;

        return (
          <section key={item.q}>
            <h3>
              <button
                type="button"
                id={`${id}-q`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a`}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-base font-semibold tracking-[-0.02em] text-ink transition-colors hover:bg-surface-2 sm:px-6"
              >
                <span>{item.q}</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-ink text-white" : "border border-line text-ink-2"}`}>
                  <Plus size={15} weight="bold" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a`}
              role="region"
              aria-labelledby={`${id}-q`}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="max-w-[68ch] px-5 pb-6 leading-relaxed text-ink-2 sm:px-6">{item.a}</div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

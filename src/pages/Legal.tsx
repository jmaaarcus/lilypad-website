import docs from "virtual:legal";
import { LiquidHeading } from "../components/LiquidHeading";

/** Renders public/legal/<doc>.html wording unchanged, in the site's design. */
export function Legal({ doc }: { doc: "privacy" | "terms" }) {
  const d = docs[doc];
  return (
    <div className="relative mx-auto max-w-6xl px-5 pt-10 sm:px-6 md:pt-14">
      <div aria-hidden="true" className="aurora pointer-events-none absolute left-1/2 w-screen -translate-x-1/2 -top-40 -z-10 h-[520px]" />
      <header className="max-w-3xl">
        <p className="eyebrow">Legal</p>
        <LiquidHeading as="h1" write text={d.title} className="mt-4 text-[clamp(2.6rem,1.4rem+4.2vw,4.6rem)] leading-[1]" />
        <p className="mt-4 text-ink-3">{d.meta}</p>
      </header>
      <div className="mt-10 grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-sm font-medium text-ink">On this page</p>
            <ol className="mt-4 grid gap-2.5 text-sm">
              {d.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink-3 transition-colors hover:text-ink" dangerouslySetInnerHTML={{ __html: s.title }} />
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <article className="card prose-legal max-w-[72ch] p-7 sm:p-10" dangerouslySetInnerHTML={{ __html: d.body }} />
      </div>
    </div>
  );
}

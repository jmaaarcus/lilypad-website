import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router";
import docs from "virtual:legal";

/** Renders the approved public/legal HTML verbatim inside a redesigned document layout. */
export function Legal({ doc }: { doc: "privacy" | "terms" }) {
  const document = docs[doc];

  return (
    <div className="page pb-[4.5rem] pt-10 md:pb-24">
      <header className="mt-14 border-b border-line pb-10">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-3 transition-colors hover:text-accent"><ArrowLeft size={15} aria-hidden="true" /> Back to Lilypad</Link>
        <h1 className="display title-page mt-5 max-w-[14ch]">{document.title}</h1>
        <p className="mt-4 text-sm text-ink-3">{document.meta}</p>
      </header>

      <div className="mt-10 grid gap-9 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
        <details className="panel px-5 py-4 lg:hidden">
          <summary className="cursor-pointer font-medium">Jump to a section</summary>
          <nav aria-label="Legal document sections" className="legal-toc mt-4">
            <ol className="grid gap-2.5">
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} dangerouslySetInnerHTML={{ __html: section.title }} />
                </li>
              ))}
            </ol>
          </nav>
        </details>

        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="legal-toc sticky top-8">
            <p className="text-sm font-semibold text-ink">On this page</p>
            <ol className="mt-4 grid gap-2.5 border-l border-line pl-4">
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} dangerouslySetInnerHTML={{ __html: section.title }} />
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="prose-legal min-w-0" dangerouslySetInnerHTML={{ __html: document.body }} />
      </div>
    </div>
  );
}

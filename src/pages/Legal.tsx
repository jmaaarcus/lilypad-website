import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router";
import docs from "virtual:legal";

/** Renders the approved public/legal HTML verbatim inside a redesigned document layout. */
export function Legal({ doc }: { doc: "privacy" | "terms" }) {
  const document = docs[doc];

  return (
    <div className="legal-page mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-7 md:pb-28 md:pt-16 lg:px-10">
      <header className="legal-page-header">
        <Link to="/" className="legal-back-link"><ArrowLeft size={15} aria-hidden="true" /> Back to Lilypad</Link>
        <h1 className="display mt-4 max-w-[12ch] text-[clamp(3rem,1.8rem+4.6vw,5.6rem)] leading-[0.96]">{document.title}</h1>
        <p className="legal-page-meta mt-5 text-sm">{document.meta}</p>
      </header>

      <div className="legal-page-grid mt-10 grid gap-9 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
        <details className="legal-mobile-toc lg:hidden">
          <summary>Jump to a section</summary>
          <nav aria-label="Legal document sections">
            <ol>
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} dangerouslySetInnerHTML={{ __html: section.title }} />
                </li>
              ))}
            </ol>
          </nav>
        </details>

        <aside className="legal-sidebar hidden lg:block">
          <nav aria-label="On this page" className="legal-toc sticky top-8">
            <p className="eyebrow">On this page</p>
            <ol className="mt-5 grid gap-3">
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

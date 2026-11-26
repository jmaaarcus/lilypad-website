import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react";
import { Link } from "react-router";
import { Faq, type FaqItem } from "../components/Faq";
import { Reveal } from "../components/Reveal";
import { CONTACT_EMAIL } from "../content/site";

const SUPPORT_FAQ: FaqItem[] = [
  {
    q: "Where are my notebooks saved?",
    a: "Your notebooks are saved on your iPad. When iCloud is enabled, they sync through iCloud. I can't see what's inside them.",
  },
  {
    q: "Can I move a notebook to another Apple ID?",
    a: "Notebooks stay separate between Apple IDs. Export the notebook as a Lilypad Notebook (.llpd) file from the first account, then sign in to the other account and import it.",
  },
  {
    q: "How do I cancel Pro?",
    a: "Apple manages subscriptions. Open Settings, tap your name, then Subscriptions and Lilypad Pro. Turn off auto-renew at least 24 hours before the current period ends. You can still view and export your notebooks after Pro ends.",
  },
  {
    q: "How do I delete my account and notebooks?",
    a: (
      <>
        In Lilypad, go to Settings → Account → Delete Account. This removes your account and sessions from our server, revokes Sign in with Apple, and deletes your notebooks from your device and iCloud. Export any notebooks you want to keep as .llpd files first. The full details are in the{" "}
        <Link to="/privacy" className="text-accent underline underline-offset-4">Privacy Policy</Link>.
      </>
    ),
  },
];

export function Support() {
  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="paper-grid absolute inset-x-0 top-0 -z-10 h-[620px]" />
      <div className="page pb-[4.5rem] pt-10 md:pb-24">
        <header className="mt-14 grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-16">
          <Reveal>
            <h1 className="display title-page max-w-[9ch]">Let's figure it out.</h1>
            <p className="lede mt-6 max-w-[44ch]">
              Something not working as expected? Have a question or an idea? Send me a note and I'll get back to you.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="[perspective:1400px]">
              <div className="rounded-panel bg-[linear-gradient(155deg,#1f56bd,#3b78e5_55%,#6d9cf0)] p-8 text-white shadow-lift sm:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15"><EnvelopeSimple size={24} weight="duotone" aria-hidden="true" /></span>
                <p className="mt-8 text-sm font-medium text-white/80">Email the developer</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 inline-flex items-center gap-2 break-all text-xl font-semibold tracking-[-0.02em] underline-offset-4 hover:underline sm:text-2xl">
                  {CONTACT_EMAIL}<ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <p className="mt-6 text-white/80">A direct line to the person who makes Lilypad.</p>
              </div>
          </Reveal>
        </header>

        <section aria-labelledby="support-faq-title" className="split mt-[4.5rem] md:mt-24">
          <Reveal>
            <h2 id="support-faq-title" className="display title-section max-w-[11ch]">A few quick answers.</h2>
            <p className="lede mt-5 max-w-[36ch]">Start here for the things people ask most. If you still need a hand, send me an email.</p>
          </Reveal>
          <Faq items={SUPPORT_FAQ} />
        </section>
      </div>
    </div>
  );
}

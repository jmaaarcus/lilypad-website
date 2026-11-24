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
    <div className="support-page mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-7 md:pb-28 md:pt-16 lg:px-10">
      <header className="support-hero grid gap-10 border-b border-line pb-12 md:grid-cols-[1.05fr_0.95fr] md:items-end md:gap-16 md:pb-16">
        <div>
          <h1 className="display max-w-[9ch] text-[clamp(3.4rem,2rem+5vw,6.2rem)] leading-[0.94]">Let's figure it out.</h1>
          <p className="support-intro mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-2">
            Something not working as expected? Have a question or an idea? Send me a note and I'll get back to you.
          </p>
        </div>
        <Reveal className="support-contact-card">
          <span className="support-contact-icon"><EnvelopeSimple size={22} weight="regular" aria-hidden="true" /></span>
          <p className="support-contact-label">Email the developer</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="support-contact-address">
            {CONTACT_EMAIL}<ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <p className="support-contact-note">A direct line to the person who makes Lilypad.</p>
        </Reveal>
      </header>

      <section aria-labelledby="support-faq-title" className="support-faq-section pt-16 md:pt-24">
        <div className="support-faq-heading grid gap-4 border-b border-line pb-7 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-12">
          <div>
            <h2 id="support-faq-title" className="display text-[clamp(2.2rem,1.3rem+3vw,3.7rem)] leading-[1.02]">A few quick answers.</h2>
          </div>
          <p className="max-w-[46ch] leading-relaxed text-ink-2">Start here for the things people ask most. If you still need a hand, send me an email.</p>
        </div>
        <div className="mt-2"><Faq items={SUPPORT_FAQ} /></div>
      </section>
    </div>
  );
}

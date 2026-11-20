import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react";
import { Link } from "react-router";
import { Faq, type FaqItem } from "../components/Faq";
import { LiquidHeading } from "../components/LiquidHeading";
import { Reveal } from "../components/Reveal";
import { CONTACT_EMAIL } from "../content/site";

const SUPPORT_FAQ: FaqItem[] = [
  {
    q: "Where do my notebooks live?",
    a: "On your iPad, synced through your own private iCloud. Each Apple ID you sign in with has its own separate notebooks, and the developer never sees them.",
  },
  {
    q: "How do I move notebooks to another account?",
    a: "Notebooks are never merged between accounts. To move one, export it as a .llpd file while signed in to the first Apple ID, then sign in with the other Apple ID and import the .llpd file.",
  },
  {
    q: "How do I cancel Lilypad Pro?",
    a: "Subscriptions are managed by Apple. Go to Settings → [your name] → Subscriptions and cancel Lilypad Pro. Turn off auto-renew at least 24 hours before the current period ends. Your notebooks stay viewable and exportable after Pro ends.",
  },
  {
    q: "How do I delete my account?",
    a: (
      <>
        In Lilypad, go to Settings → Account → Delete Account. This deletes your account record and sessions from our server, revokes Sign in with Apple, and deletes your notebooks from your device and iCloud. Export any notebooks you want to keep as .llpd files first. Details are in the{" "}
        <Link to="/privacy" className="text-accent underline underline-offset-4">Privacy Policy</Link>.
      </>
    ),
  },
];

export function Support() {
  return (
    <div className="relative mx-auto max-w-6xl px-5 pt-10 sm:px-6 md:pt-14">
      <div aria-hidden="true" className="aurora pointer-events-none absolute left-1/2 w-screen -translate-x-1/2 -top-40 -z-10 h-[520px]" />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow">Support</p>
          <LiquidHeading as="h1" write text="How Can We Help?" className="mt-4 text-[clamp(2.6rem,1.4rem+4.6vw,5rem)] leading-[1]" />
          <p className="mt-6 max-w-[44ch] text-lg text-ink-2">Lilypad is made by one person, Anh Quoc Vo. Questions, bug reports and feedback all go to the same inbox.</p>
        </div>
        <Reveal>
          <a href={`mailto:${CONTACT_EMAIL}`} className="card group flex items-center gap-5 p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-ink">
              <EnvelopeSimple size={26} weight="bold" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-ink-3">Email</span>
              <span className="block break-all text-lg font-semibold tracking-[-0.01em]">{CONTACT_EMAIL}</span>
            </span>
            <ArrowUpRight size={20} weight="bold" className="shrink-0 text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>

      <section aria-labelledby="sfaq-h" className="mx-auto max-w-3xl pt-16 md:pt-24">
        <h2 id="sfaq-h" className="display text-[clamp(2rem,1.3rem+2.6vw,3.2rem)] leading-[1.05]">Common Questions</h2>
        <div className="mt-10">
          <Faq items={SUPPORT_FAQ} />
        </div>
      </section>
    </div>
  );
}

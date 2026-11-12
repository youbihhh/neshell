import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm, PrefilledContactForm } from "../../components/contact/ContactForm";
import Icon, { type IconName } from "../../components/Icon";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import { getDesigns } from "../../lib/designs";
import { site } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Neshell Developers",
  description:
    "Get a free consultation and estimate for your building project in Ghana. Contact Neshell Developers by phone, email or our enquiry form.",
};

const details: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "phone", label: "Call or WhatsApp", value: site.phone.display, href: site.phone.href },
  { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: "pin", label: "Office", value: site.address },
  { icon: "clock", label: "Opening hours", value: site.hours },
];

export default async function ContactPage() {
  const designs = (await getDesigns()).map(({ slug, name }) => ({ slug, name }));

  return (
    <main className="flex-1">
      <PageHero
        title="Contact Us"
        image="/images/pages/contact.jpg"
        alt="Bright modern office interior"
      />

      <section className="bg-zinc-50 py-20 text-zinc-900 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[2fr_3fr] lg:gap-16 lg:px-8">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Get in touch"
              title="Let's talk about your project"
              text="Tell us what you'd like to build and we'll arrange a free consultation and estimate — in person or by video call."
            />

            <ul className="mt-10 space-y-4">
              {details.map((item, i) => {
                const content = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-orange text-white">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    {/* min-w-0 + overflow-wrap let a long email wrap instead of widening the box */}
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-widest text-zinc-500">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block font-medium wrap-anywhere">{item.value}</span>
                    </span>
                  </>
                );
                return (
                  <Reveal key={item.label} delay={0.06 * i} y={20}>
                    <li>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-center gap-4 border border-zinc-200 bg-white p-4 transition-colors hover:border-orange"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 border border-zinc-200 bg-white p-4">
                          {content}
                        </div>
                      )}
                    </li>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal delay={0.3} className="mt-8 bg-zinc-950 p-6 text-white">
              <p className="flex items-center gap-2 font-semibold">
                <Icon name="globe" className="h-5 w-5 text-orange" />
                Building from abroad?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                We work with Ghanaians around the world, with virtual tours and regular progress
                updates.
              </p>
              <Link
                href="/services#diaspora"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange hover:underline"
              >
                How we help the diaspora <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
            <h2 className="text-2xl font-bold">Send us an enquiry</h2>
            <p className="mt-2 text-zinc-600">Fields marked * are required.</p>
            <div className="mt-8">
              {/* useSearchParams needs a Suspense boundary; the fallback is the same form without pre-filling */}
              <Suspense fallback={<ContactForm designs={designs} defaults={{}} />}>
                <PrefilledContactForm designs={designs} />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

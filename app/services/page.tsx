import type { Metadata } from "next";
import Link from "next/link";
import CallToAction from "../../components/home/CallToAction";
import Process from "../../components/home/Process";
import Icon from "../../components/Icon";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import Diaspora from "../../components/services/Diaspora";
import ServiceRow from "../../components/services/ServiceRow";
import { services } from "../../lib/services";

export const metadata: Metadata = {
  title: "Services | Neshell Developers",
  description:
    "Residential and commercial construction, house design, renovations, project management and sustainable building in Ghana — including homes for the diaspora.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Our Services"
        image="/images/services/hero.jpg"
        alt="Construction workers building a reinforced concrete frame"
      />

      {/* Intro with quick links to each service */}
      <section className="bg-white py-20 text-zinc-900 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <p className="text-2xl font-light leading-relaxed text-zinc-800 sm:text-3xl sm:leading-snug">
              From the first drawing to the day you collect your keys, we handle{" "}
              <span className="font-semibold text-orange">every stage</span> of building in Ghana —
              so you only deal with one trusted team.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Jump to a service
            </p>
            <ul className="mt-5 grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`#${service.slug}`}
                    className="group flex h-full items-center gap-3 bg-white p-4 font-medium transition-colors hover:bg-zinc-950 hover:text-white"
                  >
                    <Icon name={service.icon} className="h-5 w-5 shrink-0 text-orange" />
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="sm:col-span-2">
                <Link
                  href="#diaspora"
                  className="flex items-center gap-3 bg-orange p-4 font-semibold text-white transition-colors hover:bg-orange-dim"
                >
                  <Icon name="globe" className="h-5 w-5 shrink-0" />
                  Building for the diaspora
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-zinc-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl space-y-28 px-6 lg:space-y-36 lg:px-8">
          {services.map((service, i) => (
            <ServiceRow key={service.slug} service={service} index={i} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <Diaspora />
      <Process />
      <CallToAction />
    </main>
  );
}

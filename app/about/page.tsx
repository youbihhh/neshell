import type { Metadata } from "next";
import Image from "next/image";
import Stats from "../../components/home/Stats";
import Testimonials from "../../components/home/Testimonials";
import CallToAction from "../../components/home/CallToAction";
import Icon, { type IconName } from "../../components/Icon";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";

export const metadata: Metadata = {
  title: "About Us | Neshell Developers",
  description:
    "Neshell Developers designs and builds quality homes and commercial spaces across Ghana, for local clients and the diaspora.",
};

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "star", title: "Quality", text: "We build to last, with the right materials and skilled craftsmanship on every job." },
  { icon: "shield", title: "Integrity", text: "We do what we say, and we tell you the truth — even when it's not what you want to hear." },
  { icon: "eye", title: "Transparency", text: "Fixed prices, clear contracts and regular updates, so you always know where things stand." },
  { icon: "hardhat", title: "Safety", text: "Every person on our sites goes home safe — no exceptions." },
  { icon: "leaf", title: "Sustainability", text: "We design homes that use less energy and water, and we waste less building them." },
  { icon: "heart", title: "Client focus", text: "Your home, your budget, your timeline. We build around you, wherever you live." },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="About Us"
        image="/images/pages/about.jpg"
        alt="Two people shaking hands in an office"
      />

      {/* Story */}
      <section className="overflow-hidden bg-white py-20 text-zinc-900 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <SectionHeading eyebrow="Our story" title="Building Ghana's future, one home at a time" />
            <Reveal delay={0.1} className="mt-6 space-y-5 text-lg leading-relaxed text-zinc-600">
              <p>
                Neshell Developers was founded on a simple belief: that building a home in Ghana should
                be exciting, not stressful. Too many families — at home and abroad — have been let
                down by delays, hidden costs and poor workmanship.
              </p>
              <p>
                We set out to do things differently. Today our team of architects, engineers, project
                managers and builders delivers homes and commercial spaces with fixed prices, honest
                timelines and finishing we&apos;re proud to put our name on.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative pb-14 pl-10 sm:pl-16">
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src="/images/cons1.jpg"
                alt="Neshell Developers construction site"
                fill
                // The landscape photo is cropped into a tall frame, so it renders
                // about 1.7x wider than the frame; request a file that wide
                sizes="(min-width: 1280px) 67vw, 150vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 bg-zinc-950 p-8 text-white shadow-2xl">
              <p className="text-sm uppercase tracking-widest text-white/50">Our promise</p>
              <p className="mt-2 max-w-[14rem] text-xl font-semibold leading-snug">
                Building Today, <span className="text-orange">Creating Tomorrow</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-zinc-50 py-20 text-zinc-900 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:px-8">
          {[
            {
              icon: "target" as IconName,
              label: "Our mission",
              text: "To design and build quality, affordable and sustainable homes and spaces in Ghana — delivered on time, on budget and with complete transparency.",
            },
            {
              icon: "eye" as IconName,
              label: "Our vision",
              text: "To be Ghana's most trusted developer for families at home and in the diaspora, known for homes that last generations.",
            },
          ].map((card, i) => (
            <Reveal key={card.label} delay={0.1 * i}>
              <div className="group relative h-full overflow-hidden border border-zinc-200 bg-white p-10 transition-colors duration-500 hover:bg-zinc-950">
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100" />
                <span className="flex h-14 w-14 items-center justify-center bg-orange text-white">
                  <Icon name={card.icon} className="h-7 w-7" />
                </span>
                <h2 className="mt-8 text-2xl font-bold transition-colors duration-500 group-hover:text-white">
                  {card.label}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-zinc-600 transition-colors duration-500 group-hover:text-white/70">
                  {card.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Stats />

      {/* Values */}
      <section className="bg-white py-20 text-zinc-900 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we stand for"
            title="The values behind every build"
            align="center"
          />
          <div className="mt-16 grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={0.06 * i} className="bg-white">
                <div className="group h-full p-8 transition-colors duration-300 hover:bg-zinc-50">
                  <span className="flex h-12 w-12 items-center justify-center bg-orange/10 text-orange transition-colors duration-300 group-hover:bg-orange group-hover:text-white">
                    <Icon name={value.icon} />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{value.title}</h3>
                  <p className="mt-2 leading-relaxed text-zinc-600">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CallToAction />
    </main>
  );
}

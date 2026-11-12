import type { Metadata } from "next";
import AdSlot from "../../components/AdSlot";
import DesignCard from "../../components/designs/DesignCard";
import Icon, { type IconName } from "../../components/Icon";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import { getDesigns } from "../../lib/designs";

export const metadata: Metadata = {
  title: "House Designs | Neshell Developers",
  description:
    "Choose from our range of ready-made house designs for your land in Ghana, with fixed prices guaranteed for 12 months.",
};

const guarantees: { icon: IconName; title: string; text: string }[] = [
  { icon: "pencil", title: "Ready-made plans", text: "Proven designs, ready to build" },
  { icon: "clipboard", title: "Fixed prices", text: "No surprises, no hidden costs" },
  { icon: "check", title: "12-month guarantee", text: "Every price locked for a year" },
];

export default async function DesignsPage() {
  const designs = await getDesigns();

  return (
    <main className="flex-1">
      <PageHero
        title="House Designs"
        image="/images/designs/hero.jpg"
        alt="Two-storey white house with a pool and tropical garden"
      />

      <section className="bg-white py-20 text-zinc-900 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <p className="text-2xl font-light leading-relaxed text-zinc-800 sm:text-3xl sm:leading-snug">
              If you have already acquired land in{" "}
              <span className="font-semibold text-orange">Ghana</span>, choose from our range of house
              designs. Our houses combine superb quality of design and construction with exceptional
              value for money.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-zinc-600">
              If you choose from one of our ready-made building plans, you are guaranteed on the
              price, allowing you to budget accordingly.{" "}
              <strong className="font-semibold text-zinc-900">
                All prices on our website are fixed and guaranteed for 12 months.
              </strong>
            </p>

            <ul className="mt-10 grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
              {guarantees.map((item) => (
                <li key={item.title} className="bg-white p-5">
                  <Icon name={item.icon} className="h-6 w-6 text-orange" />
                  <p className="mt-3 font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{item.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-zinc-50 py-20 text-zinc-900 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our designs"
            title="Choose your new home"
            text="Every price below is fixed and guaranteed for 12 months."
            align="center"
          />

          {designs.length > 0 ? (
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {designs.map((design, i) => (
                <Reveal key={design.id} delay={0.08 * (i % 3)}>
                  <DesignCard design={design} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-zinc-500">
              New house designs are coming soon. Please check back shortly.
            </p>
          )}
        </div>
      </section>

      <AdSlot className="bg-zinc-50" />
    </main>
  );
}

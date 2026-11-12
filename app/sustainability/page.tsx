import type { Metadata } from "next";
import Image from "next/image";
import AdSlot from "../../components/AdSlot";
import CallToAction from "../../components/home/CallToAction";
import Icon, { type IconName } from "../../components/Icon";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import PillarCycle, { type Pillar } from "../../components/sustainability/PillarCycle";

export const metadata: Metadata = {
  title: "Sustainability | Neshell Developers",
  description:
    "How Neshell Developers builds responsibly in Ghana — sustainable materials, less waste, a safe workforce and stronger communities.",
};

const pillars: Pillar[] = [
  {
    icon: "layers",
    title: "Choosing the right materials",
    text: "We select durable, locally sourced and low-impact materials that suit Ghana's climate — so buildings last longer and need fewer repairs.",
    image: "/images/sustainability/materials.jpg",
  },
  {
    icon: "recycle",
    title: "Recycling where possible",
    text: "Offcuts, metal, timber and packaging are sorted on site and sent for reuse or recycling instead of landfill.",
    image: "/images/sustainability/recycling.jpg",
  },
  {
    icon: "trash",
    title: "Reducing waste",
    text: "Accurate planning and ordering means we buy only what each build needs, cutting waste before it is created.",
    image: "/images/sustainability/waste.jpg",
  },
  {
    icon: "star",
    title: "Creating value from recycled material",
    text: "Crushed concrete, reclaimed timber and recovered steel are given a second life in new foundations, paths and finishes.",
    image: "/images/sustainability/value.jpg",
  },
  {
    icon: "sun",
    title: "Energy-efficient design",
    text: "Natural ventilation, shading and solar-ready roofs keep homes cool and running costs low.",
    image: "/images/services/sustainable.jpg",
  },
  {
    icon: "droplet",
    title: "Water conservation",
    text: "Rainwater harvesting and water-saving fittings reduce demand on local supply and lower bills.",
    image: "/images/sustainability/water.jpg",
  },
];

const social: { icon: IconName; title: string; text: string }[] = [
  { icon: "heart", title: "Wellbeing first", text: "Flexible working opportunities that support our people's lives outside work." },
  { icon: "graduation", title: "Training programmes", text: "Skills development that helps every team member grow their career." },
  { icon: "bus", title: "Subsidised transport", text: "Getting our workforce to and from site safely and affordably." },
  { icon: "users", title: "Fairness & diversity", text: "Equal treatment and opportunity for everyone who joins our team." },
];

const safety: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "hardhat",
    title: "Quality protective equipment",
    text: "Every worker receives high-quality PPE for the safe handling and use of materials on site.",
  },
  {
    icon: "chat",
    title: "Daily toolbox meetings",
    text: "Clear instructions at the start of each day, so everyone knows the tasks and the risks.",
  },
  {
    icon: "graduation",
    title: "Training & competence",
    text: "Proper training ensures each team member is competent and confident in their work.",
  },
  {
    icon: "alert",
    title: "Emergency procedures",
    text: "Multiple marked evacuation points and drilled procedures for fire and other emergencies.",
  },
];

export default function SustainabilityPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Sustainability"
        image="/images/pages/sustainability.jpg"
        alt="Wind turbines in a field at sunset"
      />

      {/* Commitment */}
      <section className="bg-white py-20 text-zinc-900 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <p className="text-2xl font-light leading-relaxed text-zinc-800 sm:text-3xl sm:leading-snug">
              Neshell Developers is committed to creating a{" "}
              <span className="font-semibold text-orange">more sustainable future</span> for all of us.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="space-y-5 text-lg leading-relaxed text-zinc-600">
            <p>
              We bring the best technical expertise to every project, developing healthy, prosperous
              environments that improve people&apos;s lives and give back to the environment around
              them.
            </p>
            <p>
              Sustainability sits at the core of how we build. Through both environmental and social
              sustainability, we work to prevent harm to the environment and to the communities we
              operate in — and to invest in natural systems and renewable resources that leave a
              positive, lasting impact.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Environmental pillars, cycling */}
      <section className="bg-zinc-50 py-20 text-zinc-900 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Environmental sustainability"
            title="Reducing our impact on every community we build in"
            text="Our environmental work focuses on six areas, applied on every site from the first day."
          />
          <Reveal className="mt-14">
            <PillarCycle pillars={pillars} />
          </Reveal>
        </div>
      </section>

      {/* Social sustainability */}
      <section className="bg-white py-20 text-zinc-900 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal className="relative">
            <div className="absolute -bottom-4 -left-4 h-full w-full border-2 border-orange" />
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src="/images/sustainability/training.jpg"
                alt="Engineer reviewing technical drawings"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Social sustainability"
              title="A healthy, productive place to work"
              text="We look after the wellbeing of our workforce and of the people in the communities around our sites, with fair treatment, equality and diversity at the heart of it."
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {social.map((item, i) => (
                <Reveal key={item.title} delay={0.08 * i} y={20}>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-orange/10 text-orange">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600">{item.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Health & safety */}
      <section className="relative overflow-hidden bg-zinc-950 py-20 text-white lg:py-28">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <Image
            src="/images/services/project-management.jpg"
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/70 to-zinc-950/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Health & safety"
              title="Everyone goes home safe, every day"
              dark
            />
            <Reveal delay={0.1} className="mt-6 space-y-5 leading-relaxed text-white/70">
              <p>
                We reinforce our commitment to every person who joins our team by putting measures in
                place that keep our sites healthy and safe — building a resilient, purpose-driven
                business that protects our workforce and the communities we work in.
              </p>
              <p>
                Our focus is on preventing and minimising risk at every stage, through safe processes
                and the right equipment and materials for each job.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <blockquote className="mt-8 border-l-4 border-orange bg-white/5 px-6 py-5 text-lg font-medium">
                Our policy: to prevent accidents on site and cases of work-related ill health.
              </blockquote>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {safety.map((item, i) => (
              <Reveal key={item.title} delay={0.08 * i} className="bg-zinc-950/90 backdrop-blur">
                <div className="group h-full p-7 transition-colors duration-500 hover:bg-white/5">
                  <span className="flex h-12 w-12 items-center justify-center border border-orange/40 text-orange transition-colors duration-500 group-hover:bg-orange group-hover:text-white">
                    <Icon name={item.icon} />
                  </span>
                  <h3 className="mt-5 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AdSlot />
      <CallToAction />
    </main>
  );
}

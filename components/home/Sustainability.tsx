import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "../Icon";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const features: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "sun",
    title: "Solar-ready homes",
    text: "Roofs and wiring designed for solar panels and battery storage from day one.",
  },
  {
    icon: "droplet",
    title: "Water conservation",
    text: "Rainwater harvesting and efficient fittings that cut water bills and waste.",
  },
  {
    icon: "recycle",
    title: "Responsible materials",
    text: "Locally sourced, low-impact materials and on-site waste recycling.",
  },
];

export default function Sustainability() {
  return (
    <section className="grid bg-zinc-50 text-zinc-900 lg:grid-cols-2">
      <div className="relative min-h-[380px] lg:min-h-full">
        <Image
          src="/images/solar3.jpg"
          alt="Energy-efficient modern home"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
        <div className="absolute bottom-8 left-8 flex items-center gap-4 bg-white/95 p-5 shadow-xl backdrop-blur">
          <span className="flex h-12 w-12 items-center justify-center bg-green-600 text-white">
            <Icon name="leaf" />
          </span>
          <div>
            <p className="text-2xl font-bold">Up to 40%</p>
            <p className="text-sm text-zinc-600">lower energy costs</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-24 sm:px-12 lg:px-16 lg:py-32 xl:px-24">
        <SectionHeading
          eyebrow="Sustainability"
          title="Building for today, protecting tomorrow"
          text="Every home we build is designed to use less energy, less water and fewer resources — saving you money while caring for the environment."
        />

        <div className="mt-10 space-y-8">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={0.1 * i} y={20} className="flex gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-orange/30 text-orange">
                <Icon name={feature.icon} />
              </span>
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-1 leading-relaxed text-zinc-600">{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <Link
            href="/sustainability"
            className="group mt-10 inline-flex items-center gap-2 font-semibold text-zinc-900 transition-colors hover:text-orange"
          >
            Our sustainability approach
            <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

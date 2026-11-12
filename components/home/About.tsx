import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const points = [
  "Licensed, insured and fully accountable",
  "Transparent pricing with no hidden costs",
  "In-house architects, engineers and builders",
  "Every project delivered to a written timeline",
];

export default function About() {
  return (
    <section className="overflow-hidden bg-white py-24 text-zinc-900 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Overlapping image pair with an experience badge */}
        <Reveal className="relative pb-16 pr-10 sm:pr-20">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/residential.jpg"
              alt="Completed Neshell Developers residence"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 aspect-square w-1/2 overflow-hidden border-8 border-white shadow-2xl">
            <Image
              src="/images/contractors.jpg"
              alt="Neshell Developers team on site"
              fill
              sizes="(min-width: 1024px) 20vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute left-6 top-6 bg-orange px-6 py-5 text-white shadow-xl">
            <p className="text-4xl font-bold leading-none">15+</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest">Years building</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Who we are"
            title="We turn your plans into places worth living in"
            text="Neshell Developers is a full-service construction and property development company. From the first sketch to the final handover, we design and build homes and commercial spaces that are made to last — and we keep you informed every step of the way."
          />

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((point, i) => (
              <Reveal key={point} delay={0.1 * i} y={20}>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-orange/10 text-orange">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span className="text-zinc-700">{point}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-3 bg-zinc-900 px-7 py-4 font-semibold text-white transition-colors hover:bg-orange"
            >
              More about us
              <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { services } from "../../lib/services";
import Icon from "../Icon";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

export default function Services() {
  return (
    <section className="bg-zinc-50 py-24 text-zinc-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Complete construction services under one roof"
          />
          <Reveal>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 font-semibold text-zinc-900 transition-colors hover:text-orange"
            >
              View all services
              <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={0.08 * i}>
              <Link
                href={`/services#${service.slug}`}
                className="group relative flex h-[420px] flex-col justify-end overflow-hidden p-8 text-white"
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                {/* Keeps the title readable at rest */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                {/* Slight dark overlay on hover */}
                <div className="absolute inset-0 bg-black/35 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Orange bar that sweeps across the top on hover */}
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100" />
                <span className="absolute right-8 top-6 text-5xl font-bold text-white/25 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-white/40">
                  0{i + 1}
                </span>

                <div className="relative transition-transform duration-500 lg:translate-y-2 lg:group-hover:translate-y-0">
                  <div className="flex h-14 w-14 items-center justify-center border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-orange group-hover:bg-orange">
                    <Icon name={service.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold sm:text-2xl">{service.title}</h3>

                  {/* Description slides open on hover (always shown on touch-sized screens) */}
                  <div className="grid grid-rows-[1fr] transition-all duration-500 lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
                    <div className="overflow-hidden">
                      <p className="pt-3 leading-relaxed text-white/85">{service.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange">
                        Learn more
                        <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

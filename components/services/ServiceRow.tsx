import Image from "next/image";
import Link from "next/link";
import type { Service } from "../../lib/services";
import Icon from "../Icon";
import Reveal from "../Reveal";

// One service as an image/text row; `flip` puts the image on the right
export default function ServiceRow({
  service,
  index,
  flip,
}: {
  service: Service;
  index: number;
  flip: boolean;
}) {
  return (
    <article
      id={service.slug}
      className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-20"
    >
      <Reveal className={`relative ${flip ? "lg:order-2" : ""}`}>
        {/* Offset orange frame behind the photo */}
        <div
          className={`absolute -bottom-4 h-full w-full border-2 border-orange ${
            flip ? "-right-4" : "-left-4"
          }`}
        />
        <div className="group relative aspect-4/3 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center bg-orange text-white">
            <Icon name={service.icon} className="h-7 w-7" />
          </span>
          <span className="text-5xl font-bold text-zinc-200">0{index + 1}</span>
        </div>
        <h2 className="mt-6 text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          {service.title}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-zinc-600">{service.description}</p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-zinc-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-orange/10 text-orange">
                <Icon name="check" className="h-3.5 w-3.5" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={`/contact?service=${service.slug}`}
          className="group mt-10 inline-flex items-center gap-3 bg-zinc-900 px-7 py-4 font-semibold text-white transition-colors hover:bg-orange"
        >
          Enquire about this service
          <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </article>
  );
}

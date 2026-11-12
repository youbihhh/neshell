import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const designs = [
  {
    name: "The Acacia",
    type: "4-Bedroom Maisonette",
    image:
      "/images/project1.jpg",
    beds: 4,
    baths: 3,
    area: 280,
  },
  {
    name: "The Baobab",
    type: "5-Bedroom Villa",
    image:
      "/images/project2.jpg",
    beds: 5,
    baths: 4,
    area: 360,
  },
  {
    name: "The Cedar",
    type: "3-Bedroom Bungalow",
    image:
      "/images/project3.jpg",
    beds: 3,
    baths: 2,
    area: 190,
  },
];

export default function Designs() {
  return (
    <section className="bg-white py-24 text-zinc-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="House designs"
          title="Ready-made designs, tailored to you"
          text="Start from one of our proven house plans and customise the layout, finishes and features to suit your family and your plot."
          align="center"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {designs.map((design, i) => (
            <Reveal key={design.name} delay={0.12 * i}>
              <Link
                href="/designs"
                className="group block overflow-hidden border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-orange/40 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={design.image}
                    alt={`${design.name} — ${design.type}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-900">
                    {design.type}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{design.name}</h3>
                    <Icon
                      name="arrow"
                      className="h-5 w-5 -translate-x-2 text-orange opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </div>
                  <div className="mt-5 flex gap-6 border-t border-zinc-100 pt-5 text-sm text-zinc-600">
                    <span className="flex items-center gap-2">
                      <Icon name="bed" className="h-5 w-5 text-orange" />
                      {design.beds} Beds
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon name="bath" className="h-5 w-5 text-orange" />
                      {design.baths} Baths
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon name="area" className="h-5 w-5 text-orange" />
                      {design.area} m²
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Link
            href="/designs"
            className="inline-flex items-center gap-3 border-2 border-zinc-900 px-8 py-4 font-semibold text-zinc-900 transition-colors hover:border-orange hover:bg-orange hover:text-white"
          >
            Browse all house designs
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

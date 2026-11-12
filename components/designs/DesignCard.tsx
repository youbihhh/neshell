import Image from "next/image";
import Link from "next/link";
import { formatPrice, type HouseDesign } from "../../lib/designs";
import Icon, { type IconName } from "../Icon";

export default function DesignCard({ design }: { design: HouseDesign }) {
  const specs: { icon: IconName; label: string; value: string; unit?: string }[] = [
    { icon: "bed", label: "Bed", value: String(design.bedrooms) },
    { icon: "bath", label: "Bath", value: String(design.bathrooms) },
    { icon: "layers", label: "Floors", value: String(design.floors) },
    { icon: "area", label: "Size", value: design.sizeSqft.toLocaleString("en-US"), unit: "sq.ft" },
  ];

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-orange/40 hover:shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <Image
          src={design.image}
          alt={design.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-2xl font-bold text-orange">
          {formatPrice(design.priceUsd)}{" "}
          <span className="text-sm font-medium text-zinc-500">USD</span>
        </p>
        <h3 className="mt-1 text-xl font-semibold text-zinc-900">{design.name}</h3>

        <dl className="mt-6 grid grid-cols-4 divide-x divide-zinc-200 border-y border-zinc-200 py-4 text-center">
          {specs.map((spec) => (
            <div key={spec.label} className="flex flex-col items-center px-1">
              <dt className="flex flex-col items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                <Icon name={spec.icon} className="h-5 w-5 text-orange" />
                {spec.label}
              </dt>
              <dd className="mt-1 font-semibold text-zinc-900">
                {spec.value}
                {spec.unit && <span className="block text-xs font-normal text-zinc-500">{spec.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={`/contact?design=${design.slug}`}
          className="mt-6 inline-flex items-center justify-center gap-2 bg-zinc-900 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange"
        >
          Enquire about this design
          <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

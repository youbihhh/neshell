import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./Reveal";

type PageHeroProps = {
  title: string;
  image: string;
  alt: string;
};

// Single-image hero with a breadcrumb, used at the top of inner pages
export default function PageHero({ title, image, alt }: PageHeroProps) {
  return (
    <section className="relative flex h-[75svh] min-h-[520px] items-end overflow-hidden bg-zinc-950">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

      <Reveal className="relative mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8 lg:pb-20">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-sm text-white/70">
          <Link href="/" className="transition-colors hover:text-orange">
            Home
          </Link>
          <Icon name="chevronRight" className="h-4 w-4" />
          <span className="text-white">{title}</span>
        </nav>
        <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">{title}</h1>
        <span className="mt-6 block h-1 w-24 bg-orange" />
      </Reveal>
    </section>
  );
}

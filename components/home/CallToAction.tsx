import Link from "next/link";
import { site } from "../../lib/site";
import Icon from "../Icon";
import Reveal from "../Reveal";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-orange py-20 text-white lg:py-24">
      {/* Subtle diagonal hazard stripes */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent 0 24px, rgba(0,0,0,0.6) 24px 48px)",
        }}
      />
      <Reveal className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Ready to build your dream home?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Tell us about your project and get a free consultation and estimate from our team.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-zinc-950 px-8 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-zinc-950"
          >
            Enquire now
            <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={site.phone.href}
            className="inline-flex items-center gap-3 border-2 border-white px-8 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-orange"
          >
            <Icon name="phone" className="h-5 w-5" />
            Call us
          </a>
        </div>
      </Reveal>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "../Icon";
import Reveal from "../Reveal";

const features: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "video",
    title: "Virtual tours",
    text: "Walk through your site and your finished rooms by live video, wherever you are.",
  },
  {
    icon: "chart",
    title: "Frequent progress updates",
    text: "Regular photos, videos and written reports at every stage of the build.",
  },
  {
    icon: "chat",
    title: "Efficient communication",
    text: "A dedicated contact on WhatsApp, phone and email who works around your time zone.",
  },
  {
    icon: "shield",
    title: "Full transparency",
    text: "Clear costs and documented payments, so you always know where your money is going.",
  },
];

export default function Diaspora() {
  return (
    <section id="diaspora" className="relative scroll-mt-20 overflow-hidden bg-zinc-950 py-24 text-white lg:py-32">
      {/* Faint blueprint grid, as on the homepage */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange">
                <span className="h-px w-8 bg-orange" />
                For Ghanaians abroad
              </p>
              <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Building Homes in Ghana for the Diaspora
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-xl leading-relaxed text-white/90">
                Are you a Ghanaian abroad looking to build your dream home? Our team of skilled
                professionals work tirelessly to deliver high-quality homes that reflect the unique
                tastes and preferences of our diaspora clientele.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 leading-relaxed text-white/65">
                Neshell Developers understands the challenges faced by the diaspora in navigating the
                complexities of remote property ownership. To address this, we offer personalised
                services, including virtual tours, frequent progress updates, and efficient
                communication channels, ensuring that the diaspora remains connected and engaged
                throughout the construction process.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-5 leading-relaxed text-white/65">
                Whether it&apos;s a luxurious villa in Accra or a serene beachfront retreat in Cape
                Coast, Neshell Developers is your trusted partner. With our unwavering commitment to
                quality, transparency, and customer satisfaction, we are transforming the way
                Ghanaians abroad connect with their heritage and create lasting legacies through their
                dream homes in Ghana.
              </p>
            </Reveal>
          </div>

          {/* Villa with an interior inset and a floating badge */}
          <Reveal delay={0.15} className="relative pb-20 pl-0 sm:pl-16">
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src="/images/services/diaspora.jpg"
                alt="Modern two-storey villa with a pool"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 hidden aspect-square w-2/5 overflow-hidden border-8 border-zinc-950 sm:block">
              <Image
                src="/images/services/interior.jpg"
                alt="Bright open-plan living room"
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute right-4 top-6 flex items-center gap-3 bg-orange px-5 py-4 shadow-2xl sm:-right-4">
              <Icon name="globe" className="h-8 w-8" />
              <div>
                <p className="font-bold leading-tight">Build from anywhere</p>
                <p className="text-sm text-white/85">We&apos;re your team on the ground</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={0.08 * i} className="bg-zinc-950">
              <div className="group h-full p-8 transition-colors duration-500 hover:bg-white/5">
                <span className="flex h-12 w-12 items-center justify-center border border-orange/40 text-orange transition-colors duration-500 group-hover:bg-orange group-hover:text-white">
                  <Icon name={feature.icon} />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 border border-white/10 p-8 sm:flex-row sm:items-center">
          <p className="text-lg text-white/80">
            Living abroad and ready to start? Speak to our diaspora team today.
          </p>
          <Link
            href="/contact?service=diaspora"
            className="group inline-flex shrink-0 items-center gap-3 bg-orange px-7 py-4 font-semibold text-white transition-colors hover:bg-orange-dim"
          >
            Talk to our team
            <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

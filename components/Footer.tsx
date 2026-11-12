import Image from "next/image";
import Link from "next/link";
import { services } from "../lib/services";
import { site } from "../lib/site";
import Icon, { type IconName } from "./Icon";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/designs", label: "House Designs" },
  { href: "/projects", label: "Projects" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/contact", label: "Contact" },
];

const socials: { icon: IconName; label: string; href: string }[] = [
  { icon: "facebook", label: "Facebook", href: "#" },
  { icon: "instagram", label: "Instagram", href: "#" },
  { icon: "linkedin", label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Image
            src="/images/logo1.png"
            alt="Neshell Developers"
            width={727}
            height={343}
            className="h-16 w-auto"
          />
          <p className="mt-6 leading-relaxed">
            Designing and building quality homes and commercial spaces — on time, on budget and
            built to last.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center border border-white/15 transition-colors hover:border-orange hover:bg-orange hover:text-white"
              >
                <Icon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Quick links</h3>
          <ul className="mt-6 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-orange">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Services</h3>
          <ul className="mt-6 space-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services#${service.slug}`} className="transition-colors hover:text-orange">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Get in touch</h3>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-3">
              <Icon name="pin" className="h-5 w-5 shrink-0 text-orange" />
              <span>{site.address}</span>
            </li>
            <li>
              <a href={site.phone.href} className="flex gap-3 transition-colors hover:text-orange">
                <Icon name="phone" className="h-5 w-5 shrink-0 text-orange" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex gap-3 transition-colors hover:text-orange"
              >
                <Icon name="mail" className="h-5 w-5 shrink-0 text-orange" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm sm:flex-row lg:px-8">
          <p>&copy; 2026 Neshell Developers. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-orange">
              Privacy Policy
            </Link>
            <p className="text-white/40">Building Today, Creating Tomorrow</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/designs", label: "House Designs" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/sustainability", label: "Sustainability" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-zinc-950/90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/logi.png"
            alt="Neshell Developers"
            width={120}
            height={90}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-amber-400"
                      : "text-white/85 hover:text-amber-300"
                  }`}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-amber-400"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange/90 md:inline-block"
        >
          Enquire
        </Link>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:text-amber-300 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <span
            className={`absolute h-0.5 w-6 bg-current transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-current transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-current transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map(({ href, label }, i) => {
                const active = isActive(href);
                return (
                  <motion.li
                    key={href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`block rounded-md px-4 py-3 text-base font-medium transition-colors ${
                        active
                          ? "bg-amber-400/10 text-amber-400"
                          : "text-white/85 hover:bg-white/5 hover:text-amber-300"
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.li>
                );
              })}
              <li className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-orange-dim px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-orange/90"
                >
                  Enquire 
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

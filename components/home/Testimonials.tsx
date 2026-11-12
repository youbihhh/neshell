"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "../Icon";
import SectionHeading from "../SectionHeading";

const testimonials = [
  {
    quote:
      "Neshell Developers built our family home exactly as we imagined it. They kept us updated every week and finished two weeks ahead of schedule.",
    name: "Client Name",
    role: "Homeowner, Garden Estate",
  },
  {
    quote:
      "From design approvals to handover, the process was smooth and transparent. The quality of finishing in our office block is outstanding.",
    name: "Client Name",
    role: "Director, Skyline Business Centre",
  },
  {
    quote:
      "They transformed our old house into a modern, energy-efficient home. Our electricity bill has dropped noticeably since the renovation.",
    name: "Client Name",
    role: "Homeowner, Harbour District",
  },
];

const INTERVAL = 7000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Restarts on every change, so manual navigation resets the timer
  useEffect(() => {
    const id = setTimeout(() => setIndex((i) => (i + 1) % testimonials.length), INTERVAL);
    return () => clearTimeout(id);
  }, [index]);

  const go = (step: number) =>
    setIndex((i) => (i + step + testimonials.length) % testimonials.length);

  const current = testimonials[index];

  return (
    <section className="bg-white py-24 text-zinc-900 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="What our clients say" align="center" />

        <div className="relative mt-14">
          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[10rem] font-bold leading-none text-orange/10">
            &ldquo;
          </span>
          <div className="relative min-h-[260px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="text-xl font-light leading-relaxed text-zinc-700 sm:text-2xl">
                  {current.quote}
                </blockquote>
                <figcaption className="mt-8">
                  <p className="font-semibold text-zinc-900">{current.name}</p>
                  <p className="text-sm text-zinc-500">{current.role}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center border border-zinc-300 text-zinc-700 transition-colors hover:border-orange hover:bg-orange hover:text-white"
            >
              <Icon name="chevronLeft" className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.role}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 transition-all duration-500 ${
                    i === index ? "w-8 bg-orange" : "w-4 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center border border-zinc-300 text-zinc-700 transition-colors hover:border-orange hover:bg-orange hover:text-white"
            >
              <Icon name="chevronRight" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

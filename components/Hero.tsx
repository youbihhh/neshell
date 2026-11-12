"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    image:
      "/images/residential.jpg",
    alt: "Modern luxury home exterior at dusk",
    eyebrow: "Residential Development",
    heading: "Building Homes That Last Generations",
    text: "Thoughtfully designed residences crafted with quality materials and lasting attention to detail.",
  },
  {
    image:
      "/images/sky.jpg",
    alt: "Glass commercial towers against the sky",
    eyebrow: "Commercial Projects",
    heading: "Spaces Designed for Growth",
    text: "Offices and commercial properties engineered to help businesses thrive.",
  },
  {
    image:
      "/images/contractors.jpg",
    alt: "Construction site with cranes",
    eyebrow: "Construction & Management",
    heading: "From Blueprint to Reality",
    text: "End-to-end project delivery — on time, on budget, and built to the highest standard.",
  },
];

const INTERVAL = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Restarts whenever index changes, so clicking a dot resets the timer
  useEffect(() => {
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => clearTimeout(id);
  }, [index]);

  const slide = slides[index];

  return (
    <section className="relative h-svh min-h-[560px] w-full overflow-hidden bg-zinc-950">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: INTERVAL / 1000 + 1.2, ease: "linear" }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay: darkest in the top-right and bottom-left corners, lightest through the middle */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse at top right, rgba(0,0,0,0.55), transparent 55%)",
            "radial-gradient(ellipse at bottom left, rgba(0,0,0,0.55), transparent 55%)",
            "linear-gradient(to bottom left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)",
          ].join(", "),
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="max-w-4xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
              exit: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {[
              <p
                key="eyebrow"
                className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#fccb8f] sm:text-base"
              >
                {slide.eyebrow}
              </p>,
              <h1
                key="heading"
                className="text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl"
              >
                {slide.heading}
              </h1>,
              <p
                key="text"
                className="mt-8 max-w-3xl text-lg leading-relaxed text-white/80 sm:text-xl lg:text-2xl"
              >
                {slide.text}
              </p>,
            ].map((child) => (
              <motion.div
                key={child.key}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
                }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((s, i) => (
          <button
            key={s.heading}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === index ? "w-10 bg-orange" : "w-2.5 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Icon, { type IconName } from "../Icon";

export type Pillar = { icon: IconName; title: string; text: string; image: string };

const DURATION = 6; // seconds each point stays on screen

// Cycles through the pillars. The progress bar's CSS animation drives the
// timing, so pausing on hover is just pausing the animation.
export default function PillarCycle({ pillars }: { pillars: Pillar[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = pillars[active];

  return (
    <div
      className="grid gap-6 lg:grid-cols-[2fr_3fr] lg:gap-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ol className="order-2 grid gap-2 sm:grid-cols-2 lg:order-1 lg:grid-cols-1">
        {pillars.map((pillar, i) => {
          const isActive = i === active;
          return (
            <li key={pillar.title}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={isActive}
                className={`relative flex w-full items-center gap-4 overflow-hidden border px-5 py-4 text-left transition-colors duration-300 ${
                  isActive
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-orange/50"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center transition-colors ${
                    isActive ? "bg-orange text-white" : "bg-orange/10 text-orange"
                  }`}
                >
                  <Icon name={pillar.icon} className="h-5 w-5" />
                </span>
                <span className="font-semibold">{pillar.title}</span>
                <span
                  className={`ml-auto text-sm tabular-nums ${isActive ? "text-white/50" : "text-zinc-400"}`}
                >
                  0{i + 1}
                </span>
                {isActive && (
                  <span
                    key={active}
                    className="absolute inset-x-0 bottom-0 h-1 origin-left bg-orange"
                    style={{
                      animation: `progress-fill ${DURATION}s linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={() => setActive((a) => (a + 1) % pillars.length)}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="relative order-1 min-h-[420px] overflow-hidden bg-zinc-900 lg:order-2 lg:min-h-full">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <Image
              src={current.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm font-medium tabular-nums text-white/60">
                <span className="text-orange">0{active + 1}</span> / 0{pillars.length}
              </p>
              <h3 className="mt-3 text-3xl font-bold sm:text-4xl">{current.title}</h3>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{current.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

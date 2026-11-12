"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

const STORAGE_KEY = "neshell-intro-seen";
// The loader never finishes faster than this, even on a fast connection
const MIN_LOADING = 2400;
const WELCOME_DURATION = 3600;

// Runs while the HTML is parsed, before first paint, so returning visitors
// never see the intro flash (globals.css hides it via this attribute).
// It's rendered in the root layout so it runs whichever page the visitor
// lands on; if that isn't the homepage, the intro is skipped for this visit.
// Add ?intro to the URL to replay it.
const hideIfSeen = `try{var s=localStorage,k="${STORAGE_KEY}";if(/[?&]intro\\b/.test(location.search))s.removeItem(k);if(s.getItem(k)||location.pathname!=="/")document.documentElement.dataset.introSeen=""}catch(e){}`;

export function IntroScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: hideIfSeen }}
    />
  );
}

const ease = [0.76, 0, 0.24, 1] as const;

const stages = [
  { at: 0, label: "Laying the foundation" },
  { at: 35, label: "Raising the walls" },
  { at: 70, label: "Completing the vision" },
  { at: 100, label: "Ready" },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const pageLoaded = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });

function Letters({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden ${className ?? ""}`} aria-hidden>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ delay: delay + i * 0.04, duration: 0.6, ease }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function Loader({ progress }: { progress: ReturnType<typeof useMotionValue<number>> }) {
  const [stage, setStage] = useState(0);
  const percent = useTransform(progress, (v) => Math.round(v).toString().padStart(2, "0"));
  // The logo fills from the bottom up, like a building going up
  const fillClip = useTransform(progress, (v) => `inset(${100 - v}% 0 0 0)`);
  const edgeTop = useTransform(progress, (v) => `${100 - v}%`);
  const edgeOpacity = useTransform(progress, [0, 4, 96, 100], [0, 1, 1, 0]);
  const barScale = useTransform(progress, [0, 100], [0, 1]);

  useMotionValueEvent(progress, "change", (v) => {
    const next = stages.findLastIndex((s) => v >= s.at);
    if (next !== stage) setStage(next);
  });

  return (
    <motion.div
      key="loading"
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Blueprint grid, faded towards the edges */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />
      {/* Slow breathing glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/20 blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <motion.div
          className="relative w-64 sm:w-80"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          {/* Faint outline of the finished logo */}
          <Image
            src="/images/logo1.png"
            alt=""
            width={727}
            height={343}
            priority
            className="h-auto w-full opacity-10 grayscale"
          />
          <motion.div className="absolute inset-0" style={{ clipPath: fillClip }}>
            <Image
              src="/images/logi.png"
              alt=""
              width={727}
              height={343}
              priority
              className="h-auto w-full"
            />
          </motion.div>
          {/* Glowing line at the top of the fill */}
          <motion.div
            className="absolute -inset-x-6 h-px bg-gradient-to-r from-transparent via-orange to-transparent shadow-[0_0_12px_2px_var(--orange)]"
            style={{ top: edgeTop, opacity: edgeOpacity }}
          />
        </motion.div>

        <div className="mt-12 h-5 overflow-hidden text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stage}
              className="text-xs font-medium uppercase tracking-[0.35em] text-white/60"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {stages[stage].label}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Counter and progress line along the bottom */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-8 sm:px-12 sm:pb-12">
        <div className="mb-4 flex items-end justify-between text-white">
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/40 sm:text-xs">
            Neshell Developers
          </span>
          <span className="flex items-start font-light leading-none tabular-nums">
            <motion.span className="text-6xl sm:text-8xl">{percent}</motion.span>
            <span className="ml-1 mt-1 text-lg text-orange sm:text-2xl">%</span>
          </span>
        </div>
        <div className="h-px w-full bg-white/10">
          <motion.div
            className="h-full origin-left bg-orange shadow-[0_0_10px_var(--orange)]"
            style={{ scaleX: barScale }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function Welcome() {
  return (
    <motion.div
      key="welcome"
      className="flex flex-col items-center px-6 text-center"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative mb-8 flex items-center justify-center">
        {/* Glow behind the helmet */}
        <motion.div
          className="absolute h-56 w-56 rounded-full bg-orange/30 blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0.6], scale: [0.5, 1.2, 1] }}
          transition={{ delay: 0.6, duration: 1.4 }}
        />
        {/* Impact ring when the helmet lands */}
        <motion.div
          className="absolute h-40 w-40 rounded-full border-2 border-orange"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.8] }}
          transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
        />
        <motion.div
          initial={{ y: -400, rotate: -25, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, mass: 1.1 }}
        >
          <Image
            src="/images/helmet1.png"
            alt=""
            width={419}
            height={447}
            priority
            className="relative h-auto w-40 drop-shadow-2xl sm:w-52"
          />
        </motion.div>
      </div>

      <motion.p
        className="mb-3 text-sm font-medium uppercase tracking-[0.4em] text-white/70 sm:text-base"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        Welcome to
      </motion.p>

      <h1 className="flex flex-wrap justify-center gap-x-4 text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
        <Letters text="Neshell" delay={1.4} className="text-white" />
        <Letters text="Developers" delay={1.7} className="text-orange" />
      </h1>

      <motion.div
        className="mt-6 h-1 w-48 origin-center rounded-full bg-orange sm:w-72"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.3, duration: 0.7, ease }}
      />
    </motion.div>
  );
}

export default function Intro() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<"loading" | "welcome">("loading");
  const progress = useMotionValue(0);

  // Loading phase: count towards 90% while the page loads, then finish
  useEffect(() => {
    const root = document.documentElement;
    // Hidden by the inline script (or already played this visit); just unmount
    if ("introSeen" in root.dataset) {
      const id = setTimeout(() => setShow(false));
      return () => clearTimeout(id);
    }

    root.style.overflow = "hidden";
    let cancelled = false;
    const crawl = animate(progress, 90, {
      duration: MIN_LOADING / 1000,
      ease: [0.33, 1, 0.68, 1],
    });

    Promise.all([pageLoaded(), document.fonts.ready, wait(MIN_LOADING)]).then(() => {
      if (cancelled) return;
      animate(progress, 100, {
        duration: 0.5,
        ease: "easeOut",
        onComplete: () => {
          if (!cancelled) setTimeout(() => setPhase("welcome"), 300);
        },
      });
    });

    return () => {
      cancelled = true;
      crawl.stop();
    };
  }, [progress]);

  // Welcome phase: let the helmet and text play, then fade out
  useEffect(() => {
    if (phase !== "welcome") return;
    const id = setTimeout(() => {
      setShow(false);
      // Also hides the intro if the visitor navigates back to the homepage
      document.documentElement.dataset.introSeen = "";
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {}
    }, WELCOME_DURATION);
    return () => clearTimeout(id);
  }, [phase]);

  return (
    <>
      <AnimatePresence onExitComplete={() => (document.documentElement.style.overflow = "")}>
        {show && (
          <motion.div
            id="intro"
            role="status"
            aria-label="Welcome to Neshell Developers"
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-zinc-950"
            exit={{ opacity: 0 }}
            transition={{ duration: 4.5, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              {phase === "loading" ? <Loader progress={progress} /> : <Welcome />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

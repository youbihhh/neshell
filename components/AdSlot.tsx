"use client";

import { useEffect, useRef } from "react";
import { adsenseClient, defaultAdSlot } from "../lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  /** A specific AdSense ad unit ID; defaults to NEXT_PUBLIC_ADSENSE_SLOT */
  slot?: string;
  /** Background of the band the ad sits in, so it blends with the sections around it */
  className?: string;
};

/**
 * A responsive AdSense display ad in its own band between page sections.
 * Renders nothing until AdSense is configured; during development it shows a
 * dashed placeholder instead so you can see where the ads will go.
 */
export default function AdSlot({ slot = defaultAdSlot, className = "bg-white" }: Props) {
  const ref = useRef<HTMLModElement>(null);
  const enabled = Boolean(adsenseClient && slot);

  useEffect(() => {
    const ins = ref.current;
    // AdSense marks a filled slot with data-adsbygoogle-status; never fill one twice
    if (!enabled || !ins || ins.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // An ad blocker or a slot that couldn't be filled — leave the space empty
    }
  }, [enabled]);

  if (!enabled) {
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div className={className}>
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
          <div className="flex h-28 items-center justify-center border-2 border-dashed border-zinc-300 text-sm text-zinc-400">
            Ad space (only visible in development until AdSense is set up)
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Advertisement" className={className}>
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
          Advertisement
        </p>
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adsenseClient}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}

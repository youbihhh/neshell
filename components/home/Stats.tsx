import CountUp from "../CountUp";
import Reveal from "../Reveal";

const stats = [
  { value: 250, suffix: "+", label: "Homes completed" },
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 40, suffix: "+", label: "Ongoing projects" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20 text-white">
      {/* Faint blueprint grid, echoing the intro */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={0.1 * i}
            className={`px-4 text-center ${i > 0 ? "lg:border-l lg:border-white/10" : ""} ${
              i % 2 === 1 ? "border-l border-white/10 lg:border-l" : ""
            }`}
          >
            <p className="text-5xl font-bold text-orange sm:text-6xl">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-sm font-medium uppercase tracking-widest text-white/60">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

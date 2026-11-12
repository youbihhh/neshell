import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

const steps = [
  {
    title: "Consultation",
    text: "We meet to understand your goals, budget, site and timeline — free of charge.",
  },
  {
    title: "Design & Planning",
    text: "Our architects produce drawings, 3D renders and a detailed cost estimate, and secure approvals.",
  },
  {
    title: "Construction",
    text: "Our teams build to plan with regular site updates, quality checks and a dedicated project manager.",
  },
  {
    title: "Handover",
    text: "A final inspection, the keys to your new space, and after-care support long after we leave.",
  },
];

export default function Process() {
  return (
    <section className="bg-white py-24 text-zinc-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="How we work"
          title="A simple process, from first meeting to final key"
          align="center"
        />

        <div className="relative mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Dashed line linking the steps on large screens */}
          <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden border-t-2 border-dashed border-zinc-200 lg:block" />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={0.15 * i} className="group relative text-center">
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center border-2 border-orange bg-white text-2xl font-bold text-orange transition-colors duration-300 group-hover:bg-orange group-hover:text-white">
                0{i + 1}
              </div>
              <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-zinc-600">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

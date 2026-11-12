import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-orange" />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-orange" />}
      </p>
      <h2
        className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-zinc-900"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/70" : "text-zinc-600"}`}>
          {text}
        </p>
      )}
    </Reveal>
  );
}

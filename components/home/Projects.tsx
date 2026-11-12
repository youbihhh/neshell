import Image from "next/image";
import Link from "next/link";
import { getProjects } from "../../lib/projects";
import Icon from "../Icon";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";

// Tile sizes for the five featured projects; the first takes the large tile
const tileClasses = ["md:col-span-2 md:row-span-2", "", "", "", "md:col-span-2"];

export default async function Projects() {
  const projects = (await getProjects()).slice(0, tileClasses.length);

  return (
    <section className="bg-zinc-950 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Featured projects"
            title="Built with pride, delivered with care"
            text="A selection of recent residential and commercial work from across our portfolio."
            dark
          />
          <Reveal>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-orange"
            >
              View all projects
              <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid auto-rows-[260px] gap-4 md:grid-cols-3 lg:auto-rows-[300px]">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={0.08 * i} className={tileClasses[i]}>
              <Link href="/projects" className="group relative block h-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/95" />
                <span className="absolute left-5 top-5 bg-orange px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="flex items-center gap-1.5 text-sm text-white/70">
                    <Icon name="pin" className="h-4 w-4" />
                    {project.location}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold sm:text-2xl">{project.title}</h3>
                  <span className="mt-3 flex max-h-0 items-center gap-2 overflow-hidden text-sm font-semibold text-orange opacity-0 transition-all duration-500 group-hover:max-h-8 group-hover:opacity-100">
                    View project <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

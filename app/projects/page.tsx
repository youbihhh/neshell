import type { Metadata } from "next";
import AdSlot from "../../components/AdSlot";
import CallToAction from "../../components/home/CallToAction";
import PageHero from "../../components/PageHero";
import ProjectGallery from "../../components/projects/ProjectGallery";
import Reveal from "../../components/Reveal";
import SectionHeading from "../../components/SectionHeading";
import { getProjects } from "../../lib/projects";

export const metadata: Metadata = {
  title: "Projects | Neshell Developers",
  description:
    "Residential, commercial and renovation projects completed and in progress by Neshell Developers across Ghana.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="flex-1">
      <PageHero
        title="Our Projects"
        image="/images/pages/projects.jpg"
        alt="Modern white building with a glass facade"
      />

      <section className="bg-zinc-50 py-20 text-zinc-900 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Portfolio"
            title="Homes and spaces we're proud of"
            text="Browse our completed and ongoing work across Ghana — from family homes and diaspora villas to offices and renovations."
            align="center"
          />
          <Reveal className="mt-12">
            {projects.length > 0 ? (
              <ProjectGallery projects={projects} />
            ) : (
              <p className="text-center text-zinc-500">New projects are coming soon.</p>
            )}
          </Reveal>
        </div>
      </section>

      <AdSlot className="bg-zinc-50" />
      <CallToAction />
    </main>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projectCategories, type Project, type ProjectCategory } from "../../lib/project-types";
import Icon from "../Icon";

type Filter = "All" | ProjectCategory;

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...projectCategories];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const count = (f: Filter) =>
    f === "All" ? projects.length : projects.filter((p) => p.category === f).length;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`flex items-center gap-2 border px-5 py-2.5 text-sm font-semibold transition-colors ${
              filter === f
                ? "border-orange bg-orange text-white"
                : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-900 hover:text-zinc-900"
            }`}
          >
            {f}
            <span className={`text-xs ${filter === f ? "text-white/80" : "text-zinc-400"}`}>
              {count(f)}
            </span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-4/5 overflow-hidden bg-zinc-900 text-white"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 1280px) 50vw, 100vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-2">
                <span className="bg-orange px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur ${
                    project.status === "Ongoing" ? "bg-white/90 text-zinc-900" : "bg-black/40 text-white"
                  }`}
                >
                  {project.status === "Ongoing" ? "In progress" : project.year}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="flex items-center gap-1.5 text-sm text-white/70">
                  <Icon name="pin" className="h-4 w-4" />
                  {project.location}
                </p>
                <h3 className="mt-1 text-2xl font-semibold">{project.title}</h3>
                {/* Summary slides open on hover; always shown on touch-sized screens */}
                <div className="grid grid-rows-[1fr] transition-all duration-500 lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
                  <p className="overflow-hidden pt-2 leading-relaxed text-white/80">{project.summary}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

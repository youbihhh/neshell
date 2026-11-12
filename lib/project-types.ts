// Kept separate from lib/projects.ts (which uses server-only caching) so
// client components like the project filter can import these safely.
export const projectCategories = ["Residential", "Commercial", "Renovation", "Construction"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

// One project as the admin portal will store it (same approach as lib/designs.ts)
export type Project = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  status: "Completed" | "Ongoing";
  location: string;
  year: number;
  summary: string;
  image: string;
};

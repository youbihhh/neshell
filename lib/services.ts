import type { IconName } from "../components/Icon";

// Shared by the homepage cards, the services page and the footer.
// `slug` doubles as the section id, so /services#<slug> jumps to it.
export type Service = {
  slug: string;
  icon: IconName;
  title: string;
  summary: string;
  description: string;
  includes: string[];
  image: string;
};

export const HOUSE_DESIGN = "house-design";

// Choices for "What are you interested in?" on the contact form (and in the emails)
export const enquiryOptions = (): { value: string; label: string }[] => [
  { value: HOUSE_DESIGN, label: "A ready-made house design" },
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "diaspora", label: "Building from abroad (diaspora)" },
  { value: "other", label: "Something else" },
];

export const services: Service[] = [
  {
    slug: "residential-construction",
    icon: "home",
    title: "Residential Construction",
    summary:
      "Custom homes, bungalows and maisonettes built to your plans, your budget and your lifestyle.",
    description:
      "Whether it's your first family home or a luxury villa, we manage the full build — from foundations to finishing — using quality materials and experienced craftsmen, so your home is built to last for generations.",
    includes: [
      "Bungalows, maisonettes and villas",
      "Foundations, structure and roofing",
      "Plumbing, electrical and finishing",
      "Landscaping, fencing and gates",
    ],
    image: "/images/services/residential.jpg",
  },
  {
    slug: "commercial-construction",
    icon: "building",
    title: "Commercial Construction",
    summary:
      "Offices, retail spaces and mixed-use developments engineered for performance and growth.",
    description:
      "We deliver commercial buildings that work as hard as your business does — functional layouts, durable finishes and efficient systems, completed on schedule so you can open your doors sooner.",
    includes: [
      "Office blocks and business centres",
      "Shops and retail units",
      "Apartments and mixed-use buildings",
      "Warehouses and light industrial",
    ],
    image: "/images/services/commercial.jpg",
  },
  {
    slug: "house-design-planning",
    icon: "pencil",
    title: "House Design & Planning",
    summary:
      "Architectural drawings, 3D visualisations and approvals handled by our in-house design team.",
    description:
      "Choose one of our ready-made house designs or work with our architects on something entirely your own. We prepare the drawings, show you 3D views before anything is built, and handle the permits.",
    includes: [
      "Architectural and structural drawings",
      "3D renders and walkthroughs",
      "Building permits and approvals",
      "Detailed cost estimates",
    ],
    image: "/images/services/design.jpg",
  },
  {
    slug: "renovations-remodelling",
    icon: "wrench",
    title: "Renovations & Remodelling",
    summary:
      "Breathe new life into existing spaces with extensions, upgrades and complete makeovers.",
    description:
      "From a modern kitchen to an extra storey, we upgrade existing buildings carefully and cleanly — improving comfort, value and energy efficiency without the stress.",
    includes: [
      "Kitchens and bathrooms",
      "Extensions and additional floors",
      "Roofing and structural repairs",
      "Interior and exterior refits",
    ],
    image: "/images/services/renovation.jpg",
  },
  {
    slug: "project-management",
    icon: "clipboard",
    title: "Project Management",
    summary:
      "One point of contact managing budgets, contractors, timelines and quality from start to finish.",
    description:
      "A dedicated project manager oversees every stage of your build — coordinating trades, controlling costs, checking quality and keeping you informed, so nothing is left to chance.",
    includes: [
      "Dedicated project manager",
      "Budget and cost control",
      "Quality and safety inspections",
      "Regular written progress reports",
    ],
    image: "/images/services/project-management.jpg",
  },
  {
    slug: "sustainable-building",
    icon: "leaf",
    title: "Sustainable Building",
    summary:
      "Energy-efficient designs, solar integration and responsibly sourced materials as standard.",
    description:
      "We design homes that stay cool naturally, use less power and water, and are ready for solar from day one — lowering your running costs while protecting the environment.",
    includes: [
      "Solar-ready roofing and wiring",
      "Natural ventilation and shading",
      "Rainwater harvesting",
      "Locally sourced materials",
    ],
    image: "/images/services/sustainable.jpg",
  },
];

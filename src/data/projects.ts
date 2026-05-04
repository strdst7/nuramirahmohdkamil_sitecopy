export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  iconName: string;
  imageAlt: string;
  imageSrc: string;
  cta?: { label: string; href: string };
  layout: "right" | "left";
}

export const projects: Project[] = [
  {
    id: "echoes-melted-grid",
    number: "Project 01",
    title: "Echoes of the Melted Grid",
    description:
      "A study in structural decay. What happens when the rigid constraints of modernism are exposed to the heat of irrationality?",
    tags: ["UX Subversion", "Tactile"],
    iconName: "hive",
    imageAlt:
      "Abstract digital artwork showing flowing, melting liquid forms in amber and deep blue colors with soft volumetric lighting",
    imageSrc: "/images/portfolio-island-1.svg",
    layout: "right",
  },
  {
    id: "weightless-atelier",
    number: "Project 02",
    title: "The Weightless Atelier",
    description:
      "Designing for environments without gravity. UI components that behave like liquids in zero-G, responding to proximity rather than direct touch.",
    tags: ["Zero-G UI", "Proximity"],
    iconName: "bubble_chart",
    imageAlt:
      "Surreal minimalist composition of floating smooth spheres and curved objects over a dark infinite horizon with ethereal dramatic lighting",
    imageSrc: "/images/portfolio-island-2.svg",
    cta: { label: "Explore Fluidity", href: "#" },
    layout: "left",
  },
  {
    id: "taxonomy-of-shadows",
    number: "Project 03",
    title: "Taxonomy of Shadows",
    description:
      "Cataloguing the typologies of digital darkness. An experimental interface that classifies interface shadows by their emotional weight — from the soft ambiguity of a lifted card to the oppressive depth of a modal backdrop.",
    tags: ["Visual Taxonomy", "Perception"],
    iconName: "blur_on",
    imageAlt:
      "Layered overlapping translucent shapes casting elongated surreal shadows across a dark amber field, ethereal volumetric lighting",
    imageSrc: "/images/portfolio-island-1.svg",
    cta: { label: "Browse Catalogue", href: "#" },
    layout: "right",
  },
  {
    id: "the-liminal-dashboard",
    number: "Project 04",
    title: "The Liminal Dashboard",
    description:
      "A data visualization experiment that lives between states. Metrics dissolve and reform as the user's gaze shifts — nothing is quite where you left it, yet everything is exactly where it should be.",
    tags: ["Data Visualization", "Transience"],
    iconName: "all_inclusive",
    imageAlt:
      "Fluid dashboard elements floating in amber space, data points dissolving into organic blob shapes with warm ethereal glow",
    imageSrc: "/images/portfolio-island-2.svg",
    layout: "left",
  },
];

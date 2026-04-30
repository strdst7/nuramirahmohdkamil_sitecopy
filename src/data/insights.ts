export interface Article {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  tags: string[];
  iconName: string;
  diagramAlt: string;
  diagramSrc: string;
}

export const articles: Article[] = [
  {
    id: "obs-04-12",
    title: "Observation 04.12",
    date: "2025-03-18",
    excerpt:
      "The weights adjusting in layer 4 evoke a sensation akin to watching wax melt over a rusted gear.",
    body: "The weights adjusting in layer 4 evoke a sensation akin to watching wax melt over a rusted gear. It is not learning; it is an erosion of prior states. We queried the model on the concept of 'time', and it returned a series of topological maps where clocks physically drooped over landscape features.",
    tags: ["Latent Space", "Topology"],
    iconName: "pest_control",
    diagramAlt:
      "Surrealist 3D render of an abstract artificial neural network forming melting, organic shapes in a dimly lit barren room, warm amber lighting",
    diagramSrc: "/images/insights-diagram.svg",
  },
];

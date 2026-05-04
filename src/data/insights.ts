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
  {
    id: "obs-04-29",
    title: "Observation 04.29",
    date: "2025-04-02",
    excerpt:
      "Hallucination is not error — it is the model's latent imagination bleeding through the cracks of probability.",
    body: "Hallucination is not error — it is the model's latent imagination bleeding through the cracks of probability. We sampled 47 outputs at temperature 1.8 and observed a recurring motif: spiral staircases descending into impossible geometries. The model was not asked to imagine architecture. Yet it built cathedrals in the noise.",
    tags: ["Hallucination", "Imagination", "Architecture"],
    iconName: "blur_circular",
    diagramAlt:
      "Abstract visualization of spiral forms descending into fractal geometries, warm amber tones against deep umber void",
    diagramSrc: "/images/insights-diagram.svg",
  },
  {
    id: "obs-05-07",
    title: "Observation 05.07",
    date: "2025-04-15",
    excerpt:
      "Prompt engineering is performance art. You are not instructing a tool; you are setting a stage for an actor who has memorized every script ever written.",
    body: "Prompt engineering is performance art. You are not instructing a tool; you are setting a stage for an actor who has memorized every script ever written. This lens reframes the entire discipline. We tested identical prompts with varied tone — imperative, poetic, ontological — and found the model's behavior shifted not in accuracy but in personality. It was not a tool being configured; it was a character being cast.",
    tags: ["Prompt Engineering", "Theatre", "Personality"],
    iconName: "psychology",
    diagramAlt:
      "Theatrical masks dissolving into data streams, warm stage lighting bleeding into digital void",
    diagramSrc: "/images/insights-diagram.svg",
  },
];

export interface TechGroup {
  label: string;
  items: string[];
}

export const techStack: TechGroup[] = [
  {
    label: "Frontend & User Interface",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    label: "Backend & API Architecture",
    items: ["Node.js", "Express", "Python", "FastAPI", "REST API"],
  },
  {
    label: "AI, ML & Data Processing",
    items: ["PyTorch", "Scikit-learn", "LangChain", "OpenAI", "Pandas", "NumPy"],
  },
  {
    label: "Database & Vector Storage",
    items: ["PostgreSQL", "MongoDB", "Redis", "Pinecone", "ChromaDB"],
  },
  {
    label: "Infrastructure, DevOps & MLOps",
    items: ["Git", "Docker", "AWS", "Vercel", "GitHub Actions", "MLflow"],
  },
  {
    label: "AI Tooling & Agentic Workflows",
    items: ["Claude Code", "Antigravity", "ChatGPT", "MCP", "Agent Skills", "Agentic Loops"],
  },
];

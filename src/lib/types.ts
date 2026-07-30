export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  slug: string;
  bidang: "fullstack" | "ai";
  githubUrl: string;
  year: number;
}

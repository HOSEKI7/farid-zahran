export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  slug: string;
  field: "fullstack" | "ai";
  githubUrl: string;
  year: number;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  detail?: string;
}

/**
 * Discriminated union: setiap block wajib punya `type` sebagai penanda.
 * Renderer melakukan switch atas `type`, jadi menambah varian baru tanpa
 * menambah case akan gagal compile lewat exhaustive check di block-renderer.
 */
export type ProjectBlock =
  | { type: "narrative"; heading?: string; paragraphs: string[] }
  | { type: "gallery"; layout: "grid" | "masonry"; images: GalleryImage[] }
  | { type: "gallery"; layout: "full-bleed"; heroImage: GalleryImage }
  | { type: "metrics"; heading?: string; items: MetricItem[] };

export interface ProjectDetail {
  /** Wajib cocok dengan salah satu slug di projects.json */
  slug: string;
  tagline: string;
  role: string;
  timeline: string;
  thumbnail: GalleryImage;
  blocks: ProjectBlock[];
}

export interface Experience {
  id: number;
  company: string;
  companyLogo?: string;
  title: string;
  location: string;
  employmentType: string;
  startYear: string;
  endYear: string;
  description: string[];
  photos?: string[];
  company_website?: string;
  company_linkedin?: string;
}


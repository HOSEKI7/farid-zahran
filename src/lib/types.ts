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
}


import rawProjects from "./projects.json";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "mansions" | "apartments" | "bungalows" | "resorts" | string;
  categoryLabel: string;
  location: string;
  landSize: string;
  floorArea: string;
  summary: string;
  amenities: string[];
  image: string;
}

export const projectsData: Project[] = (rawProjects as Project[]).map((p) => ({
  ...p,
  image: p.image.startsWith("/") ? p.image : `/${p.image}`,
}));

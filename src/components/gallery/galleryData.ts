import rawProjects from "@/data/projects.json";

export interface GallerySite {
  id: string;
  title: string;
  subtitle: string;
  category: "all" | "mansions" | "apartments" | "bungalows" | "resorts" | string;
  categoryLabel: string;
  location: string;
  landSize: string;
  floorArea: string;
  summary: string;
  amenities: string[];
  thumbnail: string;
  fullImage: string;
  images: string[];
}

export const galleryCategories = [
  { id: "all", label: "All Developments" },
  { id: "mansions", label: "Mansions & Villas" },
  { id: "apartments", label: "Apartments & Commercial" },
  { id: "bungalows", label: "Bungalows" },
  { id: "resorts", label: "Hospitality & Resorts" },
];

export const gallerySitesData: GallerySite[] = (rawProjects as any[]).map((p) => {
  const normalizedPath = p.image.startsWith("/") ? p.image.slice(1) : p.image;
  const webpPath = `/${normalizedPath.replace(/\.png$/, ".webp")}`;
  const pngPath = `/${normalizedPath.replace(/\.webp$/, ".png")}`;

  return {
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    categoryLabel: p.categoryLabel,
    location: p.location,
    landSize: p.landSize,
    floorArea: p.floorArea,
    summary: p.summary,
    amenities: p.amenities || [],
    thumbnail: webpPath,
    fullImage: pngPath,
    images: [pngPath],
  };
});

export type ProjectCategory = 'mansions' | 'bungalows' | 'apartments' | 'resorts';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  landSize: string;
  floorArea: string;
  summary: string;
  amenities: string[];
  image: string;
  additionalImages?: string[]; // Easily extendable when client adds photos to public/assets/projects/
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface CoreValue {
  title: string;
  description?: string;
}

export interface ObsNode {
  title: string;
  subtitle?: string;
  type?: 'director' | 'md' | 'branch';
}

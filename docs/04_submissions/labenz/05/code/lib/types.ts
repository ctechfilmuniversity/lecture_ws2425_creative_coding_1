export interface Position {
  x: number;
  y: number;
  z: number;
}

export type AnimationCallback = (
  projectsPositions: { x: number; y: number; z: number }[],
  categoriesPositions: { x: number; y: number; z: number }[]
) => void;

export type StartAnimationCompletedCallback = () => void;

interface Coordinates {
  lat: number;
  lon: number;
}

// RGB color type used in Project data
export interface RGB {
  r: number;
  g: number;
  b: number;
}

// Category type definition
export interface Category {
  title: string;
  id: number;
  coordinates: Coordinates;
}

export interface Image {
  src: string;
  description?: string;
  size: { width: number; height: number };
}

export interface ProjectLink {
  href: string;
  text: string;
}

// Project data structure
interface ProjectData {
  thumb: Image;
  images: Image[];
  year: string;
  categories: string[];
  description: string;
  hex: string;
  rgb: RGB;
  projectLink?: ProjectLink;
}

// Project type definition
export interface Project {
  title: string;
  slug: string;
  id: number;
  coordinates: Coordinates;
  data: ProjectData;
}

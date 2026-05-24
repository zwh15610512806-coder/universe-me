import type { LucideIcon } from "lucide-react";

export type AccentTone = "cyan" | "violet" | "amber" | "rose";

export type NavItem = {
  label: string;
  href: string;
};

export type HomeFeature = {
  title: string;
  kicker: string;
  description: string;
  href: string;
  icon: LucideIcon;
  iconTone: string;
};

export type HomeJourneyRoute = {
  label: string;
  eyebrow: string;
  description: string;
  href: string;
  accent: AccentTone;
  icon: LucideIcon;
};

export type HomeHeroSpotlight = {
  label: string;
  title: string;
  description: string;
  href: string;
  metrics: DetailItem[];
};

export type StatItem = {
  label: string;
  value: string;
  detail: string;
};

export type DetailItem = {
  label: string;
  value: string;
};

export type InsightCard = {
  title: string;
  description: string;
  metric: string;
};

export type FeaturedExploration = {
  label: string;
  title: string;
  description: string;
  href: string;
};

export type Mission = {
  slug: string;
  year: string;
  name: string;
  agency: string;
  summary: string;
  phase: string;
  range: string;
  highlight: string;
  destination: string;
  vehicle: string;
  objective: string;
  outcome: string;
  duration: string;
  tags: string[];
  details: DetailItem[];
};

export type CosmicEvent = {
  id: string;
  epoch: string;
  title: string;
  description: string;
  signal: string;
  temperature: string;
  relativePosition: number;
  accent: AccentTone;
  keyPoint: string;
  evidence: string[];
};

export type StructureLevel = {
  id: string;
  order: string;
  name: string;
  scale: string;
  scaleValue: number;
  description: string;
  examples: string[];
  dominantForce: string;
  observation: string;
  accent: AccentTone;
};

export type StarmapColor = AccentTone | "white";

export type StarmapHighlight = {
  id: string;
  name: string;
  type: string;
  distance: string;
  magnitude: string;
  coordinates: [number, number, number];
  color: StarmapColor;
  region: string;
  observation: string;
  description: string;
};

export type GalleryImage = {
  slug: string;
  title: string;
  category: string;
  description: string;
  wavelength: string;
  objectType: string;
  gradient: string;
  observation: string;
  source: string;
  tags: string[];
  details: DetailItem[];
};

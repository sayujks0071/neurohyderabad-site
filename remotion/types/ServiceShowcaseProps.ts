export interface ServiceShowcaseProps {
  services: {
    title: string;
    subtitle: string;
    icon: string; // SVG path data or emoji
    highlights: string[];
    color: string; // accent color for this service card
  }[];
  doctorName: string;
  tagline: string;
}

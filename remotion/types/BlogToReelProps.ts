export interface BlogToReelProps {
  title: string;
  subtitle: string;
  keyPoints: {
    heading: string;
    body: string;
    icon: string; // emoji
  }[];
  callToAction: string;
  authorName: string;
  category: string;
  readTime: string;
}

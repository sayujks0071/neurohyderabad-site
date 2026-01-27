export interface OutcomeDashboardProps {
  stats: {
    label: string;
    value: number;
    suffix: string; // e.g. "+", "%", "k"
    description: string;
    color: string;
  }[];
  doctorName: string;
  specialty: string;
  hospitalName: string;
}

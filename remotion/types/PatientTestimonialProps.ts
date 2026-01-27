export interface PatientTestimonialProps {
  testimonials: {
    quote: string;
    patientInitials: string;
    procedure: string;
    rating: number; // 1-5
    recoveryHighlight: string;
  }[];
  doctorName: string;
  overallRating: number;
  totalReviews: number;
}

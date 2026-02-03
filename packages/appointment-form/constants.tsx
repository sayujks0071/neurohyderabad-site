import type { SVGProps } from "react";

export const CONTACT_INFO = {
  phone: "+91 9778280044",
  email: "hellodr@drsayuj.info",
  address:
    "Room No 317, 3rd Floor, OPD Block, Yashoda Hospital, Near New Market Metro station, Malakpet, Hyderabad, Telangana, India - 500036",
  mapsLink:
    "https://www.google.com/maps/dir/?api=1&destination=Yashoda+Hospitals,Malakpet,Hyderabad",
};

export const APPOINTMENT_SUCCESS_MESSAGE =
  "Appointment request received. Please bring any MRI/CT scans with you. We will confirm via phone shortly.";

export const FAQ_DATA: Array<{ question: string; answer: string }> = [
  {
    question: "What conditions do you treat?",
    answer:
      "Dr. Sayuj Krishnan specializes in brain tumors, spinal disorders, epilepsy, cerebrovascular diseases, and other neurosurgical conditions. Schedule a consultation to discuss your specific needs.",
  },
  {
    question: "Do I need a referral to book an appointment?",
    answer:
      "A referral is recommended but not mandatory. It helps us review your medical history in advance and coordinate care seamlessly.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Carry a valid photo ID, insurance details, any referral letters, and relevant medical records or imaging (MRI/CT) for a comprehensive evaluation.",
  },
  {
    question: "What are the consultation charges?",
    answer:
      "Consultation fees vary. Please call our clinic team at the number above for the latest fee schedule and payment options.",
  },
];

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}

export function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}

export function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}

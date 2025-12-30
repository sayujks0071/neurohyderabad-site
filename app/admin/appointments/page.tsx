import type { Metadata } from "next";

const APP_SHEET_URL =
  "https://www.appsheet.com/start/e8a04038-321e-4784-a7a0-af7b0ff48eea?platform=desktop#appName=DrSayujAppoint-20566864-25-12-25-2&vss=H4sIAAAAAAAAA62PTUsDMRCG_4rMOQut_dxcxUOpiqB4MR5mk4kEt0nZzLaWJf_dpK2I19Lj-w7PwzsD7BztXxj1F8j34S-t6QASBgWvhy0pkArugucutAqEgifcnMpnZEeebx7Cp_MKEqQP8SthiiCHCxzyCjsEOJMLZx11RVjwLDrD-VzQXPwDIQnY9IxNS8f9BXRx5e-N48dgcuauJwHcoY-o2QW_Mlkyr8dU2_GyWuiFqaZo6qqeTLBqRqTtrBnNbudLSCnbbdB9JPOW37v0rbLne4venBZZbCOlH6CUV4bIAQAA&view=Patient%20Login";

export const metadata: Metadata = {
  title: "Appointments Admin | Dr Sayuj Krishnan",
  description: "Internal appointments dashboard for Dr. Sayuj Krishnan.",
  alternates: {
    canonical: "/admin/appointments",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminAppointmentsPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-slate-900">
          Appointments Dashboard
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Secure AppSheet view for managing appointment requests.
        </p>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <iframe
            title="Dr Sayuj Appointments"
            src={APP_SHEET_URL}
            className="h-[85vh] min-h-[600px] w-full border-0"
            allow="clipboard-read; clipboard-write"
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
}

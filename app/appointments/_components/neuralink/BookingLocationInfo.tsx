import { ShieldCheck } from "lucide-react";
import { CLINIC } from "@/app/_lib/clinic";

export default function BookingLocationInfo() {
  return (
    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-500 text-sm">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4" />
        Patient data handled securely
      </div>
      <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
      <div>
        {CLINIC.street}, {CLINIC.city}
      </div>
    </div>
  );
}

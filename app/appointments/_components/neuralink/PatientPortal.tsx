"use client";

import { useState, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  FileText,
  Upload,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  MapPin,
  ExternalLink,
  Map as MapIcon,
  Loader2,
  Sparkles,
  Wand2,
  Search,
  Cloud,
  Check,
  Info,
  ShieldCheck,
} from "lucide-react";
import {
  analyzeSymptoms,
  searchNearbyCenters,
  refineSymptomDescription,
  interpretReport,
} from "./neuralinkApi";
import { AppointmentType } from "./types";
import AppointmentScheduler from "./AppointmentScheduler";
import SpeechButton from "./SpeechButton";
import { trackConversionOnly } from "@/src/lib/google-ads-conversion";
import { analytics } from "@/src/lib/analytics";
import { CLINIC } from "@/app/_lib/clinic";
import { APPOINTMENT_SUCCESS_MESSAGE } from "@/packages/appointment-form/constants";

type WorkflowAppointmentType = "new-consultation" | "follow-up" | "second-opinion";

const WORKFLOW_APPOINTMENT_TYPE_MAP: Record<AppointmentType, WorkflowAppointmentType> = {
  [AppointmentType.NEW_CONSULTATION]: "new-consultation",
  [AppointmentType.FOLLOW_UP]: "follow-up",
  [AppointmentType.POST_OP_CHECK]: "follow-up",
  [AppointmentType.REPORT_REVIEW]: "second-opinion",
  [AppointmentType.BRAIN_SPECIALIST]: "new-consultation",
  [AppointmentType.SPINE_SPECIALIST]: "new-consultation",
};

const toWorkflowAppointmentType = (
  type: AppointmentType | null
): WorkflowAppointmentType => {
  if (!type) return "new-consultation";
  return WORKFLOW_APPOINTMENT_TYPE_MAP[type] || "new-consultation";
};

const PatientPortal = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isLocatingCenters, setIsLocatingCenters] = useState(false);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [reportText, setReportText] = useState("");
  const [interpretationResult, setInterpretationResult] = useState<any>(null);
  const [refinementResult, setRefinementResult] = useState<any>(null);
  const [nearbyCentersResult, setNearbyCentersResult] = useState<{
    text: string;
    grounding: any[];
  } | null>(null);
  const [step, setStep] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const INITIAL_FORM_STATE = {
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "male",
    symptoms: "",
    type: null as AppointmentType | null,
    date: "",
    time: "",
    painScore: 5,
    mriScanAvailable: false,
  };

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [lastSubmittedData, setLastSubmittedData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    analytics.appointmentStart('appointment-portal', 'general');
  }, []);

  const clinicName = "Dr. Sayuj Krishnan | Yashoda Hospitals, Malakpet";
  const clinicAddress = `${CLINIC.street}, ${CLINIC.city}, ${CLINIC.region} ${CLINIC.postalCode}`;

  const handleScheduleSelect = (
    type: AppointmentType,
    date: string,
    time: string
  ) => {
    setFormData((prev) => ({ ...prev, type, date, time }));
  };

  const handleNextStep = () => {
    if (formData.type && formData.date && formData.time) {
      analytics.appointmentStepComplete('appointment-portal', 1, formData.type || undefined);
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleRefineSymptoms = async () => {
    if (!formData.symptoms.trim()) return;
    setIsRefining(true);
    const result = await refineSymptomDescription(formData.symptoms);
    setRefinementResult(result);
    setIsRefining(false);
  };

  const applyRefinement = () => {
    if (refinementResult) {
      setFormData({ ...formData, symptoms: refinementResult.refinedText });
      setRefinementResult(null);
    }
  };

  const handleInterpretReport = async () => {
    if (!reportText.trim()) return;
    setIsInterpreting(true);
    const result = await interpretReport(reportText);
    setInterpretationResult(result);
    setIsInterpreting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    setIsAnalyzing(true);
    let triageSummary = "";

    try {
      const ageValue = Number(formData.age);
      const triage = await analyzeSymptoms(
        formData.symptoms,
        Number.isFinite(ageValue) ? ageValue : 0,
        formData.gender
      );
      triageSummary = triage?.summary || "";
    } catch (error) {
      console.error("Triage error:", error);
    } finally {
      setIsAnalyzing(false);
    }

    const appointmentTypeLabel = formData.type || "General Consultation";
    const reasonParts = [
      `Appointment Type: ${appointmentTypeLabel}`,
      `Preferred Date: ${formData.date}`,
      `Preferred Time: ${formData.time}`,
      `Symptoms: ${formData.symptoms}`,
      `Pain Score: ${formData.painScore}/10`,
      `MRI Available: ${formData.mriScanAvailable ? "Yes" : "No"}`,
    ];
    if (triageSummary) {
      reasonParts.push(`AI Triage Summary: ${triageSummary}`);
    }

    setIsSyncing(true);

    try {
      const workflowAppointmentType = toWorkflowAppointmentType(formData.type);
      const response = await fetch("/api/workflows/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-booking-source": "neuralink",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          gender: formData.gender,
          preferredDate: formData.date,
          preferredTime: formData.time,
          appointmentType: workflowAppointmentType,
          chiefComplaint: formData.symptoms,
          intakeNotes: reasonParts.join("\n"),
          painScore: formData.painScore,
          mriScanAvailable: formData.mriScanAvailable,
          source: "neuralink",
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Unable to submit appointment request.");
      }

      const payload = await response.json().catch(() => null);
      setConfirmationMessage(payload?.confirmationMessage || null);
      trackConversionOnly();

      analytics.appointmentSuccess('appointment-portal', workflowAppointmentType);

      setLastSubmittedData(formData);
      setFormData(INITIAL_FORM_STATE);
      setStep(1);
      setNearbyCentersResult(null);
      setRefinementResult(null);
      setInterpretationResult(null);
      setReportText("");

      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Booking error:", error);
      const errMsg = error instanceof Error
          ? error.message
          : "Failed to book appointment. Please try again later.";

      analytics.formError('appointment-portal', 'submit_button', errMsg);

      setErrorMessage(errMsg);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFindNearbyCenters = async () => {
    setIsLocatingCenters(true);
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const result = await searchNearbyCenters(
            "Find 3-4 nearest high-quality MRI and CT diagnostic centers for neurosurgical imaging. List them clearly with their specialties.",
            latitude,
            longitude
          );
          setNearbyCentersResult(result);
          setIsLocatingCenters(false);
        },
        async () => {
          const result = await searchNearbyCenters(
            "Find high-quality MRI and CT diagnostic centers for neurosurgical imaging in Hyderabad. List them clearly."
          );
          setNearbyCentersResult(result);
          setIsLocatingCenters(false);
        }
      );
    } catch (err) {
      console.error("Failed to find centers:", err);
      setIsLocatingCenters(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="p-8 sm:p-12 text-center">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50/50">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Appointment Request Received
            </h2>
            <p className="text-slate-500 text-lg mb-6">{APPOINTMENT_SUCCESS_MESSAGE}</p>
            {confirmationMessage && (
              <div className="max-w-2xl mx-auto mb-10 bg-slate-50 border border-slate-200 rounded-3xl p-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600">
                    <Info className="w-5 h-5" />
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {confirmationMessage}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-left max-w-2xl mx-auto mb-10 shadow-inner">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Patient
                  </p>
                  <p className="font-bold text-slate-900 text-lg">{lastSubmittedData.name}</p>
                  <p className="text-sm text-slate-500">
                    {lastSubmittedData.age} yrs •{" "}
                    {lastSubmittedData.gender.charAt(0).toUpperCase() +
                      lastSubmittedData.gender.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Consultation
                  </p>
                  <p className="font-bold text-slate-900 text-lg">
                    {lastSubmittedData.type}
                  </p>
                  <p className="text-sm text-slate-500">
                    {new Date(lastSubmittedData.date).toLocaleDateString("en-IN")} •{" "}
                    {lastSubmittedData.time}
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Clinic Location
                </p>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">{clinicName}</p>
                    <p className="text-slate-500 text-sm">{clinicAddress}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <a href={`tel:${CLINIC.phone}`} className="hover:text-blue-700">
                    {CLINIC.phoneHuman}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <a
                    href={`mailto:${CLINIC.email}`}
                    className="hover:text-blue-700"
                  >
                    {CLINIC.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-8 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <MapIcon className="w-64 h-64 text-blue-900" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600">
                      <MapIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        Need Diagnostic Scans?
                      </h3>
                      <p className="text-sm text-slate-500 font-medium">
                        Find nearby MRI/CT centers approved for neuro-imaging.
                      </p>
                    </div>
                  </div>
                  {!nearbyCentersResult && !isLocatingCenters && (
                    <button
                      onClick={handleFindNearbyCenters}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all flex items-center"
                    >
                      <Search className="w-4 h-4 mr-2" /> Locate Centers
                    </button>
                  )}
                </div>

                {isLocatingCenters && (
                  <div className="flex flex-col items-center justify-center py-8 space-y-3">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-blue-600 font-bold text-sm animate-pulse">
                      Scanning medical network...
                    </p>
                  </div>
                )}

                {nearbyCentersResult && (
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="prose prose-sm prose-slate max-w-none mb-6">
                      {nearbyCentersResult.text}
                    </div>

                    {nearbyCentersResult.grounding.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {nearbyCentersResult.grounding.map((chunk, idx) => {
                          const mapsData = chunk.maps;
                          if (!mapsData) return null;
                          return (
                            <a
                              key={idx}
                              href={mapsData.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all group"
                            >
                              <MapPin className="w-3.5 h-3.5 mr-2 text-blue-500 group-hover:scale-110 transition-transform" />
                              {mapsData.title || "View on Maps"}
                              <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setConfirmationMessage(null);
                // Form data and state were already reset on submit
              }}
              className="text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors"
            >
              Book another appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Book Consultation</h2>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-slate-500">Fast-track your neurosurgical care.</p>
          <div className="flex items-center space-x-2 bg-white p-1 rounded-full border border-slate-100 shadow-sm">
            <div
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${step === 1 ? "bg-slate-900 text-white" : "text-slate-400"
                }`}
            >
              1. Schedule
            </div>
            <div
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${step === 2 ? "bg-slate-900 text-white" : "text-slate-400"
                }`}
            >
              2. Details
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Confirmations in 30–60 minutes
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            WhatsApp & phone updates
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            Data handled securely
          </span>
        </div>
        {errorMessage && (
          <div className="mt-6 bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-2xl p-4">
            {errorMessage}
          </div>
        )}
      </div>

      {step === 1 ? (
        <div className="animate-in fade-in duration-500">
          <AppointmentScheduler
            onSelect={handleScheduleSelect}
            selectedDate={formData.date}
            selectedTime={formData.time}
            selectedType={formData.type}
          />

          <div className="mt-12 flex justify-end sticky bottom-6 z-30">
            <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-slate-200">
              <button
                onClick={handleNextStep}
                disabled={!formData.type || !formData.date || !formData.time}
                className={`flex items-center px-8 py-3 rounded-xl font-bold text-lg transition-all ${!formData.type || !formData.date || !formData.time
                  ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                  }`}
              >
                Next Step <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-right-8 duration-500"
        >
          <div className="space-y-8">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Scheduling
            </button>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-900 flex items-center text-lg">
                <User className="w-5 h-5 mr-2 text-blue-600" /> Patient Profile
              </h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="patient-name" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    id="patient-name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-slate-50 focus:bg-white transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="patient-age" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Age
                    </label>
                    <input
                      id="patient-age"
                      required
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="patient-gender" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Gender
                    </label>
                    <select
                      id="patient-gender"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-slate-50 focus:bg-white transition-colors"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="patient-phone" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Phone
                  </label>
                  <input
                    id="patient-phone"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-slate-50 focus:bg-white transition-colors"
                    placeholder="+91 9XXXXXXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="patient-email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    id="patient-email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-slate-50 focus:bg-white transition-colors"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-3xl border border-indigo-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-32 h-32 text-indigo-600" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-indigo-900 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-indigo-600" /> AI
                    Report Interpreter
                  </h3>
                  <div className="px-2 py-1 bg-white rounded-md shadow-sm border border-indigo-100">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                      Beta
                    </span>
                  </div>
                </div>
                <label htmlFor="patient-report-text" className="text-sm text-slate-600 block">
                  Confused by your MRI/CT report? Paste the findings below for a
                  plain English explanation.
                </label>

                <textarea
                  id="patient-report-text"
                  value={reportText}
                  onChange={(event) => setReportText(event.target.value)}
                  rows={3}
                  placeholder="Paste medical jargon here..."
                  className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white shadow-sm resize-none"
                />

                {interpretationResult && (
                  <div className="p-4 bg-white rounded-xl border border-indigo-100 shadow-sm animate-in fade-in slide-in-from-top-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide">
                        Summary
                      </h4>
                      <SpeechButton
                        text={interpretationResult.plainEnglishSummary}
                        variant="light"
                        className="scale-75"
                      />
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "{interpretationResult.plainEnglishSummary}"
                    </p>
                    {interpretationResult.keyTakeaways && (
                      <ul className="text-xs text-slate-600 space-y-1">
                        {interpretationResult.keyTakeaways.map(
                          (item: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <Check className="w-3 h-3 text-indigo-500 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleInterpretReport}
                  disabled={isInterpreting || !reportText.trim()}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center ${isInterpreting
                    ? "bg-indigo-100 text-indigo-400"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-indigo-200"
                    }`}
                >
                  {isInterpreting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  {isInterpreting ? "Analyzing..." : "Simplify Report"}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 h-fit">
              <h3 className="font-bold text-slate-900 flex items-center text-lg">
                <FileText className="w-5 h-5 mr-2 text-blue-600" /> Clinical
                Context
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="patient-symptoms" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Symptoms
                    </label>
                    <button
                      type="button"
                      onClick={handleRefineSymptoms}
                      disabled={isRefining || !formData.symptoms.trim()}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center disabled:opacity-50"
                    >
                      <Wand2
                        className={`w-3 h-3 mr-1 ${isRefining ? "animate-spin" : ""
                          }`}
                      />
                      Refine with AI
                    </button>
                  </div>
                  <textarea
                    id="patient-symptoms"
                    required
                    value={formData.symptoms}
                    onChange={(e) =>
                      setFormData({ ...formData, symptoms: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-base leading-relaxed bg-slate-50 focus:bg-white transition-colors resize-none"
                    placeholder="Describe your pain, location, duration, and any triggers..."
                  />
                </div>

                <div>
                  <label htmlFor="patient-pain-score" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Current Pain Score (1-10)
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-400" aria-hidden="true">1</span>
                    <input
                      id="patient-pain-score"
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={formData.painScore}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          painScore: Number(e.target.value),
                        })
                      }
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-valuetext={`Score: ${formData.painScore}${formData.painScore >= 8 ? ' (Severe)' : formData.painScore <= 3 ? ' (Mild)' : ''}`}
                    />
                    <span className="text-sm font-bold text-slate-400" aria-hidden="true">10</span>
                  </div>
                  <div className="text-center mt-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${formData.painScore <= 3
                        ? "bg-green-100 text-green-700"
                        : formData.painScore <= 7
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      Score: {formData.painScore}
                      {formData.painScore >= 8 && " (Severe)"}
                      {formData.painScore <= 3 && " (Mild)"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    id="mriScanAvailable"
                    checked={formData.mriScanAvailable}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mriScanAvailable: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="mriScanAvailable"
                    className="ml-3 text-sm font-medium text-slate-700 cursor-pointer select-none"
                  >
                    I have recent MRI/CT Scan reports
                  </label>
                </div>

                {refinementResult && (
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                        Suggested Rewrite
                      </h4>
                      <button
                        type="button"
                        onClick={applyRefinement}
                        className="text-xs font-bold text-blue-700 hover:text-blue-800"
                      >
                        Use Suggestion
                      </button>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {refinementResult.refinedText}
                    </p>
                    {refinementResult.clarifyingQuestions && (
                      <ul className="text-xs text-slate-600 space-y-1">
                        {refinementResult.clarifyingQuestions.map(
                          (item: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <Check className="w-3 h-3 text-blue-500 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                )}

                <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-blue-500" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Upload Medical Files
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Drag & drop MRI/CT files here
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isAnalyzing || isSyncing}
                  className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all flex items-center justify-center relative overflow-hidden ${isAnalyzing || isSyncing
                    ? "bg-slate-800"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"
                    }`}
                >
                  {(isAnalyzing || isSyncing) && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse" />
                  )}
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Triaging...
                    </>
                  ) : isSyncing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Confirm Booking <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default PatientPortal;

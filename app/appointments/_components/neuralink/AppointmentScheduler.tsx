"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Brain,
  Activity,
  Check,
  Sun,
  Moon,
} from "lucide-react";
import { AppointmentType, TimeSlot } from "./types";
import { getAvailableSlots, getNextAvailableDate } from "./calendarService";

interface AppointmentSchedulerProps {
  onSelect: (type: AppointmentType, date: string, time: string) => void;
  selectedDate: string;
  selectedTime: string;
  selectedType: AppointmentType | null;
}

const APPOINTMENT_TYPES = [
  {
    id: AppointmentType.NEW_CONSULTATION,
    label: "New Consultation",
    icon: Activity,
    desc: "Initial assessment & diagnosis",
  },
  {
    id: AppointmentType.FOLLOW_UP,
    label: "Follow-up",
    icon: Clock,
    desc: "Review progress",
  },
  {
    id: AppointmentType.BRAIN_SPECIALIST,
    label: "Brain Specialist",
    icon: Brain,
    desc: "Headaches, tumors, trauma",
  },
  {
    id: AppointmentType.SPINE_SPECIALIST,
    label: "Spine Specialist",
    icon: Activity,
    desc: "Back pain, disc issues",
  },
];

const AppointmentScheduler = ({
  onSelect,
  selectedDate,
  selectedTime,
  selectedType,
}: AppointmentSchedulerProps) => {
  const [currentDate, setCurrentDate] = useState(
    selectedDate || getNextAvailableDate()
  );
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    setSlots(getAvailableSlots(currentDate));
  }, [currentDate]);

  const changeDate = (days: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + days);
    setCurrentDate(d.toISOString().split("T")[0]);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const morningSlots = slots.filter((slot) => parseInt(slot.time, 10) < 12);
  const afternoonSlots = slots.filter((slot) => parseInt(slot.time, 10) >= 12);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3 text-sm">
            1
          </div>
          <h3 className="text-xl font-bold text-slate-900">Reason for Visit</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {APPOINTMENT_TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id, currentDate, selectedTime)}
              className={`group flex items-start p-5 rounded-2xl border transition-all text-left relative overflow-hidden ${
                selectedType === item.id
                  ? "border-blue-500 bg-blue-50/50 shadow-md ring-1 ring-blue-200"
                  : "border-slate-200 hover:border-blue-300 bg-white hover:shadow-sm"
              }`}
            >
              <div
                className={`p-3 rounded-xl mr-4 transition-colors ${
                  selectedType === item.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                }`}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <div className="relative z-10">
                <div
                  className={`font-bold mb-1 ${
                    selectedType === item.id ? "text-blue-900" : "text-slate-900"
                  }`}
                >
                  {item.label}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {item.desc}
                </div>
              </div>
              {selectedType === item.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3 text-sm">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900">Select Date</h3>
          </div>
          <div className="flex items-center space-x-4 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <button
              onClick={() => changeDate(-7)}
              aria-label="Previous week"
              className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-slate-700 w-32 text-center">
              {formatDate(currentDate)}
            </span>
            <button
              onClick={() => changeDate(7)}
              aria-label="Next week"
              className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-3 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-3">
          {[...Array(7)].map((_, i) => {
            const buttonDate = new Date(currentDate);
            buttonDate.setDate(buttonDate.getDate() + i);

            const dStr = buttonDate.toISOString().split("T")[0];
            const isSelected = currentDate === dStr;
            const isWeekend = buttonDate.getDay() === 0 || buttonDate.getDay() === 6;

            return (
              <button
                key={dStr}
                type="button"
                disabled={isWeekend}
                aria-label={`Select ${buttonDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`}
                aria-pressed={isSelected}
                onClick={() => {
                  setCurrentDate(dStr);
                  if (selectedType) {
                    onSelect(selectedType, dStr, "");
                  }
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all relative ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105 z-10"
                    : isWeekend
                    ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <span className="text-xs font-medium mb-1 opacity-80">
                  {buttonDate.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-xl font-bold">{buttonDate.getDate()}</span>
                {isSelected && (
                  <div className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3 text-sm">
            3
          </div>
          <h3 className="text-xl font-bold text-slate-900">Available Time</h3>
        </div>

        {slots.every((slot) => !slot.available) ? (
          <div className="p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center">
            <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 font-medium">
              No slots available for this date.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {morningSlots.length > 0 && (
              <div>
                <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
                  <Sun className="w-3 h-3 mr-2" /> Morning
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {morningSlots.map((slot) => (
                    <TimeSlotButton
                      key={slot.time}
                      slot={slot}
                      selectedTime={selectedTime}
                      onSelect={() =>
                        selectedType && onSelect(selectedType, currentDate, slot.time)
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {afternoonSlots.length > 0 && (
              <div>
                <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
                  <Moon className="w-3 h-3 mr-2" /> Afternoon
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {afternoonSlots.map((slot) => (
                    <TimeSlotButton
                      key={slot.time}
                      slot={slot}
                      selectedTime={selectedTime}
                      onSelect={() =>
                        selectedType && onSelect(selectedType, currentDate, slot.time)
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

interface TimeSlotButtonProps {
  slot: TimeSlot;
  selectedTime: string;
  onSelect: () => void;
}

const TimeSlotButton = ({ slot, selectedTime, onSelect }: TimeSlotButtonProps) => (
  <button
    type="button"
    disabled={!slot.available}
    onClick={onSelect}
    className={`py-2.5 px-2 rounded-xl text-sm font-bold transition-all border shadow-sm ${
      selectedTime === slot.time
        ? "bg-blue-600 text-white border-blue-600 shadow-blue-200"
        : slot.available
        ? "bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md"
        : "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed shadow-none"
    }`}
  >
    {slot.time}
  </button>
);

export default AppointmentScheduler;

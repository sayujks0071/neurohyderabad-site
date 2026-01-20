import { TimeSlot } from "./types";
import { formatLocalDate, parseLocalDate } from "@/src/lib/dates";

const MORNING_SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
const AFTERNOON_SLOTS = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

export const getAvailableSlots = (date: string): TimeSlot[] => {
  const allSlots = [...MORNING_SLOTS, ...AFTERNOON_SLOTS];
  const dateHash = date
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return allSlots.map((time, index) => {
    const day = parseLocalDate(date).getDay();
    const isWeekend = day === 0 || day === 6;
    const isBusy = (dateHash + index) % 3 === 0;

    return {
      time,
      available: !isWeekend && !isBusy,
    };
  });
};

export const getNextAvailableDate = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return formatLocalDate(d);
};

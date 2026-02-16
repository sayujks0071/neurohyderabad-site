'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../constants";
import { formatLocalDate } from "@/src/lib/dates";
import Tooltip from "./Tooltip";

interface CalendarProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  error?: string;
  required?: boolean;
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({
  label,
  value,
  onChange,
  error,
  required,
}: CalendarProps) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const selectedDate = useMemo(() => {
    if (!value) return null;
    const [year, month, day] = value.split("-").map(Number);
    const candidate = new Date(year, month - 1, day);
    candidate.setHours(0, 0, 0, 0);
    return Number.isNaN(candidate.getTime()) ? null : candidate;
  }, [value]);

  const [viewDate, setViewDate] = useState(
    () =>
      selectedDate ??
      new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [focusedDate, setFocusedDate] = useState(selectedDate ?? today);
  const gridRef = useRef<HTMLDivElement>(null);
  const monthYearId = useMemo(
    () => `month-year-${Math.random().toString(36).slice(2, 9)}`,
    []
  );

  useEffect(() => {
    if (gridRef.current) {
      const focusedButton =
        gridRef.current.querySelector<HTMLButtonElement>('[tabindex="0"]');
      focusedButton?.focus();
    }
  }, [focusedDate]);

  useEffect(() => {
    if (selectedDate) {
      setViewDate(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      );
      setFocusedDate(selectedDate);
    }
  }, [selectedDate]);

  const currentMonthStart = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
    [today]
  );
  const isPrevDisabled = viewDate <= currentMonthStart;

  const handlePrevMonth = () => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    setViewDate(newDate);

    // When going back, if we land on current month, focus Today.
    // Otherwise (future->future), just focus 1st.
    const candidate = newDate < today ? today : newDate;
    setFocusedDate(candidate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    setViewDate(newDate);
    // When going forward, focus 1st of month so user can tab in.
    setFocusedDate(newDate);
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      day
    );
    newDate.setHours(0, 0, 0, 0);
    if (newDate < today) return;
    onChange(formatLocalDate(newDate));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let newFocused = new Date(focusedDate);
    let handled = true;

    switch (event.key) {
      case "ArrowRight":
        newFocused.setDate(newFocused.getDate() + 1);
        break;
      case "ArrowLeft":
        newFocused.setDate(newFocused.getDate() - 1);
        break;
      case "ArrowUp":
        newFocused.setDate(newFocused.getDate() - 7);
        break;
      case "ArrowDown":
        newFocused.setDate(newFocused.getDate() + 7);
        break;
      case "PageUp":
        newFocused.setMonth(newFocused.getMonth() - 1);
        break;
      case "PageDown":
        newFocused.setMonth(newFocused.getMonth() + 1);
        break;
      case "Home":
        newFocused.setDate(newFocused.getDate() - newFocused.getDay());
        break;
      case "End":
        newFocused.setDate(newFocused.getDate() + (6 - newFocused.getDay()));
        break;
      case "Enter":
      case " ":
        if (focusedDate >= today) {
          onChange(formatLocalDate(focusedDate));
        }
        break;
      default:
        handled = false;
        break;
    }

    if (handled) {
      event.preventDefault();
      if (
        newFocused.getMonth() !== viewDate.getMonth() ||
        newFocused.getFullYear() !== viewDate.getFullYear()
      ) {
        setViewDate(
          new Date(newFocused.getFullYear(), newFocused.getMonth(), 1)
        );
      }
      setFocusedDate(newFocused);
    }
  };

  const monthName = viewDate.toLocaleString("default", { month: "long" });
  const year = viewDate.getFullYear();
  const daysInMonth = new Date(year, viewDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, viewDate.getMonth(), 1).getDay();

  const daysOfMonth = Array.from({ length: daysInMonth }, (_, idx) => idx + 1);
  const leadingBlanks = Array.from({ length: firstDay }, () => null);
  const cells = [...leadingBlanks, ...daysOfMonth];
  const weeks: Array<Array<number | null>> = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
        {required && <span className="text-red-500 font-extrabold pl-1">*</span>}
      </label>
      <div
        className={`bg-white border rounded-md p-4 transition-colors ${
          error ? "border-red-500" : "border-slate-300"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <Tooltip text="Previous month" skipAriaDescription>
            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={isPrevDisabled}
              aria-disabled={isPrevDisabled}
              aria-label="Previous month"
              className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                isPrevDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-slate-100"
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5 text-slate-600" />
            </button>
          </Tooltip>
          <div
            id={monthYearId}
            className="text-lg font-semibold text-slate-800"
            aria-live="polite"
          >
            {monthName} {year}
          </div>
          <Tooltip text="Next month" skipAriaDescription>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
              className="p-2 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600" />
            </button>
          </Tooltip>
        </div>
        <div
          ref={gridRef}
          role="grid"
          aria-labelledby={monthYearId}
          onKeyDown={handleKeyDown}
        >
          <div role="row" className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((day) => (
              <div
                key={day}
                role="columnheader"
                aria-label={day}
                className="text-xs font-semibold text-slate-500 uppercase"
              >
                {day.slice(0, 2)}
              </div>
            ))}
          </div>
          {weeks.map((week, index) => (
            <div key={index} role="row" className="grid grid-cols-7 gap-1 mt-1">
              {week.map((day, dayIndex) => {
                if (day === null) {
                  return (
                    <div
                      key={`blank-${dayIndex}`}
                      role="gridcell"
                      aria-hidden="true"
                    />
                  );
                }

                const date = new Date(year, viewDate.getMonth(), day);
                date.setHours(0, 0, 0, 0);

                const isToday = date.getTime() === today.getTime();
                const isSelected = selectedDate
                  ? date.getTime() === selectedDate.getTime()
                  : false;
                const isPast = date < today;
                const isFocused = date.getTime() === focusedDate.getTime();

                const buttonClasses = [
                  "w-9 h-9 flex items-center justify-center rounded-full text-sm transition-colors",
                  isPast
                    ? "text-slate-400 cursor-not-allowed"
                    : "hover:bg-slate-100",
                  isSelected
                    ? "bg-cyan-600 text-white font-semibold hover:bg-cyan-700"
                    : "text-slate-700",
                  !isSelected && isToday ? "border-2 border-cyan-500" : "",
                  isFocused && !isPast ? "ring-2 ring-cyan-500 ring-offset-1" : "",
                ]
                  .join(" ")
                  .trim();

                const label = date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <div key={day} role="gridcell" className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleDateClick(day)}
                      disabled={isPast}
                      className={buttonClasses}
                      tabIndex={isFocused ? 0 : -1}
                      aria-pressed={isSelected ? "true" : "false"}
                      aria-disabled={isPast}
                      aria-label={`${label}${
                        isToday ? ", Today" : ""
                      }${isSelected ? ", Selected" : ""}`}
                      aria-current={isToday ? "date" : undefined}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

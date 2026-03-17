'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, UserCheck, Zap } from 'lucide-react';

interface ClinicSlot {
  nextSlot: string;
  isUrgent: boolean;
  availableCount: number;
}

/**
 * SlotAvailabilityWidget
 * 
 * A high-conversion widget that displays real-time clinic availability.
 * Designed to create "scarcity" and "urgency" for OPD bookings.
 */
export default function SlotAvailabilityWidget() {
  const [data, setData] = useState<ClinicSlot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const res = await fetch('/api/clinic/availability');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to fetch availability:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailability();
    // Refresh availability every 5 minutes
    const interval = setInterval(fetchAvailability, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="h-24 w-full bg-slate-900/50 animate-pulse rounded-2xl border border-blue-500/20" />
    );
  }

  if (!data) return null;

  const slotDate = new Date(data.nextSlot);
  const isToday = new Date().toDateString() === slotDate.toDateString();
  
  const timeStr = slotDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const dateStr = isToday ? 'Today' : slotDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden group p-5 rounded-2xl border border-blue-500/30 bg-slate-900/40 backdrop-blur-xl shadow-2xl transition-all hover:border-blue-400/50"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
        
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Next Available Slot</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {dateStr}, {timeStr}
                </h3>
                {data.isUrgent && (
                  <span className="flex items-center gap-1 text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30 font-bold uppercase">
                    <Zap className="w-3 h-3 fill-current" /> Fast Filling
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <UserCheck className="w-4 h-4" />
              <span>{data.availableCount} {data.availableCount === 1 ? 'Slot' : 'Slots'} Remaining</span>
            </div>
            <a 
              href="https://wa.me/919778280044?text=I%20want%20to%20book%20the%20appointment%20slot%20for%20today"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2"
            >
              Book Now
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

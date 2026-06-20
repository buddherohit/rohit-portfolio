// src/components/LocationTimeCard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Wifi } from "lucide-react";

function getISTTime() {
  const now = new Date();
  // IST = UTC + 5:30
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 5.5 * 3600000);
  return ist;
}

function formatTime(date) {
  const h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return { time: `${hour12}:${m}:${s}`, ampm };
}

function formatDay(date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const AVAILABILITY = [
  { label: "Open to Internships", color: "bg-green-500", pulse: true },
  { label: "Open to Collaborations", color: "bg-blue-400", pulse: true },
];

export default function LocationTimeCard({ compact = false }) {
  const [istTime, setIstTime] = useState(getISTTime());

  useEffect(() => {
    const tick = setInterval(() => setIstTime(getISTTime()), 1000);
    return () => clearInterval(tick);
  }, []);

  const { time, ampm } = formatTime(istTime);
  const day = formatDay(istTime);

  if (compact) {
    // Inline compact version for hero section
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <MapPin size={13} className="text-red-500" />
          <span>Nagpur, India</span>
        </div>

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700" />

        {/* Time */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <Clock size={13} className="text-amber-500" />
          <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{time}</span>
          <span className="text-slate-500 dark:text-slate-400">{ampm} IST</span>
        </div>

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700" />

        {/* Status */}
        <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Available
        </div>
      </motion.div>
    );
  }

  // Full card version
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-sm shadow-lg p-5 space-y-4 group hover:border-red-300 dark:hover:border-amber-500/30 transition-all duration-300"
    >
      {/* Subtle glow */}
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-red-500/10 dark:bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:opacity-150 transition-opacity" />

      {/* Location row */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30">
          <MapPin size={16} className="text-red-500" />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Current Location</p>
          <p className="font-bold text-slate-800 dark:text-slate-100 text-sm leading-none mt-0.5">
            Nagpur, India
          </p>
        </div>
        <div className="ml-auto text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          UTC+5:30
        </div>
      </div>

      {/* Time */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30">
          <Clock size={16} className="text-amber-500" />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Local Time (IST)</p>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-bold text-slate-800 dark:text-slate-100 text-lg font-mono tabular-nums leading-none">
              {time}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{ampm}</span>
          </div>
        </div>
      </div>

      {/* Day */}
      <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium pl-0.5 border-t border-slate-100 dark:border-slate-800 pt-3">
        {day}
      </div>

      {/* Availability pills */}
      <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
          <Wifi size={11} />
          Status
        </div>
        <div className="flex flex-col gap-1.5">
          {AVAILABILITY.map((a) => (
            <div key={a.label} className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                {a.pulse && (
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${a.color} opacity-60`} />
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${a.color}`} />
              </span>
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

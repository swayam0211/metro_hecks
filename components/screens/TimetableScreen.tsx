"use client";

import { motion } from "framer-motion";
import { Train, Zap, Clock, ChevronRight } from "lucide-react";
import type { CityEvent } from "@/lib/types";

interface TimetableScreenProps {
  selectedEvent: CityEvent | null;
}

// ── Train entry type (union of Regular + Special) ────────────
type TrainEntry = {
  id: string;
  time: string;
  type: "Regular" | "Special";
  from: string;
  to: string;
  reason?: string;
};

// ── Generate inline timetable ──────────────────────────────────
function generateTimetable(event: CityEvent | null): TrainEntry[] {
  const baseTrains: TrainEntry[] = [
    { id: "BASE-0", time: "06:30", type: "Regular", from: "Motera Stadium", to: "GIFT City" },
    { id: "BASE-1", time: "06:38", type: "Regular", from: "GIFT City", to: "Motera Stadium" },
    { id: "BASE-2", time: "07:00", type: "Regular", from: "Motera Stadium", to: "GIFT City" },
    { id: "BASE-3", time: "07:08", type: "Regular", from: "GIFT City", to: "Motera Stadium" },
    { id: "BASE-4", time: "07:30", type: "Regular", from: "Motera Stadium", to: "GIFT City" },
    { id: "BASE-5", time: "08:00", type: "Regular", from: "Motera Stadium", to: "GIFT City" },
    { id: "BASE-6", time: "08:08", type: "Regular", from: "GIFT City", to: "Motera Stadium" },
    { id: "BASE-7", time: "08:30", type: "Regular", from: "Motera Stadium", to: "GIFT City" },
  ];

  if (!event) return baseTrains;

  // Build injected special trains
  const injected: TrainEntry[] = Array.from(
    { length: Math.min(event.injectRakeCount, 3) },
    (_, i) => ({
      id: `SPECIAL-${event.id}-${i}`,
      time: `07:${(i + 1) * 15 < 60 ? String((i + 1) * 15).padStart(2, "0") : "45"}`,
      type: "Special" as const,
      from: event.primaryStation,
      to: "GIFT City",
      reason: event.title,
    })
  );

  // Insert injected trains after index 2 (between 07:00 and 07:08 base trains)
  const withInjected = [...baseTrains];
  withInjected.splice(2, 0, ...injected);
  return withInjected;
}

export default function TimetableScreen({ selectedEvent }: TimetableScreenProps) {
  const trains = generateTimetable(selectedEvent);

  return (
    <motion.div
      key="timetable"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col bg-[#F0F2F5]"
    >
        {/* Header */}
        <div className="px-5 pt-[58px] pb-3">
          <p className="heading-label">Live Departure</p>
          <h1 className="heading-title">Board</h1>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-center gap-1.5"
            >
              <Zap size={12} className="text-[#7D9BB3]" />
              <span className="text-[11px] text-[#7D9BB3] font-semibold">
                {selectedEvent.injectRakeCount} Special Rakes Active •{" "}
                {selectedEvent.title.split(":")[0]}
              </span>
            </motion.div>
          )}
        </div>

        {/* Train list */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-28">

          {/* OCC / Commuter View Toggle */}
          <div className="flex gap-2 mb-4">
            {["OCC View", "Commuter View"].map((label, i) => (
              <button
                key={label}
                className="flex-1 py-2 rounded-full text-[12px] font-semibold transition-all"
                style={{
                  background: i === 0
                    ? "linear-gradient(135deg, #7D9BB3, #64829A)"
                    : "rgba(255,255,255,0.85)",
                  color: i === 0 ? "white" : "#6B7280",
                  boxShadow: i === 0 ? "0 4px 12px rgba(100,130,154,0.3)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Train rows */}
          <div className="flex flex-col gap-2">
            {trains.map((train, i) => {
              const isSpecial = train.type === "Special";
              return (
                <motion.div
                  key={train.id || i}
                  initial={{ opacity: 0, x: isSpecial ? 12 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: isSpecial
                      ? "linear-gradient(135deg, rgba(125,155,179,0.12), rgba(100,130,154,0.08))"
                      : "rgba(255,255,255,0.85)",
                    border: isSpecial
                      ? "1px solid rgba(125,155,179,0.25)"
                      : "1px solid rgba(0,0,0,0.04)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Time */}
                  <div className="flex-shrink-0 w-12 text-right">
                    <p
                      className="font-black leading-none"
                      style={{
                        fontSize: "15px",
                        color: isSpecial ? "#7D9BB3" : "#111827",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {train.time}
                    </p>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isSpecial
                        ? "linear-gradient(135deg, #7D9BB3, #64829A)"
                        : "#F3F4F6",
                    }}
                  >
                    {isSpecial ? (
                      <span className="text-[13px]">⚡</span>
                    ) : (
                      <Train size={13} className="text-gray-500" />
                    )}
                  </div>

                  {/* Route */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[12px] font-semibold leading-tight truncate"
                      style={{ color: isSpecial ? "#4A6A84" : "#374151" }}
                    >
                      {train.from} → {train.to}
                    </p>
                    {isSpecial && train.reason && (
                      <p className="text-[10px] text-[#7D9BB3]/70 mt-0.5 truncate">
                        ⚡ {train.reason}
                      </p>
                    )}
                    {!isSpecial && (
                      <p className="text-[10px] text-gray-400 mt-0.5">Regular Service</p>
                    )}
                  </div>

                  {/* Type badge */}
                  <div className="flex-shrink-0">
                    {isSpecial ? (
                      <span className="pill-moderate">SPECIAL</span>
                    ) : (
                      <ChevronRight size={14} className="text-gray-300" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 px-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                <Train size={11} className="text-gray-500" />
              </div>
              <span className="text-[11px] text-gray-400">Regular Train</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-[#7D9BB3] flex items-center justify-center">
                <span className="text-[10px]">⚡</span>
              </div>
              <span className="text-[11px] text-gray-400">Event Special</span>
            </div>
          </div>
        </div>
      </motion.div>
  );
}

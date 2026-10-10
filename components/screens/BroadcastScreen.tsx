"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Radio, CheckCircle2, Smartphone, Globe, CheckCheck } from "lucide-react";
import type { CityEvent } from "@/lib/types";

interface BroadcastScreenProps {
  selectedEvent: CityEvent | null;
}

export default function BroadcastScreen({ selectedEvent }: BroadcastScreenProps) {
  const [isSent, setIsSent] = useState(false);

  function handleBroadcast() {
    setIsSent(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#7D9BB3", "#10B981", "#3B82F6", "#FFFFFF"],
      });
    } catch {
      // safe fallback
    }
  }

  return (
    <motion.div
      key="broadcast"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[#F0F2F5] px-6"
    >
      {/* Broadcast icon ring */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center"
      >
        {/* Rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-[#7D9BB3]/20"
            animate={{ scale: [1, 1 + ring * 0.3], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: ring * 0.35, ease: "easeOut" }}
            style={{ width: 64 + ring * 30, height: 64 + ring * 30 }}
          />
        ))}
        <div
          className="w-16 h-16 rounded-3xl flex items-center justify-center z-10"
          style={{ background: isSent ? "linear-gradient(135deg, #10B981, #059669)" : "linear-gradient(135deg, #7D9BB3, #4A6A84)" }}
        >
          {isSent ? <CheckCheck size={28} className="text-white" /> : <Radio size={28} className="text-white" />}
        </div>
      </motion.div>

      {/* Title */}
      <div className="text-center">
        <h1 className="heading-title text-center">
          {isSent ? "Broadcast Live" : "Broadcast Ready"}
        </h1>
        <p className="heading-label text-center mt-1">
          {selectedEvent
            ? isSent
              ? `Updated timetable active across all city channels for "${selectedEvent.title}"`
              : `Schedule approved for "${selectedEvent.title}"`
            : "Select and approve a scenario in OCC first"}
        </p>
      </div>

      {/* Broadcast channels */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xs flex flex-col gap-2.5"
        >
          {[
            { icon: <Smartphone size={16} />, label: "Commuter App", sublabel: "Push notification to 45,000 users", status: isSent ? "Pushed ✓" : "Ready" },
            { icon: <Globe size={16} />, label: "Digital Signage", sublabel: "All 32 station display boards", status: isSent ? "Updated ✓" : "Ready" },
            { icon: <CheckCircle2 size={16} />, label: "GMRC OCC Portal", sublabel: "Official headway records locked", status: isSent ? "Synced ✓" : "Ready" },
          ].map(({ icon, label, sublabel, status }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }}
              className="card-secondary p-3.5 flex items-center gap-3"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: isSent ? "rgba(16,185,129,0.15)" : "rgba(125,155,179,0.12)",
                  color: isSent ? "#10B981" : "#7D9BB3",
                }}
              >
                {icon}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 text-[12px] font-semibold">{label}</p>
                <p className="text-gray-400 text-[10px]">{sublabel}</p>
              </div>
              <span className={isSent ? "pill-low font-bold" : "pill-low"}>{status}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Broadcast button */}
      {selectedEvent && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBroadcast}
          className="px-8 py-3.5 rounded-full text-white font-bold text-[14px] flex items-center gap-2 cursor-pointer shadow-lg"
          style={{
            background: isSent
              ? "linear-gradient(135deg, #10B981, #059669)"
              : "linear-gradient(135deg, #7D9BB3, #4A6A84)",
            boxShadow: isSent
              ? "0 8px 32px rgba(16,185,129,0.40)"
              : "0 8px 32px rgba(100,130,154,0.40)",
          }}
        >
          {isSent ? <CheckCheck size={16} /> : <Radio size={16} />}
          {isSent ? "Re-Broadcast Timetable" : "Broadcast Now"}
        </motion.button>
      )}
    </motion.div>
  );
}

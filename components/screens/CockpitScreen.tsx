"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Zap, ArrowLeft, Activity, TrendingUp, Train, CheckCircle2, Languages } from "lucide-react";
import TopHeader from "@/components/TopHeader";
import CircleButton from "@/components/CircleButton";
import type { CityEvent, Tab } from "@/lib/types";

interface CockpitScreenProps {
  selectedEvent: CityEvent | null;
  onTabChange: (tab: Tab) => void;
}

// ── Headway Timeline SVG Visualizer ──────────────────────────
function HeadwayTimeline({ event }: { event: CityEvent }) {
  const baseCount = 5;
  const injectedCount = event.injectRakeCount;
  const basePositions = Array.from({ length: baseCount }, (_, i) =>
    (i / (baseCount - 1)) * 100
  );
  const injectedPositions = Array.from({ length: injectedCount }, (_, i) =>
    ((i + 0.5) / (baseCount - 1)) * 100
  );

  return (
    <div className="relative w-full" style={{ height: "90px" }}>
      <svg width="100%" height="90" viewBox="0 0 300 90" preserveAspectRatio="xMidYMid meet">
        {/* Timeline track */}
        <line
          x1="10" y1="45" x2="290" y2="45"
          stroke="rgba(0,0,0,0.08)" strokeWidth="2" strokeLinecap="round"
        />

        {/* Injected connection arcs */}
        {injectedPositions.map((pct, i) => {
          const x = 10 + (pct / 100) * 280;
          return (
            <path
              key={`arc-${i}`}
              d={`M ${x - 25} 45 Q ${x} 22 ${x + 25} 45`}
              fill="none"
              stroke="rgba(125,155,179,0.35)"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
          );
        })}

        {/* Base train dots */}
        {basePositions.map((pct, i) => {
          const x = 10 + (pct / 100) * 280;
          return (
            <g key={`base-${i}`}>
              <circle cx={x} cy={45} r={10} fill="white" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
              <text x={x} y={49} textAnchor="middle" fontSize="8" fill="#6B7280" fontWeight="600">
                R
              </text>
            </g>
          );
        })}

        {/* Injected ⚡ train dots */}
        {injectedPositions.map((pct, i) => {
          const x = 10 + (pct / 100) * 280;
          return (
            <motion.g
              key={`inj-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 + 0.4, type: "spring", stiffness: 300 }}
            >
              <circle cx={x} cy={45} r={10} fill="#7D9BB3" />
              <text x={x} y={49} textAnchor="middle" fontSize="9" fill="white" fontWeight="700">
                ⚡
              </text>
            </motion.g>
          );
        })}

        {/* Labels */}
        <text x={10} y={78} fontSize="8" fill="#9CA3AF" textAnchor="middle">
          {event.injectTimeWindowStart}
        </text>
        <text x={290} y={78} fontSize="8" fill="#9CA3AF" textAnchor="middle">
          {event.injectTimeWindowEnd}
        </text>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-0 right-0 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-white border border-gray-200" />
          <span className="text-[10px] text-gray-400">Regular</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#7D9BB3]" />
          <span className="text-[10px] text-gray-400">⚡ Special</span>
        </div>
      </div>
    </div>
  );
}

// ── Stat Chip ─────────────────────────────────────────────────
function StatChip({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card-secondary p-3 flex-1">
      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-gray-900 font-black text-[16px] mt-0.5 leading-none">{value}</p>
      {sub && <p className="text-gray-400 text-[10px] mt-0.5">{sub}</p>}
    </div>
  );
}

export default function CockpitScreen({ selectedEvent, onTabChange }: CockpitScreenProps) {
  if (!selectedEvent) {
    return (
      <motion.div
        key="cockpit-empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#F0F2F5] px-8"
      >
        <div
          className="w-16 h-16 rounded-3xl flex items-center justify-center"
          style={{ background: "rgba(125,155,179,0.12)" }}
        >
          <Zap size={28} className="text-[#7D9BB3]" />
        </div>
        <div className="text-center">
          <h2 className="text-gray-800 font-bold text-lg">No Scenario Selected</h2>
          <p className="text-gray-400 text-sm mt-1">
            Go to Events tab and select a city scenario to open the OCC Cockpit.
          </p>
        </div>
        <button
          onClick={() => onTabChange("scenarios")}
          className="mt-2 px-6 py-2.5 rounded-full text-white font-semibold text-sm cursor-pointer"
          style={{ background: "linear-gradient(135deg, #7D9BB3, #64829A)" }}
        >
          Browse Events →
        </button>
      </motion.div>
    );
  }

  const [isApproved, setIsApproved] = useState(false);
  const [briefLang, setBriefLang] = useState<"en" | "gu">("en");

  const event = selectedEvent;
  const paxFormatted = event.projectedSurgePax.toLocaleString("en-IN");
  const revenueFormatted = `₹${(event.netRevenueGainRs / 1000).toFixed(0)}K`;
  const costFormatted = `₹${(event.additionalElectricityCostRs / 1000).toFixed(0)}K`;

  function handleApprove() {
    setIsApproved(true);
    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#7D9BB3", "#10B981", "#F59E0B", "#FFFFFF"],
      });
    } catch {
      // safe fallback
    }
  }

  return (
    <motion.div
      key={`cockpit-${event.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col bg-[#F0F2F5]"
    >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-[58px] pb-3">
          <div className="flex items-center gap-2">
            <CircleButton
              variant="white"
              size="sm"
              onClick={() => onTabChange("scenarios")}
              aria-label="Go back"
            >
              <ArrowLeft size={14} className="text-gray-700" />
            </CircleButton>
            <div>
              <p className="text-[10px] text-gray-400 font-medium">OCC Injection Cockpit</p>
              <p className="text-gray-900 font-bold text-[14px] leading-tight max-w-[220px] truncate">
                {event.title}
              </p>
            </div>
          </div>
          <span
            className={
              event.impactLevel === "CRITICAL"
                ? "pill-critical"
                : event.impactLevel === "HIGH"
                ? "pill-high"
                : "pill-moderate"
            }
          >
            {event.impactLevel}
          </span>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-28">

          {/* Hero cockpit card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-hero p-5 mb-4"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-white/70 text-[11px] font-medium">Headway Timeline</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-live" />
                <span className="text-white/60 text-[10px]">Live Preview</span>
              </div>
            </div>
            <HeadwayTimeline event={event} />

            {/* Headway change */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-white/70 text-[12px]">Headway:</span>
              <span className="text-white/50 text-[12px] line-through">
                {event.baseHeadwayMin} min
              </span>
              <span className="text-yellow-300 font-bold text-[13px]">
                → {event.injectedHeadwayMin} min
              </span>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="flex gap-2.5 mb-4"
          >
            <StatChip label="Surge Pax" value={`+${paxFormatted}`} sub="vs 5,800 normal" />
            <StatChip label="Net Revenue" value={revenueFormatted} sub="after ops cost" />
            <StatChip label="Extra Rakes" value={`+${event.injectRakeCount}`} sub={costFormatted + " cost"} />
          </motion.div>

          {/* Operator brief card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-secondary p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-[#7D9BB3]" />
                <p className="text-[12px] font-bold text-gray-700">OCC Operator Brief</p>
              </div>
              <div className="flex items-center bg-gray-100 rounded-full p-0.5">
                <button
                  onClick={() => setBriefLang("en")}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    briefLang === "en" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setBriefLang("gu")}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    briefLang === "gu" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400"
                  }`}
                >
                  ગુજરાતી
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-[12px] leading-relaxed">
              {briefLang === "en" ? event.operatorBriefEN : event.operatorBriefGU}
            </p>
            {isApproved && (
              <div className="mt-2.5 pt-2 border-t border-emerald-100 flex items-center gap-1.5 text-emerald-600">
                <CheckCircle2 size={13} />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Approved & Dispatched by GMRC OCC
                </span>
              </div>
            )}
          </motion.div>

          {/* Revenue impact */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="card-secondary p-4 mb-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-emerald-500" />
              <p className="text-[12px] font-bold text-gray-700">Revenue Impact</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-[12px]">Fare Revenue Gain</span>
                <span className="text-emerald-600 font-bold text-[13px]">
                  +₹{event.projectedFareRevenueRs.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-[12px]">Electricity Cost</span>
                <span className="text-red-500 font-bold text-[13px]">
                  −₹{event.additionalElectricityCostRs.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between items-center">
                <span className="text-gray-700 text-[12px] font-semibold">Net Gain</span>
                <span className="text-gray-900 font-black text-[15px]">
                  +₹{event.netRevenueGainRs.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom action capsule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="absolute bottom-20 left-4 right-4 z-40"
        >
          <div
            className="flex items-center justify-between px-4 py-3 rounded-[24px]"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
            }}
          >
            <div>
              <p className="text-[10px] text-gray-400">
                {isApproved ? "Status: Live" : "Schedule Ready"}
              </p>
              <p className="text-gray-900 font-bold text-[13px]">
                {isApproved ? "✓ Active on Line" : `+${event.injectRakeCount} Special Rakes`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CircleButton
                variant="white"
                size="sm"
                aria-label="Preview Timetable"
                onClick={() => onTabChange("timetable")}
              >
                <Train size={13} className="text-gray-600" />
              </CircleButton>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={handleApprove}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white font-bold text-[12px] cursor-pointer"
                style={{
                  background: isApproved
                    ? "linear-gradient(135deg, #059669, #047857)"
                    : "linear-gradient(135deg, #10B981, #059669)",
                  boxShadow: "0 4px 16px rgba(16,185,129,0.4)",
                }}
              >
                {isApproved ? "Approved ✓" : "✓ Approve"}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => onTabChange("broadcast")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white font-bold text-[12px] cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #7D9BB3, #64829A)",
                  boxShadow: "0 4px 16px rgba(100,130,154,0.4)",
                }}
              >
                📡 Broadcast
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
  );
}

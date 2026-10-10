"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Train, Zap, MapPin, Activity, ShieldAlert, ArrowRight, Layers, Navigation, Compass, AlertCircle, CheckCircle2 } from "lucide-react";
import TopHeader from "@/components/TopHeader";
import type { CityEvent } from "@/lib/types";

interface MapScreenProps {
  selectedEvent: CityEvent | null;
}

interface StationNode {
  id: string;
  name: string;
  nameGU: string;
  code: string;
  x: number;
  y: number;
  type: "Interchange" | "Junction" | "Underground" | "Elevated" | "Terminus";
  loadPct: number;
  safeCapacity: number;
  currentPax: number;
  depot: string;
  isSpecialStop?: boolean;
}

const STATIONS: StationNode[] = [
  {
    id: "motera",
    name: "Motera Stadium",
    nameGU: "મોટેરા સ્ટેડિયમ",
    code: "MTR",
    x: 75,
    y: 385,
    type: "Interchange",
    loadPct: 92,
    safeCapacity: 2000,
    currentPax: 1840,
    depot: "Sabarmati Siding 3",
    isSpecialStop: true,
  },
  {
    id: "koba",
    name: "Koba Circle",
    nameGU: "કોબા સર્કલ",
    code: "KOB",
    x: 145,
    y: 285,
    type: "Junction",
    loadPct: 68,
    safeCapacity: 1600,
    currentPax: 1088,
    depot: "Sabarmati Main",
    isSpecialStop: true,
  },
  {
    id: "gnlu",
    name: "GNLU",
    nameGU: "જીએનએલયુ",
    code: "GNLU",
    x: 235,
    y: 275,
    type: "Elevated",
    loadPct: 42,
    safeCapacity: 1200,
    currentPax: 504,
    depot: "Apparel Park",
  },
  {
    id: "gift",
    name: "GIFT City",
    nameGU: "ગિફ્ટ સિટી",
    code: "GFT",
    x: 315,
    y: 265,
    type: "Terminus",
    loadPct: 52,
    safeCapacity: 1800,
    currentPax: 936,
    depot: "GIFT Stabling Yard",
    isSpecialStop: true,
  },
  {
    id: "infocity",
    name: "Infocity Gandhinagar",
    nameGU: "ઇન્ફોસિટી",
    code: "INF",
    x: 145,
    y: 195,
    type: "Underground",
    loadPct: 38,
    safeCapacity: 1400,
    currentPax: 532,
    depot: "Gyaspur",
  },
  {
    id: "sec1",
    name: "Sector 1 Gandhinagar",
    nameGU: "સેક્ટર ૧",
    code: "SEC1",
    x: 165,
    y: 125,
    type: "Elevated",
    loadPct: 29,
    safeCapacity: 1100,
    currentPax: 319,
    depot: "Gyaspur",
  },
  {
    id: "mm",
    name: "Mahatma Mandir",
    nameGU: "મહાત્મા મંદિર",
    code: "MM",
    x: 160,
    y: 65,
    type: "Terminus",
    loadPct: 24,
    safeCapacity: 1500,
    currentPax: 360,
    depot: "Sector 24 Yard",
  },
];

export default function MapScreen({ selectedEvent }: MapScreenProps) {
  const [selectedStation, setSelectedStation] = useState<StationNode>(STATIONS[0]);
  const [activeLayer, setActiveLayer] = useState<"all" | "special" | "heatmap">("all");
  const [speedVal, setSpeedVal] = useState(64);

  // Dynamic speed oscillation for realism
  useEffect(() => {
    const timer = setInterval(() => {
      setSpeedVal((prev) => 60 + Math.floor(Math.sin(Date.now() / 2000) * 8));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const isIpl = selectedEvent?.id?.includes("ipl");

  return (
    <motion.div
      key="map"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col bg-[#F0F2F5]"
    >
      <TopHeader />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-28">
        {/* Title & Live Status */}
        <div className="mb-2 mt-1 flex items-center justify-between">
          <div>
            <p className="heading-label">Corridor Live Radar</p>
            <h1 className="heading-title">Metro Track Map</h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-xs border border-gray-100 text-[10px] font-bold text-gray-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-live" />
              OFFLINE VECTOR
            </span>
            <span className="text-[9px] text-gray-400 mt-0.5">Sabarmati OCC Telemetry</span>
          </div>
        </div>

        {/* Layer Mode Filters */}
        <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto no-scrollbar">
          {[
            { id: "all", label: "🚇 Full Network" },
            { id: "special", label: "⚡ Injected Special Corridor" },
            { id: "heatmap", label: "🔥 Platform Heatmap" },
          ].map((tab) => {
            const isActive = activeLayer === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLayer(tab.id as typeof activeLayer)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #7D9BB3, #64829A)"
                    : "rgba(255,255,255,0.9)",
                  color: isActive ? "white" : "#6B7280",
                  boxShadow: isActive ? "0 2px 8px rgba(100,130,154,0.3)" : "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Map Canvas Frame */}
        <div className="card-secondary p-3 mb-3 relative overflow-hidden bg-[#F8FAFC] shadow-sm border border-gray-200/80 rounded-3xl">
          {/* Subtle Grid + Compass */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Compass Rose Badge */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-xs border border-gray-200/60 shadow-xs text-[10px] font-bold text-gray-600">
            <Compass size={12} className="text-[#7D9BB3]" />
            <span>N</span>
          </div>

          {/* Scale Indicator */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-xs border border-gray-200/60 shadow-xs text-[9px] font-bold text-gray-500">
            <div className="w-5 h-0.5 bg-gray-400" />
            <span>2.5 km</span>
          </div>

          {/* SVG Map Engine */}
          <svg viewBox="0 0 360 440" className="w-full h-[340px] select-none">
            <defs>
              {/* Blue Glow Filter for Active Trains */}
              <filter id="glow-train" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              {/* Amber Glow for Special Train */}
              <filter id="glow-amber" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Geographical Feature: Sabarmati River Corridor */}
            <path
              d="M 25 440 C 35 340, 60 260, 95 190 C 115 140, 125 70, 115 0"
              fill="none"
              stroke="#DDEAF8"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M 25 440 C 35 340, 60 260, 95 190 C 115 140, 125 70, 115 0"
              fill="none"
              stroke="#CFE2F7"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <text x="35" y="240" fill="#93C5FD" fontSize="8" fontWeight="700" transform="rotate(-68 35 240)">
              Sabarmati River • સાબરમતી નદી
            </text>

            {/* Highway / SP Ring Road Outline */}
            <path
              d="M 0 310 Q 180 300 360 305"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="3"
              strokeDasharray="6 6"
            />
            <text x="270" y="320" fill="#94A3B8" fontSize="7" fontWeight="600">
              SP Ring Road
            </text>

            {/* Metro Track Casing (Dark Roadbed) */}
            <path
              d="M 75 385 Q 105 325 145 285 L 145 195 Q 150 155 165 125 L 160 65"
              fill="none"
              stroke="#1E293B"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* North-South Line Core (Blue Line) */}
            <path
              d="M 75 385 Q 105 325 145 285 L 145 195 Q 150 155 165 125 L 160 65"
              fill="none"
              stroke="#2563EB"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* GIFT City Spur Branch Casing */}
            <path
              d="M 145 285 Q 195 280 235 275 L 315 265"
              fill="none"
              stroke="#1E293B"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* GIFT City Spur Core (Green Line) */}
            <path
              d="M 145 285 Q 195 280 235 275 L 315 265"
              fill="none"
              stroke="#10B981"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Injected Special Bypass Route (Golden Dashed Arc) */}
            {(selectedEvent || activeLayer === "special") && (
              <g>
                <path
                  d="M 60 385 Q 110 295 145 285 Q 210 270 315 265"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  filter="url(#glow-amber)"
                />
                <text x="90" y="315" fill="#D97706" fontSize="8" fontWeight="800">
                  ⚡ Special Injection Headway Track
                </text>
              </g>
            )}

            {/* MOVING TRAINS (Realistic Sleek Capsules) */}

            {/* Train 1: Regular Service Northbound */}
            {activeLayer !== "special" && (
              <motion.g
                animate={{
                  x: [0, 35, 70, 70, 85, 80, 0],
                  y: [0, -45, -95, -185, -255, -315, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                {/* Train Carriage Capsule */}
                <rect x="62" y="377" width="26" height="15" rx="7.5" fill="#1E293B" stroke="white" strokeWidth="2" filter="url(#glow-train)" />
                <circle cx="83" cy="384.5" r="2" fill="#60A5FA" />
                {/* Telemetry pill */}
                <rect x="52" y="361" width="46" height="13" rx="4" fill="#0F172A" />
                <text x="75" y="370" fontSize="7.5" fill="#FFFFFF" textAnchor="middle" fontWeight="800">
                  REG-01 • {speedVal}km/h
                </text>
              </motion.g>
            )}

            {/* Train 2: GIFT City Spur Branch Regular Service */}
            {activeLayer !== "special" && (
              <motion.g
                animate={{
                  x: [0, 85, 165, 0],
                  y: [0, -10, -20, 0],
                }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              >
                <rect x="135" y="277" width="24" height="14" rx="7" fill="#065F46" stroke="white" strokeWidth="2" />
                <circle cx="154" cy="284" r="2" fill="#34D399" />
                <rect x="127" y="262" width="40" height="12" rx="4" fill="#065F46" />
                <text x="147" y="271" fontSize="7" fill="#FFFFFF" textAnchor="middle" fontWeight="800">
                  GIFT-02
                </text>
              </motion.g>
            )}

            {/* Train 3: ⚡ INJECTED SPECIAL RAKE (Motera ➔ Koba ➔ GIFT City) */}
            <motion.g
              animate={{
                x: [0, 70, 0],
                y: [0, -100, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Golden Glowing Special Rake */}
              <rect x="60" y="375" width="30" height="17" rx="8.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#glow-amber)" />
              <text x="75" y="386.5" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="900">
                ⚡SPL
              </text>
              {/* Telemetry label */}
              <rect x="42" y="356" width="66" height="15" rx="5" fill="#D97706" />
              <text x="75" y="367" fontSize="7.5" fill="#FFFFFF" textAnchor="middle" fontWeight="900">
                ⚡ SPECIAL-04 (Sabarmati)
              </text>
            </motion.g>

            {/* STATIONS (Interactive Metro Nodes) */}
            {STATIONS.map((station) => {
              const isSelected = selectedStation.id === station.id;
              const isMotera = station.id === "motera";
              const isSurge = isMotera && (isIpl || station.loadPct > 80);

              return (
                <g
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className="cursor-pointer"
                >
                  {/* Heatmap Area Halo */}
                  {activeLayer === "heatmap" && (
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={station.loadPct > 80 ? "32" : station.loadPct > 50 ? "24" : "18"}
                      fill={station.loadPct > 80 ? "rgba(239,68,68,0.22)" : station.loadPct > 50 ? "rgba(245,158,11,0.20)" : "rgba(16,185,129,0.18)"}
                    />
                  )}

                  {/* Pulsing Radar Ring on Surge Station */}
                  {isSurge && (
                    <motion.circle
                      cx={station.x}
                      cy={station.y}
                      r="20"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2.5"
                      animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}

                  {/* Station Outer Ring */}
                  <circle
                    cx={station.x}
                    cy={station.y}
                    r={isSelected ? 10 : 7.5}
                    fill="#FFFFFF"
                    stroke={
                      isSurge
                        ? "#EF4444"
                        : isSelected
                        ? "#7D9BB3"
                        : station.type === "Interchange" || station.type === "Junction"
                        ? "#1E293B"
                        : "#475569"
                    }
                    strokeWidth={isSelected ? 4 : 2.5}
                  />

                  {/* Interchange double bullseye */}
                  {(station.type === "Interchange" || station.type === "Junction") && (
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? 4.5 : 3}
                      fill={isSurge ? "#EF4444" : "#1E293B"}
                    />
                  )}

                  {/* Station Label Badge */}
                  <g transform={`translate(${station.x + 13}, ${station.y - 8})`}>
                    <rect
                      x="0"
                      y="0"
                      width={station.name.length * 6.2 + (station.loadPct > 80 ? 36 : 14)}
                      height="17"
                      rx="8.5"
                      fill={isSelected ? "#1E293B" : "rgba(255,255,255,0.92)"}
                      stroke={isSelected ? "#1E293B" : "rgba(0,0,0,0.08)"}
                      strokeWidth="1"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
                    />
                    <text
                      x="7"
                      y="12"
                      fontSize="9"
                      fontWeight={isSelected ? "800" : "700"}
                      fill={isSelected ? "#FFFFFF" : "#1F2937"}
                    >
                      {station.name}
                    </text>
                    {/* Live % tag on badge */}
                    {station.loadPct > 80 && (
                      <text
                        x={station.name.length * 6.2 + 8}
                        y="12"
                        fontSize="8"
                        fontWeight="900"
                        fill="#EF4444"
                      >
                        {station.loadPct}%
                      </text>
                    )}
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Map Footer Bar */}
          <div className="flex items-center justify-between pt-2.5 border-t border-gray-200/80 text-[10px] text-gray-600 font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> North-South Line
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> GIFT City Spur
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> ⚡ Injected Rake
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> Surge
            </span>
          </div>
        </div>

        {/* Selected Station Telemetry Inspector */}
        <div className="card-secondary p-4 bg-white shadow-sm border border-gray-100 rounded-3xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-[#7D9BB3] uppercase tracking-wider">
                  Platform Telemetry
                </span>
                <span className="text-[10px] text-gray-400">• {selectedStation.nameGU}</span>
              </div>
              <h3 className="text-gray-900 font-extrabold text-base leading-tight mt-0.5">
                {selectedStation.name} ({selectedStation.code})
              </h3>
            </div>
            <div className="text-right">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide inline-block ${
                  selectedStation.loadPct > 80
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : selectedStation.loadPct > 50
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                {selectedStation.loadPct}% Crowd Density
              </span>
            </div>
          </div>

          {/* Crowd Capacity Progress Bar */}
          <div className="mb-3.5">
            <div className="flex justify-between text-[11px] font-semibold text-gray-600 mb-1">
              <span>Current Platform Load:</span>
              <span className="font-bold text-gray-800">
                {selectedStation.currentPax.toLocaleString()} / {selectedStation.safeCapacity.toLocaleString()} pax
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${selectedStation.loadPct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background:
                    selectedStation.loadPct > 80
                      ? "linear-gradient(90deg, #F59E0B, #EF4444)"
                      : selectedStation.loadPct > 50
                      ? "linear-gradient(90deg, #10B981, #F59E0B)"
                      : "linear-gradient(90deg, #3B82F6, #10B981)",
                }}
              />
            </div>
          </div>

          {/* Operational Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-medium">Station Type</p>
              <p className="text-xs font-extrabold text-gray-800 mt-0.5">{selectedStation.type}</p>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-medium">Headway Target</p>
              <p className="text-xs font-extrabold text-[#7D9BB3] mt-0.5">
                {selectedEvent && (selectedStation.id === "motera" || selectedStation.id === "koba")
                  ? `${selectedEvent.injectedHeadwayMin}m ⚡`
                  : "8.0 min"}
              </p>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 font-medium">Assigned Depot</p>
              <p className="text-xs font-extrabold text-gray-800 mt-0.5 truncate">{selectedStation.depot}</p>
            </div>
          </div>

          {/* Real-time Subsystem Status */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={13} className="text-emerald-500" />
              Turnstile Flow: 142 pax/min
            </span>
            <span className="flex items-center gap-1 font-semibold text-[#7D9BB3]">
              Next Train: ~2m (⚡ SPL-04)
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

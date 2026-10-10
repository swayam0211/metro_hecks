"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Train, Zap, MapPin, Activity, ShieldAlert, ArrowRight } from "lucide-react";
import TopHeader from "@/components/TopHeader";
import type { CityEvent } from "@/lib/types";

interface MapScreenProps {
  selectedEvent: CityEvent | null;
}

interface StationNode {
  id: string;
  name: string;
  code: string;
  x: number;
  y: number;
  type: string;
  loadPct: number;
  isImpacted?: boolean;
}

const STATIONS: StationNode[] = [
  { id: "motera", name: "Motera Stadium", code: "MTR", x: 60, y: 380, type: "Interchange", loadPct: 92, isImpacted: true },
  { id: "koba", name: "Koba Circle", code: "KOB", x: 140, y: 280, type: "Junction", loadPct: 65, isImpacted: true },
  { id: "gnlu", name: "GNLU", code: "GNLU", x: 230, y: 270, type: "Elevated", loadPct: 40 },
  { id: "gift", name: "GIFT City", code: "GFT", x: 310, y: 260, type: "Terminus", loadPct: 48 },
  { id: "infocity", name: "Infocity Gandhinagar", code: "INF", x: 140, y: 190, type: "Underground", loadPct: 35 },
  { id: "sec1", name: "Sector 1", code: "SEC1", x: 160, y: 120, type: "Elevated", loadPct: 28 },
  { id: "mm", name: "Mahatma Mandir", code: "MM", x: 155, y: 60, type: "Terminus", loadPct: 22 },
];

export default function MapScreen({ selectedEvent }: MapScreenProps) {
  const [selectedStation, setSelectedStation] = useState<StationNode>(STATIONS[0]);

  // Adjust surge based on selected event
  const isIpl = selectedEvent?.id?.includes("ipl");
  const isGpsc = selectedEvent?.id?.includes("gpsc");

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
        {/* Title */}
        <div className="mb-2 mt-1 flex items-center justify-between">
          <div>
            <p className="heading-label">Ahmedabad–Gandhinagar</p>
            <h1 className="heading-title">Corridor Map</h1>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-sm border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-live" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
              Offline SVG
            </span>
          </div>
        </div>

        {/* Map Canvas Card */}
        <div className="card-secondary p-3 mb-3 relative overflow-hidden bg-white/90 shadow-sm border border-gray-100 rounded-3xl">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#7D9BB3 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <svg viewBox="0 0 360 420" className="w-full h-[320px] select-none">
            {/* North-South Line */}
            <path
              d="M 60 380 Q 90 320 140 280 L 140 190 Q 145 150 160 120 L 155 60"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* GIFT City Spur Line */}
            <path
              d="M 140 280 Q 190 275 230 270 L 310 260"
              fill="none"
              stroke="#10B981"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Injected special train bypass arc */}
            {selectedEvent && (
              <path
                d="M 50 380 Q 100 290 140 280"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
            )}

            {/* Animated train blips */}
            {/* Base Train 1 */}
            <motion.g
              animate={{
                x: [0, 40, 80, 0],
                y: [0, -50, -100, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="60" cy="380" r="6" fill="#1E293B" stroke="white" strokeWidth="2" />
              <text x="60" y="370" fontSize="8" fill="#1E293B" textAnchor="middle" fontWeight="700">
                REG-01
              </text>
            </motion.g>

            {/* Base Train 2 (GIFT Spur) */}
            <motion.g
              animate={{
                x: [0, 90, 170, 0],
                y: [0, -10, -20, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="140" cy="280" r="6" fill="#10B981" stroke="white" strokeWidth="2" />
              <text x="140" y="270" fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="700">
                REG-02
              </text>
            </motion.g>

            {/* ⚡ Special Injected Rake Blip */}
            {selectedEvent && (
              <motion.g
                animate={{
                  x: [0, 80, 0],
                  y: [0, -100, 0],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle cx="60" cy="380" r="8" fill="#7D9BB3" stroke="#F59E0B" strokeWidth="2.5" />
                <text x="60" y="366" fontSize="9" fill="#7D9BB3" textAnchor="middle" fontWeight="900">
                  ⚡ SPL-01
                </text>
              </motion.g>
            )}

            {/* Stations */}
            {STATIONS.map((station) => {
              const isSelected = selectedStation.id === station.id;
              const isMotera = station.id === "motera";
              const isSurge = isMotera && isIpl;

              return (
                <g
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className="cursor-pointer"
                >
                  {/* Pulse ring for surge station */}
                  {(isSurge || station.loadPct > 80) && (
                    <motion.circle
                      cx={station.x}
                      cy={station.y}
                      r="16"
                      fill="none"
                      stroke={isSurge ? "#EF4444" : "#F59E0B"}
                      strokeWidth="2"
                      animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}

                  {/* Station node dot */}
                  <circle
                    cx={station.x}
                    cy={station.y}
                    r={isSelected ? 9 : 6}
                    fill={isSurge ? "#EF4444" : isSelected ? "#7D9BB3" : "white"}
                    stroke="#1E293B"
                    strokeWidth="2.5"
                  />

                  {/* Station label */}
                  <text
                    x={station.x + 12}
                    y={station.y + 4}
                    fontSize={isSelected ? "11" : "10"}
                    fontWeight={isSelected ? "800" : "600"}
                    fill={isSelected ? "#111827" : "#4B5563"}
                  >
                    {station.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map legend */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" /> North-South Line
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> GIFT City Spur
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Critical Surge
            </span>
          </div>
        </div>

        {/* Selected Station Inspector */}
        <div className="card-secondary p-4 bg-white shadow-sm border border-gray-100 rounded-3xl">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Platform Inspector
              </p>
              <h3 className="text-gray-900 font-bold text-sm">
                {selectedStation.name} ({selectedStation.code})
              </h3>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                selectedStation.loadPct > 80
                  ? "bg-red-100 text-red-600"
                  : selectedStation.loadPct > 50
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {selectedStation.loadPct}% Crowd Load
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100 text-center">
            <div className="bg-gray-50 p-2 rounded-2xl">
              <p className="text-[10px] text-gray-400">Station Type</p>
              <p className="text-xs font-bold text-gray-700 mt-0.5">{selectedStation.type}</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-2xl">
              <p className="text-[10px] text-gray-400">Headway</p>
              <p className="text-xs font-bold text-[#7D9BB3] mt-0.5">
                {selectedEvent && selectedStation.id === "motera"
                  ? `${selectedEvent.injectedHeadwayMin}m ⚡`
                  : "8.0 min"}
              </p>
            </div>
            <div className="bg-gray-50 p-2 rounded-2xl">
              <p className="text-[10px] text-gray-400">Depot Access</p>
              <p className="text-xs font-bold text-gray-700 mt-0.5">Sabarmati</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

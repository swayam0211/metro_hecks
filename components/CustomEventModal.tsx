"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Train, Users, MapPin, Zap } from "lucide-react";
import type { CityEvent } from "@/lib/types";

interface CustomEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: CityEvent) => void;
}

export default function CustomEventModal({
  isOpen,
  onClose,
  onAddEvent,
}: CustomEventModalProps) {
  const [title, setTitle] = useState("Coldplay Music Concert");
  const [station, setStation] = useState("Motera Stadium");
  const [expectedPax, setExpectedPax] = useState("45000");
  const [type, setType] = useState<CityEvent["type"]>("Event");

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pax = parseInt(expectedPax, 10) || 20000;
    const rakes = Math.min(8, Math.max(1, Math.ceil(pax / 7000)));
    const revenue = pax * 10;
    const cost = rakes * 11000;

    const newEvent: CityEvent = {
      id: `custom-${Date.now()}`,
      title,
      type,
      icon: "Zap",
      impactLevel: pax > 30000 ? "CRITICAL" : pax > 15000 ? "HIGH" : "MODERATE",
      date: "2026-10-15",
      timeStart: "19:00",
      timeEnd: "23:30",
      primaryStation: station,
      secondaryStations: ["Koba Circle"],
      projectedSurgePax: pax,
      normalDayPax: 5800,
      surgeMultiplier: Number((pax / 5800).toFixed(2)),
      injectRakeCount: rakes,
      injectTimeWindowStart: "21:30",
      injectTimeWindowEnd: "23:45",
      baseHeadwayMin: 8,
      injectedHeadwayMin: Number((8 / (rakes + 1)).toFixed(1)),
      additionalElectricityCostRs: cost,
      projectedFareRevenueRs: revenue,
      netRevenueGainRs: revenue - cost,
      operatorBriefEN: `${title} at ${station}. Injecting ${rakes} supplementary train rakes to handle ~${pax.toLocaleString()} surge commuters.`,
      operatorBriefGU: `${station} ખાતે ${title}. ${rakes} વધારાની ટ્રેન રેક દોડાવવામાં આવશે.`,
      sponsorEligible: true,
      sponsor: "Live Entertainment Org",
    };

    onAddEvent(newEvent);
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-sm rounded-[32px] bg-white p-6 shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#7D9BB3]/20 flex items-center justify-center text-[#7D9BB3]">
                <Sparkles size={16} />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Inject Custom Event</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                Event Scenario Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full mt-1 px-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 outline-none focus:border-[#7D9BB3]"
                placeholder="e.g. Concert, Tech Summit"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                  Primary Station
                </label>
                <select
                  value={station}
                  onChange={(e) => setStation(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 outline-none"
                >
                  <option value="Motera Stadium">Motera Stadium</option>
                  <option value="Infocity">Infocity Gandhinagar</option>
                  <option value="GIFT City">GIFT City</option>
                  <option value="Koba Circle">Koba Circle</option>
                  <option value="Kalupur">Kalupur Junction</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                  Expected Crowd
                </label>
                <input
                  type="number"
                  value={expectedPax}
                  onChange={(e) => setExpectedPax(e.target.value)}
                  required
                  className="w-full mt-1 px-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 outline-none"
                  placeholder="45000"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                Scenario Category
              </label>
              <div className="flex gap-1.5 mt-1 overflow-x-auto no-scrollbar py-0.5">
                {(["Event", "Sports", "Education", "Weather", "Strike"] as const).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setType(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      type === cat
                        ? "bg-[#7D9BB3] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              style={{
                background: "linear-gradient(135deg, #7D9BB3, #64829A)",
                boxShadow: "0 4px 16px rgba(100,130,154,0.35)",
              }}
            >
              <Zap size={16} />
              Calculate & Inject Rakes
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

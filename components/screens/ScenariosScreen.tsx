"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TopHeader from "@/components/TopHeader";
import ScenarioCard from "@/components/ScenarioCard";
import CircleButton from "@/components/CircleButton";
import CustomEventModal from "@/components/CustomEventModal";
import type { CityEvent, Tab } from "@/lib/types";
import { Plus, SlidersHorizontal } from "lucide-react";

// ── Inline mock data (Phase 2 will load from city_events_feed.json) ──
const MOCK_EVENTS: CityEvent[] = [
  {
    id: "ipl-motera-001",
    title: "IPL Match: GT vs MI at Narendra Modi Stadium",
    type: "Sports",
    icon: "Trophy",
    impactLevel: "CRITICAL",
    date: "2026-10-12",
    timeStart: "18:30",
    timeEnd: "23:15",
    primaryStation: "Motera Stadium",
    secondaryStations: ["Koba Circle"],
    projectedSurgePax: 22400,
    normalDayPax: 5800,
    surgeMultiplier: 3.86,
    injectRakeCount: 4,
    injectTimeWindowStart: "22:00",
    injectTimeWindowEnd: "23:45",
    baseHeadwayMin: 8,
    injectedHeadwayMin: 3.2,
    additionalElectricityCostRs: 44000,
    projectedFareRevenueRs: 224000,
    netRevenueGainRs: 180000,
    operatorBriefEN: "IPL Match at Narendra Modi Stadium. Deploy 4 reserve rakes between 22:00–23:45.",
    operatorBriefGU: "નરેન્દ્ર મોદી સ્ટેડિયમ ખાતે IPL મેચ. 4 ટ્રેન રેક ઉમેરાશે.",
    sponsorEligible: true,
    sponsor: "BCCI",
  },
  {
    id: "gpsc-exam-001",
    title: "GPSC Civil Services Prelims",
    type: "Education",
    icon: "GraduationCap",
    impactLevel: "HIGH",
    date: "2026-10-13",
    timeStart: "07:00",
    timeEnd: "13:00",
    primaryStation: "Infocity",
    secondaryStations: ["GNLU", "Koba Circle"],
    projectedSurgePax: 8200,
    normalDayPax: 2400,
    surgeMultiplier: 3.42,
    injectRakeCount: 3,
    injectTimeWindowStart: "06:00",
    injectTimeWindowEnd: "09:00",
    baseHeadwayMin: 10,
    injectedHeadwayMin: 4.0,
    additionalElectricityCostRs: 22000,
    projectedFareRevenueRs: 82000,
    netRevenueGainRs: 60000,
    operatorBriefEN: "GPSC Prelims at GNLU. 35,000 candidates expected. 3 special rakes from Sabarmati depot.",
    operatorBriefGU: "GPSC પ્રારંભિક પરીક્ષા. 35,000 ઉમેદવારો. 3 ટ્રેન ઉમેરાશે.",
    sponsorEligible: false,
  },
  {
    id: "monsoon-storm-001",
    title: "IMD Red Alert: Heavy Monsoon Storm",
    type: "Weather",
    icon: "CloudRain",
    impactLevel: "MODERATE",
    date: "2026-10-14",
    timeStart: "09:00",
    timeEnd: "18:00",
    primaryStation: "Vastral Gam",
    secondaryStations: ["Old High Court", "Kalupur"],
    projectedSurgePax: 14000,
    normalDayPax: 6200,
    surgeMultiplier: 2.26,
    injectRakeCount: 2,
    injectTimeWindowStart: "08:00",
    injectTimeWindowEnd: "20:00",
    baseHeadwayMin: 8,
    injectedHeadwayMin: 5.0,
    additionalElectricityCostRs: 18000,
    projectedFareRevenueRs: 126000,
    netRevenueGainRs: 108000,
    operatorBriefEN: "Red Alert storm: road transport disruption expected. 2 rakes to be deployed city-wide.",
    operatorBriefGU: "રેડ એલર્ટ: ભારે વરસાદ. 2 ટ્રેન ઉમેરાશે.",
    sponsorEligible: false,
  },
  {
    id: "vibrant-gujarat-001",
    title: "Vibrant Gujarat Global Summit",
    type: "Event",
    icon: "Building2",
    impactLevel: "MODERATE",
    date: "2026-10-15",
    timeStart: "08:00",
    timeEnd: "20:00",
    primaryStation: "GIFT City",
    secondaryStations: ["Infocity", "Koba Circle"],
    projectedSurgePax: 6500,
    normalDayPax: 3100,
    surgeMultiplier: 2.10,
    injectRakeCount: 2,
    injectTimeWindowStart: "07:30",
    injectTimeWindowEnd: "21:00",
    baseHeadwayMin: 8,
    injectedHeadwayMin: 5.5,
    additionalElectricityCostRs: 16000,
    projectedFareRevenueRs: 65000,
    netRevenueGainRs: 49000,
    operatorBriefEN: "Vibrant Gujarat Summit at GIFT City. Business delegates, VIP security considerations.",
    operatorBriefGU: "GIFT City ખાતે વાઇબ્રન્ટ ગુજરાત સમિટ. VIP સુરક્ષા.",
    sponsorEligible: true,
    sponsor: "Government of Gujarat",
  },
  {
    id: "bus-strike-001",
    title: "AMTS Bus Strike (City-wide)",
    type: "Strike",
    icon: "Bus",
    impactLevel: "LOW",
    date: "2026-10-16",
    timeStart: "06:00",
    timeEnd: "22:00",
    primaryStation: "Kalupur",
    secondaryStations: ["Old High Court", "Vastral Gam"],
    projectedSurgePax: 9800,
    normalDayPax: 5400,
    surgeMultiplier: 1.81,
    injectRakeCount: 1,
    injectTimeWindowStart: "07:00",
    injectTimeWindowEnd: "10:00",
    baseHeadwayMin: 8,
    injectedHeadwayMin: 6.0,
    additionalElectricityCostRs: 11000,
    projectedFareRevenueRs: 88000,
    netRevenueGainRs: 77000,
    operatorBriefEN: "AMTS strike: Metro is the only mass transit today. Morning rush reinforcement needed.",
    operatorBriefGU: "AMTS હડતાળ. સવારમાં 1 ટ્રેન ઉમેરાશે.",
    sponsorEligible: false,
  },
];

interface ScenariosScreenProps {
  onSelectEvent: (event: CityEvent) => void;
  onTabChange: (tab: Tab) => void;
}

export default function ScenariosScreen({ onSelectEvent, onTabChange }: ScenariosScreenProps) {
  const [events, setEvents] = useState<CityEvent[]>(MOCK_EVENTS);
  const [category, setCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents = category === "All"
    ? events
    : events.filter((e) => e.type === category);

  const heroEvents = filteredEvents.filter(
    (e) => e.impactLevel === "CRITICAL" || e.impactLevel === "HIGH"
  );
  const secondaryEvents = filteredEvents.filter(
    (e) => e.impactLevel === "MODERATE" || e.impactLevel === "LOW"
  );

  function handleSelect(event: CityEvent) {
    onSelectEvent(event);
    onTabChange("cockpit");
  }

  function handleAddEvent(newEvent: CityEvent) {
    setEvents((prev) => [newEvent, ...prev]);
    onSelectEvent(newEvent);
    onTabChange("cockpit");
  }

  const CATEGORIES = [
    { id: "All", label: "All" },
    { id: "Sports", label: "Sports 🏏" },
    { id: "Education", label: "Exams 🎓" },
    { id: "Weather", label: "Monsoon 🌧️" },
    { id: "Event", label: "Summits 🏛️" },
    { id: "Strike", label: "Strikes 🚌" },
  ];

  return (
    <motion.div
      key="scenarios"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute inset-0 flex flex-col"
    >
      <TopHeader />

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-28">

        {/* Heading */}
        <div className="mb-3 mt-1">
          <p className="heading-label">Select Tomorrow&apos;s</p>
          <h1 className="heading-title">City Scenario</h1>
        </div>

        {/* Online/Offline Status Pill */}
        <div className="flex items-center gap-1.5 mb-3.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-live" />
          <span className="text-[11px] text-gray-500 font-medium">
            Live City Radar • Ahmedabad-Gandhinagar Corridor
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-2">
          {CATEGORIES.map((cat) => {
            const isCatActive = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer"
                style={{
                  background: isCatActive
                    ? "linear-gradient(135deg, #7D9BB3, #64829A)"
                    : "rgba(255,255,255,0.9)",
                  color: isCatActive ? "white" : "#6B7280",
                  boxShadow: isCatActive ? "0 4px 12px rgba(100,130,154,0.3)" : "none",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Hero cards */}
        {heroEvents.length > 0 && (
          <div className="flex flex-col gap-3 mb-4">
            {heroEvents.map((event, i) => (
              <ScenarioCard
                key={event.id}
                event={event}
                variant="hero"
                onSelect={handleSelect}
                index={i}
              />
            ))}
          </div>
        )}

        {/* Secondary section label */}
        {secondaryEvents.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-[13px] font-bold text-gray-700">
                {category === "All" ? "Other Scenarios" : `${category} Scenarios`}
              </h2>
              <span className="text-[11px] text-[#7D9BB3] font-semibold">
                {secondaryEvents.length} scenarios
              </span>
            </div>

            {/* Secondary cards */}
            <div className="flex flex-col gap-2.5 mb-4">
              {secondaryEvents.map((event, i) => (
                <ScenarioCard
                  key={event.id}
                  event={event}
                  variant="secondary"
                  onSelect={handleSelect}
                  index={i}
                />
              ))}
            </div>
          </>
        )}

        {/* Normal Tuesday baseline card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-secondary p-4 flex items-center gap-3 cursor-pointer hover:border-gray-300"
          style={{ opacity: 0.85 }}
          onClick={() => {
            const baselineEvent: CityEvent = {
              id: "normal-tuesday",
              title: "Normal Tuesday (Baseline)",
              type: "Event",
              icon: "Train",
              impactLevel: "LOW",
              date: "2026-10-14",
              timeStart: "06:00",
              timeEnd: "22:00",
              primaryStation: "Motera Stadium",
              secondaryStations: ["Infocity", "GIFT City"],
              projectedSurgePax: 0,
              normalDayPax: 5800,
              surgeMultiplier: 1.0,
              injectRakeCount: 0,
              injectTimeWindowStart: "08:00",
              injectTimeWindowEnd: "10:00",
              baseHeadwayMin: 8,
              injectedHeadwayMin: 8,
              additionalElectricityCostRs: 0,
              projectedFareRevenueRs: 0,
              netRevenueGainRs: 0,
              operatorBriefEN: "Baseline operations: Standard 8-minute headway with 0 injected rakes.",
              operatorBriefGU: "સામાન્ય દિનચર્યા: 0 વધારાની ટ્રેન.",
              sponsorEligible: false,
            };
            handleSelect(baselineEvent);
          }}
        >
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gray-100">
            <span className="text-lg">📅</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
              Baseline Comparison
            </p>
            <p className="text-gray-700 text-[13px] font-semibold">
              Normal Tuesday — No Injections
            </p>
            <p className="text-gray-400 text-[11px]">
              5,800 pax • 8-min headway • Baseline schedule
            </p>
          </div>
        </motion.div>
      </div>

      {/* FAB — Add custom event */}
      <div className="absolute bottom-24 right-5 z-40">
        <CircleButton
          variant="slate"
          size="lg"
          glow
          aria-label="Add Custom Event"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={22} />
        </CircleButton>
      </div>

      {/* Custom Event Bottom Sheet Modal */}
      <CustomEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </motion.div>
  );
}

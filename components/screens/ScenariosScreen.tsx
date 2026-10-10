"use client";

import { motion } from "framer-motion";
import TopHeader from "@/components/TopHeader";
import ScenarioCard from "@/components/ScenarioCard";
import CircleButton from "@/components/CircleButton";
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
  const heroEvents = MOCK_EVENTS.filter(
    (e) => e.impactLevel === "CRITICAL" || e.impactLevel === "HIGH"
  );
  const secondaryEvents = MOCK_EVENTS.filter(
    (e) => e.impactLevel === "MODERATE" || e.impactLevel === "LOW"
  );

  function handleSelect(event: CityEvent) {
    onSelectEvent(event);
    onTabChange("cockpit");
  }

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
          <div className="mb-4 mt-1">
            <p className="heading-label">Select Tomorrow&apos;s</p>
            <h1 className="heading-title">City Scenario</h1>
          </div>

          {/* Online/Offline Pill */}
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-live" />
            <span className="text-[11px] text-gray-500 font-medium">
              Live Sync • Updated 2 min ago
            </span>
          </div>

          {/* Hero cards */}
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

          {/* Secondary section label */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13px] font-bold text-gray-700">
              Other Scenarios
            </h2>
            <button className="flex items-center gap-1 text-[11px] text-[#7D9BB3] font-semibold">
              <SlidersHorizontal size={12} />
              Filter
            </button>
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

          {/* Normal Tuesday baseline card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card-secondary p-4 flex items-center gap-3"
            style={{ opacity: 0.7 }}
          >
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gray-100">
              <span className="text-lg">📅</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                Baseline Comparison
              </p>
              <p className="text-gray-600 text-[13px] font-semibold">
                Normal Tuesday — No Events
              </p>
              <p className="text-gray-400 text-[11px]">
                5,800 pax • 8-min headway • 0 injections
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAB — Add custom event */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
          className="absolute bottom-24 right-5 z-40"
        >
          <CircleButton variant="slate" size="lg" glow aria-label="Add Custom Event">
            <Plus size={22} />
          </CircleButton>
        </motion.div>
      </motion.div>
  );
}

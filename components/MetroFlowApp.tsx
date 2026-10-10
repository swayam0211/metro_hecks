"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import NavigationDock from "@/components/NavigationDock";
import ScenariosScreen from "@/components/screens/ScenariosScreen";
import CockpitScreen from "@/components/screens/CockpitScreen";
import MapScreen from "@/components/screens/MapScreen";
import TimetableScreen from "@/components/screens/TimetableScreen";
import BroadcastScreen from "@/components/screens/BroadcastScreen";
import type { Tab, CityEvent } from "@/lib/types";

export default function MetroFlowApp() {
  const [activeTab, setActiveTab] = useState<Tab>("scenarios");
  const [selectedEvent, setSelectedEvent] = useState<CityEvent | null>(null);

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
  }

  function handleEventSelect(event: CityEvent) {
    setSelectedEvent(event);
  }

  return (
    /* Root container — fills the device screen viewport */
    <div className="relative w-full h-full overflow-hidden bg-[#F0F2F5]">

      {/* ── Screen Switcher ── */}
      <AnimatePresence mode="wait">
        {activeTab === "scenarios" && (
          <ScenariosScreen
            key="scenarios"
            onSelectEvent={handleEventSelect}
            onTabChange={handleTabChange}
          />
        )}
        {activeTab === "cockpit" && (
          <CockpitScreen
            key="cockpit"
            selectedEvent={selectedEvent}
            onTabChange={handleTabChange}
          />
        )}
        {activeTab === "map" && (
          <MapScreen
            key="map"
            selectedEvent={selectedEvent}
          />
        )}
        {activeTab === "timetable" && (
          <TimetableScreen
            key="timetable"
            selectedEvent={selectedEvent}
          />
        )}
        {activeTab === "broadcast" && (
          <BroadcastScreen
            key="broadcast"
            selectedEvent={selectedEvent}
          />
        )}
      </AnimatePresence>

      {/* ── Floating Navigation Dock (always visible) ── */}
      <NavigationDock activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

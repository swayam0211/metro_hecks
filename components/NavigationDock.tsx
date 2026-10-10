"use client";

import { motion } from "framer-motion";
import { CalendarDays, Zap, Clock, Radio } from "lucide-react";
import type { Tab } from "@/lib/types";

interface NavigationDockProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS: {
  id: Tab;
  icon: React.ReactNode;
  label: string;
}[] = [
  {
    id: "scenarios",
    icon: <CalendarDays size={20} />,
    label: "Events",
  },
  {
    id: "cockpit",
    icon: <Zap size={20} />,
    label: "OCC",
  },
  {
    id: "timetable",
    icon: <Clock size={20} />,
    label: "Board",
  },
  {
    id: "broadcast",
    icon: <Radio size={20} />,
    label: "Broadcast",
  },
];

export default function NavigationDock({ activeTab, onTabChange }: NavigationDockProps) {
  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div
        className="nav-dock flex items-center gap-1 px-3 py-2.5 rounded-full"
        style={{ minWidth: "240px" }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileTap={{ scale: 0.90 }}
              whileHover={{ scale: isActive ? 1 : 1.05 }}
              className="relative flex flex-col items-center justify-center rounded-full transition-all duration-200 cursor-pointer"
              style={{
                padding: isActive ? "8px 16px" : "8px 12px",
                background: isActive
                  ? "linear-gradient(135deg, #7D9BB3, #64829A)"
                  : "transparent",
                boxShadow: isActive ? "0 4px 16px rgba(100,130,154,0.4)" : "none",
                color: isActive ? "white" : "#9CA3AF",
                minWidth: isActive ? "72px" : "44px",
              }}
              aria-label={tab.label}
            >
              <span className="flex items-center justify-center">{tab.icon}</span>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  className="text-[10px] font-semibold mt-0.5 whitespace-nowrap overflow-hidden"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {tab.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

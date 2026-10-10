"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Trophy,
  GraduationCap,
  CloudRain,
  Building2,
  Bus,
  Train,
  Zap,
  TrendingUp,
} from "lucide-react";
import type { CityEvent, ImpactLevel } from "@/lib/types";
import CircleButton from "./CircleButton";

// ── Icon Map ────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  Trophy: <Trophy size={28} />,
  GraduationCap: <GraduationCap size={28} />,
  CloudRain: <CloudRain size={28} />,
  Building2: <Building2 size={28} />,
  Bus: <Bus size={28} />,
  Train: <Train size={28} />,
  Zap: <Zap size={28} />,
  TrendingUp: <TrendingUp size={28} />,
};

// ── Impact Pill ──────────────────────────────────────────────
function ImpactPill({ level }: { level: ImpactLevel }) {
  const config = {
    CRITICAL: { label: "⚠ CRITICAL", className: "pill-critical" },
    HIGH: { label: "▲ HIGH", className: "pill-high" },
    MODERATE: { label: "◆ MODERATE", className: "pill-moderate" },
    LOW: { label: "✓ LOW", className: "pill-low" },
  }[level];

  return <span className={config.className}>{config.label}</span>;
}

// ── Hero Card (CRITICAL / HIGH — Slate Blue) ─────────────────
function HeroScenarioCard({
  event,
  onSelect,
  index,
}: {
  event: CityEvent;
  onSelect: (event: CityEvent) => void;
  index: number;
}) {
  const paxFormatted = event.projectedSurgePax.toLocaleString("en-IN");
  const icon = ICON_MAP[event.icon] ?? <Train size={28} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileTap={{ scale: 0.975 }}
      whileHover={{ scale: 1.01 }}
      onClick={() => onSelect(event)}
      className="card-hero p-5 cursor-pointer relative"
      style={{ minHeight: "170px" }}
    >
      {/* Top Row */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <ImpactPill level={event.impactLevel} />
          <p className="text-white/70 text-[11px] mt-2 leading-none">{event.type}</p>
          <h3 className="text-white font-bold text-[17px] leading-tight mt-0.5 max-w-[200px]">
            {event.title}
          </h3>
        </div>
        <CircleButton
          variant="ghost"
          size="md"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(event);
          }}
          aria-label="Inspect and Approve"
        >
          <ArrowUpRight size={16} />
        </CircleButton>
      </div>

      {/* Icon + Surge number */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Zap size={12} className="text-yellow-300" />
            <span className="text-white/70 text-[11px]">Surge Passengers</span>
          </div>
          <p className="text-white font-black leading-none" style={{ fontSize: "28px", letterSpacing: "-0.03em" }}>
            +{paxFormatted}
          </p>
        </div>

        {/* Event icon decoration */}
        <div
          className="float-gentle flex items-center justify-center rounded-2xl"
          style={{
            width: 56,
            height: 56,
            background: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.90)",
          }}
        >
          {icon}
        </div>
      </div>

      {/* Station & time footer */}
      <div className="mt-3 pt-3 border-t border-white/15 flex items-center gap-1">
        <Train size={11} className="text-white/50 flex-shrink-0" />
        <p className="text-white/60 text-[11px] truncate">
          {event.primaryStation} • {event.timeStart}–{event.timeEnd}
        </p>
      </div>

      {/* Shimmer overlay on hover */}
      <motion.div
        className="absolute inset-0 rounded-[32px] pointer-events-none shimmer"
        style={{ mixBlendMode: "overlay" }}
      />
    </motion.div>
  );
}

// ── Secondary Card (MODERATE/LOW — White) ────────────────────
function SecondaryScenarioCard({
  event,
  onSelect,
  index,
}: {
  event: CityEvent;
  onSelect: (event: CityEvent) => void;
  index: number;
}) {
  const paxFormatted = event.projectedSurgePax.toLocaleString("en-IN");
  const icon = ICON_MAP[event.icon] ?? <Train size={22} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileTap={{ scale: 0.975 }}
      whileHover={{ scale: 1.01 }}
      onClick={() => onSelect(event)}
      className="card-secondary p-4 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Icon circle */}
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(125,155,179,0.12)", color: "#7D9BB3" }}
          >
            <span style={{ transform: "scale(0.7)", display: "flex" }}>{icon}</span>
          </div>

          {/* Text */}
          <div className="min-w-0">
            <ImpactPill level={event.impactLevel} />
            <p className="text-gray-800 font-bold text-[13px] leading-tight mt-1 truncate">
              {event.title}
            </p>
            <p className="text-gray-400 text-[11px] mt-0.5 truncate">
              {event.primaryStation} • {event.timeStart}
            </p>
          </div>
        </div>

        {/* Right: surge + arrow */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <div className="text-right">
            <p className="text-gray-500 text-[10px]">+Pax</p>
            <p
              className="text-gradient-slate font-black leading-none"
              style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
            >
              {paxFormatted}
            </p>
          </div>
          <CircleButton
            variant="white"
            size="sm"
            aria-label="Open"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(event);
            }}
          >
            <ArrowUpRight size={13} className="text-gray-600" />
          </CircleButton>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Export: ScenarioCard (auto-selects variant) ─────────
interface ScenarioCardProps {
  event: CityEvent;
  variant?: "hero" | "secondary" | "auto";
  onSelect: (event: CityEvent) => void;
  index?: number;
}

export default function ScenarioCard({
  event,
  variant = "auto",
  onSelect,
  index = 0,
}: ScenarioCardProps) {
  const isHero =
    variant === "hero" ||
    (variant === "auto" && (event.impactLevel === "CRITICAL" || event.impactLevel === "HIGH"));

  if (isHero) {
    return <HeroScenarioCard event={event} onSelect={onSelect} index={index} />;
  }
  return <SecondaryScenarioCard event={event} onSelect={onSelect} index={index} />;
}

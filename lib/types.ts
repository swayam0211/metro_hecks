// ============================================================
// MetroFlow OCC — Core Type Definitions
// ============================================================

export type Tab = "scenarios" | "cockpit" | "map" | "timetable" | "broadcast";

export type ImpactLevel = "CRITICAL" | "HIGH" | "MODERATE" | "LOW";

export interface CityEvent {
  id: string;
  title: string;
  type: "Sports" | "Education" | "Weather" | "Event" | "Strike";
  icon: string;
  impactLevel: ImpactLevel;
  date: string;
  timeStart: string;
  timeEnd: string;
  primaryStation: string;
  secondaryStations: string[];
  projectedSurgePax: number;
  normalDayPax: number;
  surgeMultiplier: number;
  injectRakeCount: number;
  injectTimeWindowStart: string;
  injectTimeWindowEnd: string;
  baseHeadwayMin: number;
  injectedHeadwayMin: number;
  additionalElectricityCostRs: number;
  projectedFareRevenueRs: number;
  netRevenueGainRs: number;
  operatorBriefEN: string;
  operatorBriefGU: string;
  sponsorEligible: boolean;
  sponsor?: string;
}

export interface Train {
  trainId: string;
  departureTime: string;
  fromStation: string;
  toStation: string;
  type: "Regular" | "Special";
  direction: "Northbound" | "Southbound";
  reason?: string;
  icon?: string;
}

export interface Station {
  id: string;
  name: string;
  normalPaxCapacity: number;
  surgeSafeThreshold: number;
  criticalThreshold: number;
  coordinates: [number, number];
  platforms: number;
  depotAccess: boolean;
  reserveRakesAvailable: number;
}

export interface InjectedSchedule {
  baseTimetable: Train[];
  injectedTrains: Train[];
  newHeadwayMin: number;
  originalHeadwayMin: number;
  totalTrainsInWindow: number;
}

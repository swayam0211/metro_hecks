"use client";

import { type ReactNode } from "react";

interface DeviceShellProps {
  children: ReactNode;
}

export default function DeviceShell({ children }: DeviceShellProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#E5E9EE]">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(125,155,179,0.20) 0%, transparent 70%)",
        }}
      />

      {/* Responsive Shell: Clean full-viewport on mobile (360px+), Luxury iPhone bezel on desktop (sm+) */}
      <div
        className="relative w-full h-full sm:h-[min(852px,96vh)] sm:w-[min(393px,96vw)] sm:rounded-[48px] sm:shadow-[0_24px_70px_rgba(0,0,0,0.22),0_0_0_1px_rgba(0,0,0,0.08)] bg-white overflow-hidden sm:p-[6px]"
      >
        {/* Dynamic Island - visible on desktop frame */}
        <div className="hidden sm:block absolute top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div
            className="bg-black"
            style={{
              width: "126px",
              height: "35px",
              borderRadius: "20px",
            }}
          />
        </div>

        {/* Screen container */}
        <div className="w-full h-full relative overflow-hidden bg-[#F0F2F5] sm:rounded-[42px]">
          {children}
        </div>
      </div>
    </div>
  );
}

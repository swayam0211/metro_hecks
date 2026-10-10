"use client";

import { useState, useEffect } from "react";
import { Bell, ChevronDown } from "lucide-react";
import OperatorProfileModal from "@/components/OperatorProfileModal";
import NotificationsModal from "@/components/NotificationsModal";

export default function TopHeader() {
  const [timeStr, setTimeStr] = useState("08:30");
  const [dateStr, setDateStr] = useState("Mon, Oct 12");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      setDateStr(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between px-5 pt-4 sm:pt-[54px] pb-3">

        {/* ── Left: OCC Monogram Pill ── */}
        <div className="flex items-center gap-2.5">
          {/* OCC Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.88)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.20)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-live" />
            <span
              className="text-white font-bold tracking-widest"
              style={{ fontSize: "11px", letterSpacing: "0.12em" }}
            >
              OCC
            </span>
          </div>

          {/* Date/time label */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-gray-800 leading-none">
              {dateStr}
            </span>
            <span className="text-[10px] text-gray-400 leading-none mt-0.5">
              {timeStr} • GMRC
            </span>
          </div>
        </div>

        {/* ── Right: Notification bell + Operator avatar ── */}
        <div className="flex items-center gap-2.5">
          {/* Bell with unread dot */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="circle-btn relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={16} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-[1.5px] border-white" />
          </button>

          {/* Operator Avatar */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-1.5 rounded-full pl-1 pr-2 py-1 cursor-pointer hover:bg-white transition-all"
            style={{
              background: "rgba(255,255,255,0.85)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            aria-label="Operator Profile"
          >
            {/* Avatar circle */}
            <div
              className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #7D9BB3, #4A6A84)",
                fontSize: "11px",
              }}
            >
              RK
            </div>
            <span className="text-[11px] font-semibold text-gray-700 leading-none">
              Op. Rao
            </span>
            <ChevronDown size={10} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Operator Profile Modal */}
      <OperatorProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}

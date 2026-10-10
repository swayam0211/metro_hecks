"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Zap, CloudRain, CheckCircle, ShieldAlert } from "lucide-react";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsModal({
  isOpen,
  onClose,
}: NotificationsModalProps) {
  if (!isOpen) return null;

  const NOTIFICATIONS = [
    {
      id: 1,
      icon: <Zap size={14} className="text-amber-500" />,
      title: "Motera Stadium Crowd Surge",
      desc: "IPL GT vs MI match forecast: +22,400 passengers starting 21:45 PM.",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      icon: <CheckCircle size={14} className="text-emerald-500" />,
      title: "Sabarmati Depot Fleet Ready",
      desc: "4 supplementary rakes energized on Siding 3 & 4. Standby crew assigned.",
      time: "14 min ago",
      unread: true,
    },
    {
      id: 3,
      icon: <CloudRain size={14} className="text-blue-500" />,
      title: "IMD Weather Sync",
      desc: "Clear skies over Ahmedabad-Gandhinagar corridor. 0% precipitation risk.",
      time: "1 hr ago",
      unread: false,
    },
    {
      id: 4,
      icon: <ShieldAlert size={14} className="text-[#7D9BB3]" />,
      title: "GPSC Exam Scenario Prepared",
      desc: "State Civil Services exam tomorrow at GNLU: 3 rakes scheduled.",
      time: "2 hrs ago",
      unread: false,
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="w-full max-w-sm rounded-[32px] bg-white p-5 shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <Bell size={16} />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">OCC Live Alerts</h3>
                <p className="text-[10px] text-gray-400">2 unread notifications</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* List */}
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto no-scrollbar mb-4">
            {NOTIFICATIONS.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border transition-all ${
                  item.unread
                    ? "bg-[#F0F2F5]/80 border-[#7D9BB3]/30"
                    : "bg-white border-gray-100"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center shadow-xs flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold text-gray-800 leading-tight">
                        {item.title}
                      </p>
                      <span className="text-[9px] text-gray-400 font-medium">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dismiss button */}
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer"
            style={{ background: "linear-gradient(135deg, #7D9BB3, #64829A)" }}
          >
            Mark All as Read & Dismiss
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

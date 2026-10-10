"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, ShieldCheck, Clock, Radio, Activity, CheckCircle, LogOut } from "lucide-react";

interface OperatorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OperatorProfileModal({
  isOpen,
  onClose,
}: OperatorProfileModalProps) {
  if (!isOpen) return null;

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
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

          {/* Profile Header */}
          <div className="flex items-center gap-3.5 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md"
              style={{ background: "linear-gradient(135deg, #7D9BB3, #4A6A84)" }}
            >
              RK
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-gray-900 text-base leading-tight">
                  Rajesh Rao
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-live" />
              </div>
              <p className="text-[11px] text-[#7D9BB3] font-bold mt-0.5">
                Chief Traffic Controller (CTC)
              </p>
              <p className="text-[10px] text-gray-400">GMRC OCC Sabarmati • Console #02</p>
            </div>
          </div>

          {/* Details list */}
          <div className="flex flex-col gap-2 bg-gray-50 p-3.5 rounded-2xl mb-4 border border-gray-100">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 flex items-center gap-1.5">
                <Clock size={13} className="text-gray-400" /> Shift Duty
              </span>
              <span className="font-bold text-gray-800">Shift A (06:00 – 14:00)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 flex items-center gap-1.5">
                <Radio size={13} className="text-gray-400" /> Active Rakes Dispatched
              </span>
              <span className="font-bold text-emerald-600">4 Reserve Rakes Live</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-gray-400" /> Emergency Authority
              </span>
              <span className="font-bold text-gray-800">Tier-1 Authorized</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 flex items-center gap-1.5">
                <Activity size={13} className="text-gray-400" /> Signalling Interlock
              </span>
              <span className="font-bold text-emerald-600">CBTC Mode Auto</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer transition-all"
              style={{ background: "linear-gradient(135deg, #7D9BB3, #64829A)" }}
            >
              Resume Console
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all flex items-center gap-1"
            >
              <LogOut size={13} /> Exit
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

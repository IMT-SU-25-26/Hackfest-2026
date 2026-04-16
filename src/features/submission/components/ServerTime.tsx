"use client";

import React, { useState, useEffect } from "react";
import { getServerTime } from "../actions";
import { Clock } from "lucide-react";

export default function ServerTime() {
  const [serverTime, setServerTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function syncTime() {
      try {
        const response = await getServerTime();
        if (response.success && response.data) {
          setServerTime(new Date(response.data));
        }
      } catch (error) {
        console.error("Failed to sync server time:", error);
      } finally {
        setLoading(false);
      }
    }

    syncTime();

    const interval = setInterval(() => {
      setServerTime((prev) => (prev ? new Date(prev.getTime() + 1000) : null));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date | null) => {
    if (!date) return "--:--:--";
    return date.toLocaleTimeString("en-GB", { hour12: false });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "---, -- --- ----";
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-center justify-start mb-8 font-family-spacemono">
      <div className="border-0 border-[#05C174] bg-[#090223]/80 backdrop-blur-md p-4 flex items-center gap-4 min-w-[280px] shadow-[0_0_20px_rgba(5,193,116,0.2)]">
        <div className="p-3 bg-[#05C174]/10 text-[#05C174]">
          <Clock size={24} className="animate-pulse" />
        </div>
        <div>
          <div className="text-[10px] text-[#05C174] uppercase tracking-[0.2em] font-family-audiowide mb-1">Server Time</div>
          <div className="text-2xl font-family-audiowide text-[#05B0C1] tracking-wider">
            {loading ? (
              <span className="opacity-50">SYNCING...</span>
            ) : (
              formatTime(serverTime)
            )}
          </div>
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
            {formatDate(serverTime)}
          </div>
        </div>
      </div>
      {/* <div className="mt-0 text-[10px] text-left text-red-500/80 font-family-audiowide uppercase tracking-widest animate-pulse">
        Server Time (GMT+7)
      </div> */}
    </div>
  );
}

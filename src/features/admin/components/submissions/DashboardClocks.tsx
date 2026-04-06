"use client";

import React, { useState, useEffect } from "react";
import { getServerTime } from "../../actions";
import { Clock, Globe } from "lucide-react";

export default function DashboardClocks() {
  const [serverTime, setServerTime] = useState<Date | null>(null);
  const [syncedTime, setSyncedTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function syncClocks() {
      try {
        // Fetch Server Time
        const serverRes = await getServerTime();
        if (serverRes.success && serverRes.data) {
          setServerTime(new Date(serverRes.data));
        }

        // Fetch Synced Time (Public API) - Using TimeAPI.io for reliability
        const syncedRes = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Asia/Jakarta");
        if (syncedRes.ok) {
            const syncedData = await syncedRes.json();
            if (syncedData && syncedData.dateTime) {
              setSyncedTime(new Date(syncedData.dateTime));
            }
        }
      } catch (error) {
        console.error("Failed to sync clocks:", error);
      } finally {
        setLoading(false);
      }
    }

    syncClocks();

    const interval = setInterval(() => {
      setServerTime((prev) => (prev ? new Date(prev.getTime() + 1000) : null));
      setSyncedTime((prev) => (prev ? new Date(prev.getTime() + 1000) : null));
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
    <div className="flex flex-col md:flex-row gap-4 mb-6 font-family-spacemono">
      {/* Server Time */}
      <div className="flex-1 border border-[#05C174] bg-[#090223] p-4 flex items-center gap-4">
        <div className="p-3 bg-[#05C174]/10 text-[#05C174]">
          <Clock size={24} />
        </div>
        <div>
          <div className="text-[10px] text-[#05C174] uppercase tracking-widest font-family-audiowide">Server Time</div>
          <div className="text-xl font-family-audiowide text-[#05B0C1]">
            {loading ? "SYNCING..." : formatTime(serverTime)}
          </div>
          <div className="text-[10px] text-gray-400 uppercase">
             {formatDate(serverTime)}
          </div>
        </div>
      </div>

      {/* Synced Time */}
      <div className="flex-1 border border-[#05C174] bg-[#090223] p-4 flex items-center gap-4">
        <div className="p-3 bg-[#05B0C1]/10 text-[#05B0C1]">
          <Globe size={24} />
        </div>
        <div>
          <div className="text-[10px] text-[#05B0C1] uppercase tracking-widest font-family-audiowide">Synced Realtime (Asia/Jakarta)</div>
          <div className="text-xl font-family-audiowide text-[#05C174]">
            {loading ? "SYNCING..." : formatTime(syncedTime)}
          </div>
          <div className="text-[10px] text-gray-400 uppercase">
            {formatDate(syncedTime)}
          </div>
        </div>
      </div>
    </div>
  );
}

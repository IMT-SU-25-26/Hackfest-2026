"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TeamStatus, Team, User, TeamCategory } from "@/generated/prisma";
import { Search } from "lucide-react";
import { getTeams } from "../actions";
import TeamTable from "./TeamTable";
import PaymentProofModal from "./PaymentProofModal";
import TeamDetailsModal from "./TeamDetailsModal";
import { useDebounce } from "@/features/admin/hooks/useDebounce"; // Will create this or use standard timeout

interface TeamWithMembers extends Team {
  members: User[];
}

export default function AdminDashboard() {
  const [teams, setTeams] = useState<TeamWithMembers[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TeamStatus | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<TeamCategory | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamWithMembers | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getTeams(debouncedSearch, statusFilter, categoryFilter);
      if (result.success && result.data) {
        setTeams(result.data as TeamWithMembers[]);
      }
      setLoading(false);
    };

    fetchData();
  }, [debouncedSearch, statusFilter, categoryFilter]);

  return (
    <div className="w-full space-y-6 text-white">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#05C174]">
                <Search size={18}/>
            </div>
            <input
                type="text"
                placeholder="Search by team name..."
                className="w-full bg-[#090223] border border-[#05C174] text-white pl-10 pr-4 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-[#05C174] font-spacemono placeholder-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 font-spacemono text-sm flex-wrap">
            <button
                onClick={() => setStatusFilter(undefined)}
                className={`px-4 py-2 border transition-all ${
                    statusFilter === undefined
                    ? "bg-[#05C174] text-[#090223] border-[#05C174]"
                    : "bg-transparent text-[#05C174] border-[#05C174] hover:bg-[#05C174]/10"
                }`}
            >
                ALL
            </button>
            <button
                onClick={() => setStatusFilter("PENDING")}
                className={`px-4 py-2 border transition-all ${
                    statusFilter === "PENDING"
                    ? "bg-yellow-500 text-[#090223] border-yellow-500"
                    : "bg-transparent text-yellow-500 border-yellow-500 hover:bg-yellow-500/10"
                }`}
            >
                PENDING
            </button>
            <button
                onClick={() => setStatusFilter("ACCEPTED")}
                className={`px-4 py-2 border transition-all ${
                    statusFilter === "ACCEPTED"
                    ? "bg-green-500 text-[#090223] border-green-500"
                    : "bg-transparent text-green-500 border-green-500 hover:bg-green-500/10"
                }`}
            >
                ACCEPTED
            </button>
            <button
                onClick={() => setStatusFilter("REJECTED")}
                className={`px-4 py-2 border transition-all ${
                    statusFilter === "REJECTED"
                    ? "bg-red-500 text-[#090223] border-red-500"
                    : "bg-transparent text-red-500 border-red-500 hover:bg-red-500/10"
                }`}
            >
                REJECTED
            </button>
        </div>
         {/* Category Filter */}
         <div className="flex gap-2 font-spacemono text-sm flex-wrap mt-2 md:mt-0">
            <button
                onClick={() => setCategoryFilter(undefined)}
                className={`px-4 py-2 border transition-all ${
                    categoryFilter === undefined
                    ? "bg-[#05C174] text-[#090223] border-[#05C174]"
                    : "bg-transparent text-[#05C174] border-[#05C174] hover:bg-[#05C174]/10"
                }`}
            >
                ALL CATEGORIES
            </button>
            <button
                onClick={() => setCategoryFilter("UIUX")}
                className={`px-4 py-2 border transition-all ${
                    categoryFilter === "UIUX"
                    ? "bg-[#05C3DD] text-[#090223] border-[#05C3DD]"
                    : "bg-transparent text-[#05C3DD] border-[#05C3DD] hover:bg-[#05C3DD]/10"
                }`}
            >
                UI/UX
            </button>
            <button
                onClick={() => setCategoryFilter("HACKATON")}
                className={`px-4 py-2 border transition-all ${
                    categoryFilter === "HACKATON"
                    ? "bg-[#9D04C2] text-white border-[#9D04C2]"
                    : "bg-transparent text-[#9D04C2] border-[#9D04C2] hover:bg-[#9D04C2]/10"
                }`}
            >
                HACKATHON
            </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="border border-[#05C174] bg-[#090223]/50 backdrop-blur-sm min-h-[400px] relative">
        {loading && (
            <div className="absolute inset-0 bg-[#090223]/80 z-10 flex items-center justify-center">
                <div className="text-[#05C174] font-audiowide animate-pulse">LOADING DASHBOARD DATA...</div>
            </div>
        )}
        <TeamTable 
            teams={teams} 
            onViewProof={setProofUrl}
            onViewDetails={setSelectedTeam}
        />
      </div>

      {/* Modals */}
      {proofUrl && (
        <PaymentProofModal 
            imageUrl={proofUrl} 
            onClose={() => setProofUrl(null)} 
        />
      )}

      {selectedTeam && (
        <TeamDetailsModal 
            team={selectedTeam} 
            onClose={() => setSelectedTeam(null)} 
        />
      )}
    </div>
  );
}

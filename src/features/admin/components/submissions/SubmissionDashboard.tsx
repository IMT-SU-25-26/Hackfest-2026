"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TeamCategory, TeamStatus, Team, User } from "@/generated/prisma";
import { Search } from "lucide-react";
import { getTeams } from "../../actions";
import SubmissionTable from "./SubmissionTable";
import SubmissionModal from "./SubmissionModal";
import { useDebounce } from "@/features/admin/hooks/useDebounce";

interface TeamWithMembers extends Team {
  members: User[];
}

interface SubmissionDashboardProps {
  type: "preliminary" | "final";
}

export default function SubmissionDashboard({ type }: SubmissionDashboardProps) {
  const [teams, setTeams] = useState<TeamWithMembers[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<TeamCategory | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const [editingTeam, setEditingTeam] = useState<TeamWithMembers | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const fetchData = useCallback(async () => {
    setLoading(true);
    // For submissions, we probably only care about teams that aren't rejected,
    // or we just fetch everything and let the admin see all. Using ACCEPTED implies they passed payment.
    // For now we don't filter by status unless specified, but usually final means ACCEPTED.
    // Let's just fetch all like the main dashboard to give admins full control.
    const result = await getTeams(debouncedSearch, undefined, categoryFilter);
    if (result.success && result.data) {
      setTeams(result.data as TeamWithMembers[]);
    }
    setLoading(false);
  }, [debouncedSearch, categoryFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

      {/* Team Count */}
      <div className="flex justify-end font-spacemono text-[#05C174]">
        <span>Showing {teams.length} team(s)</span>
      </div>

      {/* Table Content */}
      <div className="border border-[#05C174] bg-[#090223]/50 backdrop-blur-sm min-h-[400px] relative">
        {loading && (
            <div className="absolute inset-0 bg-[#090223]/80 z-10 flex items-center justify-center">
                <div className="text-[#05C174] font-audiowide animate-pulse">LOADING DASHBOARD DATA...</div>
            </div>
        )}
        <SubmissionTable 
            teams={teams}
            type={type}
            onEdit={setEditingTeam}
        />
      </div>

      {/* Editing Modal */}
      {editingTeam && (
        <SubmissionModal 
            team={editingTeam}
            type={type}
            onClose={() => setEditingTeam(null)}
            onUpdate={fetchData}
        />
      )}

    </div>
  );
}

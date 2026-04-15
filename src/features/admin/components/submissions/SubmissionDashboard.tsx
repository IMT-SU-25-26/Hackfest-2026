"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TeamCategory, Team, User } from "@/generated/prisma";
import { Search, Download } from "lucide-react";
import { getTeams } from "../../actions";
import SubmissionTable from "./SubmissionTable";
import SubmissionModal from "./SubmissionModal";
import { useDebounce } from "@/features/admin/hooks/useDebounce";
import * as XLSX from "xlsx";
import DashboardClocks from "./DashboardClocks";

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
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState<"ALL" | "SUBMITTED" | "NOT_SUBMITTED">("ALL");
  const [loading, setLoading] = useState(true);

  const [editingTeam, setEditingTeam] = useState<TeamWithMembers | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const result = await getTeams(debouncedSearch, undefined, categoryFilter);
    if (result.success && result.data) {
      setTeams(result.data as TeamWithMembers[]);
    }
    setLoading(false);
  }, [debouncedSearch, categoryFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredTeams = teams.filter((team) => {
    if (type === "final" && !team.isFinalist) return false;

    if (submissionStatusFilter === "ALL") return true;

    const hasPreliminary = !!(
      team.submission_originality_url ||
      team.submission_lean_canvas_url ||
      (team.category === "HACKATON" && team.submission_gdrive_url) ||
      (team.category === "UIUX" && (team.submission_proposal_url || team.submission_figma_url))
    );

    const hasFinal = !!(
      team.submission_ppt_url ||
      team.submission_video_demo_url ||
      team.submission_github_url
    );

    const hasSubmission = type === "preliminary" ? hasPreliminary : hasFinal;

    return submissionStatusFilter === "SUBMITTED" ? hasSubmission : !hasSubmission;
  });

  const handleExportToExcel = () => {
    const dataToExport = filteredTeams.map((team) => {
      const baseData: any = {
        "Team Name": team.name,
        "Category": team.category === "UIUX" ? "UI/UX" : "HACKATHON",
        "Phone": team.phone || "",
        "Line ID": team.line_id || "",
      };

      if (type === "preliminary") {
        baseData["Originality URL"] = team.submission_originality_url || "";
        baseData["Lean Canvas URL"] = team.submission_lean_canvas_url || "";
        if (team.category === "HACKATON") {
          baseData["Video GDrive URL"] = team.submission_gdrive_url || "";
        } else {
          baseData["Proposal URL"] = team.submission_proposal_url || "";
          baseData["Figma URL"] = team.submission_figma_url || "";
        }
      } else {
        baseData["PPT URL"] = team.submission_ppt_url || "";
        baseData["Video Demo URL"] = team.submission_video_demo_url || "";
        baseData["Github URL"] = team.submission_github_url || "";
      }

      return baseData;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
    
    const filename = `Submissions_${type}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  return (
    <div className="w-full space-y-6 text-white">
      <DashboardClocks />

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

      {/* Submission Status Filter */}
      <div className="flex gap-2 font-spacemono text-sm flex-wrap">
          <button
              onClick={() => setSubmissionStatusFilter("ALL")}
              className={`px-4 py-2 border transition-all ${
                  submissionStatusFilter === "ALL"
                  ? "bg-[#05C174] text-[#090223] border-[#05C174]"
                  : "bg-transparent text-[#05C174] border-[#05C174] hover:bg-[#05C174]/10"
              }`}
          >
              ALL SUBMISSIONS
          </button>
          <button
              onClick={() => setSubmissionStatusFilter("SUBMITTED")}
              className={`px-4 py-2 border transition-all ${
                  submissionStatusFilter === "SUBMITTED"
                  ? "bg-green-500 text-[#090223] border-green-500"
                  : "bg-transparent text-green-500 border-green-500 hover:bg-green-500/10"
              }`}
          >
              SUBMITTED
          </button>
          <button
              onClick={() => setSubmissionStatusFilter("NOT_SUBMITTED")}
              className={`px-4 py-2 border transition-all ${
                  submissionStatusFilter === "NOT_SUBMITTED"
                  ? "bg-red-500 text-[#090223] border-red-500"
                  : "bg-transparent text-red-500 border-red-500 hover:bg-red-500/10"
              }`}
          >
              NOT SUBMITTED
          </button>
      </div>

      {/* Team Count & Export */}
      <div className="flex justify-between items-center font-spacemono text-[#05C174]">
        <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 px-4 py-2 border border-[#05C174] hover:bg-[#05C174]/10 transition-all text-sm uppercase group"
        >
            <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
            Export to Excel
        </button>
        <span>Showing {filteredTeams.length} team(s)</span>
      </div>

      {/* Table Content */}
      <div className="border border-[#05C174] bg-[#090223]/50 backdrop-blur-sm min-h-[400px] relative">
        {loading && (
            <div className="absolute inset-0 bg-[#090223]/80 z-10 flex items-center justify-center">
                <div className="text-[#05C174] font-audiowide animate-pulse">LOADING DASHBOARD DATA...</div>
            </div>
        )}
        <SubmissionTable 
            teams={filteredTeams}
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

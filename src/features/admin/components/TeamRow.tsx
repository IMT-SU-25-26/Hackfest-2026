"use client";

import React, { useState } from "react";
import { Team, User, TeamStatus } from "@/generated/prisma";
import { Eye, FileText, Check, X } from "lucide-react";
import { toast } from "react-toastify";
import { updateTeamStatus, updateTeamFinalistStatus } from "../actions";

interface TeamWithMembers extends Team {
  members: User[];
}

interface TeamRowProps {
  team: TeamWithMembers;
  onViewProof: (url: string) => void;
  onViewDetails: (team: TeamWithMembers) => void;
}

const TeamRow: React.FC<TeamRowProps> = ({ team, onViewProof, onViewDetails }) => {
  const [status, setStatus] = useState<TeamStatus>(team.status);
  const [isFinalist, setIsFinalist] = useState(team.isFinalist);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: TeamStatus) => {
    if (loading) return;
    if (!confirm(`Are you sure you want to ${newStatus} this team?`)) return;

    setLoading(true);
    const result = await updateTeamStatus(team.id, newStatus);
    setLoading(false);

    if (result.success) {
      setStatus(newStatus);
      toast.success(`Team ${newStatus.toLowerCase()} successfully`);
    } else {
      toast.error(result.error || "Failed to update status");
    }
  };

  const handeViewProof = () => {
    if (team.payment_proof) {
      onViewProof(team.payment_proof);
    } else {
      toast.info("No payment proof available for this team.");
    }
  };

  return (
    <tr className="hover:bg-white/5 transition-colors border-b border-[#05C174]/20 font-spacemono text-sm">
      <td className="px-6 py-4 whitespace-nowrap text-white">{team.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
        <div>{team.phone}</div>
        <div className="text-xs text-gray-500">{team.line_id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 rounded text-xs font-bold ${
            team.category === "UIUX"
              ? "bg-[#05C3DD]/20 text-[#05C3DD]"
              : "bg-[#9D04C2]/20 text-[#9D04C2]"
          }`}
        >
          {team.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 rounded text-xs font-bold ${
            status === "ACCEPTED"
              ? "bg-green-500/20 text-green-400"
              : status === "REJECTED"
              ? "bg-red-500/20 text-red-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
             <label className="relative inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={isFinalist}
                    onChange={async (e) => {
                        const newState = e.target.checked;
                        setIsFinalist(newState);
                        await updateTeamFinalistStatus(team.id, newState);
                        toast.success(`Team finalist status updated to ${newState}`);
                    }}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#05C174]"></div>
            </label>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button
            onClick={handeViewProof}
            className="p-1.5 rounded-full hover:bg-[#05C174]/20 text-[#05C174] transition-colors"
            title="Show Payment Proof"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => onViewDetails(team)}
            className="p-1.5 rounded-full hover:bg-blue-500/20 text-blue-400 transition-colors"
            title="Show Details"
          >
            <FileText size={18} />
          </button>
          {status !== "ACCEPTED" && (
            <button
              onClick={() => handleStatusChange("ACCEPTED")}
              disabled={loading}
              className="p-1.5 rounded-full hover:bg-green-500/20 text-green-400 transition-colors disabled:opacity-50"
              title="Accept Team"
            >
              <Check size={18} />
            </button>
          )}
          {status !== "REJECTED" && (
            <button
              onClick={() => handleStatusChange("REJECTED")}
              disabled={loading}
              className="p-1.5 rounded-full hover:bg-red-500/20 text-red-400 transition-colors disabled:opacity-50"
              title="Reject Team"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {team.surat_tugas_url ? (
            <button
                onClick={() => window.open(team.surat_tugas_url!, '_blank')}
                className="px-3 py-1 bg-[#1C0951] border border-[#00C074] text-[#00C074] rounded hover:bg-[#00C074]/20 transition-colors text-xs font-bold"
            >
                SURAT TUGAS
            </button>
        ) : (
            <span className="text-gray-500 text-xs">-</span>
        )}
      </td>
    </tr>
  );
};

export default TeamRow;

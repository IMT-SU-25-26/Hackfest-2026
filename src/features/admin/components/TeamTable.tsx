"use client";

import React from "react";
import { Team, User } from "@/generated/prisma";
import TeamRow from "./TeamRow";

interface TeamWithMembers extends Team {
  members: User[];
}

interface TeamTableProps {
  teams: TeamWithMembers[];
  onViewProof: (url: string) => void;
  onViewDetails: (team: TeamWithMembers) => void;
}

const TeamTable: React.FC<TeamTableProps> = ({ teams, onViewProof, onViewDetails }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-left">
        <thead className="bg-[#05C174]/10 text-[#05C174] font-audiowide uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 border-b border-[#05C174]">Team Name</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Contact Info</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Category</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Status</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Finalist</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#05C174]/10">
          {teams.length > 0 ? (
            teams.map((team) => (
              <TeamRow
                key={team.id}
                team={team}
                onViewProof={onViewProof}
                onViewDetails={onViewDetails}
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-400 font-spacemono">
                No teams found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;

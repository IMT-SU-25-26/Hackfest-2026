"use client";

import React from "react";
import { Team, User } from "@/generated/prisma";
import { Pencil, FileText, Video, Github, Layout, FileImage, Presentation } from "lucide-react";

interface TeamWithMembers extends Team {
  members: User[];
}

interface SubmissionTableProps {
  teams: TeamWithMembers[];
  type: "preliminary" | "final";
  onEdit: (team: TeamWithMembers) => void;
}

const SubmissionButton = ({ url, label, icon: Icon }: { url: string | null | undefined, label: string, icon: any }) => {
  if (!url) return null;
  return (
    <button
      onClick={() => window.open(url, "_blank")}
      className="inline-flex items-center px-3 py-1 bg-[#05C174]/10 hover:bg-[#05C174]/30 text-[#05C174] hover:text-white border border-[#05C174] rounded transition-colors text-xs font-spacemono mr-2 mb-2"
      title={label}
    >
      <Icon size={14} className="mr-1" />
      {label}
    </button>
  );
};

export default function SubmissionTable({ teams, type, onEdit }: SubmissionTableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-left">
        <thead className="bg-[#05C174]/10 text-[#05C174] font-audiowide uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 border-b border-[#05C174]">Team Name</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Contact Info</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Category</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Submissions</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#05C174]/10">
          {teams.length > 0 ? (
            teams.map((team) => (
              <tr key={team.id} className="hover:bg-[#05C174]/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-spacemono font-bold text-[#05B0C1]">{team.name}</div>
                  <div className="mt-1 flex flex-col gap-1">
                    {team.members?.filter(m => m.github_username).map(member => (
                      <div key={member.id} className="text-xs text-gray-400 flex items-center gap-1">
                        <Github size={12} className="text-[#05C174]" />
                        <span className="truncate max-w-[200px]">{member.github_username}</span>
                      </div>
                    ))}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-[#05C174]">WA:</span> {team.phone}
                  </div>
                  <div className="text-sm text-gray-300 flex items-center gap-2 mt-1">
                    <span className="text-[#05C174]">LINE:</span> {team.line_id}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold font-spacemono border ${
                    team.category === "UIUX" 
                    ? "border-[#05C3DD] text-[#05C3DD]" 
                    : "border-[#9D04C2] text-[#9D04C2]"
                  }`}>
                    {team.category === "UIUX" ? "UI/UX" : "HACKATHON"}
                  </span>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[400px]">
                    {type === "preliminary" ? (
                      <>
                        <SubmissionButton url={team.submission_originality_url} label="Originality" icon={FileText} />
                        <SubmissionButton url={team.submission_lean_canvas_url} label="Lean Canvas" icon={Layout} />
                        {team.category === "HACKATON" && (
                          <SubmissionButton url={team.submission_gdrive_url} label="Video" icon={Video} />
                        )}
                        {team.category === "UIUX" && (
                          <>
                            <SubmissionButton url={team.submission_proposal_url} label="Proposal" icon={FileText} />
                            <SubmissionButton url={team.submission_figma_url} label="Figma" icon={FileImage} />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <SubmissionButton url={team.submission_ppt_url} label="PPT" icon={Presentation} />
                        <SubmissionButton url={team.submission_video_demo_url} label="Video" icon={Video} />
                        <SubmissionButton url={team.submission_github_url} label="Github" icon={Github} />
                      </>
                    )}
                    {/* Render a fallback if absolutely nothing has been submitted */}
                    {(() => {
                      const hasPreliminary = team.submission_originality_url || team.submission_lean_canvas_url || (team.category === "HACKATON" && team.submission_gdrive_url) || (team.category === "UIUX" && (team.submission_proposal_url || team.submission_figma_url));
                      const hasFinal = team.submission_ppt_url || team.submission_video_demo_url || team.submission_github_url;
                      if ((type === "preliminary" && !hasPreliminary) || (type === "final" && !hasFinal)) {
                         return <span className="text-gray-500 italic text-xs font-spacemono">No submissions yet</span>;
                      }
                      return null;
                    })()}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit(team)}
                    className="text-[#05C174] hover:text-[#05B0C1] transition-colors p-2 rounded hover:bg-[#05C174]/20"
                    title="Edit Submissions"
                  >
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-400 font-spacemono">
                No teams found matching criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

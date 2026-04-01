"use client";

import React, { useState } from "react";
import { X, Save, Link as LinkIcon } from "lucide-react";
import { toast } from "react-toastify";
import { updateTeamSubmissions, SubmissionData } from "../../submissionActions";
import { Team, User } from "@/generated/prisma";

interface TeamWithMembers extends Team {
  members: User[];
}

interface SubmissionModalProps {
  team: TeamWithMembers;
  type: "preliminary" | "final";
  onClose: () => void;
  onUpdate: () => void;
}

export default function SubmissionModal({ team, type, onClose, onUpdate }: SubmissionModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SubmissionData>({
    submission_originality_url: team.submission_originality_url,
    submission_lean_canvas_url: team.submission_lean_canvas_url,
    submission_gdrive_url: team.submission_gdrive_url,
    submission_proposal_url: team.submission_proposal_url,
    submission_figma_url: team.submission_figma_url,
    submission_ppt_url: team.submission_ppt_url,
    submission_github_url: team.submission_github_url,
    submission_video_demo_url: team.submission_video_demo_url,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Transform empty strings to null to reflect empty DB state
    const cleanData: SubmissionData = {};
    for (const [key, value] of Object.entries(formData)) {
      if (value === "") {
        (cleanData as any)[key] = null;
      } else if (value !== undefined) {
        (cleanData as any)[key] = value;
      }
    }

    const result = await updateTeamSubmissions(team.id, cleanData);
    
    setLoading(false);
    if (result.success) {
      toast.success("Submissions updated successfully!");
      onUpdate();
      onClose();
    } else {
      toast.error(result.error || "Failed to update submissions");
    }
  };

  const renderInput = (name: keyof SubmissionData, label: string) => (
    <div className="mb-4">
      <label className="block text-sm font-spacemono text-[#05C174] mb-2">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#05C174]">
          <LinkIcon size={16} />
        </div>
        <input
          type="url"
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          placeholder={`https://...`}
          className="w-full bg-[#090223] border border-[#05C174] text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#05C174] font-spacemono placeholder-gray-500"
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#090223]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-[#090223] border-2 border-[#05C174] rounded shadow-[0_0_20px_#05C174] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#05C174]/30 bg-[#05C174]/10">
          <h2 className="text-xl font-audiowide text-[#05C174]">
            Edit {type === "preliminary" ? "Preliminary" : "Final"} Submissions
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar text-white">
          <div className="mb-6 font-spacemono">
            <p className="text-[#05B0C1] text-lg font-bold">{team.name}</p>
            <p className="text-sm text-gray-400">Category: <span className="text-white">{team.category === "UIUX" ? "UI/UX" : "Hackathon"}</span></p>
          </div>

          <form id="submission-form" onSubmit={handleSubmit}>
            {type === "preliminary" && (
              <>
                {renderInput("submission_originality_url", "Originality Statement URL")}
                {renderInput("submission_lean_canvas_url", "Lean Canvas URL")}
                
                {team.category === "HACKATON" && (
                  renderInput("submission_gdrive_url", "Video URL (G-Drive)")
                )}

                {team.category === "UIUX" && (
                  <>
                    {renderInput("submission_proposal_url", "Proposal URL")}
                    {renderInput("submission_figma_url", "Figma URL")}
                  </>
                )}
              </>
            )}

            {type === "final" && (
              <>
                {renderInput("submission_ppt_url", "PPT URL")}
                {renderInput("submission_video_demo_url", "Video URL")}
                {renderInput("submission_github_url", "Github URL")}
              </>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-[#05C174]/30 bg-[#05C174]/5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-3 font-spacemono text-sm text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            form="submission-form"
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-2 bg-[#05C174] text-[#090223] font-spacemono text-sm font-bold hover:bg-[#05B0C1] transition-colors disabled:opacity-50"
          >
            <Save size={16} className="mr-2" />
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

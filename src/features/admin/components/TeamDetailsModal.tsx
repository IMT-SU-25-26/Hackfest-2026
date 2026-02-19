"use client";

import React, { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { Team, User } from "@/generated/prisma";
import Image from "next/image";
import { removeMemberFromTeam } from "../actions";
import { toast } from "react-toastify";

interface TeamWithMembers extends Team {
  members: User[];
}

interface TeamDetailsModalProps {
  team: TeamWithMembers;
  onClose: () => void;
  onUpdate?: () => void;
}

const TeamDetailsModal: React.FC<TeamDetailsModalProps> = ({ team, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleRemoveMember = async (userId: string, userName: string) => {
    if (loading) return;
    if (!confirm(`Are you sure you want to remove ${userName} from this team?`)) return;

    setLoading(true);
    const result = await removeMemberFromTeam(userId);
    setLoading(false);

    if (result.success) {
      toast.success(`Removed ${userName} from team`);
      if (onUpdate) {
        onUpdate();
        onClose();
      }
    } else {
      toast.error(result.error || "Failed to remove member");
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#090223] border border-[#05C174] p-8 max-w-2xl w-full relative shadow-[0_0_20px_rgba(5,193,116,0.3)] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#05C174] hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl text-[#05C174] font-audiowide mb-6 text-center border-b border-[#05C174] pb-2">
          Team Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-spacemono text-white">
          <div>
            <p className="text-[#05C174] text-sm uppercase mb-1">Team Name</p>
            <p className="text-lg font-bold mb-4">{team.name}</p>

            <p className="text-[#05C174] text-sm uppercase mb-1">Status</p>
            <p className={`text-lg font-bold mb-4 ${
              team.status === 'ACCEPTED' ? 'text-green-500' :
              team.status === 'REJECTED' ? 'text-red-500' : 'text-yellow-500'
            }`}>{team.status}</p>

            <p className="text-[#05C174] text-sm uppercase mb-1">Category</p>
            <p className="text-lg mb-4">{team.category}</p>
             
            <p className="text-[#05C174] text-sm uppercase mb-1">Contact</p>
            <p className="mb-1">Phone: {team.phone}</p>
            <p className="mb-4">Line: {team.line_id}</p>
          </div>

          <div>
            <p className="text-[#05C174] text-sm uppercase mb-1">Members</p>
            <ul className="list-none mb-4 space-y-4">
              {team.members.map((member) => (
                <li key={member.id} className="flex flex-col gap-2 border-b border-[#05C174]/20 pb-2 last:border-0">
                  <div className="flex justify-between items-center">
                    <span>{member.name}</span>
                    <button
                        onClick={() => handleRemoveMember(member.id, member.name)}
                        disabled={loading}
                        className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors"
                        title="Remove Member"
                    >
                        <Trash2 size={16} />
                    </button>
                  </div>
                  {member.id_card && (
                    <a 
                      href={member.id_card} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative w-full h-32 block border border-[#05C174]/30 hover:border-[#05C174] transition-colors"
                    >
                      <Image
                        src={member.id_card}
                        alt={`ID Card ${member.name}`}
                        fill
                        className="object-cover"
                      />
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {team.payment_proof && (
              <div className="mt-4">
                 <p className="text-[#05C174] text-sm uppercase mb-2">Payment Proof Preview</p>
                 <div className="relative w-full h-40 border border-[#05C174]/30">
                    <Image
                      src={team.payment_proof}
                      alt="Proof"
                      fill
                      className="object-cover"
                    />
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsModal;

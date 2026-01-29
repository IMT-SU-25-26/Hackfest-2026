"use client";

import React from "react";
import { X } from "lucide-react";
import { Team, User } from "@/generated/prisma";
import Image from "next/image";

interface TeamWithMembers extends Team {
  members: User[];
}

interface TeamDetailsModalProps {
  team: TeamWithMembers;
  onClose: () => void;
}

const TeamDetailsModal: React.FC<TeamDetailsModalProps> = ({ team, onClose }) => {
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
            <ul className="list-disc list-inside mb-4 space-y-1">
              {team.members.map((member) => (
                <li key={member.id}>{member.name}</li>
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

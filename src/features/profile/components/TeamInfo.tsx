'use client';

import { Users, Info, AlertTriangle, Check } from "lucide-react";

interface Member {
  id: string;
  name: string;
  id_card: string | null;
  // Include other relevant properties if needed
}

interface Team {
  id: string;
  name: string;
  category: string;
  status: string;
  members: Member[];
}

interface TeamInfoProps {
  team: Team | null;
}

export default function TeamInfo({ team }: TeamInfoProps) {
  if (!team) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-8 bg-[#090223]/50 border border-[#05C174] p-6 md:p-10 backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl text-[#05B0C1] font-family-audiowide mb-4 text-center" style={{ textShadow: "0 0 10px #05B0C1" }}>
          TEAM INFO
        </h2>
        <div className="flex items-center justify-center p-4 border border-[#05C174] bg-black/50 text-[#05C174] font-family-spacemono">
            <Info className="mr-3" size={24} />
            <p className="text-lg">You are not currently in any team.</p>
        </div>
      </div>
    );
  }

  const hasIncompleteProfiles = team.members.some(member => !member.id_card);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 bg-[#090223]/50 border border-[#05C174] p-6 md:p-10 backdrop-blur-sm">
      <h2 className="text-2xl md:text-3xl text-[#05B0C1] font-family-audiowide mb-6 text-center" style={{ textShadow: "0 0 10px #05B0C1" }}>
        TEAM INFO
      </h2>

      {team.status === "PENDING" && hasIncompleteProfiles && (
        <div className="mb-6 flex items-start p-4 border border-yellow-500 bg-yellow-500/10 text-yellow-500 font-family-spacemono">
          <AlertTriangle className="mr-3 mt-1 flex-shrink-0" size={24} />
          <div>
             <p className="font-bold mb-1">Warning: Incomplete Profile Data</p>
             <p>Make sure all users have completed their profile data.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 mb-8 font-family-spacemono text-[#05B0C1]">
        <div className="flex-1 flex flex-col p-4 border border-[#05C174] bg-black/50">
          <span className="text-sm text-[#05C174] mb-1 font-bold">Team Name</span>
          <span className="text-xl break-words">{team.name}</span>
        </div>
        <div className="flex-1 flex flex-col p-4 border border-[#05C174] bg-black/50">
          <span className="text-sm text-[#05C174] mb-1 font-bold">Category</span>
          <span className="text-xl">{team.category}</span>
        </div>
        <div className="flex-1 flex flex-col p-4 border border-[#05C174] bg-black/50">
          <span className="text-sm text-[#05C174] mb-1 font-bold">Status</span>
          <span className="text-xl">{team.status}</span>
        </div>
      </div>

      <div className="font-family-spacemono w-full">
         <h3 className="text-xl text-[#05B0C1] font-family-audiowide mb-4 flex items-center">
            <Users className="mr-3 text-[#05C174]" size={24} />
            Members
         </h3>
         
         <div className="flex flex-col gap-4">
           {team.members.map((member, idx) => {
             const isComplete = !!member.id_card;
             return (
               <div key={member.id} className="flex items-center justify-between p-4 border border-[#05C174] bg-black/30">
                  <span className="text-lg text-[#05B0C1] truncate pr-4">{member.name}</span>
                  <div className="flex items-center flex-shrink-0">
                     {isComplete ? (
                       <div className="flex items-center text-green-500" title="Profile Complete">
                          <Check size={24} />
                       </div>
                     ) : (
                       <div className="flex items-center text-yellow-500" title="Profile Incomplete">
                          <AlertTriangle size={24} />
                       </div>
                     )}
                  </div>
               </div>
             );
           })}
         </div>
      </div>
    </div>
  );
}

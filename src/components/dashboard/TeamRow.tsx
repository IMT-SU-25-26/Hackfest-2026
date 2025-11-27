import React, { useState } from "react";
import { deleteTeam } from "@/lib/services/team"; 
import { Team, Member } from "@/generated/prisma";
import { toast } from "react-toastify";

type TeamWithMembers = Team & { members: Member[] };

interface TeamRowProps {
  team: TeamWithMembers;
  index: number;
  onDeleteSuccess: () => void;
  onEditClick: () => void;
}

const TeamRow: React.FC<TeamRowProps> = ({
  team,
  index,
  onDeleteSuccess,
  onEditClick,
}) => {
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete team: ${team.team_name}?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      // Assuming deleteTeam is imported correctly
      const result = await deleteTeam(team.team_id);
      if (result.success) {
        toast.success("Team deleted successfully");
        onDeleteSuccess();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Main Team Row */}
      <tr className="hover:bg-gray-700 transition duration-300">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-teal-400/90">
          {index}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
          {team.team_name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          {team.university}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          {team.phone_number}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          {team.line_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
          {/* Added flex-wrap to handle multiple buttons on smaller screens */}
          <div className="flex justify-center items-center gap-2 flex-wrap">
            
            {/* --- NEW BUTTON: POSTER --- */}
            <a
              href={team.poster_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-full font-semibold text-xs tracking-wider transition duration-150 no-underline"
            >
              POSTER
            </a>

            {/* --- NEW BUTTON: TWIBBON --- */}
            <a
              href={team.twibbon_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-full font-semibold text-xs tracking-wider transition duration-150 no-underline"
            >
              TWIBBON
            </a>

            {/* EXISTING EDIT BUTTON */}
            <button
              onClick={onEditClick}
              className="text-white bg-teal-600 hover:bg-teal-500 px-3 py-1 rounded-full font-semibold text-xs tracking-wider transition duration-150"
            >
              EDIT
            </button>

            {/* EXISTING MEMBERS TOGGLE */}
            <button
              onClick={() => setIsMembersOpen(!isMembersOpen)}
              className={`px-3 py-1 rounded-full font-semibold text-xs tracking-wider transition duration-150 ${
                isMembersOpen
                  ? "bg-gray-600 text-teal-400"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {isMembersOpen ? "CLOSE" : "MEMBERS"}
            </button>

             {/* EXISTING DELETE BUTTON */}
             <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-400 border border-red-500 hover:bg-red-900/50 px-3 py-1 rounded-full font-semibold text-xs tracking-wider transition duration-150 disabled:opacity-50"
            >
              {isDeleting ? "..." : "DELETE"}
            </button>
          </div>
        </td>
      </tr>

      {/* Collapsible Members Row */}
      {isMembersOpen && (
        <tr className="bg-gray-800/80">
          <td colSpan={6} className="px-6 py-4 border-t border-teal-400/30">
            <h4 className="text-sm font-extrabold mb-2 text-teal-400 tracking-wider">
              Team Member ({team.members.length})
            </h4>
            {team.members.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                {team.members.map((member) => (
                  <li key={member.member_id} className="text-sm">
                    <span className="font-mono text-teal-400/90"></span> <span className="font-semibold">{member.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm italic text-red-400/80">NO MEMBER RECORDS DETECTED.</p>
            )}
          </td>
        </tr>
      )}
    </>
  );
};

export default TeamRow;
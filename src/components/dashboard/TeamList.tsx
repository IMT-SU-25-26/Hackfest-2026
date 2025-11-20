// app/admin/teams/TeamList.tsx
"use client";

import { useState, useEffect } from "react";
import EditTeamModal from "./EditTeamModal";
import TeamRow from "./TeamRow";
import { Member, Team } from "@/generated/prisma";
import { getAllTeams } from "@/lib/services/team";

// Extend the Prisma Team type to include members for type safety
type TeamWithMembers = Team& { members: Member[] };

const TeamList: React.FC = () => {
  const [teams, setTeams] = useState<TeamWithMembers[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTeam, setEditingTeam] = useState<TeamWithMembers | null>(null);

  // Function to fetch data
  const fetchTeams = async () => {
    setLoading(true);
    try {
      // The getAllTeams function is assumed to be defined as in the prompt's context
      const fetchedTeams = await getAllTeams();
      setTeams(fetchedTeams);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
      // Handle error display for user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  // Handler for successful deletion/update to refresh the list
  const handleActionSuccess = () => {
    fetchTeams();
    setEditingTeam(null);
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <p>Loading teams...</p>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold">No Teams Registered 😞</h2>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-teal-400 tracking-widest">
        SYSTEM ADMIN ACCESS: REGISTERED TEAMS 🌐
      </h1>
      <div className="overflow-x-auto bg-gray-800 shadow-2xl rounded-lg ring-1 ring-teal-400/50">
        <table className="min-w-full divide-y divide-teal-400/30">
          <thead className="bg-gray-700/50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-teal-400 uppercase tracking-wider w-10"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-teal-400 uppercase tracking-wider"
              >
                Team Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-teal-400 uppercase tracking-wider"
              >
                University
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-teal-400 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-teal-400 uppercase tracking-wider"
              >
                Line ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-teal-400 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-teal-400/10">
            {teams.map((team, index) => (
              <TeamRow
                key={team.team_id}
                team={team}
                index={index + 1}
                onDeleteSuccess={handleActionSuccess}
                onEditClick={() => setEditingTeam(team)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingTeam && (
        <EditTeamModal
          team={editingTeam}
          onClose={() => setEditingTeam(null)}
          onUpdateSuccess={handleActionSuccess}
        />
      )}
    </div>
  );
};

export default TeamList;
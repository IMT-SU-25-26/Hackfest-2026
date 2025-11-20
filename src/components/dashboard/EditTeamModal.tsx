// app/admin/teams/EditTeamModal.tsx
"use client";

import { useState } from "react";
import { updateTeam } from "@/lib/services/team";
import { Team } from "@/generated/prisma";

// Define the input type for the form
// This should match the structure of your UpdateTeamInput
interface FormInput {
  team_name: string;
  country: string;
  university: string;
  phone_number: string;
  line_id: string;
}

interface EditTeamModalProps {
  team: Team;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({
  team,
  onClose,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState<FormInput>({
    team_name: team.team_name,
    country: team.country,
    university: team.university,
    phone_number: team.phone_number,
    line_id: team.line_id,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Pass the team's ID and the updated data to the server action
      // We are casting formData to 'any' here since the exact UpdateTeamInput type is not provided.
      const result = await updateTeam(team.team_id, formData);

      if (result.success) {
        alert(result.message);
        onUpdateSuccess(); // Refresh list and close modal
      } else {
        setError(result.error || "Failed to update team.");
      }
    } catch (err) {
      setError("An unexpected error occurred during the update.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative p-8 border w-full max-w-lg shadow-2xl rounded-lg bg-gray-800 border-teal-400/50">
        <div className="mt-3 text-center">
          <h3 className="text-xl leading-6 font-bold text-teal-400 mb-6 tracking-wide">
            EDIT TEAM RECORD: {team.team_id.slice(0, 8)}...
          </h3>
          <div className="px-7 py-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Fields */}
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-300">
                  Team Name
                </label>
                <input
                  type="text"
                  name="team_name"
                  value={formData.team_name}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 focus:border-teal-400 focus:ring-teal-400 text-white rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div className="text-left">
                <label className="block text-sm font-medium text-gray-300">
                  University
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 focus:border-teal-400 focus:ring-teal-400 text-white rounded-md shadow-sm p-2"
                  required
                />
              </div>
              
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 focus:border-teal-400 focus:ring-teal-400 text-white rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div className="text-left">
                <label className="block text-sm font-medium text-gray-300">
                  Line ID
                </label>
                <input
                  type="text"
                  name="line_id"
                  value={formData.line_id}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 focus:border-teal-400 focus:ring-teal-400 text-white rounded-md shadow-sm p-2"
                  required
                />
              </div>

              {/* Error Display */}
              {error && (
                <p className="text-red-400 text-sm italic text-left pt-2">
                  <span className="font-bold">ERROR:</span> {error}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition duration-150"
                  disabled={isSubmitting}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-500 disabled:opacity-50 transition duration-150"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "TRANSMITTING..." : "SAVE CHANGES"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeamModal;
// app/admin/teams/EditTeamModal.tsx
"use client";

import { useState } from "react";
import { updateUser } from "@/lib/services/user";
import { User } from "@/generated/prisma";

// Define the input type for the form
// This should match the structure of your UpdateUserInput
interface FormInput {
  name: string;
  country: string;
  institution: string;
  phone_number: string;
  line_id: string;
}

interface EditTeamModalProps {
  user: User;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({
  user,
  onClose,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState<FormInput>({
    name: user.name,
    country: user.country,
    institution: user.institution || "",
    phone_number: user.phone_number,
    line_id: user.line_id,
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
      // Pass the user's ID and the updated data to the server action
      // We are casting formData to 'any' here since the exact UpdateUserInput type is not provided.
      const result = await updateUser(user.id, formData);

      if (result.success) {
        alert(result.message);
        onUpdateSuccess(); // Refresh list and close modal
      } else {
        const errorMessage = Array.isArray(result.error) ? result.error.join(", ") : (result.error || "Failed to update team.");
        setError(errorMessage);
      }
    } catch {
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
            EDIT TEAM RECORD: {user.id.slice(0, 8)}...
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 focus:border-teal-400 focus:ring-teal-400 text-white rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div className="text-left">
                <label className="block text-sm font-medium text-gray-300">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
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

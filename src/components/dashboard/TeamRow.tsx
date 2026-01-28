import React, { useState } from "react";
import { deleteUser } from "@/lib/services/user"; 
import { User } from "@/generated/prisma";
import { toast } from "react-toastify";

interface TeamRowProps {
  user: User;
  index: number;
  onDeleteSuccess: () => void;
  onEditClick: () => void;
}

const TeamRow: React.FC<TeamRowProps> = ({
  user,
  index,
  onDeleteSuccess,
  onEditClick,
}) => {

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete team: ${user.name}?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      // Assuming deleteUser is imported correctly
      const result = await deleteUser(user.id);
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
          {user.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          {user.institution}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          {user.phone_number}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          {user.line_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
          {/* Added flex-wrap to handle multiple buttons on smaller screens */}
          <div className="flex justify-center items-center gap-2 flex-wrap">
            
            {/* --- NEW BUTTON: POSTER --- */}
            <a
              href={user.poster_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-full font-semibold text-xs tracking-wider transition duration-150 no-underline"
            >
              POSTER
            </a>

            {/* --- NEW BUTTON: TWIBBON --- */}
            <a
              href={user.twibbon_url}
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
    </>
  );
};

export default TeamRow;

"use client";

import React, { useState } from "react";
import { User } from "@/generated/prisma";
import { Eye, Trash2, Pencil, Key } from "lucide-react";
import { toast } from "react-toastify";
import { deleteUser } from "../actions";

interface UserRowProps {
  user: User;
  onViewPoster: (element: { url: string; title: string }) => void;
  onViewTwibbon: (element: { url: string; title: string }) => void;
  onEdit: (user: User) => void;
  onUpdatePassword: (user: User) => void;
  onDelete: () => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onViewPoster, onViewTwibbon, onEdit, onUpdatePassword, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    if (loading) return;
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    setLoading(true);
    const result = await deleteUser(user.id);
    setLoading(false);

    if (result.success) {
      setIsDeleted(true);
      toast.success("User deleted successfully");
      onDelete(); 
    } else {
      toast.error(result.error || "Failed to delete user");
    }
  };

  if (isDeleted) return null;

  return (
    <tr className="hover:bg-white/5 transition-colors border-b border-[#05C174]/20 font-spacemono text-sm">
      <td className="px-6 py-4 whitespace-nowrap text-white">{user.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-[#05B0C1]">{(user as any).team?.name || "-"}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
        <div>{user.phone_number}</div>
        <div className="text-xs text-gray-500">{user.line_id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.institution || "-"}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.studentId || "-"}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.gender || "-"}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
            <button
                onClick={() => onEdit(user)}
                className="p-1.5 rounded-full hover:bg-[#05C174]/20 text-[#05C174] transition-colors"
                title="Edit User"
            >
                <Pencil size={18} />
            </button>
            <button
                onClick={() => onUpdatePassword(user)}
                className="p-1.5 rounded-full hover:bg-[#05B0C1]/20 text-[#05B0C1] transition-colors"
                title="Update Password"
            >
                <Key size={18} />
            </button>
            {user.poster_url && (
                 <button
                 onClick={() => onViewPoster({ url: user.poster_url!, title: "Poster Preview" })}
                 className="p-1.5 rounded-full hover:bg-[#05C174]/20 text-[#05C174] transition-colors"
                 title="Preview Poster"
               >
                 <span className="text-xs font-bold border border-[#05C174] px-2 py-1 rounded">POSTER</span>
               </button>
            )}
            {user.twibbon_url && (
                <button
                onClick={() => onViewTwibbon({ url: user.twibbon_url!, title: "Twibbon Preview" })}
                className="p-1.5 rounded-full hover:bg-[#05C174]/20 text-[#05C174] transition-colors"
                title="Preview Twibbon"
              >
                 <span className="text-xs font-bold border border-[#05C174] px-2 py-1 rounded">TWIBBON</span>
              </button>
            )}
         
          <button
            onClick={handleDelete}
            disabled={loading}
            className="p-1.5 rounded-full hover:bg-red-700/20 text-red-600 transition-colors disabled:opacity-50"
            title="Delete User"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;

"use client";

import React from "react";
import { User } from "@/generated/prisma";
import UserRow from "./UserRow";

interface UserTableProps {
  users: User[];
  onViewPoster: (element: { url: string; title: string }) => void;
  onViewTwibbon: (element: { url: string; title: string }) => void;
  onEdit: (user: User) => void;
  onUpdatePassword: (user: User) => void;
  onDelete: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onViewPoster, onViewTwibbon, onEdit, onUpdatePassword, onDelete }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-left">
        <thead className="bg-[#05C174]/10 text-[#05C174] font-audiowide uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 border-b border-[#05C174]">Name</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Email</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Phone</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Institution</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Student ID</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Gender</th>
            <th className="px-6 py-3 border-b border-[#05C174]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#05C174]/10">
          {users.length > 0 ? (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onViewPoster={onViewPoster}
                onViewTwibbon={onViewTwibbon}
                onEdit={onEdit}
                onUpdatePassword={onUpdatePassword}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-gray-400 font-spacemono">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

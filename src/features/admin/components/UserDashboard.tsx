"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/generated/prisma";
import { Search, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { getUsers } from "../actions";
import UserTable from "./UserTable";
import ImagePreviewModal from "./ImagePreviewModal";
import EditUserModal from "./EditUserModal";
import UpdatePasswordModal from "./UpdatePasswordModal";
import { useDebounce } from "@/features/admin/hooks/useDebounce";

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // For Preview Modal
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [passwordUpdateUser, setPasswordUpdateUser] = useState<User | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  const fetchData = async () => {
    setLoading(true);
    const result = await getUsers(debouncedSearch);
    if (result.success && result.data) {
      setUsers(result.data as User[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [debouncedSearch]);

  const handleExportToExcel = () => {
    const dataToExport = users.map((user: any) => {
      return {
        "Name": user.name || "",
        "Team Name": user.team?.name || "-",
        "Email": user.email || "",
        "Phone": user.phone_number || "",
        "Institution": user.institution || "-",
        "Date of Birth": user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "-",
        "Student ID": user.studentId || "-",
        "Gender": user.gender || "-",
        "Major": user.major || "-",
        "Line ID": user.line_id || "",
        "Category Team": user.team?.category === "UIUX" ? "UI/UX" : user.team?.category === "HACKATON" ? "HACKATHON" : "-",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    
    const filename = `Users_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  return (
    <div className="w-full space-y-6 text-white">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#05C174]">
                <Search size={18}/>
            </div>
            <input
                type="text"
                placeholder="Search by name, email, phone, institution, or student ID..."
                className="w-full bg-[#090223] border border-[#05C174] text-white pl-10 pr-4 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-[#05C174] font-spacemono placeholder-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
      </div>

      {/* User Count & Export */}
      <div className="flex justify-between items-center font-spacemono text-[#05C174]">
        <button
            onClick={handleExportToExcel}
            className="flex items-center gap-2 px-4 py-2 border border-[#05C174] hover:bg-[#05C174]/10 transition-all text-sm uppercase group"
        >
            <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
            Export to Excel
        </button>
        <span>Showing {users.length} user(s)</span>
      </div>

      {/* Table Content */}
      <div className="border border-[#05C174] bg-[#090223]/50 backdrop-blur-sm min-h-[400px] relative">
        {loading && (
            <div className="absolute inset-0 bg-[#090223]/80 z-10 flex items-center justify-center">
                <div className="text-[#05C174] font-audiowide animate-pulse">LOADING USER DATA...</div>
            </div>
        )}
        <UserTable 
            users={users} 
            onViewPoster={setPreviewImage}
            onViewTwibbon={setPreviewImage}
            onEdit={setEditingUser}
            onUpdatePassword={setPasswordUpdateUser}
            onDelete={fetchData}
        />
      </div>

      {/* Modals */}
      {previewImage && (
        <ImagePreviewModal 
            imageUrl={previewImage.url} 
            title={previewImage.title}
            onClose={() => setPreviewImage(null)} 
        />
      )}
      
      {editingUser && (
        <EditUserModal 
            user={editingUser} 
            onClose={() => setEditingUser(null)} 
            onSuccess={() => {
                fetchData();
                setEditingUser(null);
            }} 
        />
      )}

      {passwordUpdateUser && (
        <UpdatePasswordModal 
            user={passwordUpdateUser} 
            onClose={() => setPasswordUpdateUser(null)} 
            onSuccess={() => {
                setPasswordUpdateUser(null);
            }} 
        />
      )}
    </div>
  );
}

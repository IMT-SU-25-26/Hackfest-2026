"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "@/components/auth/FormInput";
import { addMemberToTeam } from "../actions";
import { toast } from "react-toastify";
import { X, Mail } from "lucide-react";

interface AddMemberModalProps {
  teamId: string;
  onClose: () => void;
  onSuccess: () => void;
}

type FormValues = {
  email: string;
};

export default function AddMemberModal({ teamId, onClose, onSuccess }: AddMemberModalProps) {
  const methods = useForm<FormValues>();

  const { handleSubmit, formState: { isSubmitting }, setError } = methods;

  const onSubmit = async (data: FormValues) => {
    const result = await addMemberToTeam(teamId, data.email);
    if (result.success) {
      toast.success("Member added successfully");
      onSuccess();
      onClose();
    } else {
      const errorMessage = result.error || "Failed to add member";
      toast.error(errorMessage);
      setError("email", { 
        type: "manual", 
        message: errorMessage 
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090223]/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-[#090223] border border-[#05C174] p-6 shadow-[0_0_20px_rgba(5,193,116,0.3)]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#05C174] hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl text-[#05B0C1] font-audiowide mb-6 text-center">Add Team Member</h2>
        <p className="text-gray-400 font-spacemono text-sm text-center mb-6">
          Enter the email address of the user you want to add to this team. The user must be registered and not currently in a team.
        </p>
        
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="Enter user email"
              icon={Mail}
              rules={{ 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
            />
            
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-6 py-2 text-white font-spacemono hover:text-[#05C174] transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#05C174] text-[#090223] font-audiowide hover:bg-[#05B0C1] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "ADDING..." : "ADD MEMBER"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

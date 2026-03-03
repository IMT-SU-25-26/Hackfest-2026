"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { User } from "@/generated/prisma";
import FormInput from "@/components/auth/FormInput";
import { updateUserPassword } from "../actions";
import { toast } from "react-toastify";
import { X, Lock } from "lucide-react";

interface UpdatePasswordModalProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

export default function UpdatePasswordModal({ user, onClose, onSuccess }: UpdatePasswordModalProps) {
  const methods = useForm<FormValues>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, watch, formState: { isSubmitting } } = methods;
  const newPassword = watch("newPassword");

  const onSubmit = async (data: FormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await updateUserPassword(user.id, data.newPassword);
    if (result.success) {
      toast.success("User password updated successfully");
      onSuccess();
      onClose();
    } else {
      toast.error(result.error || "Failed to update user password");
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
        
        <h2 className="text-2xl text-[#05B0C1] font-audiowide mb-6 text-center">Update Password for {user.name}</h2>
        
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              id="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter new password"
              icon={Lock}
              rules={{ 
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              }}
            />
            
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter new password"
              icon={Lock}
              rules={{ 
                required: "Please confirm your new password",
                validate: (value) => value === newPassword || "Passwords do not match"
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
                {isSubmitting ? "UPDATING..." : "UPDATE PASSWORD"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

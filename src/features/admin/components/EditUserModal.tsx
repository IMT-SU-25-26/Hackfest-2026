"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { User } from "@/generated/prisma";
import FormInput from "@/components/auth/FormInput";
import { updateUser } from "../actions";
import { toast } from "react-toastify";
import { X, User as UserIcon, Mail, Phone } from "lucide-react";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

type FormValues = {
  name: string;
  email: string;
  phone_number: string;
};

export default function EditUserModal({ user, onClose, onSuccess }: EditUserModalProps) {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = async (data: FormValues) => {
    const result = await updateUser(user.id, data);
    if (result.success) {
      toast.success("User updated successfully");
      onSuccess();
      onClose();
    } else {
      toast.error(result.error || "Failed to update user");
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
        
        <h2 className="text-2xl text-[#05B0C1] font-audiowide mb-6 text-center">Review Data Update</h2>
        
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              id="name"
              label="Full Name"
              placeholder="Enter full name"
              icon={UserIcon}
              rules={{ required: "Name is required" }}
            />
            
            <FormInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              icon={Mail}
              rules={{ 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
            />
            
            <FormInput
              id="phone_number"
              label="Phone Number"
              placeholder="Enter phone number"
              icon={Phone}
              rules={{ required: "Phone number is required" }}
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
                {isSubmitting ? "UPDATING..." : "UPDATE USER"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

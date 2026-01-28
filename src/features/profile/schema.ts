import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  studentId: z.string().min(1, "Student ID is required"),
  major: z.string().min(1, "Major is required"),
  institution: z.string().min(1, "Institution is required"),
  country: z.string().min(1, "Country is required"),
  dateOfBirth: z.date().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone_number: z.string().min(1, "WhatsApp number is required"),
  line_id: z.string().min(1, "Line ID is required"),
  email: z.string().email("Invalid email address"),
  id_card: z.string().url("ID Card must be a valid URL").min(1, "ID Card is required"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

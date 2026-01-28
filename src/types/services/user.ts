import { User } from "@/generated/prisma";
import z from "zod";

// User Schema for Validation
export const createUserSchema =  z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(50, "Name must be at most 50 characters"),
    
    country: z
        .string()
        .min(1, "Country is required")
        .max(100, "Country must be at most 100 characters"),

    university: z
        .string()
        .max(100, "University must be at most 100 characters")
        .optional(),

    phone_number: z
        .string()
        .min(7 ,"Phone number must be at least 7 characters")
        .max(15, "Phone number must be at most 15 characters"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),

    line_id: z
        .string()
        .min(1, "Line ID is required")
        .max(100, "Line ID must be at most 100 characters"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be at most 100 characters"),

    poster_url: z
        .string()
        .min(1, "Poster URL is required")
        .url("Invalid Poster Url"),

    twibbon_url: z
        .string()
        .min(1, "Twibbon URL is required")
        .url("Invalid twibbon URL"),

    proposal_url: z
        .string()
        .url("Invalid Proposal URL")
        .optional(),
    
})
export const updateUserSchema = createUserSchema.partial();

// Types based on Validation Schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;


// type for returned user
export interface UserResult extends User {
    // team?: Team // Optional: include team if needed
}

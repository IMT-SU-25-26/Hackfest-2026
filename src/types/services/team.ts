import { Member, Team } from "@/generated/prisma";
import z from "zod";

// Team Schema for Validation
export const createTeamSchema =  z.object({
    team_name: z
        .string()
        .min(1, "Team name is required")
        .max(50, "Team name must be at most 50 characters"),
    
    country: z
        .string()
        .min(1, "Country is required")
        .max(100, "Country must be at most 100 characters"),

    university: z
        .string()
        .min(1, "University is required")
        .max(100, "University must be at most 100 characters"),

    phone_number: z
        .string()
        .min(7 ,"Phone number is required")
        .max(15, "Phone number must be at most 15 characters"),

    line_id: z
        .string()
        .min(1, "Line ID is required")
        .max(100, "Line ID must be at most 100 characters"),

    password: z
        .string()
        .min(8)
        .max(100),

    proposal_url: z
        .string()
        .url("Invalid URL")
        .optional(),
    
})
export const updateTeamSchema = createTeamSchema.partial();

// Types based on Validation Schemas
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;


// type for returned team
export interface TeamResult extends Team {
    members: Member[]
}
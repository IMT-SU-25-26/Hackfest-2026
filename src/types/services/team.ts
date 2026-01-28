import { Team, User } from "@/generated/prisma";
import z from "zod";

// Team Schema for Validation
export const createTeamSchema = z.object({
  name: z
    .string()
    .min(1, "Team Name is required")
    .max(50, "Team Name must be at most 50 characters"),
  
  category: z.enum(["UIUX", "HACKATON"], {
    message: "Category must be either UIUX or HACKATON",
  }),

  phone: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .max(15, "Phone number must be at most 15 characters"),

  line_id: z
    .string()
    .min(1, "Line ID is required")
    .max(100, "Line ID must be at most 100 characters"),
  
  payment_proof: z
    .string()
    .url("Invalid Payment Proof URL")
    .optional(),

  memberEmails: z.array(z.string().email()).optional(),
});

export const updateTeamSchema = createTeamSchema.partial();

// Types based on Validation Schemas
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;

// Type for returned team with members
export interface TeamResult extends Team {
  members: User[];
}

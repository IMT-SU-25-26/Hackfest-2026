import z from "zod";

// Member Schema for Validation
export const createMemberSchema = z.object({
    name: z
        .string()
        .min(3)
        .max(100),
    
    team_id: z
        .string()
})
export const updateMemberSchema = createMemberSchema.partial();

// Types based on Validation Schemas
export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
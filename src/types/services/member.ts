import z from "zod";

// Member Schema for single member registration
export const createMemberSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must be at most 100 characters"),
    
    team_id: z
        .string()
})
export const updateMemberSchema = createMemberSchema.partial();

// Types based on Validation Schemas
export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;

// Member Schema for bulk member registration
export const registerAllMemberSchema = z.object({
  names: z.array(
    z.string().min(3).max(100)
  ),
  team_id: z.string()
});
export type RegisterAllMemberInput = z.infer<typeof registerAllMemberSchema>;
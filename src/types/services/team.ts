import z from "zod";

export const createTeamSchema =  z.object({
    team_name: z
        .string()
        .min(3)
        .max(50),
    
    country: z
        .string()
        .min(2)
        .max(56),

    university: z
        .string()
        .min(2)
        .max(100),

    phone_number: z
        .string()
        .min(7)
        .max(15),

    line_id: z
        .string()
        .min(3)
        .max(50),

    password: z
        .string()
        .min(8)
        .max(100),

    proposal_url: z
        .string()
        .url()
    
})

export const updateTeamSchema = createTeamSchema.partial();

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;



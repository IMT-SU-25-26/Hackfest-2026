import { Member } from "@/generated/prisma/client";
import { ActionResult } from "@/types/action";
import {
    CreateMemberInput,
    createMemberSchema,
    UpdateMemberInput,
    updateMemberSchema,
} from "@/types/services/member";
import prisma from "../prisma";

export async function getMemberById(id: string): Promise<Member | null> {
    return prisma.member.findUnique({
        where: { member_id: id },
    });
}

export async function registerMember(
    data: CreateMemberInput
): Promise<ActionResult<Member>> {
    const validation = createMemberSchema.safeParse(data);

    if (!validation.success) {
        const errors = validation.error.issues
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", ");
        return { success: false, error: `Validation failed: ${errors}` };
    }

    try {
        const member = await prisma.member.create({
            data: validation.data,
        });

        return {
            success: true,
            data: member,
            message: "Member created successfully",
        };
    } catch (error) {
        return {
            success: false,
            error: `Database error: ${error}`,
        };
    }
}

export async function registerAllMember(
    data: CreateMemberInput[]
): Promise<ActionResult<Member[]>> {
    for (const item of data) {
        const validation = createMemberSchema.safeParse(item);
        if (!validation.success) {
            const errors = validation.error.issues
                .map((e) => `${e.path.join(".")}: ${e.message}`)
                .join(", ");
            return {
                success: false,
                error: `Validation failed: ${errors}`,
            };
        }
    }

    try {
        // Prisma createMany does NOT return created rows, only a count
        const result = await prisma.member.createMany({ data });

        return {
            success: true,
            data: [], // we can’t get the created rows directly here
            message: `Successfully created ${result.count} members`,
        };
    } catch (err) {
        return { success: false, error: err as string };
    }
}

export async function updateMember(
    id: string,
    data: UpdateMemberInput
): Promise<ActionResult<Member>> {
    const validation = updateMemberSchema.safeParse(data);

    if (!validation.success) {
        const errors = validation.error.issues
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", ");
        return { success: false, error: `Validation failed: ${errors}` };
    }

    try {
        const updated = await prisma.member.update({
            where: { member_id: id },
            data: validation.data,
        });

        return {
            success: true,
            data: updated,
            message: "Member updated successfully",
        };
    } catch (err) {
        return { success: false, error: err as string };
    }
}

export async function deleteMember(
    member_id: string
): Promise<ActionResult<null>> {
    try {
        await prisma.member.delete({ where: { member_id } });
        return { success: true, message: "Member deleted successfully" };
    } catch (err) {
        return { success: false, error: err as string };
    }
}

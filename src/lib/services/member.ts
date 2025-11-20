'use server';

import { Member } from "@/generated/prisma/client";
import { ActionResult } from "@/types/action";
import {
    CreateMemberInput,
    createMemberSchema,
    RegisterAllMemberInput,
    registerAllMemberSchema,
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
  data: RegisterAllMemberInput
): Promise<ActionResult<Member[]>> {

  // 1. Validate request body
  const validation = registerAllMemberSchema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.issues
      .map((e) => `${e.path.join(".")}: ${e.message}`)
      .join(", ");
    return { success: false, error: `Validation failed: ${errors}` };
  }

  const { names, team_id } = validation.data;

  // 2. Transform into array for createMany
  const membersToCreate = names.map((name) => ({
    name,
    team_id,
  }));

  try {
    // 3. Insert into database
    const result = await prisma.member.createMany({
      data: membersToCreate,
    });

    return {
      success: true,
      message: `Successfully created ${result.count} members`,
      data: [],
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

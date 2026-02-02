'use server';

import { CreateTeamInput, createTeamSchema, TeamResult, UpdateTeamInput, updateTeamSchema } from "@/types/services/team";
import prisma from "../config/prisma";
import { ActionResult } from "@/types/action";
import { revalidatePath } from "next/cache";
import { handlePrismaError } from "../utils/handlePrismaError";

export async function getAllTeams(): Promise<TeamResult[]> {
  return await prisma.team.findMany({
    include: { members: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getTeamById(id: string): Promise<TeamResult | null> {
  return await prisma.team.findUnique({
    where: { id },
    include: { members: true },
  });
}

export async function createTeam(
  data: CreateTeamInput
): Promise<ActionResult<TeamResult>> {
  const validation = createTeamSchema.safeParse(data);
  if (!validation.success) {
    const errorsArray = validation.error.issues.map(
      (err) => `${err.message}`
    );

    return {
      success: false,
    };
  }

  if (!validation.data.memberEmails || validation.data.memberEmails.length < 2) {
    return {
      success: false,
      error: "Team must have at least 2 members",
    };
  }

  try {
    const { memberEmails, ...teamData } = validation.data;

    const team = await prisma.team.create({
      data: {
        ...teamData,
        members: memberEmails && memberEmails.length > 0 ? {
          connect: memberEmails.map(email => ({ email }))
        } : undefined
      },
      include: { members: true },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: team,
      message: "Team created successfully",
    };
  } catch (error) {
    console.log("Error Create Team: \n"+error)
    return {
      success: false,
      error: handlePrismaError(error),
    };
  }
}

export async function updateTeam(
  id: string,
  data: UpdateTeamInput
): Promise<ActionResult<TeamResult>> {
  const validation = updateTeamSchema.safeParse(data);
  if (!validation.success) {
    const errorsArray = validation.error.issues.map(
      (err) => `${err.message}`
    );

    return {
      success: false,
      error: errorsArray,
    };
  }

  try {
    const team = await prisma.team.update({
      where: { id },
      data: validation.data,
      include: { members: true },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: team,
      message: "Team updated successfully",
    };
  } catch (error) {
    console.log("Error Update Team: \n"+error)
    return {
      success: false,
      error: handlePrismaError(error),
    };
  }
}

export async function deleteTeam(
  id: string
): Promise<ActionResult<null>> {
  try {
    await prisma.team.delete({
      where: { id },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Team deleted successfully",
    };
  } catch (error) {
    console.log("Error Delete Team: \n"+error)
    return {
      success: false,
      error: handlePrismaError(error),
    };
  }
}

export async function addMemberToTeam(
  teamId: string,
  userId: string
): Promise<ActionResult<TeamResult>> {
  try {
    const team = await prisma.team.update({
      where: { id: teamId },
      data: {
        members: {
          connect: { id: userId }
        }
      },
      include: { members: true }
    });
    
    revalidatePath("/dashboard");

    return {
      success: true,
      data: team,
      message: "Member added to team successfully"
    };

  } catch (error) {
    console.log("Error Add Member to Team: \n"+error)
    return {
      success: false,
      error: handlePrismaError(error),
    };
  }
}

export async function removeMemberFromTeam(
  teamId: string,
  userId: string
): Promise<ActionResult<TeamResult>> {
  try {
    const team = await prisma.team.update({
      where: { id: teamId },
      data: {
        members: {
          disconnect: { id: userId }
        }
      },
      include: { members: true }
    });
    
    revalidatePath("/dashboard");

    return {
      success: true,
      data: team,
      message: "Member removed from team successfully"
    };

  } catch (error) {
    console.log("Error Remove Member from Team: \n"+error)
    return {
      success: false,
      error: handlePrismaError(error),
    };
  }
}

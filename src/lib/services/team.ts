'use server';

import { CreateTeamInput, createTeamSchema, TeamResult, UpdateTeamInput, updateTeamSchema } from "@/types/services/team";
import prisma from "../config/prisma";
import { ActionResult } from "@/types/action";
import { revalidatePath } from "next/cache";
import { handlePrismaError } from "../utils/handlePrismaError";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth";


const MAX_TEAM_CAPACITY_HACKATHON = 50;
const MAX_TEAM_CAPACITY_UIUX = 40;

const getCapacityByCategory = (category: string) => 
  category === "UIUX" ? MAX_TEAM_CAPACITY_UIUX : MAX_TEAM_CAPACITY_HACKATHON;


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

  // check if current logged email is not in memberEmails, then add the logged email to memberEmails
  const session = await getServerSession(authOptions);
  const loggedEmail = session?.user?.email;

  if (loggedEmail) {
    if (!validation.data.memberEmails) {
      validation.data.memberEmails = [loggedEmail];
    } else if (!validation.data.memberEmails.includes(loggedEmail)) {
      validation.data.memberEmails = [loggedEmail, ...validation.data.memberEmails];
    }
  }

  // if member < 2 or member > 5 , return false
  if (!validation.data.memberEmails || validation.data.memberEmails.length < 2) {
    return {
      success: false,
      error: "Team must have at least 2 members",
    };
  }else if (validation.data.memberEmails.length > 5) {
    return {
      success: false,
      error: "Team must have at most 5 members",
    };
  }

  try {
    const existingTeam = await prisma.team.findFirst({
      where: {
        name: {
          equals: validation.data.name,
          mode: 'insensitive',
        },
      },
    });

    if (existingTeam) {
      return {
        success: false,
        error: "Team name already taken",
      };
    }

    const teamCount = await prisma.team.count({
      where: {
        category: validation.data.category,
        status: { not: "REJECTED" }
      }
    });

    const maxCapacity = getCapacityByCategory(validation.data.category);
    if (teamCount >= maxCapacity) {
      return {
        success: false,
        error: `${validation.data.category === "UIUX" ? "UI/UX" : "Hackathon"} category has reached its maximum capacity of ${maxCapacity} teams.`,
      };
    }

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

export async function isTeamFullByCategory(category: "HACKATON" | "UIUX"): Promise<boolean> {
  try {
    const count = await prisma.team.count({
      where: { 
        category,
        status: { not: "REJECTED" }
      },
    });
    const maxCapacity = getCapacityByCategory(category);
    return count >= maxCapacity;
  } catch (error) {
    console.error("Error checking team capacity:", error);
    return true; // Default to full on error to prevent over-registration
  }
}
export async function getRemainingSlots(category: "HACKATON" | "UIUX"): Promise<{remainingSlots: number, maximumSlots: number}> {
  try {
    const count = await prisma.team.count({
      where: { 
        category,
        status: { not: "REJECTED" }
      },
    });
    const maxCapacity = getCapacityByCategory(category);
    return {remainingSlots: Math.max(0, maxCapacity - count), maximumSlots: maxCapacity};
  } catch (error) {
    console.error("Error getting remaining slots:", error);
    return {remainingSlots: 0, maximumSlots: 0}; // Default to 0 on error
  }
}

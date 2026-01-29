"use server";

import prisma from "@/lib/config/prisma";
import { TeamStatus, TeamCategory } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function getTeams(query: string = "", status?: TeamStatus, category?: TeamCategory) {
  try {
    const where: any = {
      name: {
        contains: query,
        mode: "insensitive",
      },
    };

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    const teams = await prisma.team.findMany({
      where,
      include: {
        members: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: teams };
  } catch (error) {
    console.error("Error fetching teams:", error);
    return { success: false, error: "Failed to fetch teams" };
  }
}

export async function updateTeamStatus(teamId: string, status: TeamStatus) {
  try {
    await prisma.team.update({
      where: { id: teamId },
      data: { status },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating team status:", error);
    return { success: false, error: "Failed to update team status" };
  }
}

export async function updateTeamFinalistStatus(teamId: string, isFinalist: boolean) {
  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: { category: true }
    });

    const data: any = { isFinalist };

    if (isFinalist && team?.category === "HACKATON") {
        data.status = "PENDING";
    }

    await prisma.team.update({
      where: { id: teamId },
      data,
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating team finalist status:", error);
    return { success: false, error: "Failed to update team finalist status" };
  }
}

export async function deleteTeam(teamId: string) {
  try {
    await prisma.team.delete({
      where: { id: teamId },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting team:", error);
    return { success: false, error: "Failed to delete team" };
  }
}

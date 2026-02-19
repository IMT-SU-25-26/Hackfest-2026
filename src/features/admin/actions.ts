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

export async function getUsers(query: string = "") {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { phone_number: { contains: query, mode: "insensitive" } },
          { institution: { contains: query, mode: "insensitive" } },
          { studentId: { contains: query, mode: "insensitive" } },
        ],
        role: "USER" // Only fetch regular users, not admins
      },
      orderBy: {
        name: "asc",
      },
    });
    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    revalidatePath("/dashboard/user");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

export async function updateUser(userId: string, data: { name: string; email: string; phone_number: string }) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data,
    });
    revalidatePath("/dashboard/user");
    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export async function addMemberToTeam(teamId: string, email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (user.teamId) {
      return { success: false, error: "User is already in a team" };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { teamId },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error adding member to team:", error);
    return { success: false, error: "Failed to add member to team" };
  }
}

export async function removeMemberFromTeam(userId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { teamId: null },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error removing member from team:", error);
    return { success: false, error: "Failed to remove member from team" };
  }
}




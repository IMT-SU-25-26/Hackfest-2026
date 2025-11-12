import { CreateTeamInput, createTeamSchema, UpdateTeamInput, updateTeamSchema } from "@/types/services/team";
import prisma from "../prisma";
import { ActionResult } from "@/types/action";
import { Team } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

export async function getAllTeams(): Promise<Team[]> {
  return await prisma.team.findMany({
    include: { members: true },
    orderBy: { team_id: "asc" },
  });
}

export async function getTeamById(id: string): Promise<Team | null> {
  return await prisma.team.findUnique({
    where: { team_id: id },
    include: { members: true },
  });
}

export async function registerTeam(
  data: CreateTeamInput
): Promise<ActionResult<Team>> {
  const validation = createTeamSchema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return {
      success: false,
      error: `Validation failed: ${errors}`,
    };
  }

  try {
    const team = await prisma.team.create({
      data: validation.data,
    });

    revalidatePath("/");

    return {
      success: true,
      data: team,
      message: "Team registered successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: `Database error: ${error}`,
    };
  }
}

export async function updateTeam(
  id: string,
  data: UpdateTeamInput
): Promise<ActionResult<Team>> {
  const validation = updateTeamSchema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return {
      success: false,
      error: `Validation failed: ${errors}`,
    };
  }

  try {
    const team = await prisma.team.update({
      where: { team_id: id },
      data: validation.data,
    });

    revalidatePath("/");

    return {
      success: true,
      data: team,
      message: "Team updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: `Database error: ${error}`,
    };
  }
}

export async function deleteTeam(
  id: string
): Promise<ActionResult<null>> {
  try {
    await prisma.team.delete({
      where: { team_id: id },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Team deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: `Database error: ${error}`,
    };
  }
}
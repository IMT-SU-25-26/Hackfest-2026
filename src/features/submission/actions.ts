'use server';

import prisma from "@/lib/config/prisma";
import { revalidatePath } from "next/cache";

const PRELIMINARY_DEADLINE = new Date("2026-04-01T23:59:00+07:00");
const FINAL_DEADLINE = new Date("2026-04-23T23:59:00+07:00");

const deadlineMessage = [
  "The clock has run out. The gates are barred, and our opportunity has officially vanished.",
  "A fatal delay. The deadline has claimed our submission, and the window is sealed shut.",
  "Missed by a breath. The silence of the closed deadline is absolute.",
  "Hard timeout. The submission window has expired, and there is no path back.",
  "The gavel has fallen. We are too late, and the door is locked."
]


export type SubmissionData = {
  originality_url?: string;
  proposal_url?: string;
  lean_canvas_url?: string;
  figma_url?: string;
  gdrive_url?: string;
};

export type FinalSubmissionData = {
  ppt_url?: string;
  github_url?: string;
  video_demo_url?: string;
  translated_figma_url?: string;
};

export async function submitPreliminary(teamId: string, data: SubmissionData) {
  const now = new Date();
  if (now > PRELIMINARY_DEADLINE) {
    const randomMessage = deadlineMessage[Math.floor(Math.random() * deadlineMessage.length)];
    return { success: false, error: randomMessage };
  }

  try {
    if (!teamId) {
      return { success: false, error: "Team ID is required" };
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: { status: true }
    });

    if (!team) {
      return { success: false, error: "Team not found" };
    }

    if (team.status !== "ACCEPTED") {
      return { success: false, error: "Your team has not been accepted yet. Please wait for admin approval." };
    }

    const updateData: any = {};
    if (data.originality_url) updateData.submission_originality_url = data.originality_url;
    if (data.proposal_url) updateData.submission_proposal_url = data.proposal_url;
    if (data.lean_canvas_url) updateData.submission_lean_canvas_url = data.lean_canvas_url;
    if (data.figma_url) updateData.submission_figma_url = data.figma_url;
    if (data.gdrive_url) updateData.submission_gdrive_url = data.gdrive_url;

    if (Object.keys(updateData).length === 0) {
        return { success: false, error: "No data provided for update" };
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: updateData,
    });

    revalidatePath("/submission/UIUX/preliminary");
    revalidatePath("/submission/hackaton/preliminary");
    revalidatePath("/dashboard");

    return { success: true, data: updatedTeam };
  } catch (error) {
    console.error("Error submitting preliminary:", error);
    return { success: false, error: "Failed to submit preliminary data" };
  }
}

export async function submitFinal(teamId: string, data: FinalSubmissionData) {
  const now = new Date();
  if (now > FINAL_DEADLINE) {
    const randomMessage = deadlineMessage[Math.floor(Math.random() * deadlineMessage.length)];
    return { success: false, error: randomMessage };
  }

  try {
    if (!teamId) {
      return { success: false, error: "Team ID is required" };
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: { status: true }
    });

    if (!team) {
      return { success: false, error: "Team not found" };
    }

    if (team.status !== "ACCEPTED") {
      return { success: false, error: "Your team has not been accepted yet. Please wait for admin approval." };
    }

    const updateData: any = {};
    if (data.ppt_url) updateData.submission_ppt_url = data.ppt_url;
    if (data.github_url) updateData.submission_github_url = data.github_url;
    if (data.video_demo_url) updateData.submission_video_demo_url = data.video_demo_url;
    if (data.translated_figma_url) updateData.submission_translated_figma_url = data.translated_figma_url;

    if (Object.keys(updateData).length === 0) {
        return { success: false, error: "No data provided for update" };
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: updateData,
    });

    revalidatePath("/submission/hackaton/final");
    revalidatePath("/dashboard");

    return { success: true, data: updatedTeam };
  } catch (error) {
    console.error("Error submitting final:", error);
    return { success: false, error: `Failed to submit final data.` };
  }
}

export async function getServerTime() {
  try {
    return { success: true, data: new Date().toISOString() };
  } catch (error) {
    console.error("Error fetching server time:", error);
    return { success: false, error: "Failed to fetch server time" };
  }
}

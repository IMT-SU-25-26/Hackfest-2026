"use server";

import prisma from "@/lib/config/prisma";
import { revalidatePath } from "next/cache";

export type SubmissionData = {
  submission_originality_url?: string | null;
  submission_lean_canvas_url?: string | null;
  submission_gdrive_url?: string | null;
  submission_proposal_url?: string | null;
  submission_figma_url?: string | null;
  submission_ppt_url?: string | null;
  submission_video_demo_url?: string | null;
  submission_github_url?: string | null;
};

export async function updateTeamSubmissions(teamId: string, data: SubmissionData) {
  try {
    // We clean up any undefined values or keep nulls based on what we send from the form
    await prisma.team.update({
      where: { id: teamId },
      data,
    });

    revalidatePath("/dashboard/submission/preliminary");
    revalidatePath("/dashboard/submission/final");

    return { success: true };
  } catch (error) {
    console.error("Error updating team submissions:", error);
    return { success: false, error: "Failed to update submissions" };
  }
}

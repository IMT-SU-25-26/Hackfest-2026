'use server';

import prisma from "@/lib/config/prisma";

export async function checkUserEmail(email: string): Promise<{ exists: boolean }> {
  if (!email) return { exists: false };
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, teamId: true }
    });
    
    // Check if user exists AND is not already in a team
    const canJoin = !!user && user.teamId === null;
    
    return { exists: canJoin };
  } catch (error) {
    console.error("Error checking email:", error);
    return { exists: false };
  }
}

export async function submitFinalRegistration(teamId: string, data: { surat_tugas_url: string, payment_proof: string }) {
  try {
    await prisma.team.update({
      where: { id: teamId },
      data: {
        surat_tugas_url: data.surat_tugas_url,
        payment_proof: data.payment_proof,
        // Since this is re-registration for finalists, maybe reset status or keep accepted?
        // User asked to upload payment proof again, implying a new fee. 
        // Assuming we keep status as ACCEPTED or logic handled elsewhere.
        // But usually payment requires verification.
        // For now just update fields.
        // Wait, if they pay again, status might need to go to PENDING if they need verification?
        // Requirement doesn't say. Stick to updating fields.
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error submitting final registration:", error);
    return { success: false, error: "Failed to submit final registration" };
  }
}

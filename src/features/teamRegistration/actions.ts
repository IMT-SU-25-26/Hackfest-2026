'use server';

import prisma from "@/lib/config/prisma";

export async function checkUserEmail(email: string): Promise<{ exists: boolean, idCardFilled?: boolean }> {
  if (!email) return { exists: false };
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, teamId: true, id_card: true }
    });
    
    // Check if user exists AND is not already in a team
    const canJoin = !!user && user.teamId === null;
    const idCardFilled = !!user?.id_card;
    
    return { exists: canJoin, idCardFilled };
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
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error submitting final registration:", error);
    return { success: false, error: "Failed to submit final registration" };
  }
}

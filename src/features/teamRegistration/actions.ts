'use server';

import prisma from "@/lib/config/prisma";

export async function checkUserEmail(email: string): Promise<{ exists: boolean }> {
  if (!email) return { exists: false };
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });
    
    return { exists: !!user };
  } catch (error) {
    console.error("Error checking email:", error);
    return { exists: false };
  }
}

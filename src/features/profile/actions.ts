'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth";
import prisma from "@/lib/config/prisma";
import { revalidatePath } from "next/cache";
import { ChangePasswordInput, UpdateProfileInput, changePasswordSchema, updateProfileSchema } from "./schema";
import bcrypt from "bcrypt";

export async function getProfile() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    throw new Error("unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Return safe user object (exclude password)
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function updateProfile(data: UpdateProfileInput) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return { success: false, error: "Unauthorized" };
  }

  const validation = updateProfileSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        studentId: data.studentId,
        major: data.major,
        institution: data.institution,
        country: data.country,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        phone_number: data.phone_number,
        line_id: data.line_id,
        email: data.email,
        id_card: data.id_card,
      },
    });

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function changePassword(data: ChangePasswordInput) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return { success: false, error: "Unauthorized" };
  }

  const validation = changePasswordSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const isMatch = await bcrypt.compare(data.currentPassword, user.password);
    if (!isMatch) {
      return { success: false, error: "Incorrect current password" };
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    console.error("Password change error:", error);
    return { success: false, error: "Failed to change password" };
  }
}

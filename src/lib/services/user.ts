'use server';

import { CreateUserInput, createUserSchema, UserResult, UpdateUserInput, updateUserSchema } from "@/types/services/user";
import prisma from "../config/prisma";
import { ActionResult } from "@/types/action";
import { User } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { handlePrismaError } from "../utils/handlePrismaError";

export async function getAllUsers(): Promise<UserResult[]> {
  return await prisma.user.findMany({
    orderBy: { id: "asc" },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function registerUser(
  data: CreateUserInput
): Promise<ActionResult<User>> {
  const validation = createUserSchema.safeParse(data);
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
    const { password, ...rest } = validation.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      data: user,
      message: "User registered successfully",
    };
  } catch (error) {
    console.log("Error Register User: \n"+error)
    return {
      success: false,
      error: handlePrismaError(error),
    };
  }
}

export async function updateUser(
  id: string,
  data: UpdateUserInput
): Promise<ActionResult<User>> {
  const validation = updateUserSchema.safeParse(data);
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
    const user = await prisma.user.update({
      where: { id },
      data: validation.data,
    });

    revalidatePath("/");

    return {
      success: true,
      data: user,
      message: "User updated successfully",
    };
  } catch (error) {
    console.log("Error Update User: \n"+error)
    return {
      success: false,
      error: handlePrismaError(error),
    };
  }
}

export async function deleteUser(
  id: string
): Promise<ActionResult<null>> {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.log("Error Delete User: \n"+error)
    return {
      success: false,
      error: handlePrismaError(error),
    };
  }
}

// app/actions/userLogin.ts
"use server";

import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import prisma from "../config/prisma";
import { cookies } from "next/headers";

export async function userLogin(name: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { name },
  });

  if (!user) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  // create a session token
  const sessionToken = randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

  await prisma.userSession.create({
    data: {
      user_id: user.id,
      sessionToken,
      expires,
    },
  });

  // Set session cookie (server-side only)
  const cookieStore = await cookies();
  cookieStore.set('sessionToken', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  });

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    sessionToken,
    expires,
  };
}

export async function userLogout() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;
  
  if (sessionToken) {
    await prisma.userSession.delete({
      where: { sessionToken },
    }).catch(() => null);
  }
  
  cookieStore.delete('sessionToken');
}

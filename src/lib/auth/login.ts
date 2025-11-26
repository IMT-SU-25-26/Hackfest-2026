// app/actions/teamLogin.ts
"use server";

import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import prisma from "../config/prisma";
import { cookies } from "next/headers";

export async function teamLogin(team_name: string, password: string) {
  const team = await prisma.team.findUnique({
    where: { team_name },
  });

  if (!team) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, team.password);
  if (!isValid) throw new Error("Invalid credentials");

  // create a session token
  const sessionToken = randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

  await prisma.teamSession.create({
    data: {
      team_id: team.team_id,
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
    team_id: team.team_id,
    team_name: team.team_name,
    role: team.role,
    sessionToken,
    expires,
  };
}

export async function teamLogout() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;
  
  if (sessionToken) {
    await prisma.teamSession.delete({
      where: { sessionToken },
    }).catch(() => null);
  }
  
  cookieStore.delete('sessionToken');
}
// app/actions/teamLogin.ts
"use server";

// import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import prisma from "../prisma";

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

  return {
    team_id: team.team_id,
    team_name: team.team_name,
    role: team.role,
    sessionToken,
    expires,
  };
}

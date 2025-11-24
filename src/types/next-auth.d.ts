import { Role } from "@/generated/prisma";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    team_name: string;
    role: Role;
  }

  interface Session {
    user: {
      team_id: string;
      team_name: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    team_id: string;
    team_name: string;
    role: Role;
  }
}

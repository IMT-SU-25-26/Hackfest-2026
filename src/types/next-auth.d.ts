import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      team_id?: string;
      team_name?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    team_name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    team_id?: string;
    team_name?: string;
  }
}

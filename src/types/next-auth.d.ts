import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    team_name: string;
  }

  interface Session {
    user: {
      team_id: string;
      team_name: string;
    } & DefaultSession["user"];
  }

  interface AdapterUser {
    team_id: string;
    team_name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    team_id: string;
    team_name: string;
  }
}

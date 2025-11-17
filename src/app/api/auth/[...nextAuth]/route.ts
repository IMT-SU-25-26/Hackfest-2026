import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma  from "@/lib/prisma";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Team Login",
      credentials: {
        team_name: { label: "Team Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const team = await prisma.team.findUnique({
          where: { team_name: credentials.team_name },
        });

        if (!team) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          team.password
        );

        if (!isValid) return null;

        return {
          id: team.team_id,
          team_name: team.team_name,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.team_id = user.id;
        token.team_name = user.team_name;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }) {
      session.user = {
        ...session.user,
        team_id: token.team_id,
        team_name: token.team_name,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Team Login",
      credentials: {
        team_name: { label: "Team Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const creds = credentials as {
          team_name: string
          password: string
        }

        if (!creds.team_name || !creds.password) return null

        const team = await prisma.team.findUnique({
          where: { team_name: creds.team_name },
        })

        if (!team) return null

        const isValid = await bcrypt.compare(creds.password, team.password)
        if (!isValid) return null

        return {
          id: team.team_id,
          team_name: team.team_name,
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.team_id = user.id
        token.team_name = user.team_name
      }
      return token
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        team_id: token.team_id,
        team_name: token.team_name,
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}

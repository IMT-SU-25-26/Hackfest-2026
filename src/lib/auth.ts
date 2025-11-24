import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"
import { User } from "next-auth"

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
          role: team.role,
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.team_id = user.id
        token.team_name = user.team_name
        token.role = user.role
      }
      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.team_id = token.team_id as string
        session.user.team_name = token.team_name as string
        session.user.role = token.role
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
}

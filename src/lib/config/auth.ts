import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import prisma from "@/lib/config/prisma"
import { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"
import { User } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "User Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const creds = credentials as {
          email: string
          password: string
        }

        if (!creds.email || !creds.password) return null

        const user = await prisma.user.findUnique({
          where: { email: creds.email },
        })

        if (!user) return null

        const isValid = await bcrypt.compare(creds.password, user.password)
        if (!isValid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }
      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.role = token.role
        session.user.email = token.email as string
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
}


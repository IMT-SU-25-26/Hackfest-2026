import { Role, Team } from "@/generated/prisma";
import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = (await getSession(context));

//   if (!session || session.user.role !== Role.ADMIN) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return { props: { session } };
// }


export async function middleware(req: NextRequest) {
  // Get token (from NextAuth JWT cookie)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Restrict /dashboard to admin role
  if (req.nextUrl.pathname === "/dashboard" && token.role !== Role.ADMIN) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // restrict only /dashboard
};

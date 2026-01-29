import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth";
import prisma from "@/lib/config/prisma";
import NavBar from "./NavBar";

export default async function NavBarWrapper() {
  const session = await getServerSession(authOptions);
  
  let teamStatus: "PENDING" | "REJECTED" | "ACCEPTED" | undefined = undefined;
  let teamCategory: "UIUX" | "HACKATON" | undefined = undefined;
  let isFinalist: boolean = false;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { team: true },
    });
    
    if (user?.team) {
      teamStatus = user.team.status;
      teamCategory = user.team.category;
      isFinalist = user.team.isFinalist;
    }
  }

  return (
    <NavBar 
      teamStatus={teamStatus} 
      teamCategory={teamCategory}
      isFinalist={isFinalist}
    />
  );
}

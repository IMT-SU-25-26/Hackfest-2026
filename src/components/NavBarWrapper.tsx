import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth";
import prisma from "@/lib/config/prisma";
import NavBar from "./NavBar";

export default async function NavBarWrapper() {
  const session = await getServerSession(authOptions);
  
  let teamStatus: "PENDING" | "REJECTED" | "ACCEPTED" | undefined = undefined;
  let teamCategory: "UIUX" | "HACKATON" | undefined = undefined;

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { team: true },
    });
    
    if (user?.team) {
      teamStatus = user.team.status;
      teamCategory = user.team.category;
    //   console.log("[NavBarWrapper] Fetched Team Data:", { teamStatus, teamCategory });
    }
  }

  return (
    <NavBar 
      teamStatus={teamStatus} 
      teamCategory={teamCategory}
    />
  );
}

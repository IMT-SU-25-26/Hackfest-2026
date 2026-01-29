import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/config/prisma";
import HackathonFinalSubmissionFlow from "@/features/submission/components/hackaton/final/HackathonFinalSubmissionFlow";

export default async function HackathonFinalSubmissionPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { team: true },
  });

  if (!user) {
    redirect("/login");
  }

  if (!user.teamId || !user.team) {
    // User must be in a team to submit
    redirect("/?error=You are not in a team"); 
  }

  if (user.team.category !== "HACKATON") {
     // Wrong category
     redirect("/?error=You are not in the Hackathon category competition");
  }

  if (!user.team.isFinalist) {
     // Not finalist
     redirect("/?error=You are not a finalist");
  }

  return (
    <div className="min-h-screen w-full bg-[#090223] bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/images/login/Background.svg')" }}>
      <HackathonFinalSubmissionFlow teamId={user.team.id} />
    </div>
  );
}

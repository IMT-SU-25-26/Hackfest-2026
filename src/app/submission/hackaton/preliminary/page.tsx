import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/config/prisma";
import HackathonPreliminarySubmissionFlow from "@/features/submission/components/hackaton/preliminary/HackathonPreliminarySubmissionFlow";
import { toast } from "react-toastify";

export default async function HackathonPreliminarySubmissionPage() {
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

  // Check if already submitted
  if (
    user.team.submission_originality_url &&
    user.team.submission_lean_canvas_url &&
    user.team.submission_gdrive_url
  ) {
    redirect("/?error=You already submit the submisison");
  }

  return (
    <div className="min-h-screen w-full bg-[#090223] bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/images/login/Background.svg')" }}>
      <HackathonPreliminarySubmissionFlow teamId={user.team.id} />
    </div>
  );
}

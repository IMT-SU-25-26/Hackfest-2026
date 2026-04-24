import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/config/prisma";
import HackathonGithubSubmissionFlow from "@/features/submission/components/hackaton/final/HackathonGithubSubmissionFlow";


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

  // If the user have not been submit the github username
  if( !user.github_username){
    redirect("/profile?error=incomplete_profile");
  }

  if (!user.team.isFinalist) {
     // Not finalist
     redirect("/?error=You are not a finalist");
  }

  // Check if already submitted
  if (
    user.team.submission_github_url
  ) {
    redirect("/?error=You already submit the github url");
  }

  return (
    <div className="min-h-screen w-full bg-[#090223] bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/images/login/Background.svg')" }}>
      <HackathonGithubSubmissionFlow teamId={user.team.id} />
    </div>
  );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/config/prisma";
import FinalTeamRegistrationFlow from "@/features/teamRegistration/components/FinalTeamRegistrationFlow";

export default async function FinalTeamRegistrationPage() {
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

  if (!user.team) {
     redirect("/?error=You do not have a team yet.");
  }

  if (user.team.category !== "HACKATON") {
     redirect("/?error=This page is only for Hackathon participants.");
  }

  if (!user.team.isFinalist) {
     redirect("/?error=You are not a finalist.");
  }

  // Check if already completed final registration
  if (user.team.surat_tugas_url && user.team.payment_proof) {
     redirect("/?error=You already completed the final registration");
  }

  return (
    <div className="min-h-screen w-full bg-[#090223] bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/images/login/Background.svg')" }}>
        <FinalTeamRegistrationFlow teamId={user.team.id} teamName={user.team.name} />
    </div>
  );
}

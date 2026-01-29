import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/config/prisma";
import TeamRegistrationFlow from "@/features/teamRegistration/components/TeamRegistrationFlow";

export default async function TeamRegistrationPage() {
  const session = await getServerSession(authOptions);
  
  // Debug: Artificial delay to test loading UI
  // await new Promise(resolve => setTimeout(resolve, 3000));

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  // Check required fields
  const requiredFields = [
    "name",
    "dateOfBirth",
    "studentId",
    "gender",
    "major",
    "phone_number", // Checks phone_number based on schema
    "institution",
    "line_id",
    "country",
    "email",
    "id_card"
  ];

  const hasMissingFields = requiredFields.some((field) => {
    const value = user[field as keyof typeof user];
    return value === null || value === "" || value === undefined;
  });

  if (hasMissingFields) {
    redirect("/profile?error=incomplete_profile");
  }

  return (
    <div className="min-h-screen w-full bg-[#090223] bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/images/login/Background.svg')" }}>
        <TeamRegistrationFlow />
    </div>
  );
}

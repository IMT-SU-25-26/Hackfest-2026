import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/auth";
import { redirect } from "next/navigation";
import { getProfile } from "@/features/profile/actions";
import ProfileForm from "@/features/profile/components/ProfileForm";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  
  // Await searchParams before accessing properties (Next.js 15+ requirement, but good practice generally now)
  const params = await searchParams;
  const error = typeof params.error === 'string' ? params.error : undefined;

  if (!session) {
    redirect("/login");
  }

  let user = null;
  try {
    user = await getProfile();
  } catch (error) {
    // If user deleted or error, redirect
    console.error("Failed to fetch profile:", error);
    redirect("/login");
  }

  return (
    <div className="w-full min-h-screen bg-cover bg-no-repeat bg-center bg-[url('/images/login/Background.svg')] bg-[#090223]">
      <div className="pt-24 pb-12 px-4 min-h-screen flex flex-col items-center">
         <ProfileForm user={user} error={error} />
      </div>
    </div>
  );
}

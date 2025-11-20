"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Link } from "lucide-react";

export default function LoginPage() {
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      team_name: teamName,
      password,
    });

    if (result?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push("/");
  }

  return (

    <div className="relative min-h-screen w-full h-full overflow-hidden font-[Orbitron] text-cyan-300 bg-[#090223]">
            {/* Background Grid Placeholder */}
            <div className="absolute inset-0">
                <Image
                    src="/login/Background.svg" // replace with your neon grid bg asset
                    alt="Background"
                    fill
                    className="object-cover opacity-40"
                />
            </div>


            


            {/* Main Container */}
            <form onSubmit={handleLogin} className="relative z-10 flex justify-center mt-16">
                <div className="bg-[url(/login/outerframe.svg)] bg-contain bg-no-repeat w-[900px]  p-10 rounded-xl bg-[black/40 ]backdrop-blur-sm">
                    


                    {/* Form Section */}
                    <div className="space-y-10 mt-15">
                        {/* Team Name */}
                        <div className="w-2/3 mx-auto">
                            <label className="block mb-4 text-lg font-semibold text-[#05C174]">Enter your team name</label>
                            <div className="flex items-center gap-4 bg-[url(/login/textfield.svg)] bg-contain bg-no-repeat p-4 rounded-md ">
                                <Image
                                    src="/login/personlogo.svg" // placeholder icon
                                    alt="User Icon"
                                    width={42}
                                    height={42}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter your team name"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    className=" flex-1 outline-none placeholder-[#05B0C1]/45 text-[#05B0C1]  mx-1/3"
                                />
                            </div>
                        </div>


                        {/* Password */}
                        <div className="w-2/3 mx-auto">
                            <label className="block mb-4 text-lg font-semibold text-[#05C174]">Enter your password</label>
                            <div className="flex items-center gap-4 bg-[url(/login/textfield.svg)] bg-contain bg-no-repeat p-4 rounded-md  ">
                                <Image
                                    src="/login/lock.svg" // placeholder lock icon
                                    alt="Lock Icon"
                                    width={32}
                                    height={32}
                                />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-transparent flex-1 outline-none placeholder-[#05B0C1]/45 text-[#05B0C1]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                    <p className="text-red-400 text-center mt-4 font-bold drop-shadow-[0_0_10px_#ff0000]">
                        {error}
                    </p>
                    )}


                    {/* Login Button */}
                    <div className=" h-15 w-50 text-center mt-12 mx-auto justify-center">
                        <button type="submit" className="px-16 py-4 h-15 w-55 bg-[url(/login/loginbutton.svg)] bg-cover justify-center text-black text-xl font-bold rounded-md hover:bg-cyan-400 transition tracking-wide shadow-[0_0_20px_#00ffff]">

                        </button>
                    </div>


                    {/* Registration */}
                    <p className="text-center mt-8 text-sm text-white">
                        Don’t have an account?{' '}
                        <a href="/register" className="text-cyan-400 underline cursor-pointer">Registration</a>
                    </p>
                </div>
            </form>
    </div>
  );
}

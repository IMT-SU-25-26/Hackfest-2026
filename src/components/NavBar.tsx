"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="w-[100w-dvw] px-[5%] bg-[#1C0951] border-b-2 border-[#00C074] overflow-hidden h-[7vh] flex justify-between gap-4 items-center">
      <Link href={"/"}>
        <Image
          src={"/navbar/logo-hackfest.webp"}
          alt="hackfest logo"
          width={200}
          height={200}
          className="w-32 h-auto"
        />
      </Link>
      
      <div className="hidden md:flex text-white font-family-audiowide gap-4 justify-center items-center">
        <Link href={"/register"} className="hover:text-[#00C074] transition-colors">REGISTRATION</Link>

        {/* 4. Dynamic Button Logic */}
        {session ? (
          <button 
            onClick={() => signOut()} 
            className="text-white hover:text-[#00C074] transition-colors"
          >
            LOGOUT
          </button>
        ) : (
          <Link href={"/login"} className="hover:text-[#00C074] transition-colors">LOGIN</Link>
        )}
      </div>

      {/* Mobile Menu Hamburger */}
      <div className="flex flex-col md:hidden gap-1 justify-center items-center">
        <div className="w-4 h-0.5 bg-white"></div>
        <div className="w-4 h-0.5 bg-white"></div>
        <div className="w-4 h-0.5 bg-white"></div>
      </div>
    </nav>
  );
}

export default NavBar;
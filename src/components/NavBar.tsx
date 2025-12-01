"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function NavBar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-50 px-[5%] bg-[#1C0951] border-b-2 border-[#00C074] h-[7vh] flex justify-between gap-4 items-center">
        <Link href={"/"}>
          <Image
            src={"/images/navbar/logo-hackfest.webp"}
            alt="hackfest logo"
            width={200}
            height={200}
            className="w-32 h-auto"
          />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex text-white font-family-audiowide gap-4 justify-center items-center">
          <Link href={"/#timeline"} className="hover:text-[#00C074] transition-colors">Timeline</Link>
          <Link href={"/#regsFee"} className="hover:text-[#00C074] transition-colors">Regs Fee</Link>
          <Link href={"/qna"} className="hover:text-[#00C074] transition-colors">QNA</Link>

          {session ? (
            <>
              {session.user?.role === 'ADMIN' && (
                <Link 
                  href={"/dashboard"} 
                  className="hover:text-[#00C074] transition-colors"
                >
                  DASHBOARD
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="hover:text-[#00C074] transition-colors"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link href={"/login"} className="hover:text-[#00C074] transition-colors">LOGIN</Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={toggleMenu}
          className="flex flex-col md:hidden gap-1.5 justify-center items-center z-50 w-6 h-6"
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`fixed top-[7vh] left-0 w-full bg-[#1C0951] border-b-2 border-[#00C074] md:hidden z-40 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col text-white font-family-audiowide p-4 gap-4">
          <Link href={"/#timeline"} className="hover:text-[#00C074] transition-colors py-2"onClick={closeMenu}>Timeline</Link>
          <Link href={"/#regsfee"} className="hover:text-[#00C074] transition-colors py-2"onClick={closeMenu}>Regs Fee</Link>
          <Link href={"/qna"} className="hover:text-[#00C074] transition-colors py-2"onClick={closeMenu}>QNA</Link>
          {session ? (
            <>
              {session.user?.role === 'ADMIN' && (
                <Link 
                  href={"/dashboard"} 
                  className="hover:text-[#00C074] transition-colors py-2"
                  onClick={closeMenu}
                >
                  DASHBOARD
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="text-left hover:text-[#00C074] transition-colors py-2"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link 
              href={"/login"} 
              className="hover:text-[#00C074] transition-colors py-2"
              onClick={closeMenu}
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </>
  )}


export default NavBar;
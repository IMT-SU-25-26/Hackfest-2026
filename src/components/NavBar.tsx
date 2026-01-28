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

  // Handle navigation to hash links
  const handleNavigation = (href: string) => {
    closeMenu();
    
    if (href.startsWith('/#')) {
      const elementId = href.substring(2); // Remove '#'
      
      // If already on home page, just scroll
      if (window.location.pathname === '/') {
        const element = document.getElementById(elementId);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to home first, then scroll
        router.push('/');
        // Use setTimeout to allow page to load
        setTimeout(() => {
          const element = document.getElementById(elementId);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      router.push(href);
    }
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
        <div className="hidden md:flex text-white font-family-audiowide gap-7 justify-center items-center">
          <button onClick={() => handleNavigation('/#timeline')} className="hover:text-[#00C074] transition-colors cursor-pointer bg-none border-none p-0">Timeline</button>
          <button onClick={() => handleNavigation('/#regsFee')} className="hover:text-[#00C074] transition-colors cursor-pointer bg-none border-none p-0">Fee</button>
          <Link href={"/qna"} className="hover:text-[#00C074] transition-colors">QNA</Link>

          {session ? (
            <>
              <Link 
                href={"/profile"} 
                className="hover:text-[#00C074] transition-colors"
              >
                Profile
              </Link>
              {session.user?.role === 'ADMIN' && (
                <Link 
                  href={"/dashboard"} 
                  className="hover:text-[#00C074] transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="hover:text-[#00C074] transition-colors cursor-pointer bg-none border-none p-0"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href={"/login"} className="hover:text-[#00C074] transition-colors">Login</Link>
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
          <button onClick={() => handleNavigation('/#timeline')} className="hover:text-[#00C074] transition-colors py-2 text-left bg-none border-none p-0 cursor-pointer">Timeline</button>
          <button onClick={() => handleNavigation('/#regsFee')} className="hover:text-[#00C074] transition-colors py-2 text-left bg-none border-none p-0 cursor-pointer">Fee</button>
          <Link href={"/qna"} className="hover:text-[#00C074] transition-colors py-2" onClick={closeMenu}>QNA</Link>
          {session ? (
            <>
              <Link 
                href={"/profile"} 
                className="hover:text-[#00C074] transition-colors py-2"
                onClick={closeMenu}
              >
                Profile
              </Link>
              {session.user?.role === 'ADMIN' && (
                <Link 
                  href={"/dashboard"} 
                  className="hover:text-[#00C074] transition-colors py-2"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="text-left hover:text-[#00C074] transition-colors py-2 bg-none border-none p-0 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              href={"/login"} 
              className="hover:text-[#00C074] transition-colors py-2"
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
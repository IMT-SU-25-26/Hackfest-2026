"use client";

import React from "react";
import Image from "next/image";

// Interface untuk sponsor data
interface Sponsor {
  name: string;
  logo: string; // path ke logo sponsor
  width?: number;
  height?: number;
}

// Interface untuk social media/info links
interface InfoLink {
  name: string;
  logo: string; // path ke logo (Instagram, LinkedIn, etc)
  url: string;
  width?: number;
  height?: number;
}

// ========================================
// CARA MENAMBAHKAN SPONSOR:
// ========================================
// 1. Simpan logo sponsor di folder: /public/sponsors/
//    Contoh: /public/sponsors/google.png
// 2. Tambahkan data sponsor di array ini:
const sponsors: Sponsor[] = [
  // Contoh (hapus comment '//' untuk mengaktifkan):
  { name: "Google", logo: "/FAQ/danger.svg", width: 100, height: 100 },
  { name: "Google", logo: "/FAQ/danger.svg", width: 100, height: 100 },
  { name: "Google", logo: "/FAQ/danger.svg", width: 100, height: 100 },
  { name: "Google", logo: "/FAQ/danger.svg", width: 100, height: 100 },
  // { name: "Microsoft", logo: "/sponsors/microsoft.png", width: 150, height: 100 },
];

// ========================================
// CARA MENAMBAHKAN INFO LINKS (Social Media, etc):
// ========================================
// 1. Simpan logo/icon di folder: /public/social/
//    Contoh: /public/social/instagram.png
// 2. Tambahkan data di array ini:
const infoLinks: InfoLink[] = [
  // Contoh (hapus comment '//' untuk mengaktifkan):
  { name: "Instagram", logo: "/FAQ/danger.svg", url: "https://instagram.com/...", width: 40, height: 40 },
  { name: "LinkedIn", logo: "/FAQ/danger.svg", url: "https://linkedin.com/...", width: 40, height: 40 },
  { name: "Twitter", logo: "/FAQ/danger.svg", url: "https://twitter.com/...", width: 40, height: 40 },
  { name: "YouTube", logo: "/FAQ/danger.svg", url: "https://youtube.com/...", width: 40, height: 40 },
];

function Footer() {
  return (
    <footer className="bg-[#001138] border-t-2 border-[#00ff88] py-12 px-4 font-mono w-[100w-dvw]">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Sponsored By (Center) */}
        <div className="mb-12">
          <h3 className="text-white text-xl font-family-audiowide md:text-2xl font-bold mb-6 uppercase text-center">
            SPONSORED BY
          </h3>
          
          {/* Sponsor Logos Container */}
          <div className="flex flex-wrap gap-6 justify-center items-center min-h-[120px]">
            {sponsors.length > 0 ? (
              sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="p-4 rounded flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={sponsor.width || 150}
                    height={sponsor.height || 100}
                    className="object-contain"
                  />
                </div>
              ))
            ) : (
              // Placeholder text ketika belum ada sponsor
              <p className="text-[#00ff88]/50 text-sm italic">
                Sponsor logos will appear here
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section - Logo & Copyright (Left) + For More Information (Right) */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Left Side: IMT Logo + Copyright Text */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* IMT Logo */}
            <div className="shrink-0">
              <div className="w-30 h-30 mt-[-10] flex items-center justify-center bg-[#0a0a1f] p-0">
                <Image 
                  src="/FAQ/logoimt.svg" 
                  alt="IMT Logo" 
                  width={120} 
                  height={120}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Copyright Text */}
            <div className="text-[#00ff88] font-family-spacemono text-sm md:text-base leading-relaxed space-y-1 text-center md:text-left">
              <p>© 2025 Informatics (IMT) Student Union</p>
              <p>Universitas Ciputra Surabaya.</p>
              <p>All rights reserved.</p>
            </div>
          </div>

          {/* Right Side: For More Information */}
          <div className="text-center md:text-right">
            <h3 className="text-white text-xl md:text-2xl font-family-audiowide font-bold mb-6 uppercase">
              FOR MORE INFORMATION :
            </h3>
            
            {/* Info Links Container */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-end items-center">
              {infoLinks.length > 0 ? (
                infoLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded hover:bg-[#00ff88]/20 transition-colors hover:scale-110 transform duration-200"
                    title={link.name}
                  >
                    <Image
                      src={link.logo}
                      alt={link.name}
                      width={link.width || 40}
                      height={link.height || 40}
                      className="object-contain"
                    />
                  </a>
                ))
              ) : (
                // Placeholder text ketika belum ada links
                <p className="text-[#00ff88]/50 text-sm italic">
                  Social media links will appear here
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
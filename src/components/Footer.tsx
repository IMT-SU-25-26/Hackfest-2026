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

// Array sponsor - tambahkan sponsor di sini ketika sudah ada
const sponsors: Sponsor[] = [
  // ========================================
  // CARA MENAMBAHKAN SPONSOR:
  // ========================================
  // 
  // 1. Simpan logo sponsor di folder: /public/sponsors/
  //    Contoh: /public/sponsors/sponsor1.png
  //
  // 2. Tambahkan data sponsor di array ini
  //
  // SPONSOR BESAR (Kotak Baris Atas - maksimal 4):
  // Index 0-3 akan tampil di kotak BESAR (100x100px)
  // Contoh:
  // { name: "Sponsor 1", logo: "/sponsors/sponsor1.png", width: 80, height: 80 },
  // { name: "Sponsor 2", logo: "/sponsors/sponsor2.png", width: 80, height: 80 },
  // { name: "Sponsor 3", logo: "/sponsors/sponsor3.png", width: 80, height: 80 },
  // { name: "Sponsor 4", logo: "/sponsors/sponsor4.png", width: 80, height: 80 },
  //
  // SPONSOR KECIL (Kotak Baris Bawah - index 5 sampai 12):
  // Index 4-11 akan tampil di kotak KECIL (50x50px)
  // Contoh untuk sponsor kecil:
  // { name: "Sponsor 5", logo: "/sponsors/sponsor5.png", width: 40, height: 40 },
  // { name: "Sponsor 6", logo: "/sponsors/sponsor6.png", width: 40, height: 40 },
  // { name: "Sponsor 7", logo: "/sponsors/sponsor7.png", width: 40, height: 40 },
  // { name: "Sponsor 8", logo: "/sponsors/sponsor8.png", width: 40, height: 40 },
  // ... dst sampai index 11 (total 8 sponsor kecil)
  //
  // CONTOH LENGKAP (Hapus comment '//' untuk mengaktifkan):
  // { name: "Sponsor Besar 1", logo: "/sponsors/big1.png", width: 80, height: 80 },
  // { name: "Sponsor Besar 2", logo: "/sponsors/big2.png", width: 80, height: 80 },
  // { name: "Sponsor Besar 3", logo: "/sponsors/big3.png", width: 80, height: 80 },
  // { name: "Sponsor Besar 4", logo: "/sponsors/big4.png", width: 80, height: 80 },
  // { name: "Sponsor Kecil 1", logo: "/sponsors/small1.png", width: 40, height: 40 },
  // { name: "Sponsor Kecil 2", logo: "/sponsors/small2.png", width: 40, height: 40 },
  // { name: "Sponsor Kecil 3", logo: "/sponsors/small3.png", width: 40, height: 40 },
  // { name: "Sponsor Kecil 4", logo: "/sponsors/small4.png", width: 40, height: 40 },
  // { name: "Sponsor Kecil 5", logo: "/sponsors/small5.png", width: 40, height: 40 },
  // { name: "Sponsor Kecil 6", logo: "/sponsors/small6.png", width: 40, height: 40 },
  // { name: "Sponsor Kecil 7", logo: "/sponsors/small7.png", width: 40, height: 40 },
  // { name: "Sponsor Kecil 8", logo: "/sponsors/small8.png", width: 40, height: 40 },
];

// Social media links
const socialLinks: any[] = [
  // { name: "Instagram", icon: "📷", url: "#" },
  // { name: "Twitter", icon: "🐦", url: "#" },
  // { name: "LinkedIn", icon: "💼", url: "#" },
  // { name: "YouTube", icon: "📺", url: "#" },
  // { name: "Facebook", icon: "📘", url: "#" },
  // { name: "TikTok", icon: "🎵", url: "#" },
  // { name: "Discord", icon: "💬", url: "#" },
  // { name: "GitHub", icon: "🐙", url: "#" },
];

function Footer() {
  return (
    <footer className="bg-[#4ade80] py-12 px-4 font-mono text-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Section - Sponsored By */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6 uppercase">
              Sponsored By
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {/* Large sponsor slots (top row) */}
              {sponsors.length > 0 ? (
                <>
                  {sponsors.slice(0, 4).map((sponsor, index) => (
                    <div
                      key={`large-${index}`}
                      className="bg-[#60d394] aspect-square flex items-center justify-center p-4 rounded"
                    >
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={sponsor.width || 100}
                        height={sponsor.height || 100}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </>
              ) : (
                // Placeholder boxes ketika belum ada sponsor
                <>
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={`large-placeholder-${index}`}
                      className="bg-[#60d394] aspect-square rounded"
                    />
                  ))}
                </>
              )}

              {/* Small sponsor slots (bottom row) */}
              {sponsors.length > 4 ? (
                <>
                  {sponsors.slice(4, 12).map((sponsor, index) => (
                    <div
                      key={`small-${index}`}
                      className="bg-[#60d394] aspect-square flex items-center justify-center p-2 rounded col-span-1"
                      style={{ maxWidth: "80px" }}
                    >
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={sponsor.width || 60}
                        height={sponsor.height || 60}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </>
              ) : (
                // Placeholder boxes untuk sponsor kecil
                <div className="col-span-4 grid grid-cols-8 gap-2">
                  {[...Array(8)].map((_, index) => (
                    <div
                      key={`small-placeholder-${index}`}
                      className="bg-[#60d394] aspect-square rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Section - For More Information */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-6 uppercase">
                For More Information :
              </h3>
              {/* Social Media Icons Grid */}
              <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#60d394] aspect-square flex items-center justify-center text-4xl rounded hover:bg-[#50c384] transition-colors"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Text */}
        <div className="text-sm md:text-base leading-relaxed space-y-1">
          <p>© 2025 Informatics (IMT) Student Union</p>
          <p>Universitas Ciputra Surabaya.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
"use client";

import React from "react";
import Image from "next/image";

// Interface untuk sponsor data
interface Sponsor {
  name: string;
  logo: string;
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
  { name: "Sponsor Besar 1", logo: "images/FAQ/danger.svg", width: 80, height: 80 },
  { name: "Sponsor Besar 2", logo: "images/FAQ/danger.svg", width: 80, height: 80 },
  { name: "Sponsor Besar 3", logo: "images/FAQ/danger.svg", width: 80, height: 80 },
  { name: "Sponsor Besar 4", logo: "images/FAQ/danger.svg", width: 80, height: 80 },
  { name: "Sponsor Kecil 1", logo: "images/FAQ/danger.svg", width: 40, height: 40 },
  { name: "Sponsor Kecil 2", logo: "images/FAQ/danger.svg", width: 40, height: 40 },
  { name: "Sponsor Kecil 3", logo: "images/FAQ/danger.svg", width: 40, height: 40 },
  { name: "Sponsor Kecil 4", logo: "images/FAQ/danger.svg", width: 40, height: 40 },
  { name: "Sponsor Kecil 5", logo: "images/FAQ/danger.svg", width: 40, height: 40 },
  { name: "Sponsor Kecil 6", logo: "images/FAQ/danger.svg", width: 40, height: 40 },
  { name: "Sponsor Kecil 7", logo: "images/FAQ/danger.svg", width: 40, height: 40 },
  { name: "Sponsor Kecil 8", logo: "images/FAQ/danger.svg", width: 40, height: 40 },
];

// Social media links
const socialLinks: any[] = [
  { name: "Instagram", icon: "📷", url: "#" },
  { name: "Twitter", icon: "🐦", url: "#" },
  { name: "LinkedIn", icon: "💼", url: "#" },
  { name: "YouTube", icon: "📺", url: "#" },
  { name: "Facebook", icon: "📘", url: "#" },
  { name: "TikTok", icon: "🎵", url: "#" },
  { name: "Discord", icon: "💬", url: "#" },
  { name: "GitHub", icon: "🐙", url: "#" },
];

function Footer() {
  // Helper function untuk merender placeholder jika data sponsor belum ada
  // Tipe 'size' menentukan apakah ini kotak besar (large) atau kecil (small)
  const renderPlaceholder = (index: number, size: "large" | "small") => (
    <div
      key={`${size}-placeholder-${index}`}
      className={`bg-[#60d394] aspect-square rounded ${
        size === "large" ? "col-span-2" : "col-span-1"
      }`}
    />
  );

  return (
    <footer className="bg-[#4ade80] py-12 px-6 md:px-16 font-mono text-black">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 mb-8">
          
          {/* Left Section - Sponsored By */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6 uppercase">
              Sponsored By
            </h3>
            
            {/* WRAPPER UTAMA:
                max-w-md: Membatasi lebar total area sponsor agar kotak tidak terlalu besar.
                grid-cols-8: Membagi area menjadi 8 kolom kecil untuk alignment sempurna.
            */}
            <div className="max-w-md w-full grid grid-cols-8 gap-3">
              
              {/* --- BARIS ATAS (Sponsor Besar) --- */}
              {/* Loop 4 slot untuk sponsor besar */}
              {[...Array(4)].map((_, i) => {
                const sponsor = sponsors[i]; // Ambil data index 0,1,2,3
                
                if (sponsor) {
                  return (
                    <div
                      key={`large-${i}`}
                      className="bg-[#05B0C1] aspect-square col-span-2 flex items-center justify-center p-3 rounded"
                    >
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={sponsor.width || 100}
                        height={sponsor.height || 100}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  );
                }
                // Jika tidak ada data, render placeholder besar
                return renderPlaceholder(i, "large");
              })}

              {/* --- BARIS BAWAH (Sponsor Kecil) --- */}
              {/* Loop 8 slot untuk sponsor kecil */}
              {[...Array(8)].map((_, i) => {
                const dataIndex = i + 4; // Offset index karena 0-3 sudah dipakai sponsor besar
                const sponsor = sponsors[dataIndex]; 

                if (sponsor) {
                  return (
                    <div
                      key={`small-${i}`}
                      className="bg-[#05B0C1] aspect-square col-span-1 flex items-center justify-center p-1.5 rounded"
                    >
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={sponsor.width || 50}
                        height={sponsor.height || 50}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  );
                }
                // Jika tidak ada data, render placeholder kecil
                return renderPlaceholder(i, "small");
              })}
            </div>
          </div>

          {/* Right Section - For More Information */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-6 uppercase text-left md:text-right">
                For More Information :
              </h3>
              {/* Social Media Icons Grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {socialLinks.length > 0 ? (
                  socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#05B0C1] w-12 h-12 flex items-center justify-center text-2xl rounded hover:bg-[#50c384] transition-colors"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))
                ) : (
                  // Placeholder icons jika belum ada link
                  [...Array(4)].map((_, i) => (
                    <div key={i} className="bg-[#05B0C1] w-12 h-12 rounded opacity-50" />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Text */}
        <div className="text-sm md:text-base leading-relaxed space-y-1 mt-12 pt-6">
          <p>© 2025 Informatics (IMT) Student Union</p>
          <p>Universitas Ciputra Surabaya.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
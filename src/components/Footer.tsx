"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

// Interface untuk sponsor data
interface Sponsor {
  name: string;
  logo: string;
  width?: number;
  height?: number;
}

// Array sponsor - tambahkan sponsor di sini ketika sudah ada
var sponsors: Sponsor[] = [
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

sponsors = [];


function Footer() {
  // Helper function untuk merender placeholder jika data sponsor belum ada
  // Tipe 'size' menentukan apakah ini kotak besar (large) atau kecil (small)
  const renderPlaceholder = (index: number, size: "large" | "small") => (
    <div
      key={`${size}-placeholder-${index}`}
      className={`bg-[#001138] aspect-square rounded ${
        size === "large" ? "col-span-2" : "col-span-1"
      }`}
    />
  );

  return (
    <footer className="bg-[#001138] py-12 px-6 md:px-16 font-mono text-white">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 mb-8">
          
          {/* Left Section - Sponsored By */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6 uppercase">
              Sponsored By
            </h3>
            <p className="">Coming Soon.</p>
            
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
                            
              {/* WhatsApp Contact Person */}
              <div className="flex items-start justify-start md:justify-end md:items-start gap-5 text-white">
                <a 
                  href="https://wa.me/6281222922268" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 hover:text-[#05B0C1] transition-colors"
                >
                  <div className="flex items-center justify-center bg-[#25D366] text-white w-10 h-10 rounded-full">
                    <Image
                      src="/images/footer/wa-logo.svg"
                      alt="WhatsApp Logo"
                      width={14}
                      height={14}
                      className="object-contain w-full p-2" 
                    />
                  </div>
                  <span>Kayla</span>
                </a>
                <a 
                  href="https://wa.me/6281225470615" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 hover:text-[#05B0C1] transition-colors"
                >
                  <div className="flex items-center justify-center bg-[#25D366] text-white w-10 h-10 rounded-full">
                    <Image
                      src="/images/footer/wa-logo.svg"
                      alt="WhatsApp Logo"
                      width={14}
                      height={14}
                      className="object-contain w-full p-2"
                    />
                  </div>
                  <span>Shatrya</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Text */}
        <div className="flex items-start gap-6 mt-0 pt-6">
          {/* Logo IMT */}
          <div className="flex-shrink-0">
            <Image
              src="/images/footer/IMTLOGO.svg"
              alt="IMT Logo"
              width={100}
              height={100}
              className="object-contain md:mt-[-10]"
              style={{ height: '7rem', width: 'auto' }}
            />
          </div>
          
          {/* Copyright Text */}
          <div className="text-sm md:text-base leading-relaxed space-y-1">
            <p>© 2025 Informatics (IMT) Student Union</p>
            <p>Universitas Ciputra Surabaya.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
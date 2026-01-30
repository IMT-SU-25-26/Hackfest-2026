import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CATEGORIES = [
  {
    title: 'UI/UX Design',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus cum possimus voluptatibus ad. Expedita voluptatum, reprehenderit est officia vitae itaque doloremque.',
    image: '/home/ui-ux.svg',
    slug:'ui-ux',
  },
  {
    title: 'Hackathon',
    description:
      'Dolorum error beatae dolorem molestias voluptatem vero dolore excepturi explicabo quidem repellendus. Commodi dignissimos eligendi, fugit vero dicta voluptatibus!',
    image: '/home/ui-ux.svg', 
    slug:'hackathon',
  },
];

export default function CompetitionCategorySection() {
  return (
    <div className="bg-[#090223] w-full py-16 px-4 md:px-8 lg:px-16 flex justify-center sticky">
      <section className="w-full max-w-[1400px] flex flex-col gap-12">
        <h2 className="text-[#05B0C1] font-family-audiowide text-3xl md:text-4xl text-center mb-8 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(5,176,193,0.5)]">
          Competition Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((category, index) => (
            <Link
              key={index}
              href={`/competition/${category.slug}`}
              className="group relative border-2 border-[#05C174] p-6 flex flex-col items-center gap-6 transition-all duration-300 hover:bg-[#05C174]/5 hover:shadow-[0_0_30px_rgba(5,193,116,0.15)]"
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 bg-[#05C174] transition-all duration-300 group-hover:w-full group-hover:h-[2px]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#05C174] transition-all duration-300 group-hover:w-full group-hover:h-[2px]" />
              
              <div className="relative w-48 h-48 md:w-64 md:h-64 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(5,193,116,0.3)]"
                />
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-white font-family-audiowide text-2xl tracking-wider group-hover:text-[#05C174] transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-300 font-family-spacemono leading-relaxed text-sm md:text-base">
                  {category.description}
                </p>
              </div>

              {/* CTA Button Placeholder - Optional enhancement */}
              <button className="mt-4 px-8 py-2 border border-[#05B0C1] text-[#05B0C1] font-family-audiowide text-sm hover:bg-[#05B0C1] hover:text-[#090223] transition-all duration-300">
                LEARN MORE
              </button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

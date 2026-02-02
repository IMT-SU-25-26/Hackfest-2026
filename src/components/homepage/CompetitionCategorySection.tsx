import Image from 'next/image';

const CATEGORIES = [
  {
    title: 'UI/UX Design',
    description:
      'Craft intuitive digital experiences and redefine how users interact with technology. Showcase your creativity through user-centric design and seamless interfaces',
    image: '/images/home/uiux/logo.svg',
    slug:'ui-ux',
  },
  {
    title: 'Hackathon',
    description:
      'Build innovative solutions and push the boundaries of technology. Collaborate, code, and solve real-world problems in this high-intensity development challenge',
    image: '/images/home/hackathon/logo.svg', 
    slug:'hackathon',
  },
];

interface CompetitionCategorySectionProps {
  activeCategory: 'ui-ux' | 'hackathon';
  onCategorySelect: (category: 'ui-ux' | 'hackathon') => void;
}

export default function CompetitionCategorySection({ activeCategory, onCategorySelect }: CompetitionCategorySectionProps) {
  return (
    <div className="bg-[#090223] w-full py-16 px-4 md:px-8 lg:px-16 flex justify-center sticky">
      <section className="w-full max-w-[1400px] flex flex-col gap-12">
        <h2 className="text-[#05B0C1] font-family-audiowide text-3xl md:text-4xl text-center mb-8 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(5,176,193,0.5)]">
          Competition Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((category, index) => {
            const isActive = activeCategory === category.slug;
            
            return (
              <div
                key={index}
                onClick={() => onCategorySelect(category.slug as 'ui-ux' | 'hackathon')}
                className={`group relative border-2 p-6 flex flex-col items-center gap-6 transition-all duration-300 cursor-pointer
                  ${isActive 
                    ? 'border-[#05C174] bg-[#05C174]/10 shadow-[0_0_30px_rgba(5,193,116,0.15)]' 
                    : 'border-white/20 hover:border-[#05C174]/50 hover:bg-[#05C174]/5'
                  }`}
              >
                {/* Decorative corner accents */}
                <div className={`absolute top-0 left-0 w-3 h-3 transition-all duration-300 group-hover:w-full group-hover:h-[2px]
                  ${isActive ? 'bg-[#05C174]' : 'bg-white/50 group-hover:bg-[#05C174]'}`} 
                />
                <div className={`absolute bottom-0 right-0 w-3 h-3 transition-all duration-300 group-hover:w-full group-hover:h-[2px]
                   ${isActive ? 'bg-[#05C174]' : 'bg-white/50 group-hover:bg-[#05C174]'}`}
                />
                
                <div className="relative w-48 h-48 md:w-64 md:h-64 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className={`object-contain transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_15px_rgba(5,193,116,0.3)]' : ''}`}
                  />
                </div>

                <div className="text-center space-y-4">
                  <h3 className={`font-family-audiowide text-2xl tracking-wider transition-colors duration-300
                    ${isActive ? 'text-[#05C174]' : 'text-white group-hover:text-[#05C174]'}`}>
                    {category.title}
                  </h3>
                  <p className="text-gray-300 font-family-spacemono leading-relaxed text-sm md:text-base">
                    {category.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                <button className={`mt-4 px-8 py-2 border font-family-audiowide text-sm transition-all duration-300
                  ${isActive 
                    ? 'border-[#05B0C1] bg-[#05B0C1] text-[#090223]' 
                    : 'border-[#05B0C1] text-[#05B0C1] group-hover:bg-[#05B0C1] group-hover:text-[#090223]'
                  }`}>
                  {isActive ? 'SELECTED' : 'SELECT CATEGORY'}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-[#090223] flex items-center justify-center bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/images/login/Background.svg')" }}>
       <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-[#05C174]/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#05C174] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-[#05B0C1] border-b-transparent rounded-full animate-spin [animation-duration:1.5s] [animation-direction:reverse]"></div>
          </div>
          <p className="text-[#05B0C1] font-family-spacemono animate-pulse tracking-widest">LOADING SUBMISSION...</p>
       </div>
    </div>
  );
}

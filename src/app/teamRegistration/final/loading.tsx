import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#090223] bg-cover bg-no-repeat bg-center flex items-center justify-center" style={{ backgroundImage: "url('/images/login/Background.svg')" }}>
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-[#05C174]" size={48} />
        <p className="font-family-audiowide text-[#05C174] text-xl animate-pulse">
          LOADING...
        </p>
      </div>
    </div>
  );
}

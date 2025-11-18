"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, Lock, Users, Zap } from "lucide-react";

export default function LoginPage() {
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      team_name: teamName,
      password,
    });

    if (result?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push("/");
  }

  return (
    <div className="min-h-[calc(100vh_-_7vh)] bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Ambient Background Effects (Glowing Orbs) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-md z-10">
        
        {/* Top Decorative Line */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)]">
          
          {/* Header Section */}
          <div className="text-center mb-8 relative">
             <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-950/50 border border-cyan-500/30 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Zap className="w-6 h-6 text-cyan-400" />
             </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Team Login</span>
            </h1>
            <p className="text-cyan-200/50 text-sm font-medium tracking-wide uppercase">Hackfest 2026</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Team Name Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-[0.2em] text-cyan-500 uppercase ml-1">Team Identity</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-cyan-500/40 group-focus-within:text-cyan-400 transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-950/60 border border-cyan-800/40 rounded-lg text-cyan-100 placeholder-cyan-900/70 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 shadow-inner"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-[0.2em] text-cyan-500 uppercase ml-1">Security Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-cyan-500/40 group-focus-within:text-cyan-400 transition-colors duration-300" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-950/60 border border-cyan-800/40 rounded-lg text-cyan-100 placeholder-cyan-900/70 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 shadow-inner"
                />
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30 text-red-400 text-xs font-mono flex items-center justify-center animate-pulse">
                <span className="mr-2">⚠️</span> {error}
              </div>
            )}

            {/* Action Button */}
            <button
              type="submit"
              className="w-full group relative overflow-hidden flex justify-center items-center py-3.5 px-4 mt-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all duration-300 shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)]"
            >
                {/* Shine effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                
                <span className="relative flex items-center tracking-wider">
                    INITIALIZE
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
            </button>
          </form>
          
          {/* Footer Decor */}
          <div className="mt-8 pt-4 border-t border-cyan-900/30 flex justify-between items-center text-[10px] text-cyan-500/40 font-mono">
            <span>SYS.VER.2.0.4</span>
            <span className="animate-pulse">● ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

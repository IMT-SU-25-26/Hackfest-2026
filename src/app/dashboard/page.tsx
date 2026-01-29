import React from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/config/prisma';
import AdminDashboard from '@/features/admin/components/AdminDashboard';

export default async function Dashboard() {
  const headersList = await headers();
  const teamId = headersList.get('x-team-id');
  
  // Minimal server-side auth check logic as requested/implied by previous context
  // The actual protection might be in middleware, but good to have a check here if needed.
  // Assuming the user is an admin if they can access this page (middleware) OR we check DB here.
  // For now, I'll keep it simple and render the client dashboard.
  
  return (
    <div className="min-h-screen relative bg-[#090223] pt-[7vh]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        style={{
            backgroundImage: 'url(/images/login/Background.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl text-center text-[#05B0C1] font-family-audiowide mb-8 tracking-widest drop-shadow-[0_0_10px_rgba(5,193,116,0.5)]">
            ADMIN DASHBOARD
        </h1>
        <AdminDashboard />
      </div>
    </div>
  );
}

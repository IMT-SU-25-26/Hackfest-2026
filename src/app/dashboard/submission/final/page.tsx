import React from 'react';
import { headers } from 'next/headers';
import SubmissionDashboard from '@/features/admin/components/submissions/SubmissionDashboard';

export default async function FinalSubmission() {
  const headersList = await headers();
  const teamId = headersList.get('x-team-id');
  
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
            FINAL SUBMISSIONS
        </h1>
        <SubmissionDashboard type="final" />
      </div>
    </div>
  );
}

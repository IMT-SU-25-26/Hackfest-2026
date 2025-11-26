import TeamList from '@/components/dashboard/TeamList'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/config/prisma';
import React from 'react'

export default async function Dashboard() {
  const headersList = await headers();
  const teamId = headersList.get('x-team-id');
  const teamRole = headersList.get('x-team-role');

  // Double-check: verify role against database (prevents escalation if token is somehow manipulated)
  if (teamId) {
    const team = await prisma.team.findUnique({
      where: { team_id: teamId },
    });

    if (!team || team.role !== 'ADMIN') {
      redirect('/');
    }
  }

  return (
    <>
      <div className="h-[7vh] w-full"></div>
      <TeamList />
    </>
  );
}

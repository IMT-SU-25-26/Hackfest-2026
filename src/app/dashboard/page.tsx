
import TeamList from '@/components/dashboard/TeamList'
import { Role } from '@/generated/prisma';
import { authOptions } from '@/lib/auth';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Dashboard() {
  // const session = await getServerSession(authOptions);

  // if (!session || session.user.role !== Role.ADMIN) {
  //   return redirect("/login");
  // }

  return (
    <>
      <TeamList />
    </>
  );
}

import React from "react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CompetitionPage({ params }: PageProps) {
    const slug = await (await params).slug
    return (
        <div className="bg-[#0a0a1f] flex flex-col gap-4 justify-center items-center w-screen min-h-screen text-white">
            <h1>Competition Page</h1>
            <p>{slug}</p>
        </div>  
    )
}
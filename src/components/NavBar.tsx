import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function NavBar() {
  return (
    <nav className='fixed z-100 w-screen px-[5%] bg-[#1C0951] border-b-2 border-[#00C074] overflow-hidden h-[7vh] flex justify-between gap-4 items-center'>
      <Link href={"/"}><Image src={"/navbar/logo-hackfest.webp"} alt='hackfest logo' width={200} height={200} className='w-32 h-auto'></Image></Link>
      <div className='hidden md:flex text-white font-semibold gap-4 justify-center items-center'>
        <Link href={"/"}>HOME</Link>
        <Link href={"/registration"}>REGISTRATION</Link>
        <Link href={"/login"}>LOGIN</Link>
      </div>
      <div className='flex flex-col md:hidden gap-1 justify-center items-center'>
       <div className='w-4 h-0.5 bg-white'></div>
       <div className='w-4 h-0.5 bg-white'></div>
       <div className='w-4 h-0.5 bg-white'></div>
      </div>
    </nav>
  )
}

export default NavBar
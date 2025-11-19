import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

type ButtonImgProps = {
    imgUrl: string;
    children: React.ReactNode;
}

function ButtonImg({imgUrl, children}: ButtonImgProps) {
  return (
    <Link
        href="/register"
        className="
            group 
            relative
            border-2
            border-[#05C174] 
            w-[20%]
            md:w-auto
            h-auto
            md:h-[47%]
            aspect-square
            flex 
            flex-col 
            items-center 
            justify-between
            transition-all 
            duration-300
            hover:shadow-[0_0_25px_#20e3b2]
            hover:border-[#32ffc8]
            bg-black/20
        "
        >
        {/* ICON */}
        <div className="h-[70%] w-full flex items-center justify-center p-2">
            <Image
            src={imgUrl}
            alt="Register Icon"
            width={120}
            height={120}
            className="h-[60%] w-auto object-contain group-hover:brightness-125 transition"
            />
        </div>

        {/* TEXT */}
        <div className="border-t-2 border-t-[#05C174] h-[30%] w-full flex items-center justify-center bg-[#05C174]/10">
            <p className="text-[#20e3b2] font-bold text-[50%] md:text-[50%] lg:text-[55%] xl:text-[78%] tracking-wide font-family-audiowide">
            {children}
            </p>
        </div>
    </Link>
  )
}

export default ButtonImg
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
            w-full
            h-auto
            flex 
            flex-col 
            items-center 
            justify-between
            transition-all 
            duration-300
            hover:shadow-[0_0_25px_#20e3b2]
            bg-black/20
        "
        >
            <Image
            src={imgUrl}
            alt="Register Icon"
            width={120}
            height={120}
            className="h-full w-full object-contain group-hover:brightness-125 transition"
            />
    </Link>
  )
}

export default ButtonImg
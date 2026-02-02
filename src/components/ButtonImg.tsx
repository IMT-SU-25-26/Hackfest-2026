import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

type ButtonImgProps = {
    imgUrl: string;
    href: string;
    children?: React.ReactNode;
    className?: string;
}

function ButtonImg({imgUrl, href, className = ""}: ButtonImgProps) {
  return (
    <Link
        href={href}
        className={`
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
            ${className}
        `}
        >
            <Image
            src={imgUrl}
            alt="Register Icon"
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full object-contain group-hover:brightness-125 transition"
            />
    </Link>
  )
}

export default ButtonImg
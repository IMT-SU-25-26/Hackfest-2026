'use client'
import LoginForm, { LoginFormHandle } from '@/components/auth/LoginForm'
import Link from 'next/link';
import React from 'react'

function LoginPage2() {
    const formRef = React.useRef<LoginFormHandle>(null);
    return (
        <>
            {/* Page Background */}
            <div className="w-full min-h-screen bg-cover bg-no-repeat bg-center bg-[url('/login/background.svg')] bg-[#090223">
                <div className='absolute left-0 top-0 w-full min-h-screen bg-[#090223]/50 flex justify-center items-center pt-[7vh]'>

                    {/* Login Container BG */}
                    <div className="relative pt-0 -top-[3vh] md:pt-[2%] bg-[url('/auth/bgContainer-mobile.svg')] md:bg-[url('/login/outerframe.svg')] aspect-355/472 md:aspect-1187/627 min-w-[400px] md:min-w-[600px] w-[65%] md:w-[70%] max-w-[990px] bg-contain flex flex-col justify-center items-center bg-no-repeat">
                        <p className='block md:hidden glow-pulse text-3xl font-family-audiowide text-[#05B0C1]'>LOGIN</p>
                        <LoginForm ref={formRef} />
                        
                        <p className='text-sm lg:text-md xl:text-lg text-center font-family-spacemono text-white'>{`Don't have an account?`} <Link href={'/register'} className='text-[#05B0C1]'>Registration</Link></p>
                        {/* Button Login */}
                        <div
                            onClick={() => formRef.current?.submit()}
                            className="
                                relative md:absolute -bottom-[3%] md:-bottom-[8%]
                                bg-[url('/utils/buttonBG.svg')]
                                w-[45%] md:w-[30%] bg-no-repeat bg-contain aspect-361/100
                                flex justify-center items-center
                                transition-all duration-300
                                hover:drop-shadow-[0_0_15px_#05B0C1]
                                cursor-pointer
                            "
                            >
                            <p className='font-family-audiowide text-md lg:text-xl text-[$090223]'>login</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LoginPage2
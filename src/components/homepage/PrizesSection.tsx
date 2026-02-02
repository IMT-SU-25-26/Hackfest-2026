import Image from 'next/image'


type PrizesSectionProps = {
    imgMobile: string;
    imgDesktop: string;
}

export default function PrizesSection({ imgMobile, imgDesktop }: PrizesSectionProps) {
    return (
        <div className="bg-[#0a0a1f]">
            <div className="m-auto flex w-[100%] flex-col justify-center gap-[3%] px-0 md:flex-row">
                <div className="flex w-full flex-col gap-4">

                    <div className="mt-5 flex w-full flex-col items-center gap-5 md:flex-row md:gap-10">
                        <Image
                            src={imgMobile}
                            alt="prize mobile"
                            width={2200}
                            height={1300}
                            className="inline-block h-auto w-[80%] md:hidden"
                        />
                        <Image
                            src={imgDesktop}
                            alt="prize desktop"
                            width={2200}
                            height={1300}
                            className="hidden h-auto w-full md:inline-block"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

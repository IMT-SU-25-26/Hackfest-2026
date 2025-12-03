import Image from 'next/image'

type JudgeCardProps={
    imgUrl: string,
    classImage?: string,
    name:string,
    title:string,
    key?:number
}

function JudgeCard({imgUrl, classImage, name, title}: JudgeCardProps) {
    return (
        <div className="relative min-w-[253px] w-[70%] md:w-[25%] aspect-355/472 bg-[url('/images/FAQ/judge-card.svg')] bg-contain bg-no-repeat">
            <div className="relative top-[12%] -left-[0.9%] w-[88%] m-auto aspect-square overflow-hidden">
                <Image
                    src={imgUrl}
                    alt=""
                    fill
                    className={`object-contain  ${classImage}`}
                />
            </div>
            <div className="absolute bottom-[5%] md:bottom-[3%] lg:bottom-[4%] left-[10%] md:left-[12%] lg:left-[9%] leading-[100%] sm:leading-[140%] md:leading-[100%] xl:leading-[120%] max-w-[75%]">
                <p className={`font-family-audiowide text-[#05C174]  ${name.length > 18 ? "text-[90%] sm:text-[140%] md:text-[85%] lg:text-[90%] xl:text-[140%]" : "text-[110%] sm:text-[160%] md:text-[90%] lg:text-[120%] xl:text-[150%]"}`}>{name}</p>
                <p className="font-family-spacemono font-bold text-[#05B0C1] text-[80%] sm:text-[90%] md:text-[70%] lg:text-[80%]">{title}</p>
            </div>
        </div>
    )
}

export default JudgeCard;
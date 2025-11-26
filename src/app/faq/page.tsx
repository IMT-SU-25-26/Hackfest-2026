import JudgeSection from "@/components/faq/JudgeSection"
import VideoSection from "@/components/faq/VideoSection"

function FaqPage() {
    return (
        <>
            <div className='min-h-screen w-dvw bg-[#090223]'>
                <VideoSection />
                <JudgeSection />

            </div>
        </>
    )
}

export default FaqPage
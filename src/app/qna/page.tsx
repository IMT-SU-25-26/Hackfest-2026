import FaqSection from "@/components/faq/FaqSection"
import JudgeSection from "@/components/faq/JudgeSection"
import VideoSection from "@/components/faq/VideoSection"
import { getAllDiscussions } from "@/lib/services/discussion"

export const dynamic = 'force-dynamic'

async function FaqPage() {
    const discussion = await getAllDiscussions()
    return (
        <>
            <div className='min-h-screen w-dvw bg-[#090223]'>
                <VideoSection />
                {/* <JudgeSection /> */}
                <FaqSection discussion={discussion} />  
            </div>
        </>
    )
}

export default FaqPage
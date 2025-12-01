"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DiscussionData } from "@/types/services/discussion";
import { Send } from "lucide-react";
import { createReply } from "@/lib/services/discussion";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { Role } from "@/generated/prisma";

type FaqSectionProps = {
  discussion: DiscussionData[];
}

function FaqSection({discussion}:FaqSectionProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === Role.ADMIN;

  const router = useRouter()
  const [openIndexes, setOpenIndexes] = useState<number[]>([2]);
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});

  const toggleFaq = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  async function replyQuestion(questionId: string) {
    const content = replyContent[questionId];
    if (!content?.trim()) {
      toast.warn("Please write a reply");
      return;
    }
    
    const formData = new FormData();
    formData.append("content", content);
    formData.append("discussionId", questionId);
    
    try {
      const result = await createReply(formData);
      if (result?.success) {
        setReplyContent({ ...replyContent, [questionId]: "" });
        toast.success("Reply posted successfully");
      } else {
        toast.error(result?.error || "Failed to post reply");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Error posting reply");
    }
  }

  return (
    <section id="faq" className="w-full bg-[url('/images/FAQ/bg-faq.svg')] bg-cover bg-no-repeat bg-[#0a0a1f] py-16 px-4 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-0 p-6 border-t-2 border-l-2 border-r-2 border-[#00ff88]">
          <div className="flex items-center gap-4">
            <Image
              src="/images/FAQ/brain.svg"
              alt="Brain Icon"
              width={60}
              height={60}
              className="filter brightness-0 saturate-100"
              style={{
                filter:
                  "invert(72%) sepia(98%) saturate(441%) hue-rotate(101deg) brightness(101%) contrast(101%)",
              }}
            />
          </div>

          <h2 className="text-5xl md:text-6xl font-family-audiowide font-bold text-[#00ff88] tracking-wider">
            Discussion
          </h2>

          <div className="flex items-center gap-4">
            <Image
              src="/images/FAQ/danger.svg"
              alt="Danger Icon"
              width={60}
              height={60}
              className="filter brightness-0 saturate-100"
              style={{
                filter:
                  "invert(72%) sepia(98%) saturate(441%) hue-rotate(101deg) brightness(101%) contrast(101%)",
              }}
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="border-2 border-[#00ff88]">
          {discussion.map((faq, index) => (
            <div
              key={index}
              className={`bg-[#0a0a1f]/20 overflow-hidden ${index > 0 ? 'border-t-2 border-[#00ff88]' : ''}`}
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#00ff88] text-xl">&gt;</span>
                  <span className="text-[#00ff88] text-xl md:text-2xl font-family-spacemono font-medium">
                    {faq.question}
                  </span>
                </div>
                <div
                  className="text-[#00ff88] text-3xl transition-transform duration-300"
                >
                  {openIndexes.includes(index) ? "∧" : "∨"}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndexes.includes(index)
                    ? "max-h-96 opacity-100 overflow-visible"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <div className="px-6 pb-6 pl-14 space-y-3">
                  {faq.replies.map((reply, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-[#00ff88] text-base md:text-lg leading-relaxed"
                    >
                      <span className="text-[#00ff88]  mr-2">&gt;</span>
                      {reply.content}
                    </p>
                  ))}

                  {isAdmin && (
                    <>
                      {/* Reply Question */}
                      <div className="flex gap-2 mt-4">
                        <input 
                          type="text" 
                          placeholder="Write a reply..."
                          value={replyContent[faq.id] || ""}
                          onChange={(e) => setReplyContent({ ...replyContent, [faq.id]: e.target.value })}
                          className="flex-1 border border-[#05C174] outline-0 active:outline-0 focus:outline-0 focus:border-[#00ff88] font-family-audiowide text-[#05C174] placeholder-[#05C174]/50 p-[1%] bg-transparent transition-colors" 
                        />
                        <button 
                          className="bg-[#05C174] hover:bg-[#00ff88] text-[#090223] aspect-square p-2 rounded transition-colors flex items-center justify-center"
                          title="Reply"
                          onClick={() => replyQuestion(faq.id)}
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center flex-col items-center mt-[5%]">
          <h1 className="font-family-audiowide glow-pulse text-[#05B0C1] text-center text-3xl md:text-5xl">Still have more questions ?</h1>
          
          <button
              type="button"
              onClick={()=>{router.push("askQuestion")}}
              className={`font-family-spacemono mt-[2%] mb-[5%] w-[80%] max-w-[600px] aspect-6/1 bg-transparent bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center px-4 text-black transition-all duration-300 hover:text-black hover:drop-shadow-[0_0_8px_#05C174] text-lg font-bold`}
          >
              <div className="relative">
                  <p className="font-family-audiowide text-center text-sm sm:text-md lg:text-xl">
                      Ask Question
                  </p>
              </div>
          </button>
      </div>

    </section>
  );
}

export default FaqSection;

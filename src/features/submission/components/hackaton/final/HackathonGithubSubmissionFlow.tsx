'use client';

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import FormInput from "@/components/auth/FormInput";
import { submitFinal } from "../../../actions";
import { Loader2, Link as LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ServerTime from "../../ServerTime";

type GithubSubmissionData = {
  github_url: string;
};

interface HackathonGithubSubmissionFlowProps {
  teamId: string;
}

export default function HackathonGithubSubmissionFlow({ teamId }: HackathonGithubSubmissionFlowProps) {
  const router = useRouter();
  const methods = useForm<GithubSubmissionData>();
  const { handleSubmit } = methods;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<GithubSubmissionData | null>(null);

  const onSubmitClick = (data: GithubSubmissionData) => {
    setPendingData(data);
    setShowConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingData) return;
    setIsSubmitting(true);
    try {
      const res = await submitFinal(teamId, {
          github_url: pendingData.github_url,
      });

      if (res.success) {
        toast.success("Submission successful!");
        router.push("/dashboard");
      } else {
        toast.error(res.error || "Submission failed");
      }
    } catch (error) {
       toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen w-screen flex justify-center items-center pt-[10%] md:pt-0">
        <div className="relative z-10 pt-[15%] sm:pt-[12%] md:pt-0 min-w-[340px] md:min-w-[700px] w-[70%] md:max-w-[1000px] aspect-355/472 md:aspect-1187/627 bg-[url('/images/auth/bgContainer-mobile.svg')] md:bg-[url('/images/submission/container.svg')] bg-contain bg-no-repeat bg-center">
          
          <div className="font-family-audiowide relative z-1 flex flex-col items-center justify-center h-full"> 
            <div
              className="block md:hidden mb-[2%] text-3xl sm:text-4xl text-[#05B0C1] mt-[10%]"
              style={{ textShadow: "0 0 10px #05B0C1, 0 0 20px #05B0C1" }}
            >
              SUBMISSION
            </div>

            <div className="flex w-10/12 md:aspect-600/267 mt-0 md:mt-[10%] items-start justify-center py-4">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitClick)} className="relative flex flex-col w-full md:w-[80%] gap-6">
                  
                  {/* Github Link */}
                  <FormInput
                    id="github_url"
                    label="Github Repository Link"
                    placeholder="https://github.com/..."
                    icon={LinkIcon}
                    rules={{ 
                        required: "Github link is required",
                        pattern: {
                            value: /^(https?:\/\/)?(www\.)?github\.com\/.+/,
                            message: "Please enter a valid Github link"
                        }
                    }}
                  />
                  
                  {/* Submit Button */}
                  <div className="relative flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="
                          absolute bg-[url('/images/utils/buttonBG.svg')] w-[80%] md:w-[60%] bg-no-repeat bg-contain aspect-361/100
                          flex justify-center items-center
                          transition-all duration-300
                          hover:drop-shadow-[0_0_15px_#05B0C1]
                          cursor-pointer
                          border-none outline-none bg-transparent
                      "
                    >
                      <p className='font-family-audiowide text-sm sm:text-lg lg:text-2xl text-[#090223]'>submit</p>
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-[8vh]">
          <ServerTime />
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="w-[90%] max-w-md p-6 bg-[#090223] border border-[#05C174] shadow-[0_0_15px_#05C174]">
            <h2 className="font-family-audiowide text-xl text-[#05B0C1] mb-4 text-center" style={{ textShadow: "0 0 5px #05B0C1" }}>Permanent Submission</h2>
            <p className="font-family-spacemono text-white text-sm mb-6 text-center">
              The submission is permanent and can not be modified. Changes to the GitHub repository URL are not allowed at all. Please make sure the URL is correct.
            </p>
            <div className="flex justify-between font-family-audiowide gap-4">
              <button 
                type="button" 
                onClick={() => setShowConfirm(false)} 
                className="px-4 py-2 border border-[#05C174] text-[#05C174] w-[45%] hover:bg-[#05C174]/10 transition-colors"
                disabled={isSubmitting}
              >
                CANCEL
              </button>
              <button 
                type="button" 
                onClick={handleConfirmSubmit} 
                className="flex justify-center px-4 py-2 bg-[#05C174] text-[#090223] w-[45%] border border-[#05C174] hover:bg-[#05C174]/90 transition-colors" 
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin text-[#090223]" /> : "CONFIRM"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

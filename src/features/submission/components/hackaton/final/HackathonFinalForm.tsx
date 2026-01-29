'use client';

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import FormInput from "@/components/auth/FormInput";
import UploadButton from "@/components/UploadButton";
import { submitFinal } from "../../../actions";
import { Loader2, Link as LinkIcon, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

// Define form data structure
type FinalSubmissionFormData = {
  ppt_url: string;
  github_url: string;
  video_demo_url: string;
};

interface HackathonFinalFormProps {
  teamId: string;
}

export default function HackathonFinalForm({ teamId }: HackathonFinalFormProps) {
  const router = useRouter();
  const methods = useForm<FinalSubmissionFormData>();
  const { handleSubmit, register, setValue, watch, formState: { errors } } = methods;

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Watch fields for validation/display
  const pptUrl = watch("ppt_url");
  const githubUrl = watch("github_url");
  const videoDemoUrl = watch("video_demo_url");

  const onSubmit = async (data: FinalSubmissionFormData) => {
    setIsSubmitting(true);
    try {
      const res = await submitFinal(teamId, {
          ppt_url: data.ppt_url,
          github_url: data.github_url,
          video_demo_url: data.video_demo_url
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
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!pptUrl) {
        toast.error("Please upload the PPT");
        return;
      }
      if (!githubUrl) { // Basic check, rely on FormInput rules for pattern if needed but simpler here
          // We can also let the trigger validation handle it if we want strict blocking
      }
      // Trigger validation for github_url
      methods.trigger("github_url").then((isValid) => {
          if (pptUrl && isValid) {
               setStep(2);
          }
      });
    }
  };

  const handlePrev = () => {
    setStep(1);
  };

  return (
    <div className="font-family-audiowide relative z-1 flex flex-col items-center justify-center">
       <div
        className="block md:hidden mb-[2%] text-3xl sm:text-4xl text-[#05B0C1]"
        style={{ textShadow: "0 0 10px #05B0C1, 0 0 20px #05B0C1" }}
      >
        SUBMISSION
      </div>
      <div className="hide-scrollbar flex w-10/12 aspect-600/600 md:aspect-600/267 mt-0 md:mt-[10%] items-start justify-center overflow-y-auto border-0 border-solid border-[#05C174] py-0 sm:py-0 ">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col w-full md:w-[80%] gap-6">
            
            {/* STAGE 1 */}
            {step === 1 && (
              <>
                 {/* PPT Upload */}
                 <div className="w-full">
                    <label className="mb-2 block text-md text-[#05C174] font-family-audiowide">
                        PPT Presentation
                    </label>
                    <UploadButton
                        options={{ folder: "hackfest26/submission/ppt/" }}
                        onSuccess={(url) => setValue("ppt_url", url)}
                    >
                        {({ open, isLoading }) => (
                        <button
                            type="button"
                            onClick={open}
                            disabled={isLoading}
                            className={`font-family-spacemono w-full aspect-6/1 bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center text-black font-bold flex items-center justify-center hover:drop-shadow-[0_0_8px_#05C174] ${pptUrl ? 'bg-green-500/20' : ''}`}
                        >
                            {isLoading ? (
                            <Loader2 className="animate-spin" />
                            ) : (
                            <div className="flex items-center gap-2">
                                <FileText size={20} />
                                <span>{pptUrl ? "✓ File Uploaded" : "Upload PPT"}</span>
                            </div>
                            )}
                        </button>
                        )}
                    </UploadButton>
                    {pptUrl && <p className="text-xs text-[#05B0C1] mt-1 truncate">File: {pptUrl.split('/').pop()}</p>}
                 </div>

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
              </>
            )}

            {/* STAGE 2 */}
            {step === 2 && (
              <>
                 {/* Video Demo Link (Direct File) */}
                 <FormInput
                    id="video_demo_url"
                    label="Video Demo Link (Direct Google Drive File)"
                    placeholder="https://drive.google.com/file/d/..."
                    icon={LinkIcon}
                    rules={{ 
                        required: "Video demo link is required",
                        pattern: {
                            // Regex to match typical Google Drive FILE links (/file/d/ID/view), attempting to exclude folders (/drive/folders/ID)
                            // Basic check: must contain "google.com" and "/file/d/"
                            value: /google\.com\/file\/d\/[a-zA-Z0-9_-]+/,
                            message: "Please provide a direct file link, not a folder link."
                        }
                    }}
                 />
                 <p className="text-xs text-[#05B0C1] mt-[-1rem]">Make sure the link is accessible (anyone with the link can view).</p>
              </>
            )}

          </form>
        </FormProvider>
      </div>

       {/* Navigation Buttons */}
       <div className={`absolute bottom-[5%] md:-bottom-[20%] w-full flex ${step === 1 ? 'justify-center' : 'justify-between'} gap-[5%] md:gap-0 px-[9%] md:px-[15%] z-20`}>
          {step > 1 && (
             <div
               onClick={handlePrev}
               className="
                   bg-[url('/images/utils/buttonBG.svg')] w-[50%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                   flex justify-center items-center
                   transition-all duration-300
                   hover:drop-shadow-[0_0_15px_#05B0C1]
                   cursor-pointer
               "
             >
               <p className='font-family-audiowide text-sm sm:text-lg lg:text-2xl text-[#090223]'>previous</p>
             </div>
          )}

          {step === 1 && (
             <div
               onClick={handleNext}
               className="
                   bg-[url('/images/utils/buttonBG.svg')] w-[50%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                   flex justify-center items-center
                   transition-all duration-300
                   hover:drop-shadow-[0_0_15px_#05B0C1]
                   cursor-pointer
               "
             >
               <p className='font-family-audiowide text-sm sm:text-lg lg:text-2xl text-[#090223]'>next</p>
             </div>
          )}

          {step === 2 && (
             <button
               disabled={isSubmitting}
               onClick={handleSubmit(onSubmit)}
               className="
                   bg-[url('/images/utils/buttonBG.svg')] w-[50%] md:w-[40%] bg-no-repeat bg-contain aspect-361/100
                   flex justify-center items-center
                   transition-all duration-300
                   hover:drop-shadow-[0_0_15px_#05B0C1]
                   cursor-pointer
                   border-none outline-none
               "
             >
               {isSubmitting ? (
                 <Loader2 className="animate-spin text-[#090223]" />
               ) : (
                 <p className='font-family-audiowide text-sm sm:text-lg lg:text-2xl text-[#090223]'>submit</p>
               )}
             </button>
          )}
        </div>
    </div>
  );
}

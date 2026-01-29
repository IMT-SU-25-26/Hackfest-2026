'use client';

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import FormInput from "@/components/auth/FormInput";
import UploadButton from "@/components/UploadButton";
import { submitPreliminary } from "../../../actions";
import { Loader2, Link as LinkIcon, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

// Define form data structure
type SubmissionFormData = {
  originality_url: string;
  lean_canvas_url: string;
  gdrive_url: string;
};

interface HackathonPreliminaryFormProps {
  teamId: string;
}

export default function HackathonPreliminaryForm({ teamId }: HackathonPreliminaryFormProps) {
  const router = useRouter();
  const methods = useForm<SubmissionFormData>();
  const { handleSubmit, register, setValue, watch, formState: { errors } } = methods;

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Watch fields for validation/display
  const originalityUrl = watch("originality_url");
  const leanCanvasUrl = watch("lean_canvas_url");
  const gdriveUrl = watch("gdrive_url");

  const onSubmit = async (data: SubmissionFormData) => {
    setIsSubmitting(true);
    try {
      // Map to the server action structure
      const res = await submitPreliminary(teamId, {
          originality_url: data.originality_url,
          lean_canvas_url: data.lean_canvas_url,
          gdrive_url: data.gdrive_url
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
      if (!originalityUrl) {
        toast.error("Please upload the Originality Statement");
        return;
      }
      if (!leanCanvasUrl) {
        toast.error("Please upload the Lean Canvas");
        return;
      }
      setStep(2);
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
                 {/* Originality Statement */}
                 <div className="w-full">
                    <label className="mb-2 block text-md text-[#05C174] font-family-audiowide">
                        Originality Statement
                    </label>
                    <UploadButton
                        options={{ folder: "hackfest26/submission/originality/" }}
                        onSuccess={(url) => setValue("originality_url", url)}
                    >
                        {({ open, isLoading }) => (
                        <button
                            type="button"
                            onClick={open}
                            disabled={isLoading}
                            className={`font-family-spacemono w-full aspect-6/1 bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center text-black font-bold flex items-center justify-center hover:drop-shadow-[0_0_8px_#05C174] ${originalityUrl ? 'bg-green-500/20' : ''}`}
                        >
                            {isLoading ? (
                            <Loader2 className="animate-spin" />
                            ) : (
                            <div className="flex items-center gap-2">
                                <FileText size={20} />
                                <span>{originalityUrl ? "✓ File Uploaded" : "Upload Originality Statement"}</span>
                            </div>
                            )}
                        </button>
                        )}
                    </UploadButton>
                    {originalityUrl && <p className="text-xs text-[#05B0C1] mt-1 truncate">File: {originalityUrl.split('/').pop()}</p>}
                 </div>

                 {/* Lean Canvas */}
                 <div className="w-full">
                    <label className="mb-2 block text-md text-[#05C174] font-family-audiowide">
                        Lean Canvas
                    </label>
                    <UploadButton
                        options={{ folder: "hackfest26/submission/leancanvas/" }}
                        onSuccess={(url) => setValue("lean_canvas_url", url)}
                    >
                        {({ open, isLoading }) => (
                        <button
                            type="button"
                            onClick={open}
                            disabled={isLoading}
                            className={`font-family-spacemono w-full aspect-6/1 bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center text-black font-bold flex items-center justify-center hover:drop-shadow-[0_0_8px_#05C174] ${leanCanvasUrl ? 'bg-green-500/20' : ''}`}
                        >
                            {isLoading ? (
                            <Loader2 className="animate-spin" />
                            ) : (
                            <div className="flex items-center gap-2">
                                <FileText size={20} />
                                <span>{leanCanvasUrl ? "✓ File Uploaded" : "Upload Lean Canvas"}</span>
                            </div>
                            )}
                        </button>
                        )}
                    </UploadButton>
                     {leanCanvasUrl && <p className="text-xs text-[#05B0C1] mt-1 truncate">File: {leanCanvasUrl.split('/').pop()}</p>}
                 </div>
              </>
            )}

            {/* STAGE 2 */}
            {step === 2 && (
              <>
                 {/* Google Drive Video Link (Direct File) */}
                 <FormInput
                    id="gdrive_url"
                    label="Google Drive Video Link (Direct File)"
                    placeholder="https://drive.google.com/file/d/..."
                    icon={LinkIcon}
                    rules={{ 
                        required: "Google Drive video link is required",
                        pattern: {
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

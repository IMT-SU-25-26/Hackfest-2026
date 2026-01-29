"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { Loader2, FileText, Upload } from "lucide-react";
import { toast } from "react-toastify";
import UploadButton from "@/components/UploadButton";
import { submitFinalRegistration } from "../actions";
import { useRouter } from "next/navigation";
import { toastError } from "@/lib/utils/utils";

export interface FinalTeamRegisterFormHandle {
  nextStep: () => Promise<number | null>;
  prevStep: () => number;
  submit: () => void;
  getStep: () => number;
}

interface FinalTeamRegisterFormProps {
  teamId: string;
  teamName: string;
}

function FinalTeamRegisterForm({ teamId, teamName }: FinalTeamRegisterFormProps, ref: React.ForwardedRef<FinalTeamRegisterFormHandle>) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [suratTugasUrl, setSuratTugasUrl] = useState<string | null>(null);
  const [paymentProofUrl, setPaymentProofUrl] = useState<string | null>(null);

  const nextStep = async (): Promise<number | null> => {
    if (step === 1) {
      if (!suratTugasUrl) {
        toast.error("Please upload Surat Tugas");
        return null;
      }
      setStep(2);
      return 2;
    }
    return null; 
  };

  const prevStep = (): number => {
    if (step === 2) {
      setStep(1);
      return 1;
    }
    return step;
  };

  const submit = async () => {
    if (!paymentProofUrl) {
      toast.error("Please upload Proof of Payment");
      return;
    }

    if (!suratTugasUrl) {
      toast.error("Surat Tugas is missing");
      return;
    }

    const toastId = toast.loading("Submitting registration...");
    const res = await submitFinalRegistration(teamId, {
      surat_tugas_url: suratTugasUrl,
      payment_proof: paymentProofUrl,
    });

    if (res.success) {
      toast.update(toastId, { render: "Final registration submitted successfully!", type: "success", isLoading: false, autoClose: 3000 });
      router.push("/dashboard");
    } else {
      toast.update(toastId, { render: res.error ?? "An error occurred", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  useImperativeHandle(ref, () => ({
    nextStep,
    prevStep,
    submit,
    getStep: () => step,
  }));

  return (
    <div className="w-full h-full flex flex-col items-center">
        <div className="flex justify-center mb-4 md:mb-8 gap-4 font-spacemono text-xs md:text-sm ">
            {/* <div className={`px-4 py-1 rounded-full border ${step === 1 ? 'bg-[#05C174]/20 border-[#05C174] text-[#05C174]' : 'border-gray-600 text-gray-500'}`}>
            1. Surat Tugas
            </div>
            <div className={`px-4 py-1 rounded-full border ${step === 2 ? 'bg-[#05C174]/20 border-[#05C174] text-[#05C174]' : 'border-gray-600 text-gray-500'}`}>
            2. Payment
            </div> */}
        </div>

        <div className="w-full md:w-[80%] flex flex-col gap-6">
        {step === 1 && (
            <div className="w-full space-y-4">
                <label className="mb-2 block text-md text-[#05C174] font-family-audiowide flex items-center gap-2">
                    <FileText size={20} /> Upload Surat Tugas
                </label>
                
                <UploadButton
                    options={{ folder: "hackfest26/surat_tugas/" }}
                    onSuccess={(url) => setSuratTugasUrl(url)}
                >
                    {({ open, isLoading }) => (
                    <button
                        type="button"
                        onClick={open}
                        disabled={isLoading}
                        className="font-family-spacemono w-full aspect-6/1 bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center text-black font-bold flex items-center justify-center hover:drop-shadow-[0_0_8px_#05C174]"
                    >
                        {isLoading ? (
                        <Loader2 className="animate-spin" />
                        ) : (
                        <span className="flex items-center gap-2">
                            {suratTugasUrl ? <span className="text-green-800">✓ Uploaded</span> : <> <Upload size={18}/> Upload PDF/Image </>}
                        </span>
                        )}
                    </button>
                    )}
                </UploadButton>
            </div>
        )}

        {step === 2 && (
            <div className="w-full space-y-4">
                <div className="mb-6 text-[#05B0C1] font-family-spacemono border border-[#05C174] p-4 rounded bg-black/50 overflow-hidden">
                    <p className="mb-2 font-bold text-[#05C174]">Final Registration Payment</p>
                    <div className="bg-[#05C174]/10 p-3 rounded mb-4">
                         <p className="text-sm">Bank: <span className="font-bold text-[#05C174]">Blu by BCA</span></p>
                        <p className="text-sm">No. Rekening: <span className="font-bold text-[#05C174] select-all">005714837012</span></p>
                        <p className="text-sm">Atas Nama: <span className="font-bold text-[#05C174]">Priscilia King Chandra</span></p>
                        <p className="text-sm mt-2">Amount: <span className="font-bold text-[#05C174]">Rp 200.001</span></p>
                    </div>
                    
                    <p className="text-sm mb-2">Transfer Description:</p>
                    <p className="text-lg font-bold bg-[#05C174]/20 p-2 text-center select-all break-all">
                        {teamName} - Hackathon Final
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2">*Please ensure the description matches your team name.</p>
                </div>

                <label className="mb-2 block text-md text-[#05C174] font-family-audiowide">
                    Proof of Payment
                </label>
                <UploadButton
                    options={{ folder: "hackfest26/payment_final/" }}
                    onSuccess={(url) => setPaymentProofUrl(url)}
                >
                    {({ open, isLoading }) => (
                    <button
                        type="button"
                        onClick={open}
                        disabled={isLoading}
                        className="font-family-spacemono w-full aspect-6/1 bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center text-black font-bold flex items-center justify-center hover:drop-shadow-[0_0_8px_#05C174]"
                    >
                        {isLoading ? (
                        <Loader2 className="animate-spin" />
                        ) : (
                        <span>{paymentProofUrl ? "✓ Uploaded" : "Upload Payment Proof"}</span>
                        )}
                    </button>
                    )}
                </UploadButton>
            </div>
        )}
        </div>
    </div>
  );
}

export default forwardRef(FinalTeamRegisterForm);

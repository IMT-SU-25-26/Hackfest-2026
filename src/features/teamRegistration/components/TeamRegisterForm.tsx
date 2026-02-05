"use client";

import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  Users,
  Phone,
  MessageCircle,
  Upload,
  Loader2,
  Check,
  X,
  Trophy,
  Mail,
  ChevronDown
} from "lucide-react";
import { toast } from "react-toastify";
import FormInput from "@/components/auth/FormInput";
import UploadButton from "@/components/UploadButton";
import { createTeam } from "@/lib/services/team";
import { checkUserEmail } from "../actions";
import { toastError } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { TeamCategory } from "@/generated/prisma"; // Adjust import if needed

type FormData = {
  teamName: string;
  category: TeamCategory;
  whatsapp: string;
  lineId: string;
  paymentProof?: string;
};

// Member state type
type MemberState = {
  email: string;
  status: 'idle' | 'checking' | 'valid' | 'invalid';
};


export interface TeamRegisterFormHandle {
  // ...
  nextStep: () => Promise<number | null>;
  prevStep: () => number;
  submit: () => void;
  getStep: () => number;
}

interface TeamRegisterFormProps {
    onCategoryChange?: (category: TeamCategory) => void;
}

export function TeamRegisterFormComponent({ onCategoryChange }: TeamRegisterFormProps, ref: React.ForwardedRef<TeamRegisterFormHandle>) {
  const Router = useRouter();
  // ... useForm

  const methods = useForm<FormData>({
    defaultValues: {
      category: "UIUX" as TeamCategory, // Default
    }
  });
  const { handleSubmit, control, trigger, watch, setValue } = methods;

  const [step, setStep] = useState(1);
  const [paymentProofUrl, setPaymentProofUrl] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Member email state
  const [members, setMembers] = useState<MemberState[]>([{ email: "", status: 'idle' }]);

  const category = useWatch({ control, name: "category" });
  const teamName = useWatch({ control, name: "teamName" });

  useEffect(() => {
    if (onCategoryChange && category) {
        onCategoryChange(category);
    }
  }, [category, onCategoryChange]);

  // ... rest of component

  // Debounce check email
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    members.forEach((member, index) => {
        if (member.status === 'idle' && member.email.trim() !== "") {
            // Initiate check with debounce
            const timer = setTimeout(async () => {
                setMembers(prev => {
                    const next = [...prev];
                    next[index].status = 'checking';
                    return next;
                });
                
                const result = await checkUserEmail(member.email);
                
                setMembers(prev => {
                    const next = [...prev];
                    next[index].status = result.exists ? 'valid' : 'invalid';
                    return next;
                });
            }, 500); // 500ms debounce
            timers.push(timer);
        }
    });

    return () => timers.forEach(clearTimeout);
  }, [members]);

  const handleEmailChange = (index: number, value: string) => {
    setMembers(prev => {
        const next = [...prev];
        next[index] = { email: value, status: 'idle' };
        return next;
    });
  };

  const addMember = () => {
    setMembers([...members, { email: "", status: 'idle' }]);
  };

  const removeMember = (index: number) => {
    if (members.length > 1) {
        setMembers(members.filter((_, i) => i !== index));
    }
  };

  const nextStep = async (): Promise<number | null> => {
    // console.log("nextStep called, current step:", step);
    let fieldsToValidate: (keyof FormData)[] = [];
    
    switch (step) {
      case 1:
        fieldsToValidate = ["teamName", "category"];
        break;
      case 2:
        // Validate members locally
        const validMembers = members.filter(m => m.email.trim() !== "");
        if (validMembers.length < 2) {
            toast.error("Please add at least two members");
            return null;
        }
        const allValid = validMembers.every(m => m.status === 'valid');
        if (!allValid) {
            toast.error("Please ensure all member emails are valid and registered");
            return null;
        }
        // Proceed
        const newStep2 = Math.min(4, step + 1);
        setStep(newStep2);
        return newStep2;
        
      case 3:
        fieldsToValidate = ["whatsapp", "lineId"] as (keyof FormData)[];
        
        break;
        
      case 4:
        if (category === "UIUX" && !paymentProofUrl) {
             toast.error("Please upload proof of payment");
             return null;
        }
        break;
    }

    if (fieldsToValidate.length > 0) {
        const isValid = await trigger(fieldsToValidate);
        if (!isValid) {
            fieldsToValidate.forEach((field) => {
                const error = methods.formState.errors[field];
                if (error && error.message) {
                  toast.error(error.message as string);
                }
            });
            return null;
        }
    }

    // Determine next step number
    if (step === 3) {
        if (category === "UIUX") { // Check "UIUX" string strictly matches Enum
             const newStep = 4;
             setStep(newStep);
             return newStep;
        } else {
             return 4; // Use 4 as "Ready" state?
        }
    }
    
    const newStep = Math.min(4, step + 1);
    setStep(newStep);
    return newStep;
  };

  const prevStep = (): number => {
    const newStep = Math.max(1, step - 1);
    setStep(newStep);
    return newStep;
  };

  const onSubmit = async (data: FormData) => {
    
    // Check if we need payment proof
    if (data.category === "UIUX" && !paymentProofUrl) {
        toast.error("Payment proof is required for UI/UX");
        return;
    }

    // 1. Create Team
    const res = await createTeam({
        name: data.teamName,
        category: data.category,
        phone: data.whatsapp,
        line_id: data.lineId,
        payment_proof: paymentProofUrl || undefined,
        memberEmails: members.map(m => m.email).filter(e => e.trim() !== ""),
    });

    if (!res.success || !res.data) {
        toastError(res.error || "Failed to create team");
        return;
    }

    const teamId = res.data.id;

    // 2. Add Members
    toast.success("Competition registered successfully!");
    Router.push('/dashboard'); 
  };

  useImperativeHandle(ref, () => ({
    nextStep,
    prevStep,
    submit() {
      handleSubmit(onSubmit)();
    },
    getStep: () => step,
  }));

  // Helper to determine if we should show step 4
  const showStage4 = category === "UIUX";

  return (
    <div className="font-family-audiowide relative z-1 flex flex-col items-center justify-center">
      <div
        className="block md:hidden mb-[2%] text-3xl sm:text-4xl text-[#05B0C1]"
        style={{ textShadow: "0 0 10px #05B0C1, 0 0 20px #05B0C1" }}
      >
        COMPETITION
      </div>
      <div className="hide-scrollbar flex w-10/12 aspect-600/600 md:aspect-600/267 mt-0 md:mt-[10%] items-start justify-center overflow-y-auto border-0 border-solid border-[#05C174] py-0 sm:py-0 ">
        <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col w-full md:w-[80%]"
        >
          {/* Stage 1: Team Name & Category */}
          {step === 1 && (
            <>
              <FormInput
                id="teamName"
                label="Enter your team name"
                placeholder="Team Name"
                icon={Users}
                rules={{ required: "Team Name is required" }}
              />

              <div className="mb-3 sm:mb-2 w-full">
                  <label className="mb-2 block text-md text-[#05C174] font-family-audiowide">
                    Competition Category
                  </label>
                  <div className="relative w-full aspect-7/1 sm:aspect-6/1">
                      <div className="absolute left-[5%] top-1/2 -translate-y-1/2 text-[#05C174] z-10">
                        <Trophy size={32} className="hidden lg:block"/>
                        <Trophy size={20} className="block lg:hidden"/>
                      </div>
                      <div
                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                         className="
                            absolute inset-0 h-full w-full font-family-spacemono appearance-none
                            bg-[url('/images/auth/formInput.svg')] bg-contain bg-no-repeat bg-center
                            pl-[15%] pr-4 text-[#05B0C1] 
                            text-sm sm:text-md xl:text-xl
                            border-0 outline-none focus:outline-none bg-transparent
                            flex items-center justify-between cursor-pointer select-none
                         "
                      >
                          <span>{category === "UIUX" ? "UI/UX" : "Hackathon"}</span>
                          <ChevronDown size={40} className={`transition-transform duration-300 mt-5 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {isDropdownOpen && (
                          <div className="absolute top-full mt-2 left-0 w-full z-50 border border-[#05C174] bg-transparent backdrop-blur-md overflow-hidden shadow-[0_0_15px_#05C174]">
                              <div 
                                onClick={() => { setValue("category", "UIUX" as TeamCategory); setIsDropdownOpen(false); }}
                                className="px-4 py-3 hover:bg-[#05C174]/20 cursor-pointer text-[#05B0C1] font-family-spacemono transition-colors border-b border-[#05C174]/30"
                              >
                                  UI/UX
                              </div>
                              <div 
                                onClick={() => { setValue("category", "HACKATON" as TeamCategory); setIsDropdownOpen(false); }}
                                className="px-4 py-3 hover:bg-[#05C174]/20 cursor-pointer text-[#05B0C1] font-family-spacemono transition-colors"
                              >
                                  Hackathon
                              </div>
                          </div>
                      )}
                  </div>
              </div>
            </>
          )}

          {/* Stage 2: Team Members */}
          {step === 2 && (
            <div className="w-full">
               <label className="mb-2 block text-md text-[#05C174] font-family-audiowide">
                 Enter Team Member Emails
               </label>
               
               {members.map((member, idx) => (
                 <div key={idx} className="mb-4 relative">
                   <div className="relative w-full aspect-7/1 sm:aspect-6/1 bg-[url('/images/auth/formInput.svg')] bg-contain bg-no-repeat bg-center flex items-center">
                      <div className="absolute left-[5%] text-[#05C174]">
                        <Mail size={24} className="hidden lg:block"/>
                        <Mail size={16} className="block lg:hidden"/>
                      </div>
                      <input
                        type="email"
                        placeholder={`Member ${idx + 1} Email`}
                        value={member.email}
                        onChange={(e) => handleEmailChange(idx, e.target.value)}
                        className="
                          w-full h-full bg-transparent border-none outline-none 
                          pl-[15%] pr-[15%] font-family-spacemono text-[#05B0C1] placeholder-[#05B0C1]
                          text-sm sm:text-md xl:text-xl
                        "
                      />
                      {/* Status Icon */}
                      <div className="absolute right-[5%] flex items-center mt-2 md:mt-6">
                         {member.status === 'checking' && <Loader2 className="animate-spin text-yellow-500" size={20}/>}
                         {member.status === 'valid' && <Check className="text-green-500" size={20}/>}
                         {member.status === 'invalid' && <X className="text-red-500" size={20}/>}
                      </div>
                   </div>
                   {members.length > 1 && (
                     <button
                       type="button"
                       onClick={() => removeMember(idx)}
                       className="text-red-500 text-xs mt-1 hover:underline"
                     >
                       Remove
                     </button>
                   )}
                 </div>
               ))}

               <button
                 type="button"
                 onClick={addMember}
                 className="mt-2 font-family-spacemono md:text-xl w-full aspect-6/1 bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center text-black font-bold hover:drop-shadow-[0_0_8px_#05C174]"
               >
                 Add Member
               </button>
            </div>
          )}

          {/* Stage 3: Contact Person */}
          {step === 3 && (
            <>
              <FormInput
                id="whatsapp"
                label="WhatsApp Number (Contact Person)"
                placeholder="+62812345678"
                icon={Phone}
                rules={{
                  required: "WhatsApp number is required",
                  pattern: {
                    value: /^\+[1-9]\d{1,14}$/,
                    message: "Use international format (e.g., +62812345678)"
                  }
                }}
              />
              <FormInput
                id="lineId"
                label="Line ID (Contact Person)"
                placeholder="Line ID"
                icon={MessageCircle}
                rules={{ required: "Line ID is required" }}
              />
            </>
          )}

          {/* Stage 4: Payment */}
          {step === 4 && showStage4 && (
            <>
               <div className="mb-6 text-[#05B0C1] font-family-spacemono border border-[#05C174] p-4 rounded bg-black/50">
                  <p className="mb-2 font-bold text-[#05C174]">Payment Instructions</p>
                  <p className="text-sm mb-1">Please transfer the registration fee using one of the following payment methods:</p>
                  <div className="bg-[#05C174]/10 p-3 rounded mb-4">
                      <p className="text-sm">Bank: <span className="font-bold text-[#05C174]">Blu by BCA</span></p>
                      <p className="text-sm">No. Rekening: <span className="font-bold text-[#05C174] select-all">005714837012</span></p>
                      <p className="text-sm">Atas Nama: <span className="font-bold text-[#05C174]">Priscilia King Chandra</span></p>
                      <p className="text-sm mt-2">Amount: <span className="font-bold text-[#05C174]">Rp 150.001</span></p>
                  </div>
                  <div className="bg-[#05C174]/10 p-3 rounded my-4">
                      <p className="text-sm">Paypal: </p>
                      <p className="text-sm">Email: <span className="font-bold text-[#05C174] select-all">prisciliakingchandra@gmail.com</span></p>
                      <p className="text-sm">Account name : <span className="font-bold text-[#05C174]">Priscilia King Chandra</span></p>
                      <p className="text-sm mt-2">Amount: <span className="font-bold text-[#05C174]">10 USD</span></p>
                  </div>
                  
                  <p className="text-sm mb-2">Transfer Description:</p>
                  <p className="text-lg font-bold bg-[#05C174]/20 p-2 text-center select-all">
                     {teamName || "[Team Name]"} - {category}
                  </p>
               </div>

               <label className="mb-2 block text-md text-[#05C174] font-family-audiowide">
                  Proof of Payment
               </label>
               <UploadButton
                 options={{ folder: "hackfest26/payment/" }}
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
            </>
          )}

        </form>
        </FormProvider>
      </div>
    </div>
  );
}

export const TeamRegisterForm = forwardRef(TeamRegisterFormComponent);
export default TeamRegisterForm;

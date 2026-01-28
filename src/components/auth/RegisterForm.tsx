"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  Earth,
  User,
  Phone,
  MessageCircle,
  Lock,
  Upload,
  Loader2,
  Mail,
} from "lucide-react";
import { registerUser } from "@/lib/services/user";
import { toast } from "react-toastify";
import FormInput from "./FormInput";
import { toastError } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import UploadButton from "../UploadButton";

type FormData = {
  userName: string;
  country: string;
  email: string;
  whatsapp: string;
  lineId: string;
  password: string;
  confirmPassword: string;
};

export interface RegisterFormHandle {
  nextStep: () => Promise<number | null>;
  prevStep: () => number;
  submit: () => void;
  getStep: () => number;
}

export function RegisterFormComponent(_props: unknown, ref: React.ForwardedRef<RegisterFormHandle>) {
  const Router = useRouter();
  const methods = useForm<FormData>();
  const { handleSubmit, control, trigger } = methods;

  const [step, setStep] = useState(1);
  const [twibbonUrl, setTwibbonUrl] = useState<string | null>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  const password = useWatch({ control, name: "password" });

  const nextStep = async (): Promise<number | null> => {
    // console.log("nextStep called, current step:", step);
    let fieldsToValidate: (keyof FormData)[] = [];
    switch (step) {
      case 1:
        fieldsToValidate = ["userName", "country", "email"];
        break;
      case 2:
        fieldsToValidate = ["whatsapp", "lineId"];
        break;
      case 3:
        // Validate file uploads
        if (!twibbonUrl || !posterUrl) {
          toast.error("Please upload both Twibbon and Poster images");
          return null;
        }
        const newStep3 = Math.min(4, step + 1);
        setStep(newStep3);
        return newStep3;
      case 4:
        fieldsToValidate = ["password", "confirmPassword"];
        break;
    }
    
    // console.log("Triggering validation for:", fieldsToValidate);
    const isValid = await trigger(fieldsToValidate);
    // console.log("Validation result:", isValid);
    
    if (isValid) {
      const newStep = Math.min(4, step + 1);
      setStep(newStep);
      return newStep;
    } else {
      // console.log("Validation errors:", methods.formState.errors);
      fieldsToValidate.forEach((field) => {
        const error = methods.formState.errors[field];
        if (error && error.message) {
          toast.error(error.message as string);
        }
      });
    }
    return null;
  };

  const prevStep = (): number => {
    const newStep = Math.max(1, step - 1);
    setStep(newStep);
    return newStep;
  };

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    // Register User
    if(!posterUrl || !twibbonUrl){
      toast.error("Make sure all fields are filled")
      return
    }

    const user = await registerUser({
      name: data.userName,
      country: data.country,
      email: data.email,
      phone_number: data.whatsapp,
      line_id: data.lineId,
      password: data.password,
      poster_url: posterUrl,
      twibbon_url: twibbonUrl
    })

    if(!user.success){
      toastError(user.error!);
      return;
    }

    toast.success("Registration successful!");
    Router.push('/login');
  };

  // Trigger Button by ref
  useImperativeHandle(ref, () => ({
    nextStep,
    prevStep,
    submit() {
      handleSubmit(onSubmit)();
    },
    getStep: () => step,
  }));

  return (
    <div className="font-family-audiowide relative z-1 flex flex-col items-center justify-center">
      <div
        className="block md:hidden mb-[2%] text-3xl sm:text-4xl text-[#05B0C1]"
        style={{ textShadow: "0 0 10px #05B0C1, 0 0 20px #05B0C1" }}
      >
        REGISTRATION
      </div>
      {/* Main Box */}
      <div className="hide-scrollbar flex w-10/12 aspect-600/600 md:aspect-600/267 mt-0 md:mt-[10%] items-start justify-center overflow-y-auto border-0 border-solid border-[#05C174] py-0 sm:py-0 ">
        {/* Form */}
        <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col w-full md:w-[80%]"
        >
          {/* Step 1: User Name, Country, Email */}
          {step === 1 && (
            <>
              <FormInput
                id="userName"
                label="Enter your name"
                placeholder="Your Name"
                icon={User}
                rules={{ required: "Name is required" }}
              />

              <FormInput
                id="country"
                label="Country of Origin"
                placeholder="Your Country"
                icon={Earth}
                rules={{ required: "Country is required" }}
              />

              <FormInput
                id="email"
                label="Institutional Email"
                placeholder="your.email@university.edu"
                icon={Mail}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format",
                  },
                }}
              />
            </>
          )}
          
          {/* Step 2: WhatsApp and Line ID */}
          {step === 2 && (
            <>
              <FormInput
                id="whatsapp"
                label="WhatsApp Number"
                placeholder="+62812345678"
                icon={Phone}
                rules={{
                  required: "WhatsApp number is required",
                  validate: (value) =>
                    /^\+[1-9]\d{1,14}$/.test(value) ||
                    "Use international format (e.g., +62812345678)",
                }}
              />

              <FormInput
                id="lineId"
                label="Line ID"
                placeholder="Your Active Line ID"
                icon={MessageCircle}
                rules={{ required: "Line ID is required" }}
              />
            </>
          )}

          {/* Step 3: Upload Twibbon and Poster */}
          {step === 3 && (
            <>
              {/* Upload Twibbon */}
              <label className="mb-2 block text-lg text-[#05C174]">
                Twibbon Image
              </label>
              <UploadButton 
                options={{ folder: "hackfest26/twibbon/" }}
                onSuccess={(url) => setTwibbonUrl(url)}
              >
                {({ open, isLoading }) => (
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={open}
                    className="font-family-spacemono w-full aspect-6/1 bg-transparent bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center px-4 text-black transition-all duration-300 hover:text-black hover:drop-shadow-[0_0_8px_#05C174] text-lg font-bold cursor-pointer flex items-center justify-center mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="relative flex items-center justify-center w-full h-full">
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 size={24} className="animate-spin text-black" />
                          <span className="text-sm">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <Upload size={32} className="absolute left-[2.5%]" />
                          <p className="text-sm sm:text-md lg:text-xl">
                            {twibbonUrl ? "✓ Twibbon Uploaded" : "Upload Twibbon Image"}
                          </p>
                        </>
                      )}
                    </div>
                  </button>
                )}
              </UploadButton>
              
              {/* Upload Poster */}
              <label className="mb-2 block text-lg text-[#05C174]">
                Poster Image
              </label>
              <UploadButton 
                options={{ folder: "hackfest26/poster/" }}
                onSuccess={(url) => setPosterUrl(url)}
              >
                {({ open, isLoading }) => (
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={open}
                    className="font-family-spacemono w-full aspect-6/1 bg-transparent bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center px-4 text-black transition-all duration-300 hover:text-black hover:drop-shadow-[0_0_8px_#05C174] text-lg font-bold cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="relative flex items-center justify-center w-full h-full">
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 size={24} className="animate-spin text-black" />
                          <span className="text-sm">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <Upload size={32} className="absolute left-[2.5%]" />
                          <p className="text-sm sm:text-md lg:text-xl">
                            {posterUrl ? "✓ Poster Uploaded" : "Upload Poster Image"}
                          </p>
                        </>
                      )}
                    </div>
                  </button>
                )}
              </UploadButton>
            </>
          )}

          {/* Step 4: Password and Confirm Password */}
          {step === 4 && (
            <>
              <FormInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
                icon={Lock}
                rules={{ 
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                }}
              />

              <FormInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                icon={Lock}
                rules={{
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
              />
            </>
          )}
          
        </form>
        </FormProvider>
      </div>
    </div>
  );
}

export const RegisterForm = forwardRef(RegisterFormComponent);
export default RegisterForm;
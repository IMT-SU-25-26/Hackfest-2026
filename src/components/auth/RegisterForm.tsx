"use client";

import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  Earth,
  GraduationCap,
  Users,
  Phone,
  MessageCircle,
  Lock,
  Upload,
} from "lucide-react";
import { registerTeam } from "@/lib/services/team";
import { registerAllMember } from "@/lib/services/member";
import { toast } from "react-toastify";
import FormInput from "./FormInput";
import { toastError } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import cloudinary from "@/lib/config/cloudinary";
import { generateSignature } from "@/lib/utils/cloudinary";

type FormData = {
  name: string;
  country: string;
  university: string;
  teamName: string;
  whatsapp: string;
  lineId: string;
  password: string;
  confirmPassword: string;
  twibbonUrl?: string;
  posterUrl?: string;
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
  const { handleSubmit, control, trigger, setValue } = methods;

  const [step, setStep] = useState(1);
  const [memberInputs, setMemberInputs] = useState<string[]>([""]);
  const [memberError, setMemberError] = useState<string | null>(null);
  const [twibbonFile, setTwibbonFile] = useState<string | null>(null);
  const [posterFile, setPosterFile] = useState<string | null>(null);
  const [widgetsReady, setWidgetsReady] = useState(false);
  const twibbonWidgetRef = useRef<any>(null);
  const posterWidgetRef = useRef<any>(null);

  const password = useWatch({ control, name: "password" });

  useEffect(() => {
    const initializeWidgets = () => {
      if (typeof window !== "undefined" && (window as any).cloudinary) {
        const cloudinary = (window as any).cloudinary;

        // Twibbon Widget
        twibbonWidgetRef.current = cloudinary.createUploadWidget(
          {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
            folder: "hackfest-2026/twibbon",
            resourceType: "image",
            multiple: false,
            maxFiles: 1,
            styles: {
              palette: {
                window: "#090223",
                windowBorder: "#05C174",
                tabIcon: "#05B0C1",
                menuIcons: "#05B0C1",
                textDark: "#000000",
                textLight: "#fcfffd",
                link: "#05C174",
                action: "#05C174",
                inactiveTabIcon: "#555a5f",
                error: "#F42424",
                inProgress: "#4384F5",
                complete: "#20B488",
                sourceBg: "#E4EoF1"
              },
              fonts: {
                default: null,
                "'Courier New', monospace": {
                  url: "https://fonts.googleapis.com/css?family=Courier+New",
                  active: true
                }
              }
            },
            clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
            maxFileSize: 5242880 // 5MB
          },
          (error: any, result: any) => {
            if (error) {
              toast.error("Upload failed");
              return;
            }
            if (result?.event === "success") {
              setTwibbonFile(result.info.secure_url);
              setValue("twibbonUrl", result.info.secure_url);
              toast.success("Twibbon uploaded successfully!");
            }
          }
        );

        // Poster Widget
        posterWidgetRef.current = cloudinary.createUploadWidget(
          {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
            folder: "hackfest-2026/poster",
            resourceType: "image",
            multiple: false,
            maxFiles: 1,
            styles: {
              palette: {
                window: "#090223",
                windowBorder: "#05C174",
                tabIcon: "#05B0C1",
                menuIcons: "#05B0C1",
                textDark: "#000000",
                textLight: "#fcfffd",
                link: "#05C174",
                action: "#05C174",
                inactiveTabIcon: "#555a5f",
                error: "#F42424",
                inProgress: "#4384F5",
                complete: "#20B488",
                sourceBg: "#E4EoF1"
              },
              fonts: {
                default: null,
                "'Courier New', monospace": {
                  url: "https://fonts.googleapis.com/css?family=Courier+New",
                  active: true
                }
              }
            },
            clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
            maxFileSize: 5242880 // 5MB
          },
          (error: any, result: any) => {
            if (error) {
              toast.error("Upload failed");
              return;
            }
            if (result?.event === "success") {
              setPosterFile(result.info.secure_url);
              setValue("posterUrl", result.info.secure_url);
              toast.success("Poster uploaded successfully!");
            }
          }
        );

        setWidgetsReady(true);
      } else {
        // Retry if Cloudinary not loaded yet
        setTimeout(initializeWidgets, 500);
      }
    };

    initializeWidgets();
  }, [setValue]);

  const nextStep = async (): Promise<number | null> => {
    let fieldsToValidate: (keyof FormData)[] = [];
    switch (step) {
      case 1:
        fieldsToValidate = ["teamName", "country"];
        break;
      case 2:
        fieldsToValidate = ["university"];
        const isValid = memberInputs.every((m) => m.trim().length > 0);
        if (!isValid) {
          setMemberError("All team member names are required");
          return null;
        } else {
          setMemberError(null);
        }
        const newStep2 = Math.min(5, step + 1);
        setStep(newStep2);
        return newStep2;
      case 3:
        fieldsToValidate = ["whatsapp", "lineId"];
        break;
      case 4:
        // Validate file uploads
        if (!twibbonFile || !posterFile) {
          toast.error("Please upload both Twibbon and Poster files");
          return null;
        }
        const newStep4 = Math.min(5, step + 1);
        setStep(newStep4);
        return newStep4;
      case 5:
        fieldsToValidate = ["password", "confirmPassword"];
        break;
    }
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      const newStep = Math.min(5, step + 1);
      setStep(newStep);
      return newStep;
    }
    return null;
  };

  const prevStep = (): number => {
    const newStep = Math.max(1, step - 1);
    setStep(newStep);
    return newStep;
  };

  const addMember = () => {
    setMemberInputs([...memberInputs, ""]);
  };

  const removeMember = (index: number) => {
    if (memberInputs.length > 1) {
      setMemberInputs(memberInputs.filter((_, i) => i !== index));
    }
  };

  const updateMember = (index: number, value: string) => {
    const newInputs = [...memberInputs];
    newInputs[index] = value;
    setMemberInputs(newInputs);
  };

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    // Register Team
    const team = await registerTeam({
      team_name: data.teamName,
      country: data.country,
      university: data.university,
      phone_number: data.whatsapp,
      line_id: data.lineId,
      password: data.password
    })
    if(!team.success){
      toastError(team.error!);
      return;
    }

    const membersInput = memberInputs
      .map((name) => name.trim())
      .filter((name) => name);

    // Register Members to the Team
    const members = await registerAllMember({names:membersInput, team_id:team.data!.team_id});
    if (members.success) {
      toast.success("Registration successful!");
      Router.push('/login');
    }else{
      toast.error(members.error);
    }
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

  // Handle Upload button
  // function handleUploadTwibbon(){
  //   const timestamp = Math.floor(Date.now() / 1000);
  //   const signature = generateSignature({
  //     timestamp,
  //     folder: "hackfest2026/twibbon"
  //   })

  //   const widget = window.cloudinary.createUploadWidget({
  //     cloudName: "your_cloud_name",
  //     uploadPreset: "your_signed_preset",
  //     folder: "optional_folder", // must match signed param if locked
  //     apiKey: "your_api_key",
  //     timestamp, // from server
  //     signature, // from server
  //   },
  //   (err, result) => {
  //     if (!err && result && result.event === "success") {
  //       console.log("Uploaded:", result.info);
  //     }
  //   }
  // );

  // }

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
          {/* Step 1: Name and Country */}
          {step === 1 && (
            <>
              <FormInput
                id="teamName"
                label="Team Name"
                placeholder="Your Team Name"
                icon={Users}
                rules={{ required: "Team name is required" }}
              />

              <FormInput
                id="country"
                label="Country of Origin"
                placeholder="Your Country"
                icon={Earth}
                rules={{ required: "Country is required" }}
              />
            </>
          )}
          
          {/* Step 2: University and Team Members */}
          {step === 2 && (
            <>
              <FormInput
                id="university"
                label="University"
                placeholder="Your University"
                icon={GraduationCap}
                rules={{ required: "University is required" }}
              />

            <div className="mb-4">
              <label className="mb-2 block text-lg text-[#05C174]">
                Team Member Names
              </label>
              {memberInputs.map((member, index) => (
                <div key={index} className="mb-4">
                  <div className="relative">
                    <div className="absolute top-1/2 left-[5%] z-10 -translate-y-1/2 text-[#05C174]">
                      <Users size={32} className="hidden md:block" />
                      <Users size={20} className="block md:hidden" />
                    </div>
                    <input
                      type="text"
                      placeholder={`Team Member ${index + 1} Name`}
                      value={member}
                      onChange={(e) => updateMember(index, e.target.value)}
                      className="font-family-spacemono text-sm sm:text-md lg:text-xl w-full border-0 block bg-[url('/images/auth/formInput.svg')] bg-contain bg-no-repeat aspect-6/1 active:outline-none outline-none border-[#05C174] p-0 pl-[15%] text-[#05B0C1] placeholder-[#05B0C1]"
                    />
                  </div>
                  {memberInputs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="text-destructive hover:text-destructive/90 mt-2 block transition-all duration-300 hover:drop-shadow-[0_0_10px_red]"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addMember}
                className={`${memberInputs.length > 4 ? 'hidden ' : ''} font-family-spacemono w-full aspect-6/1 bg-transparent bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center px-4 text-black transition-all duration-300 hover:text-black hover:drop-shadow-[0_0_8px_#05C174] text-lg font-bold`}
              >
                <div className="relative">
                  <Users size={32} className="absolute left-[2.5%]" />
                  <p className="text-sm sm:text-md lg:text-xl">
                    Add Team Member
                  </p>
                </div>
              </button>
              {memberError && (
                <p className="text-destructive mt-1 text-sm">{memberError}</p>
              )}
            </div>
            </>
          )}
          
          {/* Step 3: WhatsApp and Line ID */}
          {step === 3 && (
            <>
              <FormInput
                id="whatsapp"
                label="WhatsApp Number"
                placeholder="Your WhatsApp Number"
                icon={Phone}
                rules={{
                  required: "WhatsApp number is required",
                  validate: (value) =>
                    /^\+[1-9]\d{1,14}$/.test(value) ||
                    "Invalid phone number format (e.g., +1234567890)",
                }}
              />

              <FormInput
                id="lineId"
                label="Line ID"
                placeholder="Your Line ID"
                icon={MessageCircle}
                rules={{ required: "Line ID is required" }}
              />
            </>
          )}

          {/* Step 4: Upload Twibbon and Poster */}
          {step === 4 && (
            <>
              {/* Upload Twibbon */}
              <label className="mb-2 block text-lg text-[#05C174]">
                Twibbon Image
              </label>
              <button
                type="button"
                onClick={()=>{}}
                className="font-family-spacemono w-full aspect-6/1 bg-transparent bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center px-4 text-black transition-all duration-300 hover:text-black hover:drop-shadow-[0_0_8px_#05C174] text-lg font-bold cursor-pointer flex items-center justify-center mb-4"
              >
                <div className="relative flex items-center justify-center w-full h-full">
                  <Upload size={32} className="absolute left-[2.5%]" />
                  <p className="text-sm sm:text-md lg:text-xl">
                    {twibbonFile ? "✓ Uploaded" : "Upload Twibbon File"}
                  </p>
                </div>
              </button>
              
              {/* Upload Poster */}
              <label className="mb-2 block text-lg text-[#05C174]">
                Poster
              </label>
              <button
                type="button"
                onClick={()=>{}}
                className="font-family-spacemono w-full aspect-6/1 bg-transparent bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center px-4 text-black transition-all duration-300 hover:text-black hover:drop-shadow-[0_0_8px_#05C174] text-lg font-bold cursor-pointer flex items-center justify-center"
              >
                <div className="relative flex items-center justify-center w-full h-full">
                  <Upload size={32} className="absolute left-[2.5%]" />
                  <p className="text-sm sm:text-md lg:text-xl">
                    {posterFile ? "✓ Uploaded" : "Upload Poster File"}
                  </p>
                </div>
              </button>
            </>
          )}

          {/* Step 5: Password and Confirm Password */}
          {step === 5 && (
            <>
              <FormInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
                icon={Lock}
                rules={{ required: "Password is required" }}
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
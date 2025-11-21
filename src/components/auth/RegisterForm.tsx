"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { FormProvider, useForm, UseFormStateProps, useWatch } from "react-hook-form";
import {
  Earth,
  GraduationCap,
  Users,
  Phone,
  MessageCircle,
  Lock,
} from "lucide-react";
import { registerTeam } from "@/lib/services/team";
import { registerAllMember } from "@/lib/services/member";
import { toast } from "react-toastify";
import FormInput from "./FormInput";
import { toastError } from "@/lib/utils";

type FormData = {
  name: string;
  country: string;
  university: string;
  teamName: string;
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
  const methods = useForm<FormData>();
  const { handleSubmit, control, trigger, formState: { errors } } = methods;

  const [step, setStep] = useState(1);
  // const [step, setStep] = stepParam;
  const [memberInputs, setMemberInputs] = useState<string[]>([""]);
  const [memberError, setMemberError] = useState<string | null>(null);

  // const {
  //   register,
  //   handleSubmit, 
  //   control,
  //   trigger,
  //   formState: { errors },
  // } = useForm<FormData>();

  const password = useWatch({ control, name: "password" });

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
        const newStep2 = Math.min(4, step + 1);
        setStep(newStep2);
        return newStep2;
      case 3:
        fieldsToValidate = ["whatsapp", "lineId"];
        break;
      case 4:
        fieldsToValidate = ["password", "confirmPassword"];
        break;
    }
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      const newStep = Math.min(4, step + 1);
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
    console.log(
      "Members:",
      memberInputs.filter((m) => m.trim()),
    );
    // Handle Submission Logic Here
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
      toast("Registration successful!");
    }else{
      toast.error(members.error);
    }

  };

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
        className="block md:hidden mb-0 text-3xl sm:text-4xl text-[#05B0C1]"
        style={{ textShadow: "0 0 10px #05B0C1, 0 0 20px #05B0C1" }}
      >
        REGISTRATION
      </div>
      {/* Main Box */}
      <div className="hide-scrollbar flex w-10/12 aspect-600/267 mt-0 md:mt-[5%] items-start justify-center overflow-y-auto border-0 border-solid border-[#05C174] py-3 sm:py-0 ">
        {/* Form */}
        <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col w-full md:w-[80%]"
        >
          {/* Step 1: Name and Country */}
          {step === 1 && (
            <>
              {/* Name Input */}
              {/* <div className="mb-12">
                <label
                  htmlFor="name-input"
                  className="mb-2 block text-lg text-[#05C174]"
                >
                  Name
                </label>
                <div className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#05C174]">
                    <UserRound size={32} />
                  </div>
                  <input
                    id="name-input"
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: "Name is required" })}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
                {errors.name && (
                  <p className="text-destructive mt-1 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div> */}

              {/* Team Name Input */}
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
          {/* Step 2: University and Team Name */}
          {step === 2 && (
            <>
              {/* University Input
              <div className="mb-12">
                <label
                  htmlFor="university-input"
                  className="mb-2 block text-lg text-[#05C174]"
                >
                  University of Origin
                </label>
                <div className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#05C174]">
                    <GraduationCap size={32} />
                  </div>
                  <input
                    id="university-input"
                    type="text"
                    placeholder="Your University"
                    {...register("university", {
                      required: "University is required",
                    })}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
                {errors.university && (
                  <p className="text-destructive mt-1 text-sm">
                    {errors.university.message}
                  </p>
                )}
              </div> */}
              <FormInput
                id="university"
                label="University"
                placeholder="Your University"
                icon={GraduationCap}
                rules={{ required: "University is required" }}
              />

            {/*Team Members */}
            <div className="mb-4">
              <label className="mb-2 block text-lg text-[#05C174]">
                Team Member Names
              </label>
              {memberInputs.map((member, index) => (
                <div key={index} className="mb-4">
                  <div className="relative">
                    <div className="absolute top-1/2 left-[5%] z-10 -translate-y-1/2 text-[#05C174]">
                      <Users size={32} />
                    </div>
                    <input
                      type="text"
                      placeholder={`Team Member ${index + 1} Name`}
                      value={member}
                      onChange={(e) => updateMember(index, e.target.value)}
                      className="font-family-spacemono w-full border-0 block bg-[url('/auth/formInput.svg')] bg-contain bg-no-repeat aspect-6/1 active:outline-none outline-none border-[#05C174] p-4 pl-[15%] text-[#05B0C1] placeholder-[#05B0C1]"
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
              className="
                font-family-spacemono 
                w-full aspect-6/1
                bg-transparent
                bg-[url('/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center
                px-4 text-black 
                transition-all duration-300
                hover:text-black 
                hover:drop-shadow-[0_0_8px_#05C174]
                text-lg font-bold
              "
              >
                <div className="relative">
                  <Users size={32} className="absolute left-[2.5%]" />
                  <p>
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
              {/* WhatsApp Number Inputs */}
              {/* <div className="mb-12">
                <label
                  htmlFor="whatsapp-input"
                  className="mb-2 block text-lg text-[#05C174]"
                >
                  WhatsApp Number
                </label>
                <div className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#05C174]">
                    <Phone size={32} />
                  </div>
                  <input
                    id="whatsapp-input"
                    type="text"
                    placeholder="Your WhatsApp Number"
                    {...register("whatsapp", {
                      required: "WhatsApp number is required",
                      validate: (value) =>
                        /^\+?[1-9]\d{1,14}$/.test(value) ||
                        "Invalid phone number format (e.g., +1234567890)",
                    })}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
                {errors.whatsapp && (
                  <p className="text-destructive mt-1 text-sm">
                    {errors.whatsapp.message}
                  </p>
                )}
              </div> */}
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

              {/* Line ID Input */}
              {/* <div className="mb-4">
                <label
                  htmlFor="lineId-input"
                  className="mb-2 block text-lg text-[#05C174]"
                >
                  Active Line ID
                </label>
                <div className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#05C174]">
                    <MessageCircle size={32} />
                  </div>
                  <input
                    id="lineId-input"
                    type="text"
                    placeholder="Your Line ID"
                    {...register("lineId", { required: "Line ID is required" })}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
                {errors.lineId && (
                  <p className="text-destructive mt-1 text-sm">
                    {errors.lineId.message}
                  </p>
                )}
              </div> */}
              <FormInput
                id="lineId"
                label="Line ID"
                placeholder="Your Line ID"
                icon={MessageCircle}
                rules={{ required: "Line ID is required" }}
              />
            </>
          )}
          {/* Step 4: Password and Confirm Password */}
          {step === 4 && (
            <>
              {/* Password Input */}
              {/* <div className="mb-12">
                <label
                  htmlFor="password-input"
                  className="mb-2 block text-lg text-[#05C174]"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#05C174]">
                    <Lock size={32} />
                  </div>
                  <input
                    id="password-input"
                    type="password"
                    placeholder="Enter Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
                {errors.password && (
                  <p className="text-destructive mt-1 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div> */}
              <FormInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
                icon={Lock}
                rules={{ required: "Password is required" }}
              />


              {/* Confirm Password Input */}
              {/* <div className="mb-4">
                <label
                  htmlFor="confirmPassword-input"
                  className="mb-2 block text-lg text-[#05C174]"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#05C174]">
                    <Lock size={32} />
                  </div>
                  <input
                    id="confirmPassword-input"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-destructive mt-1 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div> */}
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
          {/* Buttons */}
          <div className="hidden absolute -bottom-[17%] w-full mt-0 flex justify-between">
            {step > 1 && (
              <div
                  onClick={prevStep}
                  className="
                      bg-[url('/utils/buttonBG.svg')] w-[45%] md:w-[30%] bg-no-repeat bg-contain aspect-361/100
                      flex justify-center items-center
                      transition-all duration-300
                      hover:drop-shadow-[0_0_15px_#05B0C1]
                      cursor-pointer
                  "
                  >
                  <p className='font-family-audiowide text-lg text-[$090223]'>previous</p>
              </div>
            )}
            {step < 4 && (
              <div
                  onClick={nextStep}
                  className="
                      bg-[url('/utils/buttonBG.svg')] w-[45%] md:w-[30%] bg-no-repeat bg-contain aspect-361/100
                      flex justify-center items-center
                      transition-all duration-300
                      hover:drop-shadow-[0_0_15px_#05B0C1]
                      cursor-pointer
                  "
                  >
                  <p className='font-family-audiowide text-lg text-[$090223]'>next</p>
              </div>
            )}
            {step === 4 && (
              <button
                type="submit"
                className="
                  bg-[url('/utils/buttonBG.svg')] w-[45%] md:w-[30%] bg-no-repeat bg-contain aspect-361/100
                  flex justify-center items-center
                  transition-all duration-300
                  hover:drop-shadow-[0_0_15px_#05B0C1]
                  cursor-pointer
                "
              >
                <p className='font-family-audiowide text-lg text-[$090223]'>submit</p>
              </button>
            )}
          </div>
        </form>
        </FormProvider>
      </div>
    </div>
  );
}

export const RegisterForm = forwardRef(RegisterFormComponent);
export default RegisterForm;
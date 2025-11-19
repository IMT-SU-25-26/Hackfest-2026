"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  UserRound,
  Earth,
  GraduationCap,
  Users,
  Phone,
  MessageCircle,
  Lock,
} from "lucide-react";

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

export function RegisterForm() {
  const [step, setStep] = useState(1);
  const [memberInputs, setMemberInputs] = useState<string[]>([""]);
  const [memberError, setMemberError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<FormData>();

  const password = useWatch({ control, name: "password" });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    switch (step) {
      case 1:
        fieldsToValidate = ["name", "country"];
        break;
      case 2:
        fieldsToValidate = ["university", "teamName"];
        break;
      case 3:
        const isValid = memberInputs.every((m) => m.trim().length > 0);
        if (!isValid) {
          setMemberError("All team member names are required");
          return;
        } else {
          setMemberError(null);
        }
        setStep(step + 1);
        return;
      case 4:
        fieldsToValidate = ["whatsapp", "lineId"];
        break;
      case 5:
        fieldsToValidate = ["password", "confirmPassword"];
        break;
    }
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
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

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    console.log(
      "Members:",
      memberInputs.filter((m) => m.trim()),
    );
    // Handle Submission Logic Here
  };

  return (
    <div className="font-family-audiowide relative z-1 flex min-h-screen flex-col items-center justify-center">
      <div
        className="mb-6 text-4xl text-[#05B0C1] sm:text-6xl"
        style={{ textShadow: "0 0 10px #05B0C1, 0 0 20px #05B0C1" }}
      >
        REGISTRATION
      </div>
      {/* Main Box */}
      <div className="hide-scrollbar flex max-h-[70vh] w-10/12 items-start justify-center overflow-y-auto border-2 border-solid border-[#05C174] bg-[#090223]/60 py-6 sm:w-8/12">
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-10/12 flex-col sm:w-8/12"
        >
          {/* Step 1: Name and Country */}
          {step === 1 && (
            <>
              {/* Name Input */}
              <div className="mb-12">
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
              </div>
              {/* Country Input */}
              <div className="mb-4">
                <label
                  htmlFor="country-input"
                  className="mb-2 block text-lg text-[#05C174]"
                >
                  Country of Origin
                </label>
                <div className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#05C174]">
                    <Earth size={32} />
                  </div>
                  <input
                    id="country-input"
                    type="text"
                    placeholder="Your Country of Origin"
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
                {errors.country && (
                  <p className="text-destructive mt-1 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </>
          )}
          {/* Step 2: University and Team Name */}
          {step === 2 && (
            <>
              {/* University Input */}
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
              </div>
              {/* Team Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="teamName-input"
                  className="mb-2 block text-lg text-[#05C174]"
                >
                  Team Name
                </label>
                <div className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#05C174]">
                    <Users size={32} />
                  </div>
                  <input
                    id="teamName-input"
                    type="text"
                    placeholder="Your Team Name"
                    {...register("teamName", {
                      required: "Team name is required",
                    })}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
                {errors.teamName && (
                  <p className="text-destructive mt-1 text-sm">
                    {errors.teamName.message}
                  </p>
                )}
              </div>
            </>
          )}
          {/* Step 3: Team Members */}
          {step === 3 && (
            <div className="mb-4">
              <label className="mb-2 block text-lg text-[#05C174]">
                Team Member Names
              </label>
              {memberInputs.map((member, index) => (
                <div key={index} className="mb-4">
                  <div className="relative">
                    <div className="absolute top-1/2 left-3 z-10 -translate-y-1/2 text-[#05C174]">
                      <Users size={32} />
                    </div>
                    <input
                      type="text"
                      placeholder={`Team Member ${index + 1} Name`}
                      value={member}
                      onChange={(e) => updateMember(index, e.target.value)}
                      className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                    />
                  </div>
                  {memberInputs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="text-destructive hover:text-destructive/90 mt-2 block transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_red]"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addMember}
                className="font-family-spacemono h-12 w-full border border-[#05C174] px-4 text-[#05C174] transition-all duration-300 hover:scale-105 hover:bg-[#05C174] hover:text-black hover:shadow-[0_0_10px_#05C174]"
              >
                Add Member
              </button>
              {memberError && (
                <p className="text-destructive mt-1 text-sm">{memberError}</p>
              )}
            </div>
          )}
          {/* Step 4: WhatsApp and Line ID */}
          {step === 4 && (
            <>
              {/* WhatsApp Number Inputs */}
              <div className="mb-12">
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
              </div>
              {/* Line ID Input */}
              <div className="mb-4">
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
              </div>
            </>
          )}
          {/* Step 5: Password and Confirm Password */}
          {step === 5 && (
            <>
              {/* Password Input */}
              <div className="mb-12">
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
              </div>
              {/* Confirm Password Input */}
              <div className="mb-4">
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
              </div>
            </>
          )}
          {/* Buttons */}
          <div className="mt-4 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="font-family-spacemono h-12 w-24 border border-[#05C174] text-[#05C174] transition-all duration-300 hover:scale-105 hover:bg-[#05C174] hover:text-black hover:shadow-[0_0_10px_#05C174]"
              >
                Previous
              </button>
            )}
            {step < 5 && (
              <button
                type="button"
                onClick={nextStep}
                className="font-family-spacemono h-12 w-24 border border-[#05C174] text-[#05C174] transition-all duration-300 hover:scale-105 hover:bg-[#05C174] hover:text-black hover:shadow-[0_0_10px_#05C174]"
              >
                Next
              </button>
            )}
            {step === 5 && (
              <button
                type="submit"
                className="font-family-spacemono h-12 w-24 border border-[#05C174] text-[#05C174] transition-all duration-300 hover:scale-105 hover:bg-[#05C174] hover:text-black hover:shadow-[0_0_10px_#05C174]"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

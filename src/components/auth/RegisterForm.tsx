"use client";

import { useState } from "react";
import {
  UserRound,
  Earth,
  GraduationCap,
  Users,
  Phone,
  MessageCircle,
  Lock,
} from "lucide-react";

export function RegisterForm() {
  const [step, setStep] = useState(1);
  const [memberInputs, setMemberInputs] = useState<string[]>([""]);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    university: "",
    teamName: "",
    whatsapp: "",
    lineId: "",
    password: "",
    confirmPassword: "",
  });

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log(
      "Members:",
      memberInputs.filter((m) => m.trim()),
    );
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
      <div className="flex min-h-96 w-10/12 items-center justify-center border-2 border-solid border-[#05C174] py-6 sm:w-8/12">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-10/12 flex-col sm:w-8/12"
        >
          {/* Step 1: Name and Country */}
          {step === 1 && (
            <>
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
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
              </div>
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
                    name="country"
                    type="text"
                    placeholder="Your Country of Origin"
                    value={formData.country}
                    onChange={handleChange}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
              </div>
            </>
          )}
          {/* Step 2: University and Team Name */}
          {step === 2 && (
            <>
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
                    name="university"
                    type="text"
                    placeholder="Your University"
                    value={formData.university}
                    onChange={handleChange}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
              </div>
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
                    name="teamName"
                    type="text"
                    placeholder="Your Team Name"
                    value={formData.teamName}
                    onChange={handleChange}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
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
                      className="text-destructive hover:text-destructive/90 mt-2 block"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addMember}
                className="font-family-spacemono h-12 w-full border border-[#05C174] px-4 text-[#05C174] hover:bg-[#05C174] hover:text-black"
              >
                Add Member
              </button>
            </div>
          )}
          {/* Step 4: WhatsApp and Line ID */}
          {step === 4 && (
            <>
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
                    name="whatsapp"
                    type="text"
                    placeholder="Your WhatsApp Number"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
              </div>
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
                    name="lineId"
                    type="text"
                    placeholder="Your Line ID"
                    value={formData.lineId}
                    onChange={handleChange}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
              </div>
            </>
          )}
          {/* Step 5: Password and Confirm Password */}
          {step === 5 && (
            <>
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
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
              </div>
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
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="font-family-spacemono h-16 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
                  />
                </div>
              </div>
            </>
          )}
          {/* Buttons */}
          <div className="mt-4 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="font-family-spacemono h-12 w-24 border border-[#05C174] text-[#05C174] hover:bg-[#05C174] hover:text-black"
              >
                Previous
              </button>
            )}
            {step < 5 && (
              <button
                type="button"
                onClick={nextStep}
                className="font-family-spacemono h-12 w-24 border border-[#05C174] text-[#05C174] hover:bg-[#05C174] hover:text-black"
              >
                Next
              </button>
            )}
            {step === 5 && (
              <button
                type="submit"
                className="font-family-spacemono h-12 w-24 border border-[#05C174] text-[#05C174] hover:bg-[#05C174] hover:text-black"
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

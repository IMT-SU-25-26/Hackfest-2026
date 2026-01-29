'use client';

import { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { User, Lock, Mail, Phone, MessageCircle, FileText, Calendar, Globe, Building2, BookOpen, UserCircle, Upload } from "lucide-react";
import FormInput from "@/components/auth/FormInput";
import UploadButton from "@/components/UploadButton";
import { updateProfile, changePassword } from "../actions";
import { toast } from "react-toastify";
import { UpdateProfileInput, ChangePasswordInput } from "../schema";
import { useRouter, useSearchParams } from "next/navigation";

interface ProfileFormProps {
  user: any; // We'll type this better if possible, mostly matches User model
  error?: string;
}

export default function ProfileForm({ user, error }: ProfileFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  const toastShown = useRef(false);

  useEffect(() => {
    if (error === "incomplete_profile" && !toastShown.current) {
      toastShown.current = true;
      // Use setTimeout to ensure the toast container is ready/mounted
      setTimeout(() => {
        toast.warn("Please complete your profile to continue registration", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        // Remove the error param from the URL so it doesn't persist on refresh
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("error");
        window.history.replaceState({}, "", newUrl.toString());
      }, 100);
    }
  }, [error]);
  
  // Format Date for input
  const formattedDob = user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "";

  const methods = useForm({
    defaultValues: {
      name: user.name || "",
      studentId: user.studentId || "",
      major: user.major || "",
      institution: user.institution || "", // Mapped from renaming if needed, assuming action handles normalization
      country: user.country || "",
      dateOfBirth: formattedDob,
      gender: user.gender || "Male",
      phone_number: user.phone_number || "",
      line_id: user.line_id || "",
      email: user.email || "",
      id_card: user.id_card || "",
    }
  });

  const { handleSubmit, setValue, watch, formState: { errors } } = methods;
  const idCardUrl = watch("id_card");

  // Password Form
  const passwordMethods = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  });

  const onUpdateProfile = async (data: any) => {
    setIsUpdating(true);
    // Convert date string to Date object for schema validation if needed, or schema accepts string? Schema expects Date.
    // We need to parse date.
    const payload: UpdateProfileInput = {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
    };

    const res = await updateProfile(payload);
    setIsUpdating(false);

    if (res.success) {
      toast.success("Profile updated successfully");
      router.refresh();
    } else {
      toast.error(res.error || "Failed to update profile");
    }
  };

  const onChangePassword = async (data: ChangePasswordInput) => {
    setIsChangingPass(true);
    const res = await changePassword(data);
    setIsChangingPass(false);

    if (res.success) {
      toast.success("Password changed successfully");
      passwordMethods.reset();
    } else {
      toast.error(res.error || "Failed to change password");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Profile Update Section */}
      <div className="bg-[#090223]/50 border border-[#05C174] p-6 md:p-10 backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl text-[#05B0C1] font-family-audiowide mb-6 text-center" style={{ textShadow: "0 0 10px #05B0C1" }}>
          EDIT PROFILE
        </h2>
        
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Left Column */}
               <div className="space-y-2">
                 <FormInput id="name" label="Full Name" placeholder="Your Name" icon={User} rules={{ required: "Name is required" }} />
                 <FormInput id="studentId" label="Student ID" placeholder="Student ID" icon={FileText} rules={{ required: "Student ID is required" }} />
                 <FormInput id="major" label="Major / Study Program" placeholder="Computer Science" icon={BookOpen} rules={{ required: "Major is required" }} />
                 <FormInput id="institution" label="Institution" placeholder="University Name" icon={Building2} rules={{ required: "Institution is required" }} />
                 <FormInput id="country" label="Country" placeholder="Indonesia" icon={Globe} rules={{ required: "Country is required" }} />
               </div>

               {/* Right Column */}
               <div className="space-y-2">
                 <FormInput id="dateOfBirth" type="date" label="Date of Birth" icon={Calendar} rules={{ required: "Date of Birth is required" }} />
                 
                 {/* Gender Select */}
                 <div className="mb-3 sm:mb-2 w-full">
                    <label className="mb-2 block text-md text-[#05C174] font-family-audiowide">Gender</label>
                    <div className="relative w-full aspect-7/1 sm:aspect-6/1 bg-[url('/images/auth/formInput.svg')] bg-contain bg-no-repeat bg-center">
                        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 text-[#05C174] lg:block hidden">
                            <UserCircle size={32}/>
                        </div>
                        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 text-[#05C174] lg:hidden block">
                            <UserCircle size={20}/>
                        </div>
                        <select 
                            {...methods.register("gender", { required: "Gender is required" })}
                            className="absolute inset-0 w-full h-full bg-transparent border-0 outline-none text-[#05B0C1] pl-[15%] pr-4 appearance-none font-family-spacemono"
                        >
                            <option value="Male" className="bg-[#090223] outline-none border-2 border-[#05C174]">Male</option>
                            <option value="Female" className="bg-[#090223] outline-none border-2 border-[#05C174]">Female</option>
                        </select>
                    </div>
                 </div>

                 <FormInput id="phone_number" label="WhatsApp Number" placeholder="+62..." icon={Phone} rules={{ required: "Phone is required" }} />
                 <FormInput id="line_id" label="Line ID" placeholder="Line ID" icon={MessageCircle} rules={{ required: "Line ID is required" }} />
                 <FormInput id="email" label="Email" type="email" placeholder="email@example.com" icon={Mail} rules={{ required: "Email is required" }} />
               </div>
            </div>

            {/* Student Card Upload */}
            <div className="mt-4">
                <label className="mb-2 block text-md text-[#05C174] font-family-audiowide">Student Card</label>
                <input type="hidden" {...methods.register("id_card", { required: "Student Card is required" })} />
                <div className="w-full">
                    <UploadButton
                        options={{ folder: "hackfest26/id_cards/" }}
                        onSuccess={(url) => setValue("id_card", url, { shouldValidate: true })}
                    >
                        {({ open, isLoading }) => (
                            <button
                                type="button"
                                onClick={open}
                                disabled={isLoading}
                                className="font-family-spacemono w-full aspect-6/1 md:aspect-[600/100] bg-[url('/images/utils/bigButtonBG.svg')] bg-contain bg-no-repeat bg-center text-black font-bold flex items-center justify-center hover:drop-shadow-[0_0_8px_#05C174]"
                            >
                                {isLoading ? "Uploading..." : idCardUrl ? "✓ Card Uploaded" : "Upload Student Card"}
                            </button>
                        )}
                    </UploadButton>
                    {errors.id_card && <p className="text-red-500 text-sm mt-1">{errors.id_card.message as string}</p>}
                    
                    {/* Image Preview */}
                    {idCardUrl && (
                        <div className="mt-4 border border-[#05C174] overflow-hidden relative w-full md:w-1/2 aspect-[1.58/1]">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img 
                                src={idCardUrl} 
                                alt="Student Card Preview" 
                                className="w-full h-full object-contain bg-black/50"
                             />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center mt-8">
                 <button
                    type="submit"
                    disabled={isUpdating}
                    className="font-family-audiowide text-xl bg-[#05C174] text-black px-12 py-3 hover:bg-[#05B0C1] transition-colors duration-300"
                    style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }} // Futuristic shape imitation
                 >
                    {isUpdating ? "SAVING..." : "SAVE CHANGES"}
                 </button>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Change Password Section */}
      <div className="bg-[#090223]/50 border border-[#05C174] p-6 md:p-10 backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl text-[#05B0C1] font-family-audiowide mb-6 text-center" style={{ textShadow: "0 0 10px #05B0C1" }}>
          CHANGE PASSWORD
        </h2>
        <FormProvider {...passwordMethods}>
            <form onSubmit={passwordMethods.handleSubmit(onChangePassword)} className="space-y-4 max-w-xl mx-auto">
                <FormInput id="currentPassword" type="password" label="Current Password" icon={Lock} rules={{ required: "Required" }} />
                <FormInput id="newPassword" type="password" label="New Password" icon={Lock} rules={{ required: "Required", minLength: { value: 8, message: "Min 8 chars" } }} />
                <FormInput id="confirmPassword" type="password" label="Confirm Password" icon={Lock} rules={{ required: "Required", validate: (val) => val === passwordMethods.watch('newPassword') || "Passwords do not match" }} />
                
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        disabled={isChangingPass}
                        className="font-family-audiowide text-lg bg-[#05B0C1] text-black px-8 py-2 hover:bg-[#05C174] transition-colors duration-300"
                        style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
                    >
                        {isChangingPass ? "UPDATING..." : "UPDATE PASSWORD"}
                    </button>
                </div>
            </form>
        </FormProvider>
      </div>
    </div>
  );
}

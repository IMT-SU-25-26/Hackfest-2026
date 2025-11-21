import { LucideIcon } from "lucide-react";
import { useFormContext, RegisterOptions } from "react-hook-form";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon; // lucide-react compatible
  rules?: RegisterOptions; // validation rules
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  rules,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[id]?.message as string | undefined;

  return (
    <div className="mb-3 sm:mb-2">
      <label
        htmlFor={id}
        className="mb-2 block text-md text-[#05C174] font-family-audiowide"
      >
        {label}
      </label>

      {/* BG Input  */}
      <div className="relative w-full focus-within:drop-shadow-[0_0_1px_#05C174] transition-300 aspect-7/1 sm:aspect-6/1 bg-contain bg-no-repeat bg-[url('/auth/formInput.svg')]">
        {Icon && (
            <>
              <div className="hidden lg:block absolute left-[5%] top-1/2 -translate-y-1/2 text-[#05C174]">
                <Icon size={32} />
              </div>
              
              <div className="block lg:hidden absolute left-[5%] top-1/2 -translate-y-1/2 text-[#05C174]">
                <Icon size={20} />
              </div>
            </>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, rules)}
          className="
              absolute inset-0 h-full w-full font-family-spacemono
              pl-[15%] pr-4 text-[#05B0C1] placeholder-[#05B0C1]
              text-sm sm:text-md xl:text-xl
              border-0 border-[#05C174] 
              active:outline-none focus:outline-none
              transition-all duration-300
          "
        />
    </div>


      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormInput;

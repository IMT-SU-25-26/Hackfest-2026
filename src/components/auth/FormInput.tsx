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
    <div className="mb-6">
      <label
        htmlFor={id}
        className="mb-2 block text-lg text-[#05C174]"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-[#05C174]">
            <Icon size={32} />
          </div>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, rules)}
          className="font-family-spacemono aspect-9/1 w-full border border-[#05C174] p-4 pl-14 text-[#05B0C1] placeholder-[#05B0C1]"
        />
      </div>

      {errorMessage && (
        <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormInput;

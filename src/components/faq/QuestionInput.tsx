import { useFormContext } from "react-hook-form";

function QuestionInput() {
    const { register, formState: { errors } } = useFormContext();
    const errorMessage = errors['question']?.message as string | undefined;

    return (
        <div className="mb-3 sm:mb-2 w-full">
            <label 
                htmlFor="question"
                className="mb-2 block text-md text-[#05C174] font-family-audiowide"
            >
                Question
            </label>

            {/* Custom Textarea Container */}
            <div 
                className="relative w-full bg-contain bg-no-repeat focus-within:drop-shadow-[0_0_1px_#05C174] transition-300"
                style={{
                    aspectRatio: '672/207',
                    backgroundImage: "url('/images/FAQ/bgAskArea.svg')"
                }}
            >
                {/* Textarea */}
                <textarea
                    id="question"
                    placeholder="Enter your question"
                    {...register('question', { required: "question is required" })}
                    className="
                        absolute inset-0 h-full w-full font-family-spacemono
                        pl-[5%] pr-[2%] pt-[4%] text-[#05B0C1] placeholder-[#05B0C1]
                        text-sm sm:text-md xl:text-xl
                        border-0 active:outline-none focus:outline-none
                        bg-transparent resize-none
                        transition-all duration-300
                    "
                />
            </div>

            {/* Error Message */}
            {errorMessage && (
                <p className="text-destructive mt-1 text-sm">{errorMessage}</p>
            )}
        </div>
    )
}

export default QuestionInput
'use client'

import { FormProvider, useForm } from 'react-hook-form'
import FormInput from '../auth/FormInput'
import { Users } from 'lucide-react';
import QuestionInput from './QuestionInput';
import { forwardRef, useImperativeHandle } from 'react';
import { createDiscussion } from '@/lib/services/discussion';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FormQuestion } from '@/types/services/discussion';

export interface AskQuestionHandle {
    submit: () => void;
}

const FormAskQuestion = forwardRef<AskQuestionHandle>((_, ref) => {
    const methods = useForm<FormQuestion>();
    const router = useRouter();

    useImperativeHandle(ref, () => ({
        submit: () => {
            methods.handleSubmit(async (data) => {
                console.log("Form submitted with data:", data);
                const result = await createDiscussion(data);
                
                if (result.success) {
                    toast.success("Question created successfully!");
                    methods.reset();
                    router.push("/qna#faq")
                } else {
                    toast.error(result.error || "An unexpected error occurred");
                    if(result.error == "Please login to ask a question"){
                        router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
                    }
                }
            })()
        }
    }));

    return (
        <FormProvider {...methods}>
            <FormInput
                    id="title"
                    label="Title"
                    type="text"
                    icon={Users}
                    placeholder="Enter question title"
                    rules={{ required: "title is required" }}
            />

            <QuestionInput />
        </FormProvider>
    )
});

FormAskQuestion.displayName = 'FormAskQuestion';

export default FormAskQuestion
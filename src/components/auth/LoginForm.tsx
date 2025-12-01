'use client'

import { Lock, Users } from 'lucide-react';
import FormInput from './FormInput'
import { FormProvider, useForm } from 'react-hook-form';
import { forwardRef, useImperativeHandle } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';

export interface LoginFormHandle {
  submit: () => void;
}

interface FormData {
    teamName: string;
    password: string;
}

function LoginFormComponent(_props: unknown ,ref: React.Ref<LoginFormHandle>) {
    const methods = useForm<FormData>();
    const { handleSubmit } = methods;
    const Router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const onSubmit = async (data: FormData) => {
        try {
            // Only use NextAuth signIn - it handles everything
            const result = await signIn("credentials", {
                redirect: false,
                team_name: data.teamName,
                password: data.password,
            });

            if (result?.error) {
                toast.error("Invalid credentials");
                return;
            }

            toast.success("Login successful!");
            Router.push(callbackUrl);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Login failed");
        }
    };

    useImperativeHandle(ref, () => ({
        submit() {
            handleSubmit(onSubmit)();
        }
    }));
    // const methods = useForm<FormData>();
    // const { handleSubmit, control, trigger, formState: { errors } } = methods;


    return (
        <FormProvider {...methods}>
        <form action="" className='w-[85%] md:w-[60%]'>
            
            <FormInput
                id="teamName"
                label="Team Name"
                type="text"
                icon={Users}
                placeholder="Enter your team name"
                rules={{ required: "Team name is required" }}
            />
            
            <FormInput
                id="password"
                label="Password"
                type="password"
                icon={Lock}
                placeholder="Enter your password"
                rules={{ required: "Password is required" }}
            />

        </form>
        </FormProvider>
    )
}

export const LoginForm = forwardRef(LoginFormComponent);
export default LoginForm;
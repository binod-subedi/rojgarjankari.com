import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "../features/auth/validators/signupSchema";

import { useAuth } from "../contexts/AuthContext";
import { createUser, signInWithGoogle } from "../configs/auth";
import { saveUserToFireStore } from "../configs/firestore";

import { AuthLayout, AuthHeader } from "../components/auth";
import { SignupForm } from "../features/auth/SignupForm";
import { EmployerSignup } from "./EmployerSignup";

export const Signup = () => {
    const { isLoggedIn } = useAuth();

    const [isEmployer, setIsEmployer] = useState(false);
    const [shake, setShake] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    if (isLoggedIn) return <Navigate to="/" />;
    if (isEmployer) return <EmployerSignup setIsEmployer={setIsEmployer} />;

    const onSubmit = async (data) => {
        try {
            const res = await createUser(data.email, data.password);
            const user = res.user;

            await saveUserToFireStore(
                user.uid,
                data.fullName,
                data.email,
                data.phone
            );

            setIsSuccess(true);
        } catch (err) {
            console.error(err);
        }
    };

    const onError = () => {
        setShake(true);
        setTimeout(() => setShake(false), 400);
    };

    return (
        <AuthLayout
            title={
                <>
                    Build your future,<br />
                    <span className="text-gray-400">starting today</span>
                </>
            }
            subtitle="Create your account to apply for jobs and manage your career."
        >
            <AuthHeader
                title="Create account"
                subtitle="Enter your details to get started"
            />

            <SignupForm
                register={register}
                errors={errors}
                onSubmit={handleSubmit(onSubmit, onError)}
                onGoogle={signInWithGoogle}
                setIsEmployer={setIsEmployer}
                shake={shake}
                isSuccess={isSuccess}
            />
        </AuthLayout>
    );
};
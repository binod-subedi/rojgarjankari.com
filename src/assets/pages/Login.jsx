import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../contexts/AuthContext";
import { auth } from "../configs/firebase";
import { signInUser, signInWithGoogle } from "../configs/auth";
import { loginSchema } from "../features/auth/validators/loginSchema";

import { AuthHeader, AuthLayout } from "../components/auth";
import { LoginForm } from "../features/auth/LoginForm";

export const Login = () => {
    const { isLoggedIn } = useAuth();

    const [shake, setShake] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    // Restore remembered email if available
    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        if (rememberedEmail) {
            setValue("email", rememberedEmail); // Update the form value for email directly
            setValue("rememberMe", true); // Check the rememberMe checkbox
        }
    }, [setValue]);

    if (isLoggedIn) return <Navigate to="/" />;

    const onSubmit = async (data) => {
        try {
            const persistence = data.rememberMe
                ? browserLocalPersistence
                : browserSessionPersistence;

            await setPersistence(auth, persistence);
            await signInUser(data.email, data.password);

            // Handle email persistence
            if (data.rememberMe) {
                localStorage.setItem("rememberedEmail", data.email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }
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
                    Simple hiring,<br />
                    <span className="text-gray-400">done right</span>
                </>
            }
            subtitle="Manage recruitment, track applicants, and streamline your workflow."
        >
            <AuthHeader
                title="Sign in"
                subtitle="Enter your details to continue"
            />

            <LoginForm
                register={register}
                errors={errors}
                onSubmit={handleSubmit(onSubmit, onError)}
                onGoogle={signInWithGoogle}
                shake={shake}
                isSuccess={isSuccess}
            />
        </AuthLayout>
    );
};
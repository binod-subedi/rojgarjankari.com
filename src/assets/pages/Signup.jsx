import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "../features/auth/validators/signupSchema";
import { useAuth } from "../contexts/AuthContext";
import { createUser, signInWithGoogle } from "../configs/auth";
import { saveUserToFireStore } from "../configs/firestore";

import { AuthLayout, AuthHeader, AuthButton } from "../components/auth";
import { SignupForm } from "../features/auth/SignupForm";
import { EmployerSignup } from "./EmployerSignup";

export const Signup = () => {
    const { isLoggedIn, refreshUserData } = useAuth();

    const [isEmployer, setIsEmployer] = useState(false);
    const [shake, setShake] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [isRegistering, setIsRegistering] = useState(false);
    const [googleUser, setGoogleUser] = useState(null);
    const [phone, setPhone] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    if (isLoggedIn && !isRegistering) return <Navigate to="/" />;
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
            console.error("Signup Error:", err);
        }
    };

    const handleGoogle = async () => {
        try {
            const { user, isNewUser } = await signInWithGoogle();
            if (isNewUser) {
                setGoogleUser(user);
                setIsRegistering(true);
            } else {
                setIsSuccess(true);
            }
        } catch (err) {
            console.error("Google Auth Error", err);
            setIsRegistering(false);
        }
    };

    const finalizeGoogleSignup = async () => {
        if (!googleUser || !phone) return;

        try {
            await saveUserToFireStore(
                googleUser.uid,
                googleUser.displayName,
                googleUser.email,
                phone
            );

            await refreshUserData();
            setIsRegistering(false);
            setIsSuccess(true);
        } catch (error) {
            console.error("Finalize Error:", error);
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
            {isRegistering ? (
                <div className="space-y-6">
                    <AuthHeader
                        title="Contact Information"
                        subtitle="One last step: Please provide your phone number to complete your profile."
                    />
                    <div className="space-y-4">
                        <input
                            type="tel"
                            placeholder="98XXXXXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition"
                        />
                        <AuthButton
                            onClick={finalizeGoogleSignup}
                            disabled={phone.length < 10}
                        >
                            Complete Signup
                        </AuthButton>
                    </div>
                </div>
            ) : (
                <>
                    <AuthHeader
                        title="Create account"
                        subtitle="Enter your details to get started"
                    />
                    <SignupForm
                        register={register}
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit, onError)}
                        onGoogle={handleGoogle}
                        setIsEmployer={setIsEmployer}
                        shake={shake}
                        isSuccess={isSuccess}
                    />
                </>
            )}
        </AuthLayout>
    );
};
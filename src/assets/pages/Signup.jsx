import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "../features/auth/validators/signupSchema";
import { useAuth } from "../contexts/AuthContext";
import { createUser, signInWithGoogle, verifyEmail } from "../configs/auth";
import { saveUserToFireStore } from "../configs/firestore";

import { AuthLayout, AuthHeader, AuthButton, errorMessages } from "../components/auth";
import { SignupForm } from "../features/auth/SignupForm";

export const Signup = () => {
    const { isLoggedIn, refreshUserData } = useAuth();

    const [shake, setShake] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [isRegistering, setIsRegistering] = useState(false);
    const [googleUser, setGoogleUser] = useState(null);
    const [phone, setPhone] = useState("");
    const [signupError, setSignupError] = useState('')
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    if (isLoggedIn && !isRegistering) return <Navigate to="/" />;

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const res = await createUser(data.email, data.password);
            const user = res.user;

            await verifyEmail(user)

            await saveUserToFireStore(
                user.uid,
                data.fullName,
                data.email,
                data.phone
            );

            await refreshUserData(user);
            setIsSuccess(true);
        } catch (err) {
            const message = errorMessages[err.code] || "An unknown error occurred. Please try again.";
            setSignupError(message);
            setShake(true);
            setTimeout(() => setShake(false), 400);
        } finally {
            setLoading(false)
        }
    };

    const handleGoogle = async () => {
        setLoading(true)
        try {
            const { user, isNewUser } = await signInWithGoogle();
            if (isNewUser) {
                setGoogleUser(user);
                setIsRegistering(true);
            } else {
                setIsSuccess(true);
            }
        } catch (err) {
            setSignupError("Google Sign-Up Failed.")
            setIsRegistering(false);
        } finally {
            setLoading(false)
        }
    };

    const finalizeGoogleSignup = async () => {
        if (!googleUser || !phone) return;
        setLoading(true)

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
        } finally {
            setLoading(false)
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
                        shake={shake}
                        isSuccess={isSuccess}
                        loading={loading}
                        signupError={signupError}
                    />
                </>
            )}
        </AuthLayout>
    );
};
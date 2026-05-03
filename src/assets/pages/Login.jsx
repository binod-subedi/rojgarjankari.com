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
import { saveUserToFireStore, saveEmployerToFireStore } from "../configs/firestore";

import { AuthHeader, AuthLayout, errorMessages } from "../components/auth";
import { LoginForm } from "../features/auth/LoginForm";

export const Login = () => {
    const { isLoggedIn, refreshUserData } = useAuth();

    const [shake, setShake] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [needsRole, setNeedsRole] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [extraInfo, setExtraInfo] = useState("");
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        if (rememberedEmail) {
            setValue("email", rememberedEmail);
            setValue("rememberMe", true);
        }
    }, [setValue]);

    if (isLoggedIn && !isRegistering) return <Navigate to="/" />;

    const onSubmit = async (data) => {
        setLoading(true)
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
            const message = errorMessages[err.code] || "An unknown error occurred. Please try again.";
            setLoginError(message);
            setShake(true);
            setTimeout(() => setShake(false), 400);
        } finally {
            setLoading(false)
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            const { user, isNewUser } = await signInWithGoogle();

            if (isNewUser) {
                setNeedsRole(user);
                setIsRegistering(true);
            } else {
                setIsSuccess(true);
            }
        } catch (err) {
            setLoginError("Google Sign-In failed.");
        } finally {
            setLoading(false)
        }
    };

    const finalizeGoogleSignup = async () => {
        if (!needsRole || !selectedRole) return;
        setLoading(true)

        try {
            if (selectedRole === "employer") {
                // extraInfo here is the Company Name
                await saveEmployerToFireStore(
                    needsRole.uid,
                    needsRole.displayName,
                    needsRole.email,
                    extraInfo || "My Company"
                );
            } else {
                // extraInfo here is the Phone Number
                await saveUserToFireStore(
                    needsRole.uid,
                    needsRole.displayName,
                    needsRole.email,
                    extraInfo || ""
                );
            }

            await refreshUserData(needsRole);
            setIsRegistering(false);
            setIsSuccess(true);
        } catch (error) {
            console.error("Finalize error:", error);
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
                    Simple hiring,<br />
                    <span className="text-gray-400">streamlined for all</span>
                </>
            }
            subtitle="Streamline recruitment and opportunities for both employers and job seekers."
        >
            <AuthHeader
                title="Sign in"
                subtitle="Enter your details to continue"
            />
            {needsRole ? (
                <div className="space-y-6">
                    {!selectedRole ? (
                        /* STEP 1: SELECT ROLE */
                        <>
                            <AuthHeader
                                title="One last step"
                                subtitle="Are you looking for a job or looking to hire?"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setSelectedRole("user")}
                                    className="p-6 border-2 border-gray-100 rounded-xl hover:border-gray-900 transition flex flex-col items-center gap-3"
                                >
                                    <span className="text-sm font-bold text-gray-900">Job Seeker</span>
                                </button>
                                <button
                                    onClick={() => setSelectedRole("employer")}
                                    className="p-6 border-2 border-gray-100 rounded-xl hover:border-gray-900 transition flex flex-col items-center gap-3"
                                >
                                    <span className="text-sm font-bold text-gray-900">Employer</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        /* STEP 2: PROVIDE DETAIL */
                        <div className="space-y-4">
                            <AuthHeader
                                title={selectedRole === "employer" ? "Company Details" : "Contact Info"}
                                subtitle={selectedRole === "employer" ? "What is your company name?" : "What is your phone number?"}
                            />
                            <div className="space-y-4">
                                <input
                                    type={selectedRole === "user" ? "tel" : "text"}
                                    placeholder={selectedRole === "user" ? "98XXXXXXXX" : "Company Name"}
                                    value={extraInfo}
                                    onChange={(e) => setExtraInfo(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 outline-none transition"
                                />
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setSelectedRole(null)}
                                        className="flex-1 py-3 text-gray-500 font-medium hover:text-gray-900 transition"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={finalizeGoogleSignup}
                                        disabled={!extraInfo}
                                        className="flex-2 py-3 bg-gray-900 text-white font-semibold rounded-lg disabled:opacity-50"
                                    >
                                        Complete Signup
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <LoginForm
                    register={register}
                    errors={errors}
                    onSubmit={handleSubmit(onSubmit, onError)}
                    onGoogle={handleGoogleLogin}
                    shake={shake}
                    isSuccess={isSuccess}
                    loginError={loginError}
                    loading={loading}
                />
            )}

        </AuthLayout>
    );
};
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { empsignupSchema } from '../features/auth/validators/empsignupSchema';
import { useAuth } from "../contexts/AuthContext";
import { createUser, signInWithGoogle, verifyEmail } from "../configs/auth";
import { saveEmployerToFireStore } from "../configs/firestore";

import { AuthLayout, AuthHeader, AuthButton, errorMessages } from "../components/auth";
import { EmployerSignupForm } from "../features/auth/EmployerSignupForm";

export const EmployerSignup = () => {
    const { isLoggedIn, refreshUserData } = useAuth();

    const [shake, setShake] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [isRegistering, setIsRegistering] = useState(false);
    const [googleUser, setGoogleUser] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);
    const [signupError, setSignupError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(empsignupSchema),
    });

    if (isLoggedIn && !isRegistering) return <Navigate to="/" />;

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const res = await createUser(data.email, data.password);
            const employer = res.user;

            await verifyEmail(employer);

            await saveEmployerToFireStore(
                employer.uid,
                data.fullName,
                data.email,
                data.companyName
            );

            await refreshUserData(employer);
            setIsSuccess(true);
        } catch (err) {
            const message = errorMessages[err.code] || "An unknown error occurred. Please try again.";
            setSignupError(message);
            setShake(true);
            setTimeout(() => setShake(false), 400);
        } finally {
            setLoading(false);
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
            setSignupError("Goole Sign-Up Failed.")
            setIsRegistering(false);
        } finally {
            setLoading(false)
        }
    };

    const finalizeGoogleSignup = async () => {
        if (!googleUser || !companyName) return;
        setLoading(true)

        try {
            await saveEmployerToFireStore(
                googleUser.uid,
                googleUser.displayName || "Google Employer",
                googleUser.email,
                companyName
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
                    Hire smarter,<br />
                    <span className="text-gray-400">grow faster</span>
                </>
            }
            subtitle="Create an employer account to manage hiring efficiently."
        >
            {isRegistering ? (
                <div className="space-y-6">
                    <AuthHeader
                        title="Company Details"
                        subtitle="Please provide your organization's name to finish setting up your employer profile."
                    />
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="e.g. Google Inc."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition"
                        />
                        <AuthButton
                            onClick={finalizeGoogleSignup}
                            disabled={!companyName.trim()}
                        >
                            Complete Signup
                        </AuthButton>
                    </div>
                </div>
            ) : (
                <>
                    <AuthHeader
                        title="Employer signup"
                        subtitle="Create your companyName account"
                    />
                    <EmployerSignupForm
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
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../contexts/AuthContext";
import { createUser, signInWithGoogle } from "../configs/auth";
import { saveEmployerToFireStore } from "../configs/firestore";

import { AuthLayout, AuthHeader, AuthButton } from "../components/auth";
import { empsignupSchema } from '../features/auth/validators/empsignupSchema';
import { EmployerSignupForm } from "../features/auth/EmployerSignupForm";

export const EmployerSignup = ({ setIsEmployer }) => {
    const { isLoggedIn, refreshUserData } = useAuth();

    const [isSuccess, setIsSuccess] = useState(false);
    const [shake, setShake] = useState(false);

    const [isRegistering, setIsRegistering] = useState(false);
    const [googleUser, setGoogleUser] = useState(null);
    const [companyName, setcompanyName] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(empsignupSchema),
    });

    if (isLoggedIn && !isRegistering) return <Navigate to="/" />;

    const onSubmit = async (data) => {
        try {
            const res = await createUser(data.email, data.password);
            const employer = res.user;

            await saveEmployerToFireStore(
                employer.uid,
                data.fullName,
                data.email,
                data.companyName
            );

            setIsSuccess(true);
        } catch (err) {
            console.error("Employer Signup Error:", err);
        }
    };

    const handleGoogle = async () => {
        try {
            const { user, isNewUser } = await signInWithGoogle();
            if (isNewUser) {
                setGoogleUser(user);
                setIsRegistering(true);
                console.log("Isregistering is", isRegistering)
            } else {
                setIsSuccess(true);
            }
        } catch (err) {
            console.error("Google Auth Error:", err);
        }
    };

    const finalizeGoogleSignup = async () => {
        console.log("I am checking")
        if (!googleUser || !companyName) return;
        console.log("Check Complete, working till here.")

        try {
            await saveEmployerToFireStore(
                googleUser.uid,
                googleUser.displayName || "Google Employer",
                googleUser.email,
                companyNameName
            );

            await refreshUserData();
            console.log("Registering check", isRegistering)
            setIsRegistering(false);
            console.log("Registering check", isRegistering)
            setIsSuccess(true);
        } catch (error) {
            console.error("Finalize Error:", error);
        }
    };
    const checkFunc = () => {
        console.log("Button check")
    }

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
                        title="companyName Details"
                        subtitle="Please provide your organization's name to finish setting up your employer profile."
                    />
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="e.g. Acme Corporation"
                            value={companyName}
                            onChange={(e) => setcompanyName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition"
                        />
                        <AuthButton
                            onClick={checkFunc}
                        // disabled={!companyName.trim()}
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
                        setIsEmployer={setIsEmployer}
                        shake={shake}
                        isSuccess={isSuccess}
                    />
                </>
            )}
        </AuthLayout>
    );
};
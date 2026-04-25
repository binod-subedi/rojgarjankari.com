import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { createUser } from "../configs/auth";
import { saveEmployerToFireStore } from "../configs/firestore";

import { AuthLayout, AuthHeader } from "../components/auth";
import { EmployerSignupForm } from "../features/auth/EmployerSignupForm";

export const EmployerSignup = ({ setIsEmployer }) => {
    const { isLoggedIn } = useAuth();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        agreeToTerms: false,
    });

    const [shake, setShake] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (isLoggedIn) return <Navigate to="/" />;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 400);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.companyName) {
            triggerShake();
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            triggerShake();
            console.error("Passwords do not match");
            return;
        }

        if (!formData.agreeToTerms) {
            triggerShake();
            return;
        }

        try {
            const res = await createUser(formData.email, formData.password);
            const employer = res.user;

            await saveEmployerToFireStore(
                employer.uid,
                formData.fullName,
                formData.email,
                formData.companyName
            );

            setIsSuccess(true);

            console.log("Employer signup successful");
        } catch (err) {
            triggerShake();
            console.error("Employer signup error:", err);
        }
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
            <AuthHeader
                title="Employer signup"
                subtitle="Create your company account"
            />

            <EmployerSignupForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                setIsEmployer={setIsEmployer}
                shake={shake}
                isSuccess={isSuccess}
            />
        </AuthLayout>
    );
};
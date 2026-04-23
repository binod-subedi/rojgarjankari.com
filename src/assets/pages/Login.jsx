import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
} from "firebase/auth";

import { useAuth } from "../contexts/AuthContext";
import { auth } from "../configs/firebase";
import { signInUser, signInWithGoogle } from "../configs/auth";

import { AuthHeader, AuthLayout } from "../components/auth";
import { LoginForm } from "../features/auth/LoginForm";

export const Login = () => {
    const { isLoggedIn } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [error, setError] = useState("");

    // Restore remembered email
    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        if (rememberedEmail) {
            setFormData((prev) => ({
                ...prev,
                email: rememberedEmail,
                rememberMe: true,
            }));
        }
    }, []);

    if (isLoggedIn) return <Navigate to="/" />;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const persistence = formData.rememberMe
                ? browserLocalPersistence
                : browserSessionPersistence;

            await setPersistence(auth, persistence);
            await signInUser(formData.email, formData.password);

            if (formData.rememberMe) {
                localStorage.setItem("rememberedEmail", formData.email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password");
        }
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
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onGoogle={signInWithGoogle}
                error={error}
            />
        </AuthLayout>
    );
};
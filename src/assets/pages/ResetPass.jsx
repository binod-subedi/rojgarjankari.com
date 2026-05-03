import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Navigate, Link } from "react-router-dom";

import { AuthLayout, AuthHeader } from "../components/auth";
import { AuthInput, AuthButton } from "../components/auth";
import { Mail } from "lucide-react";

import { passwordReset } from "../configs/auth";
import { useAuth } from "../contexts/AuthContext";
import { z } from "zod";
import { loginSchema } from "../features/auth/validators/loginSchema";

const resetPassSchema = z.object({
    email: z.email("Invalid email"),
});

export const ResetPass = () => {
    const { isLoggedIn } = useAuth();

    const [shake, setShake] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    if (isLoggedIn) return <Navigate to="/" />;

    const onSubmit = async (data) => {
        try {
            await passwordReset(data.email);
            setIsSuccess(true);
        } catch (err) {
            console.error(err);
            setShake(true);
            setTimeout(() => setShake(false), 400);
        }
    };

    const shakeAnimation = {
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        transition: { duration: 0.4 },
    };

    const successAnimation = {
        scale: [1, 1.03, 1],
        transition: { duration: 0.3 },
    };

    return (
        <AuthLayout
            title={
                <>
                    Reset your password,<br />
                    <span className="text-gray-400">quickly and securely</span>
                </>
            }
            subtitle="Enter your email and we will send you a link to reset your password."
        >
            <AuthHeader
                title="Forgot Password"
                subtitle="Enter your email to reset your password"
            />

            <motion.div animate={shake ? shakeAnimation : isSuccess ? successAnimation : {}}>
                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4.5 overflow-hidden"
                >
                    <motion.div>
                        <AuthInput
                            label="Email"
                            {...register("email")}
                            placeholder="name@example.com"
                            type="email"
                            icon={Mail}
                        />
                        {errors.email && (
                            <motion.p className="text-xs text-red-500 mt-1">
                                {errors.email.message}
                            </motion.p>
                        )}
                    </motion.div>

                    <motion.div>
                        <AuthButton type="submit">Send Reset Link</AuthButton>
                    </motion.div>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Remembered your password?{" "}
                        <Link
                            to="/login"
                            className="text-gray-900 font-medium hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </motion.form>
            </motion.div>

            {isSuccess && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 mt-4 text-center"
                >
                    Reset link sent! Check your email.
                </motion.p>
            )}
        </AuthLayout>
    );
};
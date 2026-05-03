import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
    AuthInput,
    PasswordInput,
    AuthButton,
    Divider,
    SocialAuthButton,
} from "../../components/auth";

export const SignupForm = ({
    register,
    errors,
    onSubmit,
    onGoogle,
    shake,
    isSuccess,
    loading,
    signupError
}) => {
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.03,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
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
        <motion.div
            animate={shake ? shakeAnimation : isSuccess ? successAnimation : {}}
        >
            <motion.form
                variants={container}
                initial="hidden"
                animate="show"
                onSubmit={onSubmit}
                className="space-y-4.5 overflow-hidden"
            >
                {/* NAME + PHONE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={item}>
                        <AuthInput
                            label="Full name"
                            {...register("fullName")}
                            placeholder="Balendra Shah"
                            type="text"
                        />
                        {errors.fullName && (
                            <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-red-500 mt-1"
                            >
                                {errors.fullName.message}
                            </motion.p>
                        )}
                    </motion.div>

                    <motion.div variants={item}>
                        <AuthInput
                            label="Phone"
                            {...register("phone")}
                            placeholder="9812345678"
                            type="text"
                        />
                        {errors.phone && (
                            <motion.p className="text-xs text-red-500 mt-1">
                                {errors.phone.message}
                            </motion.p>
                        )}
                    </motion.div>
                </div>

                {/* EMAIL */}
                <motion.div variants={item}>
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

                {/* PASSWORDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={item}>
                        <PasswordInput
                            label="Password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <motion.p className="text-xs text-red-500 mt-1">
                                {errors.password.message}
                            </motion.p>
                        )}
                    </motion.div>

                    <motion.div variants={item}>
                        <PasswordInput
                            label="Confirm"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <motion.p className="text-xs text-red-500 mt-1">
                                {errors.confirmPassword.message}
                            </motion.p>
                        )}
                    </motion.div>
                </div>

                {/* TERMS */}
                <label className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                    <input
                        type="checkbox"
                        {...register("agreeToTerms")}
                        className="mt-1 w-4 h-4"
                    />
                    <span>
                        I agree to the{" "}
                        <span className="text-gray-900 underline cursor-pointer hover:opacity-70">
                            Terms and Conditions
                        </span>
                    </span>
                </label>

                {errors.agreeToTerms && (
                    <motion.p className="text-xs text-red-500">
                        {errors.agreeToTerms.message}
                    </motion.p>
                )}
                {signupError && (
                    <motion.p
                        className="text-sm text-red-500 text-center mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {signupError}
                    </motion.p>
                )}
                {/* SUBMIT */}
                <motion.div variants={item}>
                    <AuthButton loading={loading} type="submit">Create account</AuthButton>
                </motion.div>

                <Divider />

                {/* GOOGLE */}
                <motion.div variants={item}>
                    <SocialAuthButton onClick={onGoogle} loading={loading}>
                        Continue with Google
                    </SocialAuthButton>
                </motion.div>

                {/* FOOTER */}
                <p className="text-center text-sm text-gray-500 pt-2 leading-relaxed">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-gray-900 font-medium hover:underline"
                    >
                        Sign in
                    </Link>
                    <br />
                    Hiring?{" "}
                    <Link
                        to="/employersignup"
                        className="text-gray-900 font-medium hover:underline"
                    >
                        Create employer account
                    </Link>
                </p>
            </motion.form>
        </motion.div>
    );
};
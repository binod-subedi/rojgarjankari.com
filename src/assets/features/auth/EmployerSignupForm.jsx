import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
    AuthInput,
    AuthButton,
    PasswordInput, SocialAuthButton, Divider
} from "../../components/auth";

export const EmployerSignupForm = ({
    register,
    errors,
    onGoogle,
    onSubmit,
    setIsEmployer,
    shake,
    isSuccess
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
    };

    const successAnimation = {
        scale: [1, 1.03, 1],
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
                className="space-y-5"
            >
                {/* Name + Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
                    <motion.div variants={item}>
                        <AuthInput
                            label="Full Name"
                            {...register("fullName")}
                            placeholder="Your Name"
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
                            label="Company"
                            {...register("companyName")}
                            placeholder="Your Company"
                            type="text"
                        />
                        {errors.companyName && (
                            <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-red-500 mt-1"
                            >
                                {errors.companyName.message}
                            </motion.p>
                        )}
                    </motion.div>
                </div>

                {/* Email */}
                <motion.div variants={item}>
                    <AuthInput
                        label="Email"
                        type="email"
                        {...register("email")}
                        icon={Mail}
                        placeholder="name@company.com"
                    />
                    {errors.email && (
                        <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-500 mt-1"
                        >
                            {errors.email.message}
                        </motion.p>
                    )}

                </motion.div>

                {/* Password row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
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

                {/* Terms */}
                <motion.label
                    variants={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                >
                    <input
                        type="checkbox"
                        {...register("agreeToTerms")}
                        className="mt-1 w-4 h-4"
                    />
                    <span>
                        I agree to the{" "}
                        <span className="text-gray-900 underline cursor-pointer">
                            Terms and Conditions
                        </span>
                    </span>
                </motion.label>
                {errors.agreeToTerms && (
                    <motion.p className="text-xs text-red-500">
                        {errors.agreeToTerms.message}
                    </motion.p>
                )}

                {/* Submit */}
                <motion.div variants={item}>
                    <AuthButton type="submit">
                        Create employer account
                    </AuthButton>
                </motion.div>

                <Divider />

                {/* Google Signup */}
                <motion.div variants={item}>
                    <SocialAuthButton onClick={onGoogle}>
                        Continue with Google
                    </SocialAuthButton>
                </motion.div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 pt-2">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-gray-900 font-medium hover:underline"
                    >
                        Sign in
                    </Link>
                    <br />
                    Looking for jobs?{" "}
                    <button
                        type="button"
                        onClick={() => setIsEmployer(false)}
                        className="text-gray-900 font-medium hover:underline"
                    >
                        Create employee account
                    </button>
                </p>
            </motion.form>
        </motion.div>
    );
};
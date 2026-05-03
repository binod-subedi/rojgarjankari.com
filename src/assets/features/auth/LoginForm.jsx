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

export const LoginForm = ({
    register,
    errors,
    onSubmit,
    onGoogle,
    shake,
    isSuccess,
    loginError,
    loading
}) => {
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.08,
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
                animate={"show"}
                onSubmit={onSubmit}
                className="space-y-6"
            >
                {/* Email */}
                <motion.div variants={item}>
                    <AuthInput
                        label="Email"
                        {...register("email")}
                        placeholder="name@company.com"
                        type="email"
                        icon={Mail}
                    />
                    {errors.email && (
                        <motion.p className="text-xs text-red-500 mt-1">
                            {errors.email.message}
                        </motion.p>
                    )}
                </motion.div>

                {/* Password */}
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

                <motion.div variants={item} className="flex items-center">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        {...register("rememberMe")}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                        Remember me
                    </label>
                </motion.div>
                {loginError && (
                    <motion.p
                        className="text-sm text-red-500 text-center mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {loginError}
                    </motion.p>
                )}

                {/* Submit */}
                <motion.div variants={item}>
                    <AuthButton loading={loading} type="submit">Sign In</AuthButton>
                </motion.div>

                <Divider />

                {/* Google */}
                <motion.div variants={item}>
                    <SocialAuthButton onClick={onGoogle} loading={loading}>
                        Continue with Google
                    </SocialAuthButton>
                </motion.div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-gray-900 font-medium hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </motion.form>
        </motion.div>
    );
};
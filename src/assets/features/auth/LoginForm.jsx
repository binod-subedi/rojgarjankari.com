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
    formData,
    onChange,
    onSubmit,
    onGoogle,
    error,
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

    const shakeAnimation = error
        ? { x: [0, -6, 6, -4, 4, 0] }
        : {};

    return (
        <motion.form
            variants={container}
            initial="hidden"
            animate={["show", shakeAnimation]}
            transition={{ duration: 0.3 }}
            onSubmit={onSubmit}
            className="space-y-6"
        >
            {/* Email */}
            <motion.div variants={item}>
                <AuthInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="name@company.com"
                    icon={Mail}
                    required
                />
            </motion.div>

            {/* Password */}
            <motion.div variants={item}>
                <PasswordInput
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                />
            </motion.div>

            {/* Error Message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                >
                    {error}
                </motion.p>
            )}

            {/* Submit */}
            <motion.div variants={item}>
                <AuthButton type="submit">Sign In</AuthButton>
            </motion.div>

            <Divider />

            {/* Google */}
            <motion.div variants={item}>
                <SocialAuthButton onClick={onGoogle}>
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
    );
};
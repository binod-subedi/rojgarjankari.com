import { Mail } from "lucide-react";
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'


import { AuthInput, AuthButton, PasswordInput } from "../../components/auth";

export const EmployerSignupForm = ({
    formData,
    onChange,
    onSubmit,
    setIsEmployer,
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

    return (
        <motion.form
            variants={container}
            initial="hidden"
            animate="show"
            onSubmit={onSubmit}
            className="space-y-5"
        >

            {/* Name + Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={item}>
                    <AuthInput
                        label="Full name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={onChange}
                        placeholder="Your Name"
                    />
                </motion.div>

                <motion.div variants={item}>
                    <AuthInput
                        label="Company"
                        name="companyName"
                        value={formData.companyName}
                        onChange={onChange}
                        placeholder="Your Company"
                    />
                </motion.div>
            </div>

            {/* Email */}
            <motion.div variants={item}>
                <AuthInput
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    icon={Mail}
                    placeholder="name@company.com"
                />
            </motion.div>
            {/* Password row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={item}>
                    <PasswordInput
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                    />
                </motion.div>

                <motion.div variants={item}>
                    <PasswordInput
                        label="Confirm"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={onChange}
                    />
                </motion.div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={onChange}
                    className="mt-1 w-4 h-4"
                    required
                />
                <span>
                    I agree to the{" "}
                    <span className="text-gray-900 underline cursor-pointer">
                        Terms and Conditions
                    </span>
                </span>
            </label>

            {/* Submit */}
            <motion.div variants={item}>
                <AuthButton type="submit">
                    Create employer account
                </AuthButton>
            </motion.div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 pt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-gray-900 font-medium hover:underline">
                    Sign in
                </Link>
                <br />Looking for jobs?{" "}
                <button
                    type="button"
                    onClick={() => setIsEmployer(false)}
                    className="text-gray-900 font-medium hover:underline"
                >
                    Create employee account
                </button>
            </p>

        </motion.form >
    );
};
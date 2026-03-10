import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const PasswordReset = () => {
    const { isLoggedIn } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Logic to handle forgot password (for example, email sending)
        try {
            // Assume forgotPassword is a function that sends a reset email
            await forgotPassword(formData.email);
            setMessage("Password reset link sent. Check your email!");
        } catch (error) {
            setMessage("Something went wrong, please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Redirect to dashboard if the user is logged in
    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="min-h-screen transition-colors duration-300">
            {/* Dark Mode Toggle */}
            <button
                onClick={() => { }}
                className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </button>

            {/* Main Container */}
            <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Forgot Password Card */}
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 overflow-hidden transition-colors duration-300">

                        {/* Header Section */}
                        <div className="px-8 pt-10 pb-8 bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-center text-white mb-2">Forgot Your Password?</h2>
                            <p className="text-center text-indigo-100">Enter your email to receive a password reset link</p>
                        </div>

                        {/* Form Section */}
                        <div className="px-8 py-10">
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 px-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                >
                                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                                </button>

                                {/* Message Section */}
                                {message && (
                                    <p className="mt-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300">{message}</p>
                                )}
                            </form>
                        </div>

                        {/* Sign In Link */}
                        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                Remember your password?{' '}
                                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        Protected by industry-standard encryption
                    </p>
                </div>
            </div>
        </div>
    );
};

// Simulated forgotPassword function, replace with actual API call
async function forgotPassword(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email) {
                resolve();
            } else {
                reject("Email not provided");
            }
        }, 1000);
    });
}
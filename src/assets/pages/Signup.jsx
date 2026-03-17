import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { DarkModeToggle } from "../components/DarkModeToggle"
import { createUser } from '../configs/auth'
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from '../contexts/ThemeContext.jsx'

export const Signup = () => {

    const { isLoggedIn } = useAuth();
    const { theme, setTheme } = useTheme();

    if (isLoggedIn) {
        return <Navigate to='/' />
    }

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    })

    const toggleDarkMode = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData, [name]: type === 'checkbox' ? checked : value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createUser(formData.email, formData.password)
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <div className="min-h-screen bg-gray-50">

            {/* Main Container */}
            <div className="min-h-screen flex items-center justify-center px-4 py-12">

                {/* Signup Card */}
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

                        {/* Header */}
                        <div className="px-8 pt-10 pb-8 bg-gray-100">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                                    <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                                Create Account
                            </h2>
                            <p className="text-center text-gray-600">
                                Join us today and get started
                            </p>
                        </div>

                        {/* Form */}
                        <div className="px-8 py-10">
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Full Name */}
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                />

                                {/* Email */}
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                />

                                {/* Password */}
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                />

                                {/* Confirm Password */}
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                />

                                {/* Terms */}
                                <label className="flex items-start text-sm text-gray-600">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                        className="mr-2 mt-1 accent-red-600"
                                        required
                                    />
                                    I agree to the{" "}
                                    <span className="text-red-600 ml-1 cursor-pointer">Terms</span>
                                </label>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-sm cursor-pointer"
                                >
                                    Create Account
                                </button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="border-t border-gray-300"></div>
                                    <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-sm text-gray-500">
                                        Or sign up with
                                    </span>
                                </div>

                                {/* Google Only */}
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25..." />
                                    </svg>
                                    <span className="ml-2 text-sm text-gray-700">
                                        Continue with Google
                                    </span>
                                </button>

                            </form>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                            <p className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="text-red-600 hover:text-red-500">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
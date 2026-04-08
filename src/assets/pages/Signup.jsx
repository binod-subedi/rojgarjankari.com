import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { createUser, signInWithGoogle } from '../configs/auth'
import { useAuth } from "../contexts/AuthContext"

export const Signup = () => {

    const { isLoggedIn } = useAuth();

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

    const handleGoogleSignUp = () => {
        signInWithGoogle()
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
                                    <span className="text-red-600 ml-1 cursor-pointer">Terms and Conditions.</span>
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
                                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={handleGoogleSignUp}
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
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
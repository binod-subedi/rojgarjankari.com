import { React, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { signInUser } from '../configs/auth'
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from '../contexts/ThemeContext'

export const Login = () => {

    const { isLoggedIn } = useAuth();
    const { theme, setTheme } = useTheme();

    if (isLoggedIn) {
        return <Navigate to='/' />
    }

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    })

    const toggleDarkMode = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signInUser(formData.email, formData.password).then(() => {
            console.log("Login Successful")
        }).catch((status) => {
            console.log(status)
        })

    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData, [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleGoogleSignIn = () => {
        console.log("Coming Soon!")
    }

    return (
        <div className="min-h-screen transition-colors duration-300">
            {/* Dark Mode Toggle */}
            <button
                onClick={toggleDarkMode}
                className="cursor-pointer fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
                {theme ? (
                    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </button>

            {/* Main Container */}
            <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

                {/* Signup Card */}
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900/50 overflow-hidden transition-colors duration-300">

                        {/* Header Section */}
                        <div className="px-8 pt-10 pb-8 bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-center text-white mb-2 ">Welcome Back</h2>
                            <p className="text-center text-indigo-100">Sign in to continue to your account</p>
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

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>


                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="rememberMe"
                                            type="checkbox"
                                            checked={formData.rememberMe}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to={'/passwordreset'} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors cursor-pointer">
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Sign In Button */}
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer"
                                >
                                    Sign In
                                </button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                {/* Social Signup Buttons */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">Google</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                                    >
                                        <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                                        </svg>
                                    </button>
                                </div>

                            </form>
                        </div>

                        {/* Sign In Link */}
                        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>

                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        Protected by industry-standard encryption
                    </p>
                </div>

            </div >
        </div >
    )
}
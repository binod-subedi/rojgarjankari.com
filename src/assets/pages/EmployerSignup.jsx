import { useState } from "react";
// import { createEmployer } from "../configs/auth"; 
export const EmployerSignup = ({ setIsEmployer }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        companyWebsite: '',
        agreeToTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData, [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            try {
                await createEmployer(formData.email, formData.password, formData.companyName, formData.companyWebsite);
            } catch (err) {
                console.error("Employer signup error", err);
            }
        } else {
            console.log("Passwords don't match.");
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-white flex items-center justify-center px-4 py-12">
            <button onClick={() => setIsEmployer(false)} className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 text-emerald-500 cursor-pointer
                   after:content-[''] after:block after:w-0 after:h-0.5 after:bg-emerald-500 after:transition-all
                   after:duration-300 hover:after:w-full">
                Employee Signup
            </button>
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">

                    {/* Header */}
                    <div className="px-8 pt-10 pb-8 bg-emerald-600 rounded-t-lg shadow-md">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow">
                                <svg className="w-8 h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-white mb-2">
                            Employer Account
                        </h2>
                        <p className="text-center text-emerald-100">
                            Create your employer account to manage jobs
                        </p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-10">
                        <form onSubmit={handleSubmit} className="space-y-5">

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                            />

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                            />

                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                            />

                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                            />

                            <label className="flex items-start text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className="mr-2 mt-1 accent-emerald-500"
                                    required
                                />
                                I agree to the{" "}
                                <span className="text-emerald-500 ml-1 cursor-pointer">Terms and Conditions.</span>
                            </label>

                            <button
                                type="submit"
                                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg shadow-sm cursor-pointer transition"
                            >
                                Create Employer Account
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};
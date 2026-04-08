import { useState } from "react";
import Logo from '../images/LOGO.png'
import TextLogo from '../images/textlogo.png'
import { Link } from "react-router-dom";
import { Profile } from './Profile'

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-900/50 transition-colors duration-300">
            {/* Nav Wrapper */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* LEFT: Logo */}
                    <div className="flex items-center space-x-2">
                        <img src={Logo} alt="Logo" className="h-10 w-auto rounded-4xl" />
                        <img src={TextLogo} alt="Text Logo" className="h-7 w-auto hidden sm:block" />
                    </div>

                    {/* MIDDLE: Menu (Desktop) */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="#"
                            className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 font-medium transition"
                        >
                            Jobs
                        </Link>
                        <Link
                            to="#"
                            className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 font-medium transition"
                        >
                            Applied Jobs
                        </Link>
                        <Link
                            to="#"
                            className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 font-medium transition"
                        >
                            Companies
                        </Link>
                    </div>

                    {/* RIGHT: Profile + Hamburger */}
                    <div className="flex items-center space-x-4">

                        {/* Profile */}
                        <div className="hidden md:flex">
                            <Profile />
                        </div>

                        {/* Hamburger */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col space-y-3 mt-4">

                        <Link
                            to="#"
                            className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 font-medium transition"
                        >
                            Jobs
                        </Link>

                        <Link
                            to="#"
                            className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 font-medium transition"
                        >
                            Applied Jobs
                        </Link>

                        <Link
                            to="#"
                            className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 font-medium transition"
                        >
                            Companies
                        </Link>

                        {/* Profile (Mobile) */}
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                            <Profile />
                        </div>

                    </div>
                </div>
            )}
        </nav>
    );
};
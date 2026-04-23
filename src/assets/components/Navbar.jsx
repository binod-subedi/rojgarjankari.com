import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { signOutUser } from "../configs/auth";
import Logo from "../images/LOGO.png";
import TextLogo from "../images/textlogo.png";
import { useAuth } from "../contexts/AuthContext";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const menuRef = useRef();

    // outside click close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = () => {
        signOutUser();
        setProfileOpen(false);
    };

    const { userData } = useAuth()
    const initials =
        userData?.fullName?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";

    const linkBase = "text-sm font-medium transition";
    const inactive = "text-gray-500 hover:text-gray-900";
    const active = "text-gray-900";

    return (
        <>
            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">

                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img src={Logo} className="h-9 rounded-xl" />
                            <img src={TextLogo} className="h-6 hidden sm:block" />
                        </div>

                        {/* Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {[
                                { to: "/", label: "Jobs" },
                                { to: "/appliedjobs", label: "Applied Jobs" },
                                { to: "/companies", label: "Companies" },
                            ].map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `${linkBase} ${isActive ? active : inactive}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3 relative">

                            {/* PROFILE */}
                            <div className="relative" ref={menuRef}>

                                {/* Avatar */}
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold hover:bg-black transition"
                                >
                                    {initials}
                                </button>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                                        >

                                            {/* Header */}
                                            <div className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-900">
                                                {userData.fullName}
                                            </div>

                                            {/* Menu */}
                                            <div className="flex flex-col">

                                                <Link
                                                    to="#"
                                                    onClick={() => setProfileOpen(false)}
                                                    className="px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
                                                >
                                                    Profile
                                                </Link>

                                                <button
                                                    onClick={handleSignOut}
                                                    className="text-left px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
                                                >
                                                    Sign out
                                                </button>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Hamburger */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    {isOpen ? (
                                        <path d="M6 6l12 12M6 18L18 6" strokeWidth="2" />
                                    ) : (
                                        <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" />
                                    )}
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ x: 300 }}
                            animate={{ x: 0 }}
                            exit={{ x: 300 }}
                            className="absolute right-0 top-0 w-72 h-full bg-white shadow-xl p-6 flex flex-col"
                        >

                            <button
                                onClick={() => setIsOpen(false)}
                                className="self-end p-2 hover:bg-gray-100 rounded-lg"
                            >
                                ✕
                            </button>

                            <div className="flex flex-col gap-6 mt-6">

                                {["Jobs", "Applied Jobs", "Companies"].map((item, i) => (
                                    <Link
                                        key={i}
                                        to="#"
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                                    >
                                        {item}
                                    </Link>
                                ))}

                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
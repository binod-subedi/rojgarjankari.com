import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOutUser } from "../configs/auth";

export const Profile = ({ }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = () => {
        signOutUser();
    }

    return (
        <div className="relative" ref={menuRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center font-semibold shadow-md transition cursor-pointer"
            >
                B
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-200">

                    {/* Name (non-clickable) */}
                    <div className="px-4 py-3 text-sm font-semibold text-gray-900 bg-gray-100">
                        Binod Subedi
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col">

                        <Link
                            to="#"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-500 transition"
                        >
                            Profile
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-500 transition cursor-pointer"
                        >
                            Sign Out
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};
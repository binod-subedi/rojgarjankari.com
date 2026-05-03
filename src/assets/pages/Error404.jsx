import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export const Error404 = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-2xl w-full text-center"
            >

                {/* Text Content */}
                <motion.h1
                    variants={itemVariants}
                    className="text-9xl font-extrabold text-gray-900 tracking-tight mb-4"
                >
                    404
                </motion.h1>

                <motion.h2
                    variants={itemVariants}
                    className="text-3xl font-bold text-gray-800 mb-4"
                >
                    Page not found
                </motion.h2>

                <motion.p
                    variants={itemVariants}
                    className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed"
                >
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track to finding the right career.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                </motion.div>

                {/* Subtle Brand Footer */}
                <motion.p
                    variants={itemVariants}
                    className="mt-16 text-sm text-gray-400 font-medium uppercase tracking-widest"
                >
                    Rojgar Jankari
                </motion.p>
            </motion.div>
        </div>
    );
};

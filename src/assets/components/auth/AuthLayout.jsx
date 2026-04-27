import { motion } from "framer-motion";

export const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-5xl w-full bg-white rounded-2xl shadow-xl flex overflow-hidden border border-gray-200"
            >

                {/* Left */}
                <aside className="hidden md:flex flex-1 bg-gray-900 text-white p-12 flex-col justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl font-bold mb-6">{title}</h1>
                        <p className="text-gray-400 text-sm max-w-xs">{subtitle}</p>
                    </motion.div>
                    <p className="text-gray-700 text-sm max-w-xs">&copy; {new Date().getFullYear()} RojgarJankari.com</p>
                </aside>

                {/* Right */}
                <main className="flex-1 p-8 md:p-16 flex justify-center">
                    <div className="max-w-md w-full">
                        {children}
                    </div>
                </main>

            </motion.div>
        </div>
    );
};
import { motion } from "framer-motion";

export const AuthButton = ({ children, loading, ...props }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
        disabled={loading}
        className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg disabled:opacity-50"
    >
        {loading ? "Please wait..." : children}
    </motion.button>
);
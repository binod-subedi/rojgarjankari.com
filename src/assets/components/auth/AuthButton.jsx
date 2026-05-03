import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const AuthButton = ({ children, loading, ...props }) => (
    <motion.button
        whileHover={!loading ? { scale: 1.01 } : {}}
        whileTap={!loading ? { scale: 0.99 } : {}}
        {...props}
        disabled={loading || props.disabled}
        className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg disabled:opacity-70 flex items-center justify-center gap-2 transition-all"
    >
        {loading ? (
            <>
                <Loader2 className="animate-spin" size={18} />
                <span>Please wait...</span>
            </>
        ) : (
            children
        )}
    </motion.button>
);
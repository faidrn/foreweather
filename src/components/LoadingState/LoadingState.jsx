import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "../../hooks/useTranslations";

const LoadingState = ({ isLoading }) => {
    const translation = useTranslations();
    
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-white"
                >
                    <motion.div
                        className="inline-block w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                    </motion.div>
                    <p className="relative left-2.5 -top-4 text-lg backdrop-blur-sm bg-white/10 rounded-lg px-6 py-3 inline-block">
                        {translation?.loading}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingState;
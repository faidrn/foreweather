import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsButton = ({ onClick }) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            onClick={onClick}
            className="fixed md:top-6 md:right-6 top-4 right-4 p-4 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-white/20 transition-colors z-30"
        >
            <Settings className="size-6 text-white" />
        </motion.button>
    );
};

export default SettingsButton;
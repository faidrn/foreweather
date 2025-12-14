import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { motion } from "framer-motion";
import { useTranslations } from "../../hooks/useTranslations";

const ErrorState = ({ errorKey }) => {
    const translation = useTranslations();

  return (
    
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30 text-white"
    >
        {translation.errorKey}
    </motion.div>
  );
};

export default ErrorState;
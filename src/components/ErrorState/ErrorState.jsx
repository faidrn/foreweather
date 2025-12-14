import React from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { motion } from "framer-motion";
import { useTranslations } from "../../hooks/useTranslations";

const ErrorState = ({ errorKey, onRetry }) => {
    const translation = useTranslations();

  return (
    
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center text-white"
    >
        <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-red-50/50 rounded-xl border border-red-100">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {translation.errors.title}
            </h3>
            
            <p className="text-gray-600 mb-6 max-w-xs">
                {translation.errorKey}
            </p>

            <button
                onClick={onRetry}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
            >
                <RefreshCcw size={18} />
                {translation.errors.retry_button}
            </button>
        </div>
    </motion.div>
  );
};

export default ErrorState;
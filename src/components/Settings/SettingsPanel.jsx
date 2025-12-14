import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Palette, Moon, Sun } from 'lucide-react';
import { useTranslations } from "../../hooks/useTranslations";
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const SettingsPanel = ({ isOpen, onClose }) => {
   // const { theme } = useTheme(); // Obtener el tema actual
   const translation = useTranslations();
   const { language, setLanguage } = useLanguage();
   const { isDark, toggleDark, colorScheme, setColorScheme } = useTheme();

   const colorSchemes = [
    { id: 'default', name: translation.themes?.default },
    { id: 'ocean', name: translation.themes?.ocean },
    { id: 'sunset', name: translation.themes?.sunset },
    { id: 'forest', name: translation.themes?.forest },
    { id: 'lavender', name: translation.themes?.lavender },
  ];
    
    return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/10 backdrop-blur-xl border-l border-white/20 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl text-white">{translation.settings}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="size-6 text-white" />
                </button>
              </div>

              {/* Language Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="size-5 text-white/60" />
                  <h3 className="text-lg text-white">{translation.language}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLanguage('en')}
                    className={`p-4 rounded-xl border transition-all ${
                      language === 'en'
                        ? 'bg-white/20 border-white/40 text-white'
                        : 'bg-white/5 border-white/10 text-white/60'
                    }`}
                  >
                    English
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLanguage('es')}
                    className={`p-4 rounded-xl border transition-all ${
                      language === 'es'
                        ? 'bg-white/20 border-white/40 text-white'
                        : 'bg-white/5 border-white/10 text-white/60'
                    }`}
                  >
                    Español
                  </motion.button>
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  {isDark ? (
                    <Moon className="size-5 text-white/60" />
                  ) : (
                    <Sun className="size-5 text-white/60" />
                  )}
                  <h3 className="text-lg text-white">{translation.theme}</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleDark}
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-between"
                >
                  <span>{isDark ? translation.darkMode : translation.lightMode}</span>
                  <motion.div
                    animate={{ rotate: isDark ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDark ? (
                      <Moon className="size-5" />
                    ) : (
                      <Sun className="size-5" />
                    )}
                  </motion.div>
                </motion.button>
              </div>

              {/* Color Scheme Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="size-5 text-white/60" />
                  <h3 className="text-lg text-white">{translation.colorScheme}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {colorSchemes.map((scheme) => (
                    <motion.button
                      key={scheme.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setColorScheme(scheme.id)}
                      className={`p-4 rounded-xl border transition-all ${
                        colorScheme === scheme.id
                          ? 'bg-white/20 border-white/40 text-white'
                          : 'bg-white/5 border-white/10 text-white/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-4 rounded-full ${
                            scheme.id === 'default'
                              ? 'bg-blue-500'
                              : scheme.id === 'ocean'
                              ? 'bg-cyan-500'
                              : scheme.id === 'sunset'
                              ? 'bg-orange-500'
                              : scheme.id === 'forest'
                              ? 'bg-green-500'
                              : 'bg-purple-500'
                          }`}
                        />
                        <span>{scheme.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
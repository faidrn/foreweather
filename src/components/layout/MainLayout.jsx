import React, { useState, useEffect } from 'react'; 
import { SearchBar } from '../SearchBar/SearchBar';
import { useTheme } from '../../context/ThemeContext';
import SettingsButton from '../Settings/SettingsButton';
import SettingsPanel from '../Settings/SettingsPanel';
import { motion } from 'framer-motion';


const MainLayout = () => {
    const { theme } = useTheme(); // Obtener el tema actual
    const [settingsOpen, setSettingsOpen] = useState(false);

    return (
        <div className="min-h-screen w-full transition-colors duration-500 flex justify-center" 
         style={{ 
           background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)'
         }}>
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center"
            >
             <SearchBar onLocationSelect={(location) => console.log('Ubicación seleccionada:', location)} />
            </motion.div>
            
            <SettingsButton onClick={() => setSettingsOpen(true)} />
            {/* Settings Panel */}
            <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
         </div>
        
    );
}

export default MainLayout;
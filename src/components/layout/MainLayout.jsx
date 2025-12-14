import React, { useState, useEffect } from 'react'; 
import { SearchBar } from '../SearchBar/SearchBar';
import { useTheme } from '../../context/ThemeContext';


const MainLayout = () => {
    const { theme } = useTheme(); // Obtener el tema actual

    return (
        <div className="min-h-screen w-full transition-colors duration-500 flex justify-center" 
         style={{ 
           background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)'
         }}>
            <SearchBar onLocationSelect={(location) => console.log('Ubicación seleccionada:', location)} />
         </div>
        
    );
}

export default MainLayout;
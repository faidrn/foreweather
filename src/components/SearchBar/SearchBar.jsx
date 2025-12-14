import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from "../../hooks/useTranslations";
import { searchLocations } from '../../utils/weatherApi';


export function SearchBar({ onLocationSelect }) {
   const translation = useTranslations();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]); 
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null); 

  // 🔒 Previene error si el JSON aún no se ha cargado
    //if (!translation.searchBar) return <p>Loading...</p>;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Implementación del Debounce para la búsqueda
    const delayDebounce = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        const locations = await searchLocations(query);
        setResults(locations);
        setIsLoading(false);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);


  const handleSelectLocation = (location) => {
    onLocationSelect(location);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={translation.search}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-2xl z-50"
          >
            {results.map((location, index) => (
              <motion.button
                // Se utiliza una clave compuesta única
                key={`${location.latitude}-${location.longitude}`} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelectLocation(location)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left text-white border-b border-white/10 last:border-b-0"
              >
                <MapPin className="size-4 text-white/60" />
                <div>
                  <div className="font-medium">{location.name}</div>
                  <div className="text-sm text-white/60">
                    {location.admin1 && `${location.admin1}, `}{location.country}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="absolute top-full mt-2 w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4 text-center text-white/60">
          {translation.loading}
        </div>
      )}
    </div>
  );
}
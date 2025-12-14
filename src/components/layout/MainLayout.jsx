import React, { useState, useEffect } from 'react'; 
import { SearchBar } from '../SearchBar/SearchBar';
import { useTheme } from '../../context/ThemeContext';
import SettingsButton from '../Settings/SettingsButton';
import SettingsPanel from '../Settings/SettingsPanel';
import { motion } from 'framer-motion';
import { useWeatherForecast } from '../../hooks/useWeatherForecast';
import LoadingState from '../LoadingState/LoadingState';
import ErrorState from '../ErrorState/ErrorState';
import { fetchWeatherData } from '../../utils/weatherApi';


const MainLayout = () => {
    const { theme } = useTheme(); // Obtener el tema actual
    const [settingsOpen, setSettingsOpen] = useState(false);

    const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    // Estado para la ubicación seleccionada (Ejemplo por defecto: Madrid)
  /*const [location, setLocation] = useState({
    name: 'Madrid',
    latitude: 40.4168,
    longitude: -3.7038
  });*/

  // Load default location (New York) on mount
  useEffect(() => {
    handleLocationSelect({
      name: 'New York',
      country: 'United States',
      latitude: 40.7128,
      longitude: -74.006,
    });
  }, []);

  // 1. LLAMADA AL CUSTOM HOOK
  // Le pasamos las coordenadas y el nombre. El hook nos devuelve todo lo que necesitamos.
  /*const { weatherData, loading, error, refetch } = useWeatherForecast(
    location.latitude,
    location.longitude,
    location.name
  );*/
  
  // Función para manejar cuando el usuario busca una nueva ciudad
  /*{const handleLocationSelect = (newLocation) => {
    setLocation(newLocation);
  };*/

  const handleLocationSelect = async (location) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(
        location.latitude,
        location.longitude,
        `${location.name}, ${location.country}`
      );
      
      setCurrentWeather(data.current);
      setForecast(data.forecast);
    } catch (err) {
      setError('Failed to load weather data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

    return (
        <div className="min-h-screen w-full transition-colors duration-500" 
         style={{ 
           background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)'
         }}>
            {/* Settings Button */}
            <SettingsButton className="size-6 text-white" />

            {/* Main Content */}
            <div className="container mx-auto px-4 pt-20 md:pt-8 pb-8 flex flex-col items-center gap-8 min-h-screen justify-start md:justify-center">
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full flex justify-center"
              >
              <SearchBar onLocationSelect={(location) => console.log('Ubicación seleccionada:', location)} />
              </motion.div>

              {/* Loading State */}
              {isLoading && (
                // Muestra el Loading mientras se cargan los datos
                <LoadingState />
              )}

              {/* Error State */}
              {error && !isLoading && (
                <ErrorState errorKey="errors.generic" />
              )}

              {/* Weather Display */}
              {currentWeather && !isLoading && !error && (
                <motion.div
                  key={currentWeather.location}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center gap-8"
                >
                  {/*<WeatherCard weather={currentWeather} />
                  {forecast.length > 0 && <ForecastCard forecast={forecast} />}*/}
                </motion.div>
              )}
            </div>
            
            {/* Settings Panel */}
            <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
        
    );
}

export default MainLayout;
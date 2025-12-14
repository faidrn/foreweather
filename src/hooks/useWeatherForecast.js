import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData } from "../utils/weatherApi"; // Asegúrate que la ruta sea correcta

export function useWeatherForecast(latitude, longitude, locationName) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorKey, setErrorKey] = useState(null);

  // Usamos useCallback para que la función no se recree en cada render
  // y podamos devolverla para usarla en el botón de "Reintentar"
  const fetchData = useCallback(async () => {
    // Si no hay coordenadas, no hacemos nada (o podrías poner un estado de espera)
    if (!latitude || !longitude) return;

    setLoading(true);
    setErrorKey(null);

    try {
      const data = await fetchWeatherData(latitude, longitude, locationName);
      setWeatherData(data);
    } catch (err) {
      // Guardamos el mensaje de error
      // LÓGICA DE MAPEO DE ERRORES
      // Aquí decidimos qué clave guardar según el error
      if (err.message.includes('Failed to fetch')) {
         setErrorKey('errors.network');
      } else if (err.message.includes('404')) {
         setErrorKey('errors.location_not_found');
      } else {
         setErrorKey('errors.generic'); // Fallback
      }
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude, locationName]);

  // Ejecutar el fetch cuando cambian las coordenadas
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { weatherData, loading, errorKey, refetch: fetchData };
}
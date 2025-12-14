import React from 'react';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  CloudDrizzle
} from 'lucide-react';


// Mapeo de código de clima a condición de texto
export function getWeatherCondition(code) { 
  if (code === 0) return 'clearSky';
  if (code === 1) return 'mainlyClear';
  if (code === 2) return 'partlyCloudy';
  if (code === 3) return 'overcast';
  if (code >= 45 && code <= 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'rain';
  if (code >= 85 && code <= 86) return 'snow';
  if (code >= 95 && code <= 99) return 'thunderstorm';
  return 'clearSky';
}

/**
 * Mapea los códigos de clima WMO a un componente de icono de Lucide React.
 * @param {number} code - Código de clima WMO.
 * @returns {React.Component} Componente de icono de Lucide-React.
 */
export function getWeatherIconComponent(code) { 
  if (code === 0) return Sun; // Cielo despejado
  // Mayormente despejado, Parcialmente nublado
  if (code === 1 || code === 2) return CloudSun; 
  if (code === 3) return Cloud; // Nublado
  if (code >= 45 && code <= 48) return CloudFog; // Niebla
  if (code >= 51 && code <= 57) return CloudDrizzle; // Llovizna
  // Lluvia (moderada a fuerte) y Chubascos (lluvia/granizo)
  if (code >= 61 && code <= 67 || code >= 80 && code <= 82) return CloudRain;
  // Nieve
  if (code >= 71 && code <= 77 || code >= 85 && code <= 86) return CloudSnow;
  // Tormenta
  if (code >= 95 && code <= 99) return CloudLightning;
  return Sun; // Por defecto
}

// Mapeo de código de clima a ícono de emoji
export function getWeatherIcon(code) { 
  if (code === 0) return '☀️';
  if (code === 1) return '🌤️';
  if (code === 2) return '⛅';
  if (code === 3) return '☁️';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 57) return '🌦️';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '☀️';
}

// Búsqueda de ubicaciones 
export async function searchLocations(query) { 
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
    );
    
    if (!response.ok) throw new Error('Failed to fetch locations');
    
    const data = await response.json();
    
    if (!data.results) return [];
    
    return data.results.map((result) => ({
      name: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
      admin1: result.admin1,
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}

// Obtención de datos del clima
export async function fetchWeatherData( 
  latitude,
  longitude,
  locationName
) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=auto&forecast_days=7`
    );
    
    if (!response.ok) throw new Error('Failed to fetch weather data');
    
    const data = await response.json();
    
    const current = { 
      location: locationName,
      latitude,
      longitude,
      temperature: Math.round(data.current.temperature_2m),
      feelsLike: Math.round(data.current.apparent_temperature),
      weatherCode: data.current.weather_code,
      humidity: data.current.relative_humidity_2m,
      windSpeed: Math.round(data.current.wind_speed_10m),
      pressure: Math.round(data.current.surface_pressure),
      visibility: 10, 
      uvIndex: Math.round(data.current.uv_index),
      sunrise: data.daily.sunrise[0],
      sunset: data.daily.sunset[0],
    };
    
    const forecast = data.daily.time.map((date, index) => { 
      const dateObj = new Date(date);
      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      
      return {
        date,
        dayName: dayNames[dateObj.getDay()],
        tempMax: Math.round(data.daily.temperature_2m_max[index]),
        tempMin: Math.round(data.daily.temperature_2m_min[index]),
        weatherCode: data.daily.weather_code[index],
        precipitationProbability: data.daily.precipitation_probability_max[index] || 0,
      };
    });
    
    return { current, forecast };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
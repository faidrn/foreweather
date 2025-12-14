import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from "../../hooks/useTranslations";
import { getWeatherIcon } from '../../utils/weatherApi';


export function ForecastCard({ forecast }) {
  const translation = useTranslations();

  // AÑADIR VERIFICACIÓN DE ROBUSTEZ: Si no hay pronóstico, no renderiza.
  if (!forecast || !Array.isArray(forecast) || forecast.length === 0 || !translation.days) {
    return null; 
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-4xl"
    >
      <h3 className="text-2xl mb-4 text-white">
        {translation.forecast}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {forecast.map((day, index) => {
          const icon = getWeatherIcon(day.weatherCode);
          
          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center"
            >
              <div className="text-sm text-white/80 mb-2">
                {translation.days[day.dayName]}
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                className="text-5xl mb-2"
              >
                {icon}
              </motion.div>
              <div className="text-lg text-white mb-1">
                {day.tempMax}°
              </div>
              <div className="text-sm text-white/60">
                {day.tempMin}°
              </div>
              {day.precipitationProbability > 0 && (
                <div className="text-xs text-blue-300 mt-2">
                  💧 {day.precipitationProbability}%
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

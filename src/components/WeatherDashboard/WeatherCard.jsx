import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Gauge, Eye, Sun as SunIcon, Moon } from 'lucide-react';
import { useTranslations } from "../../hooks/useTranslations";
import { getWeatherCondition, getWeatherIcon } from '../../utils/weatherApi';


export function WeatherCard({ weather }) {
  const translation = useTranslations();

  const weatherCondition = getWeatherCondition(weather.weatherCode);
  const weatherIcon = getWeatherIcon(weather.weatherCode);

  const stats = [
    {
      icon: Droplets,
      label: translation.humidity,
      value: `${weather.humidity}%`,
    },
    {
      icon: Wind,
      label: translation.windSpeed,
      value: `${weather.windSpeed} km/h`,
    },
    {
      icon: Gauge,
      label: translation.pressure,
      value: `${weather.pressure} hPa`,
    },
    {
      icon: Eye,
      label: translation.visibility,
      value: `${weather.visibility} km`,
    },
  ];

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-2xl">
        {/* Location */}
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl mb-6 text-white text-center"
        >
          {weather.location}
        </motion.h2>

        {/* Main Weather Display */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="text-9xl"
          >
            {weatherIcon}
          </motion.div>

          <div className="text-center md:text-left">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-7xl mb-2 text-white"
            >
              {weather.temperature}°
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white/80 mb-1"
            >
              {translation.weatherCondition}
            </motion.div>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-white/60"
            >
              {translation.feelsLike} {weather.feelsLike}°
            </motion.div>
          </div>
        </div>

        {/* Weather Stats Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10"
            >
              <stat.icon className="size-5 text-white/60 mb-2" />
              <div className="text-sm text-white/60 mb-1">{stat.label}</div>
              <div className="text-xl text-white">{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sun Times */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 flex items-center gap-3">
            <SunIcon className="size-6 text-yellow-300" />
            <div>
              <div className="text-sm text-white/60">{translation.sunrise}</div>
              <div className="text-lg text-white">{formatTime(weather.sunrise)}</div>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 flex items-center gap-3">
            <Moon className="size-6 text-blue-300" />
            <div>
              <div className="text-sm text-white/60">{translation.sunset}</div>
              <div className="text-lg text-white">{formatTime(weather.sunset)}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

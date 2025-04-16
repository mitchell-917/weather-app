import React, { useEffect, useState } from 'react';
import './weather.css';
import Search from './search';
import Humidity from './humidity';
import Wind from './wind';
import CurrentWeather from './currentWeather';

export const Weather = () => {
  const [temperature, setTemperature] = useState(20);
  const [city, setCity] = useState('London');
  const [currentWeather, setCurrentWeatherIcon] = useState('03d');

  const search = async (city) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const data = await response.json();

      const tempInCelsius = data.main.temp - 273.15;
      setTemperature(tempInCelsius.toFixed(1));
      setCity(data.name);
      setCurrentWeatherIcon(data.weather[0].icon);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  return (
    <div className='weather'>
      <div className='weather-container'>
        <Search onSearch={search} />
        <CurrentWeather city={city} temperature={temperature} currentWeather={currentWeather} weatherIcon={currentWeather} />
        <div className='weather-data'>
          <div className='col'>
            <Humidity />
          </div>
          <div className='col'>
            <Wind />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

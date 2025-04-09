import React from 'react';
import './weather.css';
import Search from './search';
import Humidity from './humidity';
import Wind from './wind';
import CurrentWeather from './currentWeather';
import { useEffect } from 'react';

export const Weather = () => {
  const WeatherData = 20;

  const search = async (city) => {
    try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const city = 'London'
      await search(city);
    };
    fetchWeather();
  }, []);

  return (
    <div className='weather'>
      <div className='weather-container'>
        <Search />
        <CurrentWeather temperature={WeatherData || 20}/>
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
}

export default Weather;

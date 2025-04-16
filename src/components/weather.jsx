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
  const [currentWindSpeed, setCurrentWindSpeed] = useState('10');
  const [currentHumidity, setCurrentHumidity] = useState('20');

  const search = async (city) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const data = await response.json();

      const tempInCelsius = data.main.temp - 273.15;
      setTemperature(tempInCelsius.toFixed(1));
      setCity(data.name);
      setCurrentWeatherIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      setCurrentWindSpeed(data.wind.speed);
      setCurrentHumidity(data.main.humidity);

      console.log(data);
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
        <CurrentWeather city={city} temperature={temperature} weatherIcon={currentWeather} />
        <div className='weather-data'>
          <div className='col'>
            <Humidity humidity={currentHumidity} />
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

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
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    updateWeatherData(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

const updateWeatherData = (data) => {
  const tempInCelsius = (data.main.temp - 273.15).toFixed(1);
  setTemperature(tempInCelsius);
  setCity(data.name);
  setCurrentWeatherIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  setCurrentWindSpeed(data.wind.speed);
  setCurrentHumidity(data.main.humidity);
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
            <Humidity currentHumidity={currentHumidity} />
          </div>
          <div className='col'>
            <Wind currentWindSpeed={currentWindSpeed}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

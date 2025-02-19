import React from 'react';
import './weather.css';
import Search from './search';
import City from './city';
import Temperature from './temperature';


const weatherIcons = {
  Clear: '/assets/clear.png',
  Cloudy: '/assets/cloud.png',
  Rainy: '/assets/rain.png',
  Snowy: '/assets/snow.png',
  Default: '/assets/clear.png'
};

const getWeatherIcon = (currentWeather) => weatherIcons[currentWeather] || weatherIcons.Default;

export const Weather = ({ currentWeather }) => {
  return (
    <div className='weather'>
      <div className='weather-container'>
        <Search />
        <img src={getWeatherIcon(currentWeather)} alt='weather icon' data-testid="current-weather"/>
        <City />
        <div className='weather-data'>
          <div className='col'>
            <div>
              <img src={'/assets/humidity.png'} alt='humidity icon' data-testid="current-humidity"/>
              <p>Humidity</p>
              <p>20%</p>
            </div>
          </div>
          <div className='col'>
            <div>
              <img src={'/assets/wind.png'} alt='wind icon' data-testid="current-wind"/>
              <p>Wind Speed</p>
              <p>50 kmh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

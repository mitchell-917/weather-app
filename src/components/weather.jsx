import React from 'react';
import './weather.css';
import Search from './search';
import Humidity from './humidity';
import Wind from './wind';
import CurrentWeather from './currentWeather';

export const Weather = () => {
  return (
    <div className='weather'>
      <div className='weather-container'>
        <Search />
        <CurrentWeather />
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

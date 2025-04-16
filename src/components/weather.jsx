import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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
  const [backgroundColor, setBackgroundColor] = useState('#009ef3');
  const [coordinates, setCoordinates] = useState([51.5074, -0.1278]);

  const search = async (cityOrCoords) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    let apiUrl;

    if (typeof cityOrCoords === 'string') {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrCoords}&appid=${apiKey}`;
    } else {
      const [lat, lon] = cityOrCoords;
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      updateWeatherData(data);
      updateBackgroundColor(data);
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
    setCoordinates([data.coord.lat, data.coord.lon]);
  };

  const updateBackgroundColor = (data) => {
    const utcTime = data.dt;
    const timezoneOffset = data.timezone;
    const localTime = new Date((utcTime + timezoneOffset) * 1000);
    const hours = localTime.getHours();

    if (hours >= 6 && hours < 12) {
      setBackgroundColor('#FFD700');
    } else if (hours >= 12 && hours < 18) {
      setBackgroundColor('#009EF3');
    } else if (hours >= 18 && hours < 21) {
      setBackgroundColor('#FF8C00');
    } else {
      setBackgroundColor('#2C3E50');
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        search([lat, lng]);
      },
    });
    return null;
  };

  useEffect(() => {
    search(city);
  }, []);

  return (
    <div className='weather-app' style={{ backgroundColor }} role="main">
      <div className='weather'>
        <div className='weather-container'>
          <Search onSearch={search} />
          <CurrentWeather city={city} temperature={temperature} weatherIcon={currentWeather} />
          <div className='weather-data'>
            <div className='col'>
              <Humidity currentHumidity={currentHumidity} />
            </div>
            <div className='col'>
              <Wind currentWindSpeed={currentWindSpeed} />
            </div>
          </div>
          <div className='map-container'>
              <MapContainer
                center={coordinates}
                zoom={5}
                style={{ height: '200px', width: '100%' }}
              >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={coordinates} data-testid={"marker"} />
              <MapClickHandler />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

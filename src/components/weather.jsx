import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './weather.css';
import Search from './search';
import Humidity from './humidity';
import Wind from './wind';
import CurrentWeather from './currentWeather';

export const localTimeHour = (utcTime, timezoneOffset) => {
  const LocalTime = new Date((utcTime + timezoneOffset) * 1000);

  return LocalTime.getHours();
}

export const Weather = () => {
  const [temperature, setTemperature] = useState(20);
  const [city, setCity] = useState('London');
  const [currentWeather, setCurrentWeatherIcon] = useState('03d');
  const [currentWindSpeed, setCurrentWindSpeed] = useState('10');
  const [currentHumidity, setCurrentHumidity] = useState('20');
  const [backgroundColor, setBackgroundColor] = useState('#009ef3');
  const [coordinates, setCoordinates] = useState([51.5074, -0.1278]);

  const search = async (cityOrCoords) => {
    try {
      const response = await fetch(weatherUrlFor(cityOrCoords));
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const weatherReport = await response.json();
      displayCurrentWeather(weatherReport);
      displayTimeOfDay(weatherReport);

      const currentCoordinates = weatherReport.coord;
      setCoordinates([currentCoordinates.lat, currentCoordinates.lon]);

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const weatherUrlFor = (cityOrCoords) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    let apiUrl;

    if (typeof cityOrCoords === 'string') {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrCoords}&appid=${apiKey}`;
    } else {
      const [lat, lon] = cityOrCoords;
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    }

    return apiUrl;
  };

  const displayCurrentWeather = (weatherReportForLocation) => {
    const tempInCelsius = (weatherReportForLocation.main.temp - 273.15).toFixed(1);
    setTemperature(tempInCelsius);
    setCity(weatherReportForLocation.name);
    setCurrentWeatherIcon(`https://openweathermap.org/img/wn/${weatherReportForLocation.weather[0].icon}@2x.png`);
    setCurrentWindSpeed(weatherReportForLocation.wind.speed);
    setCurrentHumidity(weatherReportForLocation.main.humidity);
    setCoordinates([weatherReportForLocation.coord.lat, weatherReportForLocation.coord.lon]);
  };

  const isMorning = (hours) => hours >= 6 && hours < 12;
  const isAfternoon = (hours) => hours >= 12 && hours < 18;
  const isEvening = (hours) => hours >= 18 && hours < 21;
  const isNight = (hours) => !isMorning(hours) && !isAfternoon(hours) && !isEvening(hours);

  const displayTimeOfDay = (weatherReportForLocation) => {
    const hours = localTimeHour(weatherReportForLocation.dt, weatherReportForLocation.timezone);
    updateBackgroundColor(hours);
  };

  const updateBackgroundColor = (hours) => {
    if (isMorning(hours)) {
      setBackgroundColor('#FFD700');
    } else if (isAfternoon(hours)) {
      setBackgroundColor('#009EF3');
    } else if (isEvening(hours)) {
      setBackgroundColor('#FF8C00');
    } else if (isNight(hours)) {
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

  const MapUpdater = ({ coordinates }) => {
    const map = useMap();

    useEffect(() => {
      map.setView(coordinates, map.getZoom());
    }, [coordinates, map]);

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
              <Marker position={coordinates} />
              <MapClickHandler />
              <MapUpdater coordinates={coordinates} />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

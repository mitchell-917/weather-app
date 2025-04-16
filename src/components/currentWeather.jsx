import Temperature from './temperature';

const weatherIcons = {
  Clear: '/assets/clear.png',
  Cloudy: '/assets/cloud.png',
  Rainy: '/assets/rain.png',
  Snowy: '/assets/snow.png',
  Default: '/assets/clear.png'
};

const getWeatherIcon = (currentWeather) => weatherIcons[currentWeather] || weatherIcons.Default;


export const CurrentWeather = ({ city, currentWeather, temperature, weatherIcon }) => {
  return (
    <div className="current-weather">
      <img className="weather-icon" src={getWeatherIcon(currentWeather)} alt='weather icon' data-testid="current-weather"/>
      <img className="weather-icon" src={weatherIcon} alt='weather icon' data-testid="current-weather-icon"/>
      <div className="city">{city}</div>
      <Temperature className="temperature" temperature={temperature} />
    </div>
  );
};

export default CurrentWeather;

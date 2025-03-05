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

export const CurrentWeather = ({ currentWeather }) => {
  return (
    <div className="current-weather">
      <img className="weather-icon" src={getWeatherIcon(currentWeather)} alt='weather icon' data-testid="current-weather"/>
      <City className="city" />
      <Temperature className="temperature" />
    </div>
  );
}

export default CurrentWeather;

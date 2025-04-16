import Temperature from './temperature';
import City from './city';

export const CurrentWeather = ({ city, temperature, weatherIcon }) => {
  return (
    <div className="current-weather">
      <img className="weather-icon" src={weatherIcon} alt='weather icon' data-testid="current-weather-icon"/>
      <City className="city" city={city} />
      <Temperature className="temperature" temperature={temperature} />
    </div>
  );
};

export default CurrentWeather;

import Temperature from './temperature';

export const CurrentWeather = ({ city, temperature, weatherIcon }) => {
  return (
    <div className="current-weather">
      <img className="weather-icon" src={weatherIcon} alt='weather icon' data-testid="current-weather-icon"/>
      <div className="city">{city}</div>
      <Temperature className="temperature" temperature={temperature} />
    </div>
  );
};

export default CurrentWeather;

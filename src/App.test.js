import { render, screen } from '@testing-library/react';
import App from './App';
import Weather from './components/weather.jsx';

test('renders weather app UI elements', () => {
  render(<App/>);

  const cityElement = screen.getByText('London');
  expect(cityElement).toBeInTheDocument();

  const temperatureElement = screen.getByText('20°C');
  expect(temperatureElement).toBeInTheDocument();

  const humidityElement = screen.getByText('Humidity');
  expect(humidityElement).toBeInTheDocument();

  const windSpeedElement = screen.getByText('Wind Speed');
  expect(windSpeedElement).toBeInTheDocument();

  const humidityElementValue = screen.getByText('20%');
  expect(humidityElementValue).toBeInTheDocument();

  const windSpeedElementValue = screen.getByText('50 kmh');
  expect(windSpeedElementValue).toBeInTheDocument();

  const currentWeatherElement = screen.getByTestId('current-weather');
  expect(currentWeatherElement).toBeInTheDocument();
});

it('renders sunny weather image', () => {
  const currentWeather = "Clear";
  render(<Weather weather={currentWeather}/>);

  const currentWeatherImage = screen.getByTestId('current-weather');
  expect(currentWeatherImage).toBeInTheDocument();
  expect(currentWeatherImage.getAttribute('src')).toBe('/assets/clear.png');
});

xit('renders cloudy weather image', () => {
  const currentWeather = "Cloudy";
  render(<Weather weather={currentWeather}/>);

  const currentWeatherImage = screen.getByTestId('current-weather');
  expect(currentWeatherImage).toBeInTheDocument();
  expect(currentWeatherImage.getAttribute('src')).toBe('/assets/cloud.png');
});

it('renders rainy weather image', () => {
  const currentWeather = "Rainy";
  render(<Weather weather={currentWeather}/>);

  const currentWeatherImage = screen.getByTestId('current-weather');
  expect(currentWeatherImage).toBeInTheDocument();
  expect(currentWeatherImage.getAttribute('src')).toBe('/assets/rain.png');
});
xit('renders snowy weather image', () => {});

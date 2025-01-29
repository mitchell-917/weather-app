import { render, screen } from '@testing-library/react';
import App from './App';

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
  render(<App/>);

  const currentWeatherImage = screen.getByTestId('current-weather');
  expect(currentWeatherImage).toBeInTheDocument();
  expect(currentWeatherImage).toHaveAttribute('src', '/assets/clear.png');
});

xit('renders cloudy weather image', () => {});
xit('renders rainy weather image', () => {});
xit('renders snowy weather image', () => {});

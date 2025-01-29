import { render, screen } from '@testing-library/react';
import App from './App';
import Weather from './components/weather.jsx';

describe('Weather App', () => {
  test('renders weather app UI elements', () => {
    render(<App />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getByText('50 kmh')).toBeInTheDocument();
    expect(screen.getByTestId('current-weather')).toBeInTheDocument();
  });

  const weatherTestCases = [
    { weather: 'Clear', expectedSrc: '/assets/clear.png' },
    { weather: 'Cloudy', expectedSrc: '/assets/cloud.png' },
    { weather: 'Rainy', expectedSrc: '/assets/rain.png' },
    { weather: 'Snowy', expectedSrc: '/assets/snow.png' },
  ];

  weatherTestCases.forEach(({ weather, expectedSrc }) => {
    test(`renders ${weather.toLowerCase()} weather image`, () => {
      render(<Weather weather={weather} />);

      const currentWeatherImage = screen.getByTestId('current-weather');
      expect(currentWeatherImage).toBeInTheDocument();
      expect(currentWeatherImage.getAttribute('src')).toBe(expectedSrc);
    });
  });
});


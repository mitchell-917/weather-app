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
    { currentWeather: 'Clear', expectedSrc: '/assets/clear.png' },
    { currentWeather: 'Cloudy', expectedSrc: '/assets/cloud.png' },
    { currentWeather: 'Rainy', expectedSrc: '/assets/rain.png' },
    { currentWeather: 'Snowy', expectedSrc: '/assets/snow.png' },
  ];

  weatherTestCases.forEach(({ currentWeather, expectedSrc }) => {
    test(`renders ${currentWeather.toLowerCase()} weather image`, () => {
      render(<Weather currentWeather={currentWeather} />);

      const currentWeatherImage = screen.getByTestId('current-weather');
      expect(currentWeatherImage).toBeInTheDocument();
      expect(currentWeatherImage.getAttribute('src')).toBe(expectedSrc);
    });
  });
});


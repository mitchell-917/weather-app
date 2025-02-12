import { render, screen } from '@testing-library/react';
import App from './App';
import Weather from './components/weather.jsx';

describe('Weather App', () => {
  test('renders weather app UI elements', () => {
    render(<App />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
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

  test('it displays the humidity icon', () => {
    render(<Weather />);

    const humidityImage = screen.getByTestId('current-humidity');
    expect(humidityImage).toBeInTheDocument();
    expect(humidityImage.getAttribute('src')).toBe('/assets/humidity.png');
  });

  test('it displays the wind information', () => {
    render(<Weather />);

    const windImage = screen.getByTestId('current-wind');
    expect(windImage).toBeInTheDocument();
    expect(windImage.getAttribute('src')).toBe('/assets/wind.png');
    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(screen.getByText('50 kmh')).toBeInTheDocument();
  });
});


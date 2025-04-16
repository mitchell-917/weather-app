import { render, screen } from '@testing-library/react';
import Weather from './components/weather.jsx';
import CurrentWeather from './components/currentWeather.jsx';

describe('Weather App', () => {
  test('it displays the weather image forecast for a given city', () => {
    render(<Weather />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('20°')).toBeInTheDocument();
    expect(screen.getByTestId('current-weather-icon')).toBeInTheDocument();
  });

  const weatherIcon = [
    "https://openweathermap.org/img/wn/03d@2x.png",
  ];

  weatherIcon.forEach((icon) => {
    test("it displays the weather icons correctly for a given city", () => {
      render(<CurrentWeather weatherIcon={icon} />);

      const currentWeatherImage = screen.getByTestId('current-weather-icon');
      expect(currentWeatherImage).toBeInTheDocument();
      expect(currentWeatherImage.getAttribute('src')).toBe(icon);
    });
  });

  test('it displays the humidity information', () => {
    render(<Weather />);

    const humidityImage = screen.getByTestId('current-humidity');
    expect(humidityImage).toBeInTheDocument();
    expect(humidityImage.getAttribute('src')).toBe('/assets/humidity.png');
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  test('it displays the wind information', () => {
    render(<Weather />);

    const windImage = screen.getByTestId('current-wind');
    expect(windImage).toBeInTheDocument();
    expect(windImage.getAttribute('src')).toBe('/assets/wind.png');
    expect(screen.getByText('Wind')).toBeInTheDocument();
    expect(screen.getByText('10 km/h')).toBeInTheDocument();
  });
});


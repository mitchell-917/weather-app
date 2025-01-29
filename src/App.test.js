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

  it('renders snowy weather image', () => {
    const currentWeather = "Snowy";
    render(<Weather weather={currentWeather}/>);

    const currentWeatherImage = screen.getByTestId('current-weather');
    expect(currentWeatherImage).toBeInTheDocument();
    expect(currentWeatherImage.getAttribute('src')).toBe('/assets/snow.png');
  });
});


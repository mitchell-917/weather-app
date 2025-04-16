import { render, screen, fireEvent } from '@testing-library/react';
import Weather from './components/weather.jsx';
import CurrentWeather from './components/currentWeather.jsx';
import Search from './components/search.jsx';

describe('Weather App', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Displaying Weather Information', () => {
    test('it displays the weather forecast for a given city', () => {
      render(<Weather />);

      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('20°')).toBeInTheDocument();
      expect(screen.getByTestId('current-weather-icon')).toBeInTheDocument();
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

  describe('Displaying Weather Icons', () => {
    const weatherIcon = [
      "https://openweathermap.org/img/wn/03d@2x.png",
    ];

    weatherIcon.forEach((icon) => {
      test('it displays the weather icons correctly for a given city', () => {
        render(<CurrentWeather weatherIcon={icon} />);

        const currentWeatherImage = screen.getByTestId('current-weather-icon');
        expect(currentWeatherImage).toBeInTheDocument();
        expect(currentWeatherImage.getAttribute('src')).toBe(icon);
      });
    });
  });

  // Section: Accessibility
  describe('Accessibility', () => {
    test('renders accessible elements', () => {
      render(<Weather />);
      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Enter city name');
    });
  });

  describe('Fetching Weather Data', () => {
    test('fetches and displays weather data successfully', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          main: { temp: 293.15, humidity: 50 },
          name: 'Paris',
          weather: [{ icon: '01d' }],
          wind: { speed: 5 },
        }),
      });

      render(<Weather />);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.openweathermap.org/data/2.5/weather')
      );

      expect(await screen.findByText('Paris')).toBeInTheDocument();
      expect(await screen.findByText('20.0°')).toBeInTheDocument();
    });

    test('updates state with new weather data', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          main: { temp: 300.15, humidity: 60 },
          name: 'Tokyo',
          weather: [{ icon: '02d' }],
          wind: { speed: 8 },
        }),
      });

      render(<Weather />);
      expect(await screen.findByText('Tokyo')).toBeInTheDocument();
      expect(await screen.findByText('27.0°')).toBeInTheDocument();
      expect(await screen.findByText('60%')).toBeInTheDocument();
      expect(await screen.findByText('8 km/h')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    test('calls onSearch with the correct city name', () => {
      const mockOnSearch = jest.fn();
      render(<Search onSearch={mockOnSearch} />);

      const input = screen.getByPlaceholderText('Enter city name');
      fireEvent.change(input, { target: { value: 'Berlin' } });

      const button = screen.getByText('Search');
      fireEvent.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith('Berlin');
    });

    test('does not call onSearch with empty input', () => {
      const mockOnSearch = jest.fn();
      render(<Search onSearch={mockOnSearch} />);

      const button = screen.getByText('Search');
      fireEvent.click(button);

      expect(mockOnSearch).not.toHaveBeenCalled();
    });
  });

  describe('Background Color Change', () => {
    test('it changes the background color based on the time of day', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          main: { temp: 293.15, humidity: 50 },
          name: 'Paris',
          weather: [{ icon: '01d' }],
          wind: { speed: 5 },
          dt: 1681656000,
          timezone: 3600,
        }),
      });

      render(<Weather />);

      const weatherApp = await screen.findByRole('main');
      expect(weatherApp).toHaveStyle('background-color: #009EF3');
    });
  });
});

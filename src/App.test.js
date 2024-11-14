import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather app UI elements', () => {
  render(<App/>);

  const cityElement = screen.getByRole('heading');
  expect(cityElement).toHaveTextContent('City Name');

  const temperatureElement = screen.getByText('15°C');
  expect(temperatureElement).toBeInTheDocument();

  const descriptionElement = screen.getByText('Cloudy');
  expect(descriptionElement).toBeInTheDocument();
});

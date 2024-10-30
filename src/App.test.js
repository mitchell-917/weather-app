import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('allows user to select city to check the weather', () => {
  render(<App />);
  const cityInput = screen.getByText('enter your location');
  expect(cityInput).toBeInTheDocument();
});

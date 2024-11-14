import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="weather-app">
      <div className="location">
        <h2>City Name</h2> {/* Placeholder for city name */}
      </div>
      <div className="temperature">
        <p>15°C</p> {/* Placeholder for temperature */}
      </div>
      <div className="description">
        <p>Cloudy</p> {/* Placeholder for weather description */}
      </div>
    </div>
  );
}

export default App;

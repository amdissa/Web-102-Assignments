import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import CityDetail from "./CityDetail";
import Sidebar from "./Sidebar";
import "./App.css";

// Register ChartJS components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WEATHERBIT_KEY = import.meta.env.VITE_WEATHERBIT_KEY;

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [filterCondition, setFilterCondition] = useState("All");
  const navigate = useNavigate();

  const fetchCityWeather = async (city) => {
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoRes.json();
      if (!geoData?.results?.length) return null;
      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${WEATHERBIT_KEY}`
      );
      const weatherJson = await weatherRes.json();
      if (!weatherJson?.data?.[0]) return null;

      const weather = weatherJson.data[0];
      return {
        city: name,
        country,
        condition: weather.weather.description,
        temp_c: weather.temp,
        humidity: weather.rh,
      };
    } catch (err) {
      console.error("Weather fetch error:", err);
      return null;
    }
  };

  useEffect(() => {
    const defaultCities = [
      "London",
      "Tokyo",
      "New York",
      "Paris",
      "Berlin",
      "Toronto",
      "Mexico City",
      "Chicago",
      "Istanbul",
      "Sydney",
    ];

    const loadDefaultCities = async () => {
      const results = await Promise.all(defaultCities.map(fetchCityWeather));
      setWeatherData(results.filter(Boolean));
    };
    loadDefaultCities();
  }, []);

  const handleSearch = async () => {
    if (!searchInput) return;
    const weather = await fetchCityWeather(searchInput);
    if (
      weather &&
      !weatherData.some((w) => w.city.toLowerCase() === weather.city.toLowerCase())
    ) {
      setWeatherData((prev) => [...prev, weather]);
    }
  };

  const filtered = weatherData
    .filter((w) => w.city.toLowerCase().includes(filterTerm.toLowerCase()))
    .filter((w) => filterCondition === "All" || w.condition === filterCondition);

  const avgTemp = (
    weatherData.reduce((acc, w) => acc + w.temp_c, 0) / weatherData.length || 0
  ).toFixed(2);
  const rainyCount = weatherData.filter((w) => w.condition.toLowerCase().includes("rain"))
    .length;
  const uniqueConditions = new Set(weatherData.map((w) => w.condition)).size;

return (
  <div className="app">
    <Sidebar />

    <div className="main-content">
      <Routes>
        <Route
          path="/"
          element={
            <div className="dashboard">
              <h1>Weather Dashboard</h1>

              <div className="summary">
                <div>Average Temp: {avgTemp}&#8451;</div>
                <div>Rainy Cities: {rainyCount}</div>
                <div>Unique Conditions: {uniqueConditions}</div>
              </div>

              <div className="filters">
                <input
                  type="text"
                  placeholder="Search city..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    setFilterTerm(e.target.value);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch}>Search</button>

                <select
                  value={filterCondition}
                  onChange={(e) => setFilterCondition(e.target.value)}
                >
                  <option value="All">All Conditions</option>
                  {Array.from(new Set(weatherData.map((w) => w.condition))).map((cond) => (
                    <option key={cond} value={cond}>
                      {cond}
                    </option>
                  ))}
                </select>
              </div>

              <ul className="weather-list">
                {filtered.map((w, i) => (
                  <li
                    key={i}
                    className="weather-item"
                    onClick={() => navigate(`/city/${w.city}`)}
                  >
                    <strong>
                      {w.city}, {w.country}
                    </strong>
                    <br />
                    {w.condition}, {w.temp_c}&#8451;
                  </li>
                ))}
              </ul>

              <div className="charts">
                <Line
                  data={{
                    labels: weatherData.map((w) => w.city),
                    datasets: [
                      {
                        label: "Temperature (°C)",
                        data: weatherData.map((w) => w.temp_c),
                        fill: false,
                        borderColor: "blue",
                      },
                    ],
                  }}
                />
              </div>
            </div>
          }
        />
        <Route path="/city/:city" element={<CityDetail weatherData={weatherData} />} />
      </Routes>
    </div>
  </div>
);

}

export default App;
import { useEffect, useState } from "react"
import "./App.css"

const WEATHERBIT_KEY = import.meta.env.VITE_WEATHERBIT_KEY

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [filterTerm, setFilterTerm] = useState("")
  const [filterCondition, setFilterCondition] = useState("All")

  // Fetch weather data by city using Weatherbit + Open-Meteo geocoding
  const fetchCityWeather = async (city) => {
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
      const geoData = await geoRes.json()

      if (!geoData || !geoData.results || geoData.results.length === 0) {
        console.warn("No coordinates found for", city)
        return null
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      const weatherRes = await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${WEATHERBIT_KEY}`
      )
      const weatherJson = await weatherRes.json()

      if (!weatherJson || !weatherJson.data || !weatherJson.data[0]) {
        console.warn("Invalid Weatherbit response:", weatherJson)
        return null
      }

      const weather = weatherJson.data[0]

      return {
        city: name,
        country,
        condition: weather.weather.description,
        temp_c: weather.temp,
        humidity: weather.rh
      }
    } catch (err) {
      console.error(`Failed to fetch weather for ${city}`, err)
      return null
    }
  }

  // Preload 10 cities on page load
  useEffect(() => {
    const defaultCities = ["London", "Tokyo", "New York", "Paris", "Berlin", "Toronto", "Mexico City", "Chicago", "Istanbul", "Sydney"]

    const loadDefaultCities = async () => {
      const results = await Promise.all(defaultCities.map(fetchCityWeather))
      setWeatherData(results.filter(Boolean))
    }

    loadDefaultCities()
  }, [])

  const handleSearch = async () => {
    if (!searchInput) return
    const weather = await fetchCityWeather(searchInput)
    if (
      weather &&
      !weatherData.some(w => w.city.toLowerCase() === weather.city.toLowerCase())
    ) {
      setWeatherData(prev => [...prev, weather])
    }
  }

  const filtered = weatherData
    .filter(w => w.city.toLowerCase().includes(filterTerm.toLowerCase()))
    .filter(w => filterCondition === "All" || w.condition === filterCondition)

  const avgTemp = (weatherData.reduce((acc, w) => acc + w.temp_c, 0) / weatherData.length || 0).toFixed(2)
  const rainyCount = weatherData.filter(w => w.condition.toLowerCase().includes("rain")).length
  const uniqueConditions = new Set(weatherData.map(w => w.condition)).size

  return (
    <div className="dashboard">
      <h1>Weather Dashboard</h1>

      {/* Summary Stats */}
      <div className="summary">
        <div>Average Temp: {avgTemp}°C</div>
        <div>Rainy Cities: {rainyCount}</div>
        <div>Unique Conditions: {uniqueConditions}</div>
      </div>

      {/* Search & Filter Controls */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search city..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value)
            setFilterTerm(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch()
          }}
        />
        <button onClick={handleSearch}>Search</button>

        <select value={filterCondition} onChange={(e) => setFilterCondition(e.target.value)}>
          <option value="All">All Conditions</option>
          {Array.from(new Set(weatherData.map(w => w.condition))).map(cond => (
            <option key={cond} value={cond}>{cond}</option>
          ))}
        </select>
      </div>

      {/* Weather List */}
      <ul className="weather-list">
        {filtered.map((w, index) => (
          <li key={index} className="weather-item">
            <strong>{w.city}, {w.country}</strong><br />
            Condition: {w.condition}<br />
            Temp: {w.temp_c}°C<br />
            Humidity: {w.humidity}%
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

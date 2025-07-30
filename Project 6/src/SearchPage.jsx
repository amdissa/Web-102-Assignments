import { useState } from "react";

function SearchPage({ weatherData, fetchCityWeather, setWeatherData }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  

  const handleSearch = async () => {
    if (!searchInput) return;
    const weather = await fetchCityWeather(searchInput);

    if (
      weather &&
      !weatherData.some((w) => w.city.toLowerCase() === weather.city.toLowerCase())
    ) {
      setWeatherData((prev) => [...prev, weather]);
    }

    setSearchResult(weather);
  };

  return (
    <div className="search-page">
      <h2>Search for a City</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>

      </div>

      {searchResult ? (
        <div className="weather-item">
          <h3>{searchResult.city}, {searchResult.country}</h3>
          <p>{searchResult.condition}, {searchResult.temp_c}℃</p>
        </div>
      ) : (
        <p>No result to display yet. Try searching for a city!</p>
      )}
    </div>
  );
}

export default SearchPage;

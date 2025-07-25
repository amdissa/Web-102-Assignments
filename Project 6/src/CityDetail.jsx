import { useParams } from "react-router-dom";

function CityDetail({ weatherData }) {
  const { city } = useParams();
  const cityData = weatherData.find(
    (w) => w.city.toLowerCase() === city.toLowerCase()
  );

  if (!cityData) return <div>City data not found.</div>;

  return (
    <div className="city-detail">
      <h2>{cityData.city}, {cityData.country}</h2>
      <p><strong>Condition:</strong> {cityData.condition}</p>
      <p><strong>Temperature:</strong> {cityData.temp_c}&#8451;</p>
      <p><strong>Humidity:</strong> {cityData.humidity}%</p>
      <p><strong>Air Quality Index:</strong> {cityData.airqualityindex}</p>
      <p><strong>Visibility:</strong> {cityData.visibility} km</p>
      <p><strong>Sunrise:</strong> {cityData.sunrise}</p>
      <p><strong>Sunset:</strong> {cityData.sunset}</p>
      <p><strong>Clouds:</strong> {cityData.clouds}</p>
      <p><strong>Wind Speed:</strong> {cityData.wind_spd}</p>
    </div>
  );
}

export default CityDetail;

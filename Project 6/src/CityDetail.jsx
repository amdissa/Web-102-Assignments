import { useParams, Link } from "react-router-dom"

export default function CityDetail({ weatherData }) {
  const { cityName } = useParams()
  const city = weatherData.find(w => w.city.toLowerCase() === cityName.toLowerCase())

  if (!city) return <div>City not found. <Link to="/">Go back</Link></div>

  return (
    <div className="detail">
      <h2>{city.city}, {city.country}</h2>
      <p>Condition: {city.condition}</p>
      <p>Temperature: {city.temp_c}°C</p>
      <p>Humidity: {city.humidity}%</p>
      <p>Wind Speed: {city.wind} m/s</p>
      <img
        src={`https://www.weatherbit.io/static/img/icons/${city.icon}.png`}
        alt={city.condition}
      />
      <br />
      <Link to="/">← Back to Dashboard</Link>
    </div>
  )
}

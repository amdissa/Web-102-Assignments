function About() {
  return (
    <div className="about-page">
      <h2>About This Weather Dashboard</h2>

      <p>
        This dashboard provides real-time weather information for cities around the world. You can search for new cities, filter by weather conditions, and explore visualizations to better understand current climate data.
      </p>

      <h3>🌤️ Key Features</h3>
      <div className="about-section">
      <ul>
        <li>🔍 Search for any city by name</li>
        <li>📋 Filter cities based on weather condition</li>
        <li>🌡️ Displays temperature, humidity, cloud coverage, and wind speed</li>
        <li>📈 Line chart: visualizes temperatures across cities</li>
        <li>🌬️ Bar chart: visualizes wind speed across cities</li>
        <li>📄 Detail view: each city has a page with additional info like visibility, sunrise, and sunset</li>
        <li>🧭 Sidebar is consistent across all pages</li>
        <li>🔗 Each detail page has its own unique URL</li>
      </ul>
      </div>

      <h3>✨ Extra Features</h3>
      <div className="about-section">
      <ul>
        <li>🧠 Toggle button to show or hide charts</li>
        <li>📌 Tooltip annotations explaining interesting patterns in the data</li>
      </ul>
      </div>

      <h3>📊 Technologies Used</h3>
      <div className="about-section">
      <ul>
        <li>React + React Router</li>
        <li>Chart.js for data visualizations</li>
        <li>Open-Meteo API & Weatherbit API for geolocation and weather data</li>
      </ul>
      </div>

      <p>Made with 💙 as part of a data dashboard project to visualize real-time climate conditions.</p>
    </div>
  );
}

export default About;
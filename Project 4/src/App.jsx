import React, { useEffect, useState } from 'react';
import './App.css';

const ACCESS_KEY = import.meta.env.VITE_CAT_API_KEY;

function App() {
  const [cat, setCat] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchCat = async () => {
    // console.log("Fetching a new cat...");
    // if (!ACCESS_KEY) {
    //   console.error("API key missing!");
    //   return;
    // }

    try {
      let catData;
      let attempts = 0;

      // Try up to 10 times to find a non-banned cat
      do {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?has_breeds=1', {
          headers: { 'x-api-key': ACCESS_KEY }
        });
        const data = await response.json();
        catData = data[0];
        attempts++;
      } while (
        catData &&
        catData.breeds &&
        (banList.includes(catData.breeds[0].origin) || banList.includes(catData.breeds[0].name)) &&
        attempts < 10
      );

      if (catData && catData.breeds && catData.breeds[0]) {
        setCat(catData);
        setHistory((prev) => [...prev, catData]);
      } else {
        console.warn("No valid cat found.");
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const toggleBan = (value) => {
    setBanList((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="app">
      <h1>🐱 Cat Discovery</h1>

      <button onClick={fetchCat}>Discover Another Cat</button>
      <button onClick={() => toggleBan(cat.breeds[0].origin)}>Ban this origin</button>


      {cat && cat.breeds[0] && (
        <div className="cat-card">
          <img src={cat.url} alt="Cat" />
          <h3>Breed: 
            <span className="clickable" onClick={() => toggleBan(cat.breeds[0].name)}> {cat.breeds[0].name}</span>
          </h3>
          <p>Origin: 
            <span className="clickable" onClick={() => toggleBan(cat.breeds[0].origin)}> {cat.breeds[0].origin}</span>
          </p>
          <p>Life Span: {cat.breeds[0].life_span} years</p>
        </div>
      )}

      <div className="ban-list">
        <h3>Ban List</h3>
        {banList.length === 0 && <p>No attributes banned yet.</p>}
        <ul>
          {banList.map((item, index) => (
            <li key={index} className="clickable" onClick={() => toggleBan(item)}>
              ❌ {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="history">
        <h3>History</h3>
        <div className="history-grid">
          {history.map((item, i) => (
            <img key={i} src={item.url} alt={`Cat ${i}`} className="thumbnail" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

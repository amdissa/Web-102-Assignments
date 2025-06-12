// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import './App.css';
import GameCard from './components/GameCard';
import games from './data/games';


function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>🎮 Video Game Community Picks 🎮</h1>
        <p>Explore top games recommended by our player community!</p>
      </header>
      <div className="card-grid">
        {games.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import './GameCard.css';

const GameCard = ({ title, genre, image, description, link }) => {
  return (
    <div className="game-card">
      <img src={image} alt={title} className="game-image" />
      <div className="game-info">
        <h2>{title}</h2>
        <h4>{genre}</h4>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="game-button">
          View Game
        </a>
      </div>
    </div>
  );
};

export default GameCard;
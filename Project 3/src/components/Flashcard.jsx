import './Flashcard.css';

export default function Flashcard({ card, flipped, onFlip }) {
  return (
    <div className={`card-container ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="card-inner">
        <div className="card-face card-front">
          <p>{card.front}</p>
        </div>
        <div className="card-face card-back">
          <p>{card.back}</p>
        </div>
      </div>
    </div>
  );
}

/***
***/
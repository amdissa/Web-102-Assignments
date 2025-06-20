import './Flashcard.css';

export default function Flashcard({ card, flipped, onFlip }) {
  return (
    <div className={`card-container ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="card-inner">
        <div className="card-face card-front">
          <div>
            <p>{card.front}</p>
            {card.image && (
              <div className="image-box">
                <img src={card.image} alt="Flashcard visual" />
              </div>
            )}
          </div>
        </div>
        <div className="card-face card-back">
          <div>
            <p>{card.back}</p>
            {card.image && (
              <div className="image-box">
                <img src={card.image} alt="Flashcard visual" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

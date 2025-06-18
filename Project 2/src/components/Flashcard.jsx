import './Flashcard.css';

export default function Flashcard({ card, flipped, onFlip }) {
  return (
    <div className="card" onClick={onFlip}>
      <p>{flipped ? card.back : card.front}</p>
    </div>
  );
}

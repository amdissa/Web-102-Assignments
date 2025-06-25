import { useState } from 'react';
import Flashcard from './components/Flashcard';
import './App.css';

function App() {
  const flashcards = [
    { front: "What is the chemical symbol for water?", back: "H2O" },
    { front: "What planet is known as the Red Planet?", back: "Mars" },
    { front: "What gas do humans need to breathe?", back: "Oxygen" },
    { front: "What part of the cell contains DNA?", back: "Nucleus" },
    { front: "What is the center of an atom called?", back: "Nucleus" },
    { front: "What natural force keeps us on the ground?", back: "Gravity" },
    { front: "What organ pumps blood throughout the body?", back: "Heart" },
    { front: "What process do plants use to make food?", back: "Photosynthesis" },
    { front: "What’s the freezing point of water in Celsius?", back: "0" },
    { front: "What gas do plants absorb from the air?", back: "Carbon Dioxide" },
    { front: "What is the largest planet in our solar system?", back: "Jupiter" }
  ];

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  const currentCard = flashcards[index];

  const handleGuess = () => {
    if (guess.trim().toLowerCase() === currentCard.back.toLowerCase()) {
      setFeedback('✅ Correct!');
    } else {
      setFeedback('❌ Try Again');
    }
    setFlipped(true);
  };

  const nextCard = () => {
    if (index < flashcards.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
      setFeedback('');
      setGuess('');
    }
  };

  const prevCard = () => {
    if (index > 0) {
      setIndex(index - 1);
      setFlipped(false);
      setFeedback('');
      setGuess('');
    }
  };

  return (
    <div className="App">
      <h1>🔬 Science Sizzler!</h1>
      <p>Put your science smarts to the test with these sizzling questions!</p>
      <p>Number of cards: {flashcards.length}</p>

      <div className="center-content">
        <Flashcard card={currentCard} flipped={flipped} onFlip={() => setFlipped(!flipped)} />

        <div className="guess-section">
          <label>
            Guess the answer here:
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Place your answer here..."
            />
          </label>
          <button onClick={handleGuess}>Submit Guess</button>
          <p>{feedback}</p>
        </div>

        <div className="nav-buttons">
          <button onClick={prevCard} disabled={index === 0}>←</button>
          <button onClick={nextCard} disabled={index === flashcards.length - 1}>→</button>
        </div>
      </div>
    </div>
  );
}

export default App;

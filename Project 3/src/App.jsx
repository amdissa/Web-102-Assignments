import { useState } from 'react';
import Flashcard from './components/Flashcard';
import './App.css';

function App() {
  const originalFlashcards = [
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

  /***
***/

  const [shuffledCards, setShuffledCards] = useState(originalFlashcards);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  const currentCard = shuffledCards[index];

  const handleGuess = () => {
    const isCorrect = guess.trim().toLowerCase() === currentCard.back.toLowerCase();

    if (isCorrect) {
      setFeedback('✅ Correct!');
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setFeedback('❌ Try Again');
      setCurrentStreak(0);
    }

    setFlipped(true);
  };

  const nextCard = () => {
    if (index < shuffledCards.length - 1) {
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

  const shuffleCards = () => {
    const shuffled = [...originalFlashcards.filter(card => !masteredCards.includes(card))];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledCards(shuffled);
    setIndex(0);
    setFlipped(false);
    setFeedback('');
    setGuess('');
  };

  const markAsMastered = () => {
    const updatedShuffled = [...shuffledCards];
    const removedCard = updatedShuffled.splice(index, 1)[0];

    setMasteredCards([...masteredCards, removedCard]);
    setShuffledCards(updatedShuffled);

    if (updatedShuffled.length === 0) {
      setFeedback("🎉 You've mastered all the cards!");
      setIndex(0);
    } else {
      setIndex(prev => Math.min(prev, updatedShuffled.length - 1));
    }

    setFlipped(false);
    setGuess('');
    setFeedback('');
  };

  return (
    <div className="App">
      <h1>🔬 Science Sizzler!</h1>
      <p>Put your science smarts to the test with these sizzling questions!</p>
      <p>Number of cards: {shuffledCards.length}</p>
      <p>📘 Mastered Cards: {masteredCards.length}</p>
      <p>🔥 Current Streak: {currentStreak} | 🏆 Longest Streak: {longestStreak}</p>

      <div className="center-content">
        {shuffledCards.length > 0 && (
          <Flashcard
            card={currentCard}
            flipped={flipped}
            onFlip={() => setFlipped(!flipped)}
          />
        )}

        {shuffledCards.length > 0 && (
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
            <p className="feedback">{feedback}</p>
          </div>
        )}

        <div className="nav-buttons">
          <button onClick={prevCard} disabled={index === 0}>←</button>
          <button onClick={nextCard} disabled={index === shuffledCards.length - 1}>→</button>
          <button onClick={shuffleCards} disabled={shuffledCards.length <= 1}>🔀 Shuffle Cards</button>
          <button onClick={markAsMastered} disabled={shuffledCards.length === 0}>✔️ Mark as Mastered</button>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from 'react';
import Flashcard from './components/Flashcard';
import './App.css';

function App() {
  const flashcards = [
    { front: "What is the capital of France?", back: "Paris" },
    { front: "What’s 2 + 2?", back: "4" },
    { front: "React is a ___ library.", back: "JavaScript" },
    { front: "What’s the boiling point of water?", back: "100°C" },
    { front: "Who painted the Mona Lisa?", back: "Leonardo da Vinci" },
    { front: "What is the smallest prime number?", back: "2" },
    { front: "Which planet is closest to the sun?", back: "Mercury" },
    { front: "Who wrote 'Romeo and Juliet'?", back: "William Shakespeare" },
    { front: "How many continents are there?", back: "7" },
    { front: "Which gas do plants use during photosynthesis?", back: "Carbon Dioxide" },
    { front: "What’s the hardest natural substance?", back: "Diamond" },
    { front: "Which ocean is the largest?", back: "Pacific Ocean" },
    { front: "What is the longest river in the world?", back: "Nile" },
    { front: "In what year did the Titanic sink?", back: "1912" },
    { front: "Which element has the symbol 'O'?", back: "Oxygen" },
    { front: "What’s the square root of 64?", back: "8" },
    { front: "What is the capital of Japan?", back: "Tokyo" },
    { front: "Which mammal lays eggs?", back: "Platypus" },
    { front: "What does DNA stand for?", back: "Deoxyribonucleic Acid" },
    { front: "Who is known as the father of computers?", back: "Charles Babbage" },
    { front: "What is the currency of the United Kingdom?", back: "Pound Sterling" },
    { front: "Which country has the most population?", back: "China" },
    { front: "Which planet has rings?", back: "Saturn" },
    { front: "What’s the fastest land animal?", back: "Cheetah" },
    { front: "What’s the chemical formula for water?", back: "H₂O" }
  ];

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const showRandomCard = () => {
  let randomIndex;

  // Keep choosing until a different card is selected
  do {
    randomIndex = Math.floor(Math.random() * flashcards.length);
  } while (randomIndex === index);

  setIndex(randomIndex);
  setFlipped(false); // Always show the front when switching
};


  return (
    <div className="App">
      <main className="content">
        <h1>🧠 Trivia 101 </h1>
        <p className="description">Test your knowledge with quick trivia flashcards!</p>
        <p className="count">Total Cards: {flashcards.length}</p>

        <Flashcard
          card={flashcards[index]}
          flipped={flipped}
          onFlip={() => setFlipped(!flipped)}
        />

        <button onClick={showRandomCard}>Next Question</button>
      </main>
    </div>
  );
}

export default App;

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

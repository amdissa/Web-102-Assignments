// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { useState } from 'react';
import Flashcard from './components/Flashcard';
import './App.css';

function App() {
  const flashcards = [
    { front: "What is the capital of France?", back: "Paris" },
    { front: "What’s 2 + 2?", back: "4" },
    { front: "React is a ___ library.", back: "JavaScript" },
    { front: "What’s the boiling point of water?", back: "100°C" },
    { front: "Who painted the Mona Lisa?", back: "Leonardo da Vinci" }
  ];

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const showRandomCard = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * flashcards.length);
    } while (randomIndex === index); // avoid repeating the same card

    setIndex(randomIndex);
    setFlipped(false);
  };

  return (
    <div className="App">
      <h1>🧠 Flashcard Quiz</h1>
      <p className="description">Test your knowledge with quick flashcards!</p>
      <p className="count">Total Cards: {flashcards.length}</p>

      <Flashcard
        card={flashcards[index]}
        flipped={flipped}
        onFlip={() => setFlipped(!flipped)}
      />

      <button onClick={showRandomCard}>Next Card</button>
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

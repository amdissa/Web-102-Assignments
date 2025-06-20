import { useState } from 'react';
import Flashcard from './components/Flashcard';
import './App.css';

function App() {
  const flashcards = [
    { front: "What is the capital of France?", back: "Paris",  image:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/320px-Paris_Night.jpg"},
    { front: "What’s 2 + 2?", back: "4" },
    { front: "React is a ___ library.", back: "JavaScript", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"},
    { front: "What’s the boiling point of water?", back: "100°C", image: "https://i.natgeofe.com/n/e6e87dde-12aa-4f2d-8365-35a6e8e938c9/boiling-river-bubbles.jpg" },
    { front: "Who painted the Mona Lisa?", back: "Leonardo da Vinci", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/320px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg" },
    { front: "What is the smallest prime number?", back: "2" },
    { front: "Which planet is closest to the sun?", back: "Mercury", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/320px-Mercury_in_true_color.jpg" },
    { front: "Who wrote 'Romeo and Juliet'?", back: "William Shakespeare", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/640px-Shakespeare.jpg" },
    { front: "How many continents are there?", back: "7", image: "https://www.geographyrealm.com/wp-content/uploads/2022/07/map-7-continent-model.png" },
    { front: "Which gas do plants use during photosynthesis?", back: "Carbon Dioxide" },
    { front: "What’s the hardest natural substance?", back: "Diamond", image: "https://docs.growndiamondcorp.com/blog/types-of-diamonds.png" },
    { front: "Which ocean is the largest?", back: "Pacific Ocean", image:"https://cdn.britannica.com/97/94197-050-8225D2EE/coastline-Pacific-Ocean-California-Big-Sur.jpg" },
    { front: "What is the longest river in the world?", back: "Nile", image:"https://cdn.britannica.com/90/150790-050-081325A0/view-Bahr-Al-Jabal-South-Sudan-Juba.jpg" },
    { front: "In what year did the Titanic sink?", back: "1912", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/St%C3%B6wer_Titanic.jpg/330px-St%C3%B6wer_Titanic.jpg" },
    { front: "Which element has the symbol 'O'?", back: "Oxygen" },
    { front: "What’s the square root of 64?", back: "8" },
    { front: "What is the capital of Japan?", back: "Tokyo", image:"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqXPvMIWc7_kcKuqfa1hhkZfAF4HWS8aqz3QW74gGPAGCKj1pf85gMSyBIDb74i7-AhYLrY2MkbwKOa5igGq-cpSriZn_As88UZcRJ6JTLoqIgVLZAp0xI0HSxn4e754EiYwbcuZg=w540-h312-n-k-no" },
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

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateCrewmate from './pages/CreateCrewmate';
import EditCrewmate from './pages/EditCrewmate';
import CrewDetail from './pages/CrewDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">🏠 Home</Link> | <Link to="/gallery">Crewmate Gallery</Link> | <Link to="/create">+ New Crewmate</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="welcome-container">
                <h1>Welcome to Crewmate Generator!</h1>
                <h3>Here you can generate crewmates, pick a color for your crewmate, a profession, and your task!</h3>
                <p>Please select an option above to get started.</p>
              </div>
            }
          />
          <Route path="/gallery" element={<Home />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/edit/:id" element={<EditCrewmate />} />
          <Route path="/crewmate/:id" element={<CrewDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

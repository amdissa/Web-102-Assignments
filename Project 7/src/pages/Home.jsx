
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

function Home() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data } = await supabase.from('Crewmates').select().order('created_at', { ascending: false });
      setCrewmates(data);
    };
    fetchCrewmates();
  }, []);

  const calculateStats = () => {
    const total = crewmates.length;
    const redCount = crewmates.filter(c => c.color === 'Red').length;
    const redPercent = total ? Math.round((redCount / total) * 100) : 0;
    return { total, redPercent };
  };

  const { total, redPercent } = calculateStats();

  return (
    <div  className="App">
      <h1>Crewmate Gallery</h1>
      <p>Total Crew: {total} | Red: {redPercent}%</p>
      <Link to="/create">+ Add Crewmate</Link>
      <div className="gallery">
        {crewmates.map((c) => (
          <div key={c.id} className="card">
            <h3>{c.name}</h3>
            <p>
              Color: {c.color} <br />
              Role: {c.category} <br />
              Task: {c.task}
            </p>

            <Link to={`/crewmate/${c.id}`}>Details</Link>
            <Link to={`/edit/${c.id}`}>Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

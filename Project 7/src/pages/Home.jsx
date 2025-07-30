
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
  const colorCounts = crewmates.reduce((acc, c) => {
    acc[c.color] = (acc[c.color] || 0) + 1;
    return acc;
  }, {});

  const percentages = Object.entries(colorCounts).map(([color, count]) => ({
    color,
    percent: total ? Math.round((count / total) * 100) : 0
  }));

  return { total, percentages };
};


const { total, percentages } = calculateStats();

  return (
    <div  className="App">
      <h1>Crewmate Gallery</h1>
      <p>Total Crew: {total} | {
        percentages.map(({ color, percent }) => `${color}: ${percent}%`).join(' | ')
      }</p>

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

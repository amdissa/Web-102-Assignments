import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

function CrewDetail() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data } = await supabase.from('Crewmates').select().eq('id', id).single();
      setCrewmate(data);
    };
    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <p>Loading...</p>;

  return (
    <div  className="App">
      <h2>{crewmate.name}'s Info</h2>
      <p><strong>Color:</strong> {crewmate.color}</p>
      <p><strong>Role:</strong> {crewmate.category}</p>
      <p><strong>Task:</strong> {crewmate.task}</p>
      <p><strong>Created:</strong> {new Date(crewmate.created_at).toLocaleString()}</p>
      <Link to={`/edit/${crewmate.id}`}>Edit Crewmate</Link>
    </div>
  );
}

export default CrewDetail;

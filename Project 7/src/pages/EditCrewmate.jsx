import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { useParams, useNavigate } from 'react-router-dom';

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'Brown', 'Gray'];
const tasks = {
  Engineer: ['Fix wiring', 'Calibrate engines'],
  Medic: ['Heal teammate', 'Scan vitals'],
  Pilot: ['Chart course', 'Steer ship'],
  Biologist: ['Fix crewmate', 'Provide upgrades'],
  "Lionfish Hunter": ['Hunt', 'Get Water']
};

function EditCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('Engineer');
  const [task, setTask] = useState('');

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data } = await supabase.from('Crewmates').select().eq('id', id).single();
      setName(data.name);
      setColor(data.color);
      setCategory(data.category);
      setTask(data.task);
    };
    fetchCrewmate();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await supabase.from('Crewmates').update({ name, color, category, task }).eq('id', id);
    navigate('/');
  };

  const handleDelete = async () => {
    await supabase.from('Crewmates').delete().eq('id', id);
    navigate('/');
  };

  return (
    <div className="App">
    <form onSubmit={handleUpdate}>
      <h2>Edit Crewmate</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />

      <p>Pick a color:</p>
      {colors.map(c => (
        <button
        type="button"
        key={c}
        onClick={() => setColor(c)}
        style={{
          backgroundColor: c.toLowerCase(),
          color: 'white',
          textShadow: '0 0 3px black',
          margin: '0.25rem',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: color === c ? '3px solid white' : 'none', // ✅ highlight selected
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        {c}
      </button>


      ))}

      <p>Choose a role:</p>
      <select value={category} onChange={(e) => { setCategory(e.target.value); setTask(''); }}>
        {Object.keys(tasks).map((role) => (
          <option key={role}>{role}</option>
        ))}
      </select>

      <p>Choose a task:</p>
      <select value={task} onChange={(e) => setTask(e.target.value)} required>
        <option value="">Select a task</option>
        {tasks[category].map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      <button type="submit">Update</button>
      <button type="button" onClick={handleDelete} style={{ marginLeft: '1rem', background: 'red', color: 'white' }}>Delete</button>
    </form>
    </div>
  );
}

export default EditCrewmate;

import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const colors = ['Red', 'Blue', 'Green', 'Yellow'];
const tasks = {
  Engineer: ['Fix wiring', 'Calibrate engines'],
  Medic: ['Heal teammate', 'Scan vitals'],
  Pilot: ['Chart course', 'Steer ship'],
};

function CreateCrewmate() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('Engineer');
  const [task, setTask] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log({ name, color, category, task });
  await supabase.from('Crewmates').insert({ name, color, category, task });
  navigate('/gallery'); // 👈 redirect to the updated gallery, not just "/"
};


  return (
    <div  className="App">
    <form onSubmit={handleSubmit}>
      <h2>Create Crewmate</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />

      <p>Pick a color:</p>
      {colors.map(c => (
        <button
          type="button"
          key={c}
          onClick={() => setColor(c)}
          className={`color-btn ${color === c ? 'selected' : ''}`}
          style={{
            backgroundColor: c.toLowerCase(),
            color: 'white',
            margin: '0.25rem',
            border: color === c ? '3px solid white' : '2px solid transparent',
            outline: 'none',
            borderRadius: '6px'
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

      <button type="submit">Create</button>
    </form>
    </div>
  );
}

export default CreateCrewmate;
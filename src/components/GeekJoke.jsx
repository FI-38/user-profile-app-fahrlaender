import React, { useState } from 'react';
import "./GeekJoke.css";

function GeekJoke() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJoke = async () => {
    setLoading(true);
    setError('');
    setJoke('');
    try {
      const response = await fetch('https://geek-jokes.sameerkumar.website/api?format=json');
      if (!response.ok) throw new Error('Netzwerkfehler');
      const data = await response.json();
      setJoke(data.joke); // Das Feld heißt 'joke'
    } catch (err) {
      setError('Fehler beim Laden des Witzes. Bitte versuchen Sie es erneut!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', border: '1px solid #eee', borderRadius: '8px' }}>
      <h2>IT-Witz</h2>
      <button onClick={fetchJoke} disabled={loading} style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}>
        Neuen Witz laden
      </button>
      {loading && <p>Lädt...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {joke && <blockquote>{joke}</blockquote>}
    </div>
  );
}

export default GeekJoke;

import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';

function Login({isLoggedIn, setIsLoggedIn}) { 
  
  const [message, setMessage] = useState('');
 
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const username = e.target.elements.username.value;
  //   const password = e.target.elements.password.value;
  //   e.target.reset(); // Formular zurücksetzen

  //   console.log(username);
  //   console.log(password);

  //   setMessage(`Eingeloggt als ${username}`);
  //   setIsLoggedIn(true);
  // };

  
const API_BASE = import.meta.env.VITE_API_BASE ?? "";


const handleSubmit = async (e) => {
  e.preventDefault();
  const username = e.target.elements.username.value;
  const password = e.target.elements.password.value;
  e.target.reset();

  try {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || `Fehler: ${res.status}`);

    setMessage(`Eingeloggt als ${data.username}`);
    setIsLoggedIn(true);
    // Optional: localStorage.setItem('token', data.token);
  } catch (err) {
    setMessage(err.message || 'Login fehlgeschlagen');
  }
};


  return (
    <div className="mt-4">

     <h3>{isLoggedIn ?  'Willkommen zurück!' : 'Bitte einloggen'}</h3>

      { message && <Alert variant="success">{message}</Alert> }


      {! isLoggedIn && (<Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Benutzername</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Benutzernamen eingeben"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Passwort</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Passwort eingeben"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Anmelden
        </Button>
      </Form>
      )
      }
    </div>
  );
}
 

export default Login;
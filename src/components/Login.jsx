import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import FakeToggleLoginButton from './FakeToggleLoginButton';
 
function Login() { 
  
  const [message, setMessage] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    e.target.reset(); // Formular zurücksetzen

    console.log(username);
    console.log(password);

    setMessage(`Eingeloggt als ${username}`);
    setIsLoggedIn(true);
  };

  

  return (
    <div className="mt-4">

        <FakeToggleLoginButton isLoggedIn={isLoggedIn} onToggle={handleToggleLogin}/>

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
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

function Register() {
  const[message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success'); // 'success' oder 'danger'

  const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const confirmPassword = e.target.elements.confirmPassword.value;

        // Client-seitige Validierung
        if (password !== confirmPassword) {
            setMessageType('danger');
            setMessage('Passwörter stimmen nicht überein');
            return;
        }

        if (password.length < 8) {
            setMessageType('danger');
            setMessage('Passwort muss mindestens 8 Zeichen lang sein');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/register`, {
            
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                setMessageType('success');
                setMessage('Registrierung erfolgreich! Sie sind jetzt eingeloggt.');
                setIsLoggedIn(true);
            } else {
                setMessageType('danger');
                setMessage(data.error || 'Registrierung fehlgeschlagen');
            }
        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);
            setMessageType('danger');
            setMessage("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
        }
    };

    return (
        <div className="mt-4">
            <h3>Registrieren</h3>
            {message && <Alert variant={messageType}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
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
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Vollständigen Namen eingeben"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="E-Mail-Adresse eingeben"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Passwort</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Passwort eingeben (min. 8 Zeichen)"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Passwort bestätigen</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Passwort erneut eingeben"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrieren
                </Button>
            </Form>
        </div>
    );
}
export default Register;



// function extractError(errLike) {
//   if (!errLike) return "Unbekannter Fehler.";
//   if (typeof errLike === "string") return errLike;
//   if (errLike.error) return errLike.error;
//   if (errLike.message) return errLike.message;
//   return "Es ist ein Fehler aufgetreten.";
// }

// export default function Register() {
//   const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
//   const [pending, setPending] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [okMsg, setOkMsg] = useState("");
//   const navigate = useNavigate();

//   function onChange(e) {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   }

//   async function onSubmit(e) {
//     e.preventDefault();
//     setErrorMsg("");
//     setOkMsg("");

//     const username = form.username.trim();
//     const email = form.email.trim().toLowerCase();
//     const password = form.password;
//     const confirm = form.confirm;

//     if (!username) return setErrorMsg("Bitte einen Benutzernamen angeben.");
//     if (!/^\S+@\S+\.\S+$/.test(email)) return setErrorMsg("Bitte eine gültige E-Mail angeben.");
//     if (password.length < 8) return setErrorMsg("Passwort muss mindestens 8 Zeichen haben.");
//     if (password !== confirm) return setErrorMsg("Passwörter stimmen nicht überein.");

//     setPending(true);
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/api/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ username, email, password }),
//       });
//       const maybeJson = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(maybeJson?.error || `Fehler: ${res.status}`);

//       setOkMsg("Registrierung erfolgreich! Du wirst gleich zum Login weitergeleitet …");
//       setForm({ username: "", email: "", password: "", confirm: "" });
//       setTimeout(() => navigate("/login"), 1200);
//     } catch (err) {
//       setErrorMsg(err.message || "Fehler bei der Registrierung");
//     } finally {
//       setPending(false);
//     }
//   }

//   return (
//     <div className="mt-4">
//       <h3>Registrieren</h3>
//       {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
//       {okMsg && <Alert variant="success">{okMsg}</Alert>}
//       <Form onSubmit={onSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Benutzername</Form.Label>
//           <Form.Control type="text" name="username" placeholder="z. B. max" value={form.username} onChange={onChange} required disabled={pending} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>E-Mail</Form.Label>
//           <Form.Control type="email" name="email" placeholder="name@example.com" value={form.email} onChange={onChange} required disabled={pending} />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Passwort</Form.Label>
//           <Form.Control type="password" name="password" placeholder="mind. 8 Zeichen" minLength={8} value={form.password} onChange={onChange} required disabled={pending} />
//         </Form.Group>
//         <Form.Group className="mb-4">
//           <Form.Label>Passwort bestätigen</Form.Label>
//           <Form.Control type="password" name="confirm" placeholder="nochmal eingeben" minLength={8} value={form.confirm} onChange={onChange} required disabled={pending} />
//         </Form.Group>
//         <Button type="submit" disabled={pending}>
//           {pending ? (<><Spinner size="sm" animation="border" role="status" className="me-2" /> Sende …</>) : ("Registrieren")}
//         </Button>
//       </Form>
//       <p className="mt-3">
//         Schon ein Konto? <Link to="/login">Zum Login</Link>
//       </p>
//     </div>
//   );
// }

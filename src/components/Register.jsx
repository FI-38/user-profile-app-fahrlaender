import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

function extractError(errLike) {
  if (!errLike) return "Unbekannter Fehler.";
  if (typeof errLike === "string") return errLike;
  if (errLike.error) return errLike.error;
  if (errLike.message) return errLike.message;
  return "Es ist ein Fehler aufgetreten.";
}

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const navigate = useNavigate();

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setOkMsg("");

    const username = form.username.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const confirm = form.confirm;

    if (!username) return setErrorMsg("Bitte einen Benutzernamen angeben.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErrorMsg("Bitte eine gültige E-Mail angeben.");
    if (password.length < 8) return setErrorMsg("Passwort muss mindestens 8 Zeichen haben.");
    if (password !== confirm) return setErrorMsg("Passwörter stimmen nicht überein.");

    setPending(true);
    try {
      const res = await fetch(`${API_BASE}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });
      const maybeJson = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(maybeJson?.error || `Fehler: ${res.status}`);

      setOkMsg("Registrierung erfolgreich! Du wirst gleich zum Login weitergeleitet …");
      setForm({ username: "", email: "", password: "", confirm: "" });
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setErrorMsg(err.message || "Fehler bei der Registrierung");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-4">
      <h3>Registrieren</h3>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {okMsg && <Alert variant="success">{okMsg}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Benutzername</Form.Label>
          <Form.Control type="text" name="username" placeholder="z. B. ulrike" value={form.username} onChange={onChange} required disabled={pending} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" name="email" placeholder="name@example.com" value={form.email} onChange={onChange} required disabled={pending} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Passwort</Form.Label>
          <Form.Control type="password" name="password" placeholder="mind. 8 Zeichen" minLength={8} value={form.password} onChange={onChange} required disabled={pending} />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Passwort bestätigen</Form.Label>
          <Form.Control type="password" name="confirm" placeholder="nochmal eingeben" minLength={8} value={form.confirm} onChange={onChange} required disabled={pending} />
        </Form.Group>
        <Button type="submit" disabled={pending}>
          {pending ? (<><Spinner size="sm" animation="border" role="status" className="me-2" /> Sende …</>) : ("Registrieren")}
        </Button>
      </Form>
      <p className="mt-3">
        Schon ein Konto? <Link to="/login">Zum Login</Link>
      </p>
    </div>
  );
}

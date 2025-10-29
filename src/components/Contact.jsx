import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // Simulierter Submit
    setTimeout(() => {
      alert(`Danke, ${formData.name}! Deine Nachricht wurde gesendet.`);
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 100);
  }

  return (
    <div>
      <h1>Kontakt</h1>
      <p>Nutze das Formular, um uns eine Nachricht zu senden:</p>

      {submitted && <Alert variant="info">Sende Nachricht …</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="contactName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Dein Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="contactEmail">
            <Form.Label>E-Mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Deine E-Mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="contactMessage">
          <Form.Label>Nachricht</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="message"
            placeholder="Deine Nachricht"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={submitted}>Absenden</Button>
      </Form>
    </div>
  );
}

export default Contact;

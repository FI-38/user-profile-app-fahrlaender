import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { Form, Button, Alert } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
 
 
function UserProfile({ isLoggedIn, userId }) {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    bio: "",
  });
};
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setMessage(`Daten werden gespeichert`);
    console.log(formData);
    setFormData({
        firstname: "",
        surname: "",
        bio: "",
    });
 
  return (
    <Container className="mt-4">
      <h3>
        {isLoggedIn ? (
          "Nutzerprofil"
        ) : (
          <Nav.Link as={Link} to="/login">
            Bitte einloggen
          </Nav.Link>
        )}
      </h3>
 
      {message && <Alert variant="success">{message}</Alert>}
 
      {isLoggedIn && (
        <Form onSubmit={handleSaveProfile}>
          <Form.Group className="mb-3">
            <Form.Label>Vorname</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              placeholder="Vornamen eingeben"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Control type="hidden" name="userId" value={userId} />
          <Button variant="primary" type="submit">
            Speichern
          </Button>
        </Form>
      )}
    </Container>
  );
}
 
export default UserProfile;
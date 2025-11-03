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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_SERVER_URL}/api/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setFormData({
            firstname: data.firstname || "",
            surname: data.surname || "",
            bio: data.bio || "",
          });
        } else {
          setMessage(data.error || "Fehler beim Laden des Profils");
        }
      } catch (error) {
        console.log(error);
        setMessage("Fehler beim Abrufen des Profils");
      }
    };
   
    // Call async method.
    fetchProfile();
  }, [userId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/api/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
 
      const data = await response.json();
      setMessage(response.ok ? "Profil erfolgreich aktualisiert" : data.error);
    } catch (error) {
      setMessage("Fehler beim Speichern des Profils");
    } finally {
      // Formular zurücksetzen
      setFormData({
        firstname: "",
        surname: "",
        bio: "",
      });
    }
  };
  
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

          <Form.Group className="mb-3">
            <Form.Label>Nachname</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              placeholder="Nachnamen eingeben"
              value={formData.surname}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="bio"
              placeholder="Schreiben Sie was über sich..."
              value={formData.bio}
              onChange={handleInputChange}
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
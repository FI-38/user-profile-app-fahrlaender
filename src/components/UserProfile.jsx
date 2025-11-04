import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { Form, Button, Alert } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

 
function UserProfile({ isLoggedIn, userId }) {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    bio: "",
  });

  // --- Lokale Bildvorschau (kein Upload) ---
  const [previewSrc, setPreviewSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [imageError, setImageError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewSrc(null);
      setFileName("");
      setImageError("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setPreviewSrc(null);
      setFileName("");
      setImageError("Bitte wählen Sie eine Bilddatei (z. B. JPG, PNG oder GIF).");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
      setFileName(file.name);
      setImageError("");
    };
    reader.onerror = () => {
      setPreviewSrc(null);
      setFileName("");
      setImageError("Die Datei konnte nicht gelesen werden.");
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

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
      // Lokale Bildvorschau explizit bestehen lassen, da kein Upload erfolgt.
      // Falls man sie beim Speichern ebenfalls leeren möchtest, entkommentiere die folgenden Zeilen:
      // setPreviewSrc(null);
      // setFileName("");
      // setImageError("");
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

        {/* aria-live, damit Screenreader Statusänderungen mitbekommen */}
      {message && <Alert variant="success" aria-live="polite">{message}</Alert>}
 
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

          {/* Lokale Bildvorschau (Frontend-only, kein Upload) */}
          <Form.Group controlId="profile-image" className="mb-3">
            <Form.Label className="fw-semibold">Profilbild (lokale Vorschau)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              aria-describedby="image-help"
              size="sm"
            />
            <Form.Text id="image-help" className="text-body-secondary">
              Unterstützt: JPG, PNG, GIF — Vorschau erfolgt lokal im Browser, kein Upload.
            </Form.Text>
          </Form.Group>

          {imageError && (
            <Alert variant="danger" className="py-2 mb-3">
              {imageError}
            </Alert>
          )}

          {previewSrc && (
            <Card className="shadow-sm border-0 mb-3">
              <Card.Img
                variant="top"
                src={previewSrc}
                alt={fileName ? `Vorschau von ${fileName}` : "Bildvorschau"}
                style={{
                  borderTopLeftRadius: 'var(--bs-border-radius)',
                  borderTopRightRadius: 'var(--bs-border-radius)'
                }}
              />
              {fileName && (
                <Card.Body className="py-2">
                  <Card.Text className="small mb-0 text-body">{fileName}</Card.Text>
                </Card.Body>
              )}
            </Card>
          )}

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
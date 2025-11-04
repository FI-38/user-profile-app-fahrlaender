import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


function ImagePreview({ maxWidth = 320 }) {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewSrc(null);
      setFileName('');
      setError('');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setPreviewSrc(null);
      setFileName('');
      setError('Bitte wählen Sie eine Bilddatei (z. B. JPG, PNG oder GIF).');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
      setFileName(file.name);
      setError('');
    };
    reader.onerror = () => {
      setPreviewSrc(null);
      setFileName('');
      setError('Die Datei konnte nicht gelesen werden.');
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container className="mt-3" style={{ maxWidth }}>
      <Form.Group controlId="image-input" className="mb-2">
        <Form.Label>Profilbild (lokale Vorschau)</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        <Form.Text className="text-body-secondary">
          Unterstützt: JPG, PNG, GIF – nur Frontend, kein Upload.
        </Form.Text>
      </Form.Group>

      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      {previewSrc && (
        <div>
          <img
            src={previewSrc}
            alt={fileName ? `Vorschau von ${fileName}` : 'Bildvorschau'}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              borderRadius: 8,
              boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
              marginBottom: 6
            }}
          />
          {fileName && (
            <div style={{ fontSize: 14, opacity: 0.9 }}>
              {fileName}
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default ImagePreview;

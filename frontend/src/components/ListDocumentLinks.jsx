import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import API from '../API.mjs';
import '../App.css';

const ListDocumentLinks = ({ documentId, isOpen, onClose, onSnippetClick }) => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    if (isOpen) {
      API.getAllDocumentSnippets()
        .then((response) => {
          setSnippets(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSnippets([]);
    }
  }, [isOpen]);

  const handleSnippetClick = (snippet) => {
    onSnippetClick(snippet);
    onClose();
  };

  return (
    <div className={`slider ${isOpen ? 'open' : ''}`}>
      <div className="snippet-list">
        <Row xs={1} className="g-4" style={{ width: "109%" }}>
          {snippets.map((snippet) => (
            <Col key={snippet.id}>
              <Card className="document-card h-100" onClick={() => handleSnippetClick(snippet)}>
                <Card.Body>
                  <Card.Title className="document-card-title">
                    {snippet.title}
                  </Card.Title>
                  <div className="divider" />
                  <Card.Text className="document-card-text">
                    <strong>Scale:</strong> {snippet.scale}
                  </Card.Text>
                  <Card.Text className="document-card-text">
                    <strong>Issuance Date:</strong> {snippet.issuanceDate}
                  </Card.Text>
                  <Card.Text className="document-card-text">
                    <strong>Type:</strong> {snippet.type}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Button variant="secondary" onClick={onClose} className="close-button">
        Close
      </Button>
    </div>
  );
};

export default ListDocumentLinks;
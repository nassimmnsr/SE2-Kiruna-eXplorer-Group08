// ListDocuments.js
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import "../App.css";
import DocumentModal from "./DocumentModal";
import API from "../MockAPI";

function ListDocuments() {
  const [documents, setDocuments] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    API.getAvailableDocuments()
      .then((response) => {
        setDocuments(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelection = (document) => {
    setSelectedDocument(document);
    setShow(true);
  };

  const handleSave = (document) => {
    API.updateDocument(document.id, document);
    setShow(false);
  };

  const handleDelete = (documentId) => {
    API.deleteDocument(documentId);
    setShow(false);
  };

  return (
    <Container fluid className="d-flex flex-column vh-100 p-3">
      <Row>
        <h1>Documents</h1>
      </Row>
      <Row>
        <p>Here you can find all the documents about Kiruna's relocation process.</p>
        <p>Click on a document to see more details.</p>
      </Row>
      <div
        className="mx-auto"
        style={{
          paddingBottom: "5rem"
        }}
      >
         <Row xs={1} sm={2} md={3} lg={4} className="g-4 mx-auto" style={{ width: "100%" }}>
        {documents.map((document) => (
          <Col key={document.id}>
            <Card
              className="document-card h-100"
              onClick={() => handleSelection(document)}
            >
              <Card.Body>
                <Card.Title className="document-card-title">
                  {document.title}
                </Card.Title>
                <div className="divider" />
                <Card.Text className="document-card-text">
                  <strong>Scale:</strong> {document.scale}
                </Card.Text>
                <Card.Text className="document-card-text">
                  <strong>Issuance Date:</strong> {document.issuance_date}
                </Card.Text>
                <Card.Text className="document-card-text">
                  <strong>Type:</strong> {document.type}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

        {selectedDocument && (
          <DocumentModal
            show={show}
            onHide={() => {
              setSelectedDocument(null);
              setShow(false);
            }}
            document={selectedDocument}
            handleSave={handleSave}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </Container>
  );
}

export default ListDocuments;
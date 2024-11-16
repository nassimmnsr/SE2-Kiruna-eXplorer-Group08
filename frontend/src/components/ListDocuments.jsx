import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../App.css";
import DocumentModal from "./DocumentModal";
import API from "../API";
import LinkModal from "./LinkModal";

function ListDocuments({ thinCardLayout = false }) {
  const [documents, setDocuments] = useState([]);
  const [show, setShow] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [linking, setLinking] = useState(false);
  const [selectedLinkDocuments, setSelectedLinkDocuments] = useState([]);
  const [selectedDocumentToLink, setSelectedDocumentToLink] = useState(null);

  // Fetch all document snippets
  useEffect(() => {
    API.getAllDocumentSnippets()
      .then(setDocuments)
      .catch((error) => console.error("Error fetching documents:", error));
  }, []);

  const handleSelection = async (document) => {
    try {
      const fetchedDocument = await API.getDocumentById(document.id);
      setSelectedDocument(fetchedDocument);

      if (linking) {
        setShowLinkModal(true);
      } else {
        setShow(true);
      }
    } catch (error) {
      console.error("Error fetching document details:", error);
    }
  };

  const handleSave = (document) => {
    API.updateDocument(document.id, document)
      .then(() => setShow(false))
      .catch((error) => console.error("Error saving document:", error));
  };

  const handleAdd = (document) => {
    API.addDocument(document)
      .then(() => API.getAllDocumentSnippets().then(setDocuments))
      .catch((error) => console.error("Error adding document:", error));
    setShow(false);
  };

  const handleDelete = (documentId) => {
    API.deleteDocument(documentId)
      .then(() => API.getAllDocumentSnippets().then(setDocuments))
      .catch((error) => console.error("Error deleting document:", error));
    setShow(false);
  };

  const handleLinkToClick = () => {
    setSelectedDocumentToLink(selectedDocument);
    setLinking(true);
  };

  const handleLinkConfirm = (linkedDocument) => {
    setSelectedLinkDocuments((prev) => [...prev, linkedDocument]);
    setShowLinkModal(false);
  };

  const handleCompleteLink = async () => {
    try {
      await Promise.all(
        selectedLinkDocuments.map((linkedDoc) =>
          API.createLink(selectedDocumentToLink, linkedDoc)
        )
      );
      alert("Links created successfully!");
      setLinking(false);
      setSelectedLinkDocuments([]);
    } catch (error) {
      console.error("Error linking documents:", error);
      alert("Failed to create links. Please try again.");
    }
  };

  const isLinkedDocument = (document) => {
    return (
      linking &&
      (selectedLinkDocuments.some((doc) => doc.document.id === document.id) ||
        selectedDocumentToLink?.id === document.id)
    );
  };

  return (
    <Container fluid className="scrollable-list-documents">
      <Row>
        <h1>{linking ? "Link a Document" : "Documents"}</h1>
      </Row>
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col xs="auto">
          {linking ? (
            <p>Choose the document you want to link</p>
          ) : (
            <>
              <p>
                Here you can find all the documents about Kiruna's relocation
                process.
              </p>
              <p>Click on a document to see more details.</p>
            </>
          )}
        </Col>
        <Col xs="auto">
          {linking ? (
            <Button
              variant="primary"
              onClick={handleCompleteLink}
              style={{ width: "90px" }}
            >
              Link ({selectedLinkDocuments.length})
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                setSelectedDocument({ isEditable: true });
                setShow(true);
              }}
              style={{ width: "150px" }}
            >
              Add New Document
            </Button>
          )}
        </Col>
      </Row>
      <Row
        xs={thinCardLayout ? 1 : 1}
        sm={thinCardLayout ? 1 : 2}
        md={thinCardLayout ? 1 : 3}
        lg={thinCardLayout ? 1 : 4}
        className="g-2 mx-auto"
        style={{ width: "100%" }}
      >
        {documents.map((document) => (
          <Col key={document.id}>
            <Card
              className={`document-card ${
                thinCardLayout ? "document-card-thin" : "h-100"
              }`}
              style={{
                backgroundColor: isLinkedDocument(document) ? "#b1b0aa" : "",
                cursor: "pointer",
              }}
              onClick={() => !isLinkedDocument(document) && handleSelection(document)}
            >
              <Card.Body>
                <Card.Title className="document-card-title">
                  {document.title}
                </Card.Title>
                {!thinCardLayout && (
                  <>
                    <div className="divider" />
                    <Card.Text>
                      <strong>Scale:</strong> {document.scale}
                    </Card.Text>
                    <Card.Text>
                      <strong>Issuance Date:</strong> {document.issuanceDate}
                    </Card.Text>
                    <Card.Text>
                      <strong>Type:</strong> {document.type}
                    </Card.Text>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedDocument && (
        <DocumentModal
          onLinkToClick={handleLinkToClick}
          show={show}
          onHide={() => {
            setSelectedDocument(null);
            setShow(false);
          }}
          document={selectedDocument}
          handleSave={handleSave}
          handleDelete={handleDelete}
          handleAdd={handleAdd}
        />
      )}
      {selectedDocumentToLink && showLinkModal && (
        <LinkModal
          showModal={showLinkModal}
          handleClose={() => {
            setSelectedDocument(null);
            setShowLinkModal(false);
          }}
          setSelectedLinkDocuments={setSelectedLinkDocuments}
          selectedLinkDocuments={selectedLinkDocuments}
          document={selectedDocument}
          onLinkConfirm={handleLinkConfirm}
        />
      )}
    </Container>
  );
}

export default ListDocuments;
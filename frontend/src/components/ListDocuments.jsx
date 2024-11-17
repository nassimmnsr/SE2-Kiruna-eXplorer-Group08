// ListDocuments.js
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
// import Document from "../model/Document";

import "../App.css";
import DocumentModal from "./DocumentModal";
import API from "../API";
import { Button } from "react-bootstrap";
import LinkModal from "./LinkModal";

export default function ListDocuments() {
  const [documents, setDocuments] = useState([]);
  const [show, setShow] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [linking, setLinking] = useState(false);
  const [selectedLinkDocuments, setSelectedLinkDocuments] = useState([]);
  const [selectedDocumentToLink, setSelectedDocumentToLink] = useState(null);
  const [compactView, setCompactView] = useState(false);

  useEffect(() => {
    API.getAllDocumentSnippets()
      .then((response) => {
        setDocuments(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelection = async (document) => {
    const newDoc = await API.getDocumentById(document.id);
    setSelectedDocument(newDoc);
    if (linking) {
      setShowLinkModal(true);
      setSelectedDocument(newDoc);
    } else {
      setSelectedDocument(newDoc);
      setShow(true);
    }
  };

  const handleLinkToClick = () => {
    setSelectedDocumentToLink(selectedDocument);
    setLinking(true);
  };

  const isLinkedDocument = (document) => {
    return (
      linking &&
      (selectedLinkDocuments.some((doc) => doc.id === document.id) ||
        selectedDocumentToLink?.id === document.id)
    );
  };

  const handleCompleteLink = async () => {
    try {
      await Promise.all(
        selectedLinkDocuments.map(async (linkedDocument) => {
          await API.createLink(selectedDocumentToLink, linkedDocument);
        })
      );
      alert("All the selected links have been confirmed!");
      setLinking(false);
      setSelectedLinkDocuments([]);
    } catch (error) {
      console.error("Error linking documents:", error);
      alert("There was an error linking the documents. Please try again.");
    }
  };

  return (
    <Container fluid className="d-flex flex-column vh-100 p-3">
      <Row>{linking ? <h1>Link a document</h1> : <h1>Documents</h1>}</Row>
      <Row className="d-flex justify-content-between align-items-center mb-3">
        {linking ? (
          <p>Choose the document you want to link</p>
        ) : (
          <>
            <p>
              Here you can find all the documents about Kiruna&apos;s relocation
              process.
            </p>
            <p>Click on a document to see more details.</p>
          </>
        )}
      </Row>
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col xs="auto">
          {linking ? (
            <Button
              title="Confirm links"
              variant="success"
              onClick={handleCompleteLink}
            >
              <i className="bi bi-check-square"></i>
            </Button>
          ) : (
            <Button
              title="Add new document"
              variant="primary"
              onClick={() => {
                setSelectedDocument({ isEditable: true });
                setShow(true);
              }}
            >
              <i className="bi bi-plus-square"></i>
            </Button>
          )}
        </Col>
        <Col xs="auto">
          <Button
            title={compactView ? "List view" : "Card view"}
            variant="secondary"
            onClick={() => setCompactView(!compactView)}
          >
            {compactView ? (
              <i className="bi bi-card-heading"></i>
            ) : (
              <i className="bi bi-list"></i>
            )}
          </Button>
        </Col>
      </Row>
      <div className="mx-auto w-100" style={{ paddingBottom: "5rem" }}>
        {compactView ? (
          <Row className="g-4 mx-auto">
            <DocumentSnippetTableComponent
              documents={documents}
              onSelect={handleSelection}
              isLinkedDocument={isLinkedDocument}
            />
          </Row>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 mx-auto">
            {documents.map((document) => (
              <DocumentSnippetCardComponent
                key={document.id}
                document={document}
                isLinkedDocument={isLinkedDocument}
                onSelect={handleSelection}
              />
            ))}
          </Row>
        )}
        {/* Modals for viewing, adding, or linking documents */}
        {selectedDocument && (
          <DocumentModal
            onLinkToClick={handleLinkToClick}
            show={show}
            onHide={() => {
              setSelectedDocument(null);
              setShow(false);
            }}
            document={selectedDocument}
            handleSave={(document) => {
              API.updateDocument(document.id, document);
              setShow(false);
            }}
            handleDelete={(documentId) => {
              API.deleteDocument(documentId);
              setShow(false);
            }}
            handleAdd={(document) => {
              API.addDocument(document).then(() => {
                API.getAllDocumentSnippets()
                  .then(setDocuments)
                  .catch(console.error);
              });
              setShow(false);
            }}
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
            onLinkConfirm={(linkedDocument) => {
              setSelectedLinkDocuments((prev) => [...prev, linkedDocument]);
              setShowLinkModal(false);
            }}
          />
        )}
      </div>
    </Container>
  );
}

function DocumentSnippetTableComponent({
  documents,
  onSelect,
  isLinkedDocument,
}) {
  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Scale</th>
          <th>Issuance Date</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => (
          <tr
            key={document.id}
            onClick={() => {
              if (!isLinkedDocument(document)) {
                onSelect(document);
              }
            }}
            style={{
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isLinkedDocument(document)) {
                e.currentTarget.style.transform = "scale(1.02)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLinkedDocument(document)) {
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            <td>
              <em>{document.title}</em>
            </td>
            <td>{document.scale}</td>
            <td>
              {dayjs(document.issuanceDate).format(
                document.issuanceDate.length === 4
                  ? "YYYY"
                  : document.issuanceDate.length === 7
                  ? "MM/YYYY"
                  : "DD/MM/YYYY"
              )}
            </td>
            <td>{document.type}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

DocumentSnippetTableComponent.propTypes = {
  documents: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  isLinkedDocument: PropTypes.func.isRequired,
};

const DocumentSnippetCardComponent = ({
  document,
  isLinkedDocument,
  onSelect,
}) => {
  return (
    <Col key={document.id}>
      <Card
        className="document-card h-100"
        style={{
          backgroundColor: isLinkedDocument(document)
            ? "#b1b1aa"
            : "transparent",
        }}
        onClick={() => {
          if (!isLinkedDocument(document)) {
            onSelect(document);
          }
        }}
        disabled={isLinkedDocument(document)}
        onMouseEnter={(e) => {
          if (!isLinkedDocument(document)) {
            e.currentTarget.style.transform = "scale(1.02)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isLinkedDocument(document)) {
            e.currentTarget.style.transform = "scale(1)";
          }
        }}
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
            <strong>Issuance Date:</strong>{" "}
            {dayjs(document.issuanceDate).format(
              document.issuanceDate.length === 4
                ? "YYYY"
                : document.issuanceDate.length === 7
                ? "MM/YYYY"
                : "DD/MM/YYYY"
            )}
          </Card.Text>
          <Card.Text className="document-card-text">
            <strong>Type:</strong> {document.type}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

DocumentSnippetCardComponent.propTypes = {
  document: PropTypes.object.isRequired,
  isLinkedDocument: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

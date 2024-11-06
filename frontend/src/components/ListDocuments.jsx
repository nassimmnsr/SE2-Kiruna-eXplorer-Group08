// ListDocuments.js
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
// import Document from "../model/Document";

import "../App.css";
import DocumentModal from "./DocumentModal";
import API from "../API";
import { Button } from "react-bootstrap";
import LinkModal from "./LinkModal";

function ListDocuments() {
  const [documents, setDocuments] = useState([]);
  const [show, setShow] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [linking, setLinking] = useState(false);
  const [selectedLinkDocuments, setSelectedLinkDocuments] = useState([]);

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
    // console.log(document.id);
    const newDoc = await API.getDocumentById(document.id);
    setSelectedDocument(newDoc);
    if(linking) {
      setShowLinkModal(true);
    } else{
      setShow(true);
    }
  };

  const handleSave = (document) => {
    API.updateDocument(document.id, document);
    setShow(false);
  };

  const handleLinkToClick = () => {
    setLinking(true);
  };

  const handleAdd = (document) => {
    API.addDocument(document)
    .then(() => {
      API.getAllDocumentSnippets()
      .then((response) => {
        setDocuments(response);
      })
      .catch((error) => {
        console.error(error);
      });
    })
    .catch((error) => {
      console.error(error);
    });
    setShow(false);

  }

  const handleDelete = (documentId) => {
    API.deleteDocument(documentId);
    setShow(false);
  };

  const handleLinkConfirm = (linkedDocument) => {
    setSelectedLinkDocuments((prevDocuments) => [
      ...prevDocuments,
      linkedDocument,
    ]);
    setShowLinkModal(false);
  };

  return (
    <Container fluid className="d-flex flex-column vh-100 p-3">
      <Row>
        {linking ? (
          <h1>Link a document</h1>
        ) : (
          <h1>Documents</h1>
        )}
      </Row>
      <Row className="d-flex justify-content-between align-items-center mb-3">
      <Col xs="auto">
      {linking ? (
            <p>Choose the document you want to link</p>
          ) : (
            <>
              <p>Here you can find all the documents about Kiruna&apos;s relocation process.</p>
              <p>Click on a document to see more details.</p>
            </>
          )}
      </Col>
        <Col xs="auto">
          {linking ? (
            <Button 
            variant="primary"
            style={{ width: "90px"}}
            onClick={() => {
              // console.log(selectedLinkDocuments);
              //setSelectedDocument({ isEditable: true });
              alert("All the selected links have been confirmed!")
              setLinking(false);
            }}>
             Link ({selectedLinkDocuments.length})
            </Button>
          ) : (
            <Button 
          variant="primary"
          style={{ width: "150px"}}
          onClick={() => {
            setSelectedDocument({ isEditable: true }); 
            setShow(true);
          }}>
          Add new card
          </Button>
          )}
        </Col>
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
          <>
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
          
          </>
        )}
      </div>
    </Container>
  );
}

export default ListDocuments;
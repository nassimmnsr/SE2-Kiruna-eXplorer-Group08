// ListDocuments.js
import { useEffect, useState } from "react";
import { Container, Table, Row } from "react-bootstrap";

import "../App.css";
import DocumentModal from "./DocumentModal";
import API from "../MockAPI";
// import API from "../API";
// import Document from "../model/Document";

function ListDocuments() {
  const [documents, setDocuments] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row

  useEffect(() => {
    API.getAvailableDocuments()
      .then((response) => {
        setDocuments(response);
        console.log(documents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(documents);
  }, [documents]);

  const handleSelection = (document) => {
    setSelectedDocument(document);
    setShow(true);
  };

  const handleSave = (document) => {
    API.updateDocument(document.id, document);
    setShow(false);
  };

  return (
    <Container fluid className="d-flex flex-column vh-100 p-3 mt-3">
      <Row className="mt-5">
        <h1>Documents</h1>
      </Row>
      <Row>
        <p>Here you can find all the documents about Kiruna&apos;s relocation process.</p>
        <p>Click on a document to see more details.</p>
      </Row>
      {/* Scrollable table body */}
      <div
        className="mx-auto"
        style={{
          width: "80%",
          height: "60vh",
          overflowY: "auto",
          marginBottom: "70px",
        }}
      >
        <Table hover className="mt-5">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Scale</th>
              <th>Issuance Date</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => (
              <tr
                key={document.id}
                style={{ height: "60px", cursor: "pointer" }}
                onClick={() => handleSelection(document)}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td
                  className="align-middle"
                  style={{ width: "50px", textAlign: "center" }}
                >
                  {hoveredRow === index && <i className="bi bi-eye-fill "></i>}
                </td>
                <td className="align-middle">
                  <em>{document.title}</em>
                </td>
                <td className="align-middle">{document.scale}</td>
                <td className="align-middle">{document.issuance_date}</td>
                <td className="align-middle">{document.type}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {selectedDocument && (
          <DocumentModal
            show={show}
            onHide={() => {
              setSelectedDocument(null);
              setShow(false);
            }}
            document={selectedDocument}
            handleSave={handleSave}
          />
        )}
      </div>
    </Container>
  );
}

export default ListDocuments;

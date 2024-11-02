import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Document from "../model/Document.mjs";

function DocumentModal(props) {
  const [isEditable, setIsEditable] = useState(false);

  const [title, setTitle] = useState("");
  const [stakeholders, setStakeholders] = useState("");
  const [scale, setScale] = useState("");
  const [issuanceDate, setIssuanceDate] = useState("");
  const [type, setType] = useState("");
  const [nrConnections, setNrConnections] = useState("");
  const [language, setLanguage] = useState("");
  const [nrPages, setNrPages] = useState("");
  const [geolocation, setGeolocation] = useState("");
  const [description, setDescription] = useState("");

  // Update the description state when the document prop changes
  useEffect(() => {
    setTitle(props.document.title);
    setStakeholders(props.document.stakeholders || "");
    setScale(props.document.scale || "");
    setIssuanceDate(props.document.issuance_date || "");
    setType(props.document.type || "");
    setNrConnections(props.document.nr_connections || "");
    setLanguage(props.document.language || "");
    setNrPages(props.document.nr_pages || "");
    setGeolocation(props.document.geolocation || "");
    setDescription(props.document.description || "");
  }, [props.document]);

  // Handle the save button click
  const handleSaveClick = () => {
    props.handleSave(
      new Document(
        props.document.id,
        title,
        stakeholders,
        scale,
        issuanceDate,
        type,
        nrConnections,
        language,
        nrPages,
        geolocation,
        description
      )
    ); // Pass the updated description to handleSave
    props.onHide(); // Close the modal after saving
  };

  const handleModifyClick = () => {
    setIsEditable(true);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered
      className="document-modal"
      size="lg"
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>
          {isEditable ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "200%" }}
            />
          ) : (
            props.document.title
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="document-info">
          <div className="info-section">
            <div className="info-item">
              <label>Stakeholders:</label>
              <span>
                {isEditable ? (
                  <input
                    type="text"
                    value={stakeholders}
                    onChange={(e) => setStakeholders(e.target.value)}
                  />
                ) : (
                  props.document.stakeholders
                )}
              </span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Scale:</label>
              <span>
                {isEditable ? (
                  <input
                    type="text"
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                  />
                ) : (
                  props.document.scale
                )}
              </span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Issuance Date:</label>
              <span>
                {isEditable ? (
                  <input
                    type="text"
                    value={issuanceDate}
                    onChange={(e) => setIssuanceDate(e.target.value)}
                  />
                ) : (
                  props.document.issuance_date
                )}
              </span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Type:</label>
              <span>
                {isEditable ? (
                  <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                ) : (
                  props.document.type
                )}
              </span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Connections:</label>
              <span>
                {isEditable ? (
                  <input
                    type="text"
                    value={nrConnections}
                    onChange={(e) => setNrConnections(e.target.value)}
                  />
                ) : (
                  props.document.nr_connections
                )}
              </span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Language:</label>
              <span>
                {isEditable ? (
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                ) : (
                  props.document.language
                )}
              </span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Pages:</label>
              <span>
                {isEditable ? (
                  <input
                    type="text"
                    value={nrPages}
                    onChange={(e) => setNrPages(e.target.value)}
                  />
                ) : (
                  props.document.nr_pages
                )}
              </span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Coordinates:</label>
              <span>
                {isEditable ? (
                  <input
                    type="text"
                    value={geolocation}
                    onChange={(e) => setGeolocation(e.target.value)}
                  />
                ) : (
                  props.document.geolocation
                )}
              </span>
            </div>
          </div>
          <div className="divider-vertical"></div>
          <div className="description-area">
            <label>Description:</label>
            <textarea
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="description-textarea"
              readOnly={!isEditable}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        {isEditable ? (
          <>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveClick}>
              Save Changes
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleModifyClick}>
            <i className="bi bi-pencil-fill me-3" />
            Modify
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

DocumentModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  document: PropTypes.object,
  handleSave: PropTypes.func,
};

export default DocumentModal;

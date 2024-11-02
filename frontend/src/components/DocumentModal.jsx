import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function DocumentModal(props) {
  const [description, setDescription] = useState("");

  // Update the description state when the document prop changes
  useEffect(() => {
    setDescription(props.document.description || "");
  }, [props.document]);

  // Handle the save button click
  const handleSaveClick = () => {
    props.handleSave(description);  // Pass the updated description to handleSave
    props.onHide();  // Close the modal after saving
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered className="document-modal" size='lg'>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>{props.document.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="document-info">
          <div className="info-section">
            <div className="info-item">
              <label>Stakeholders:</label>
              <span>{props.document.stakeholders}</span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Scale:</label>
              <span>{props.document.scale}</span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Issuance Date:</label>
              <span>{props.document.issuance_date}</span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Type:</label>
              <span>{props.document.type}</span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Connections:</label>
              <span>{props.document.nr_connections}</span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Language:</label>
              <span>{props.document.language}</span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Pages:</label>
              <span>{props.document.nr_pages}</span>
            </div>
            <div className="divider"></div>
            <div className="info-item">
              <label>Coordinates:</label>
              <span>{props.document.geolocation}</span>
            </div>
          </div>
          <div className="divider-vertical"></div>
          <div className="description-area">
            <label>Description:</label>
            <textarea
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Allow user to edit
              className="description-textarea"
              autoFocus
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

DocumentModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  document: PropTypes.object,
  handleSave: PropTypes.func
};

export default DocumentModal;

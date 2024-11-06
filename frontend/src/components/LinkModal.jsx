import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const LinkModal = ({ showModal, handleClose, document, setSelectedLinkDocuments, selectedLinkDocuments }) => {
  const [selectedLink, setSelectedLink] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    setSelectedLink(e.target.value);
    if (e.target.value === '') {
      setErrors({ type: 'Please select a link type.' });
    } else {
      setErrors({});
    }
  };

  const handleConfirm = () => {
    if (selectedLink) {
      setSelectedLinkDocuments((prevDocuments) => [
        ...prevDocuments,
        { document, linkType: selectedLink },
      ]);
      setSelectedLink(''); 
      handleClose(); 
    }
  }

  return (
    <Modal show={showModal} onHide={handleClose} centered className='document-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Select a Link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formLinkType">
          <Form.Label>Link Type *</Form.Label>
          <Form.Control
            as="select"
            value={selectedLink}
            onChange={handleChange}
            isInvalid={!!errors.type}
            required
          >
            <option value="">Select type</option>
            <option value="Direct consequence">Direct consequence</option>
            <option value="Collateral consequence">Collateral consequence</option>
            <option value="Prevision">Prevision</option>
            <option value="Update">Update</option>
          </Form.Control>
          {errors.type && (
            <Form.Control.Feedback type="invalid">
              {errors.type}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
LinkModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  setSelectedLinkDocuments: PropTypes.func.isRequired,
  selectedLinkDocuments: PropTypes.array.isRequired,
};

export default LinkModal;

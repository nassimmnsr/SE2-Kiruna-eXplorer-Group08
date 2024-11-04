import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Document from "../model/Document.mjs";

function DocumentModal(props) {
  const [isEditable, setIsEditable] = useState(false);

  const [title, setTitle] = useState("");
  const [stakeholders, setStakeholders] = useState([]);
  const [scale, setScale] = useState("");
  const [issuanceDate, setIssuanceDate] = useState("");
  const [type, setType] = useState("");
  const [nrConnections, setNrConnections] = useState("");
  const [language, setLanguage] = useState("");
  const [nrPages, setNrPages] = useState("");
  const [geolocation, setGeolocation] = useState("");
  const [description, setDescription] = useState("");

  // Update the state when the document prop changes
  useEffect(() => {
    setTitle(props.document.title);
    setStakeholders(props.document.stakeholders || []);
    setScale(props.document.scale);
    setIssuanceDate(props.document.issuance_date);
    setType(props.document.type);
    setNrConnections(props.document.nr_connections);
    setLanguage(props.document.language);
    setNrPages(props.document.nr_pages);
    setGeolocation(props.document.geolocation);
    setDescription(props.document.description);
  }, [props.document]);

  // Handle the save button click
  const handleSaveClick = () => {
    if (
      !title ||
      !scale ||
      !issuanceDate ||
      !type ||
      !nrConnections ||
      !language ||
      !nrPages ||
      !geolocation ||
      !description
    ) {
      alert("Please fill in all required fields.");
    } else {
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
      );
      props.onHide();
    }
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
      // fullscreen={isEditable}
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title>
          {isEditable ? "Enter the values in the following fields" : title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        {isEditable ? (
          <DocumentFormComponent
            title={title}
            stakeholders={stakeholders}
            scale={scale}
            issuanceDate={issuanceDate}
            type={type}
            nrConnections={nrConnections}
            language={language}
            nrPages={nrPages}
            geolocation={geolocation}
            description={description}
            setTitle={setTitle}
            setStakeholders={setStakeholders}
            setScale={setScale}
            setIssuanceDate={setIssuanceDate}
            setType={setType}
            setNrConnections={setNrConnections}
            setLanguage={setLanguage}
            setNrPages={setNrPages}
            setGeolocation={setGeolocation}
            setDescription={setDescription}
          />
        ) : (
          <ModalBodyComponent
            title={title}
            stakeholders={stakeholders}
            scale={scale}
            issuanceDate={issuanceDate}
            type={type}
            nrConnections={nrConnections}
            language={language}
            nrPages={nrPages}
            geolocation={geolocation}
            description={description}
          />
        )}
      </Modal.Body>
      <Modal.Footer className="mt-3">
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        {isEditable ? (
          <Button variant="primary" onClick={handleSaveClick}>
            Save Changes
          </Button>
        ) : (
          <Button variant="primary" onClick={handleModifyClick}>
            Modify
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

DocumentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

function ModalBodyComponent(props) {
  return (
    <div className="document-info">
      <div className="info-section">
        <div className="info-item">
          <label>Stakeholders:</label>
          <span>{props.stakeholders}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Scale:</label>
          <span>{props.scale}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Issuance Date:</label>
          <span>{props.issuanceDate}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Type:</label>
          <span>{props.type}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Connections:</label>
          <span>{props.nrConnections}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Language:</label>
          <span>{props.language}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Pages:</label>
          <span>{props.nrPages}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Location:</label>
          <span>{props.geolocation}</span>
        </div>
      </div>
      <div className="divider-vertical"></div>
      <div className="description-area">
        <label>Description:</label>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

ModalBodyComponent.propTypes = {
  title: PropTypes.string,
  stakeholders: PropTypes.array,
  scale: PropTypes.string,
  issuanceDate: PropTypes.string,
  type: PropTypes.string,
  nrConnections: PropTypes.string,
  language: PropTypes.string,
  nrPages: PropTypes.string,
  geolocation: PropTypes.string,
  description: PropTypes.string,
};

ModalBodyComponent.defaultProps = {
  stakeholders: [],
};

function DocumentFormComponent(props) {
  const handleAddStakeholder = () => {
    props.setStakeholders([...props.stakeholders, ""]);
  };

  const handleDeleteStakeholder = (index) => {
    const newStakeholders = props.stakeholders.filter((_, i) => i !== index);
    props.setStakeholders(newStakeholders);
  };

  const handleStakeholderChange = (index, value) => {
    const newStakeholders = [...props.stakeholders];
    newStakeholders[index] = value;
    props.setStakeholders(newStakeholders);
  };

  return (
    <Form style={{ width: "100%" }} className="mx-auto">
      <Form.Group className="mb-3" controlId="formDocumentTitle">
        <Form.Label>Title *</Form.Label>
        <Form.Control
          type="text"
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          minLength={2}
          maxLength={64}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentStakeholders">
        <Form.Label>Stakeholders *</Form.Label>
        {props.stakeholders.map((stakeholder, index) => (
          <div key={index} className="d-flex mb-2">
            <Form.Control
              type="text"
              value={stakeholder}
              onChange={(e) => handleStakeholderChange(index, e.target.value)}
              required
            />
            <Button
              variant="danger"
              onClick={() => handleDeleteStakeholder(index)}
              className="ms-2"
            >
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        ))}
        <Button variant="primary" onClick={handleAddStakeholder}>
          Add Stakeholder
        </Button>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentScale">
        <Form.Label>Scale *</Form.Label>
        <Form.Control
          type="text"
          value={props.scale}
          onChange={(e) => props.setScale(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentIssuanceDate">
        <Form.Label>Issuance Date *</Form.Label>
        <Form.Control
          type="date"
          value={props.issuanceDate}
          onChange={(e) => props.setIssuanceDate(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentType">
        <Form.Label>Type *</Form.Label>
        <Form.Control
          as="select"
          value={props.type}
          onChange={(e) => props.setType(e.target.value)}
          required
        >
          <option value="">Select type</option>
          <option value="Design document">Design document</option>
          <option value="Material effect">Material effect</option>
          <option value="Technical document">Technical document</option>
          <option value="Prescriptive document">Prescriptive document</option>
          <option value="Informative document">Informative document</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentNrConnections">
        <Form.Label>Connections</Form.Label>
        <Form.Control
          type="text"
          value={props.nrConnections}
          onChange={(e) => props.setNrConnections(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentLanguage">
        <Form.Label>Language</Form.Label>
        <Form.Control
          type="text"
          value={props.language}
          onChange={(e) => props.setLanguage(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentNrPages">
        <Form.Label>Number of Pages</Form.Label>
        <Form.Control
          type="text"
          value={props.nrPages}
          onChange={(e) => props.setNrPages(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentGeolocation">
        <Form.Label>Geolocation</Form.Label>
        <Form.Control
          type="text"
          value={props.geolocation}
          onChange={(e) => props.setGeolocation(e.target.value)}
          required
        />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentWholeMunicipality">
        <Form.Check
          type="checkbox"
          label="Whole municipality"
          onChange={(e) => {
            if (e.target.checked) {
              props.setGeolocation("");
            }
            document.getElementById("formDocumentGeolocation").disabled =
              e.target.checked;
          }}
        />
        <Form.Text>
          <i className="bi bi-info-circle me-2"></i>
          Enter geolocation in the format <em>latitude, longitude</em> or check the box to select the entire municipality area.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDocumentDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
          required
        />
      </Form.Group>
    </Form>
  );
}

DocumentFormComponent.propTypes = {
  title: PropTypes.string.isRequired,
  stakeholders: PropTypes.array.isRequired,
  scale: PropTypes.string.isRequired,
  issuanceDate: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nrConnections: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  nrPages: PropTypes.string.isRequired,
  geolocation: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setStakeholders: PropTypes.func.isRequired,
  setScale: PropTypes.func.isRequired,
  setIssuanceDate: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
  setNrConnections: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setNrPages: PropTypes.func.isRequired,
  setGeolocation: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
};

export default DocumentModal;

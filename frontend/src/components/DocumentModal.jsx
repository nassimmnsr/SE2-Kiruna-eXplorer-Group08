import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Document from "../model/Document.mjs";
import dayjs from "dayjs";

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
  const [errors, setErrors] = useState({});

  // Update the state when the document prop changes
  useEffect(() => {
    if (props.document) {
      setIsEditable(props.document.isEditable || false);
      setTitle(props.document.title || "");
      setStakeholders(props.document.stakeholders || []);
      setScale(props.document.scale || "");
      setIssuanceDate(props.document.issuance_date || "");
      setType(props.document.type || "");
      setNrConnections(props.document.nr_connections || "");
      setLanguage(props.document.language || "");
      setNrPages(props.document.nr_pages || "");
      setGeolocation(props.document.geolocation || "");
      setDescription(props.document.description || "");
    }
    setErrors({});
  }, [props.document]);

  const validateForm = () => {
    const validationErrors = {};

    if (title.trim() === "" || title === null) {
      validationErrors.title = "This field cannot be empty.";
    } else if (title.length < 2) {
      validationErrors.title = "Title must be at least 2 characters long.";
    } else if (title.length > 64) {
      validationErrors.title = "Title must be at most 64 characters long.";
    }

    if (scale.trim() === "" || scale === null) {
      validationErrors.scale = "This field cannot be empty.";
    } else if (
      scale !== "text" &&
      scale !== "blueprint/material effects" &&
      !scale.match("^1:[1-9][0-9]*$")
    ) {
      validationErrors.scale =
        "Please enter a valid scale. (ex. text, blueprint/material effects, 1:100)";
    }

    if (issuanceDate.trim() === "" || issuanceDate === null) {
      validationErrors.issuanceDate = "This field cannot be empty.";
    } else if (!dayjs(issuanceDate, "YYYY-MM-DD").isValid()) {
      validationErrors.issuanceDate =
        "Please enter a valid date. (ex. 01/01/2021)";
    }

    if (type.trim() === "" || type === null) {
      validationErrors.type = "This field cannot be empty.";
    }

    if (description.trim() === "" || description === null) {
      validationErrors.description = "This field cannot be empty.";
    } else if (description.length < 2) {
      validationErrors.description =
        "Description must be at least 2 characters long.";
    } else if (description.length > 1000) {
      validationErrors.description =
        "Description must be at most 1000 characters long.";
    }

    if (stakeholders.length === 0) {
      validationErrors.stakeholders = "This field cannot be empty.";
    } else {
      for (let s of stakeholders) {
        if (s.trim() === "" || s === null) {
          validationErrors.stakeholders = "This field cannot be empty.";
        }
      }
    }

    if (language.trim() !== "" && language !== null && language.length > 64) {
      validationErrors.language =
        "Language must be at most 64 characters long.";
    }

    if (!isNaN(nrPages)) {
      validationErrors.nrPages = "Please enter a valid number of pages.";
    }

    if (
      geolocation.trim() !== "" &&
      geolocation !== null &&
      //&& !geolocation.match(/^(\+|-)?(90(\.0+)?|[0-8]?\d(\.\d+)?),\s*(\+|-)?(180(\.0+)?|1[0-7]\d(\.\d+)?|0?\d{1,2}(\.\d+)?)$/)
      geolocation !== "Whole municipality"
    ) {
      validationErrors.geolocation = "Please enter a valid geolocation. (ex. ";
    } else if (
      geolocation === "Whole municipality" &&
      geolocation.length > 64
    ) {
      validationErrors.geolocation =
        "Geolocation must be at most 64 characters long.";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (props.document.id === null) {
      props.handleAdd(
        new Document(
          null,
          title,
          stakeholders,
          scale,
          issuanceDate,
          type,
          language,
          nrPages,
          geolocation,
          description
        )
      );
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
    }
    props.onHide();
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
            errors={errors}
            setErrors={setErrors}
            handleSubmit={handleSubmit}
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
          <Button variant="primary" onClick={handleSubmit}>
            Save
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
  handleAdd: PropTypes.func.isRequired,
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
          isInvalid={!!props.errors.title}
          minLength={2}
          maxLength={64}
          required
        />
        {props.errors.title && (
          <Form.Control.Feedback type="invalid">
            {props.errors.title}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentStakeholders">
        <Form.Label>Stakeholders *</Form.Label>
        {props.stakeholders.map((stakeholder, index) => (
          <div key={index} className="d-flex mb-2">
            <Form.Control
              type="text"
              value={stakeholder}
              onChange={(e) => handleStakeholderChange(index, e.target.value)}
              isInvalid={!!props.errors.stakeholders}
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
        {props.errors.stakeholders && (
          <Form.Control.Feedback type="invalid">
            {props.errors.stakeholders}
          </Form.Control.Feedback>
        )}
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
          isInvalid={!!props.errors.scale}
          required
        />
        {props.errors.scale && (
          <Form.Control.Feedback type="invalid">
            {props.errors.scale}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentIssuanceDate">
        <Form.Label>Issuance Date *</Form.Label>
        <Form.Control
          type="date"
          value={props.issuanceDate}
          onChange={(e) => props.setIssuanceDate(e.target.value)}
          isInvalid={!!props.errors.issuanceDate}
          required
        />
        {props.errors.issuanceDate && (
          <Form.Control.Feedback type="invalid">
            {props.errors.issuanceDate}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentType">
        <Form.Label>Type *</Form.Label>
        <Form.Control
          as="select"
          value={props.type}
          onChange={(e) => props.setType(e.target.value)}
          isInvalid={!!props.errors.type}
          required
        >
          <option value="">Select type</option>
          <option value="Design document">Design document</option>
          <option value="Material effect">Material effect</option>
          <option value="Technical document">Technical document</option>
          <option value="Prescriptive document">Prescriptive document</option>
          <option value="Informative document">Informative document</option>
        </Form.Control>
        {props.errors.type && (
          <Form.Control.Feedback type="invalid">
            {props.errors.type}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      {/*<Form.Group className="mb-3" controlId="formDocumentNrConnections">
        <Form.Label>Connections</Form.Label>
        <Form.Control
          type="text"
          value={props.nrConnections}
          onChange={(e) => props.setNrConnections(e.target.value)}
        />
      </Form.Group>*/}
      <Form.Group className="mb-3" controlId="formDocumentLanguage">
        <Form.Label>Language</Form.Label>
        <Form.Control
          type="text"
          value={props.language}
          onChange={(e) => props.setLanguage(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentNrPages">
        <Form.Label>Pages</Form.Label>
        <Form.Control
          type="text"
          value={props.nrPages}
          onChange={(e) => props.setNrPages(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDocumentGeolocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={props.geolocation}
          onChange={(e) => props.setGeolocation(e.target.value)}
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
          Enter geolocation in the format <em>latitude, longitude</em> or check
          the box to select the entire municipality area.
        </Form.Text>
      </Form.Group>
      {props.errors.geolocation && (
        <Form.Control.Feedback type="invalid">
          {props.errors.geolocation}
        </Form.Control.Feedback>
      )}
      <Form.Group className="mb-3" controlId="formDocumentDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
          isInvalid={!!props.errors.description}
          required
        />
        {props.errors.description && (
          <Form.Control.Feedback type="invalid">
            {props.errors.description}
          </Form.Control.Feedback>
        )}
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
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default DocumentModal;

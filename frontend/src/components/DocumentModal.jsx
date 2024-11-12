import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Document } from "../model/Document.mjs";
// import dayjs from "dayjs";
import "../App.css";

function DocumentModal(props) {
  const [isEditable, setIsEditable] = useState(false);

  const [title, setTitle] = useState("");
  const [stakeholders, setStakeholders] = useState([]);
  const [scale, setScale] = useState("");
  const [issuanceDate, setIssuanceDate] = useState("");
  const [type, setType] = useState("");
  const [nrConnections, setNrConnections] = useState(0);
  const [language, setLanguage] = useState("");
  const [nrPages, setNrPages] = useState(0);
  const [geolocation, setGeolocation] = useState({
    latitude: undefined,
    longitude: undefined,
    municipality: "Whole municipality",
  });
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  // Update the state when the document prop changes
  useEffect(() => {
    if (props.document) {
      setIsEditable(props.document.isEditable || false);
      setTitle(props.document.title || "");
      setStakeholders(props.document.stakeholders || []);
      setScale(props.document.scale || "");
      setIssuanceDate(props.document.issuanceDate || "");
      setType(props.document.type || "");
      setNrConnections(props.document.nrConnections || 0);
      setLanguage(props.document.language || "");
      setNrPages(props.document.nrPages || 0);
      setGeolocation(
        props.document.geolocation || {
          latitude: undefined,
          longitude: undefined,
          municipality: "Whole municipality",
        }
      );
      setDescription(props.document.description || "");
    }
    setErrors({});
  }, [props.document]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {};

    // Title validation
    if (typeof title !== "string" || !title.trim()) {
      newErrors.title = "Title is required and must be a non-empty string.";
    } else if (title.length < 2) {
      newErrors.title = "Title must be at least 2 characters.";
    } else if (title.length > 64) {
      newErrors.title = "Title must be less than 64 characters.";
    }

    // Stakeholders validation
    if (
      !Array.isArray(stakeholders) ||
      stakeholders.length === 0 ||
      stakeholders.some((s) => typeof s !== "string" || !s.trim())
    ) {
      newErrors.stakeholders =
        "At least one stakeholder is required, and all must be non-empty strings.";
    }

    // Scale validation
    const scalePatterns = [
      "text",
      "blueprint/material effects",
      /^1:[1-9][0-9]*$/,
    ];
    if (
      typeof scale !== "string" ||
      !scale.trim() ||
      !scalePatterns.some((pattern) =>
        typeof pattern === "string" ? pattern === scale : pattern.test(scale)
      )
    ) {
      newErrors.scale =
        "Scale is required and must match one of the defined patterns.";
    }

    // Issuance date validation
    if (
      typeof issuanceDate !== "string" ||
      !issuanceDate.match(/^\d{4}-\d{2}-\d{2}$/)
    ) {
      newErrors.issuanceDate =
        "Issuance date is required and must be in the format YYYY-MM-DD.";
    }

    // Type validation
    const validTypes = [
      "Design document",
      "Material effect",
      "Technical document",
      "Prescriptive document",
      "Informative document",
    ];
    if (!validTypes.includes(type)) {
      newErrors.type =
        "Type is required and must be one of the predefined values.";
    }

    if (language && (language.length < 2 || language.length > 64)) {
      newErrors.language = "Language must be between 2 and 64 characters.";
    }

    // Number of pages validation
    if (nrPages && typeof nrPages !== "number") {
      newErrors.nrPages = "Number of pages must be an integer";
    }

    // Geolocation validation
    if (typeof geolocation === "object" && geolocation) {
      if (
        (geolocation.latitude &&
          (geolocation.latitude > 67.88398 ||
            geolocation.latitude < 67.82295)) ||
        (geolocation.longitude && !geolocation.latitude)
      ) {
        newErrors.latitude =
          "Latitude must be in the range between 67.82295 and 67.88398.";
      }
      if (
        (geolocation.longitude &&
          (geolocation.longitude > 20.3687 ||
            geolocation.longitude < 20.14402)) ||
        (geolocation.latitude && !geolocation.longitude)
      ) {
        newErrors.longitude =
          "Longitude must be in the range between 20.14402 and 20.36870.";
      }
      if (
        geolocation.latitude &&
        geolocation.longitude &&
        geolocation.municipality !== "Whole municipality"
      ) {
        newErrors.municipality =
          "Geolocation must be 'Whole municipality' or a valid coordinate.";
      }
    }

    // Description validation
    if (description && description.length > 1000) {
      newErrors.description = "Description must not exceed 1000 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (props.document.id === undefined) {
      props.handleAdd(
        new Document(
          null, // id
          title, // title
          stakeholders, // stakeholders
          scale, // scale
          issuanceDate, // issuanceDate
          type, // type
          0, // nrConnections (default 0)
          language, // language
          nrPages, // nrPages
          geolocation, // geolocation
          description // description
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
          {
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
          },
          description
        )
      );
    }
    props.onHide();
  };

  // const handleModifyClick = () => {
  //   setIsEditable(true);
  // };

  const handleLinkToClick = () => {
    props.onHide();
    props.onLinkToClick();
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
          <div className="d-flex align-items-center">
            <Button
              variant="primary"
              onClick={handleLinkToClick}
              className="me-2"
            >
              Link to
            </Button>
            {/* <Button
              variant="primary"
              onClick={handleModifyClick}
              className="me-2"
            >
              Modify
            </Button> */}
          </div>
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
  onLinkToClick: PropTypes.func.isRequired,
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
          <span>
            {props.nrConnections === 0 ? (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    This document has no links yet. Remember to add them.
                  </Tooltip>
                }
              >
                <i className="bi bi-exclamation-triangle"></i>
              </OverlayTrigger>
            ) : (
              props.nrConnections
            )}
          </span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Language:</label>
          <span>{props.language ? `${props.language}` : "-"}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Pages:</label>
          <span>{props.nrPages > 0 ? `${props.nrPages}` : "-"}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Location:</label>
          <span>
            {props.geolocation.latitude && props.geolocation.longitude ? (
              `${props.geolocation.latitude}, ${props.geolocation.longitude}`
            ) : props.geolocation.municipality ? (
              `${props.geolocation.municipality}`
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    This document hasn&apos;t been geolocated yet. Remember to
                    add it.
                  </Tooltip>
                }
              >
                <i className="bi bi-exclamation-triangle"></i>
              </OverlayTrigger>
            )}
          </span>
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
  nrConnections: PropTypes.number,
  language: PropTypes.string,
  nrPages: PropTypes.number,
  geolocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    municipality: PropTypes.string,
  }),
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
      {/* TITLE */}
      <Form.Group className="mb-3" controlId="formDocumentTitle">
        <Form.Label>Title *</Form.Label>
        <Form.Control
          type="text"
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          isInvalid={!!props.errors.title}
          required
        />
        {props.errors.title && (
          <Form.Control.Feedback type="invalid">
            {props.errors.title}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <div className="divider"></div>
      {/* STAKEHOLDERS */}
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
        <div>
          <Button variant="primary" onClick={handleAddStakeholder}>
            Add Stakeholder
          </Button>
        </div>
      </Form.Group>
      <div className="divider"></div>
      {/* SCALE */}
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
      <div className="divider"></div>
      {/* ISSUANCE DATE */}
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
      <div className="divider"></div>
      {/* TYPE */}
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
      <div className="divider"></div>
      {/* LANGUAGE */}
      <Form.Group className="mb-3" controlId="formDocumentLanguage">
        <Form.Label>Language</Form.Label>
        <Form.Control
          type="text"
          value={props.language}
          onChange={(e) => props.setLanguage(e.target.value)}
        />
      </Form.Group>
      <div className="divider"></div>
      {/* PAGES */}
      <Form.Group className="mb-3" controlId="formDocumentNrPages">
        <Form.Label>Pages</Form.Label>
        <Form.Control
          type="number"
          value={props.nrPages}
          min={0}
          onChange={(e) => props.setNrPages(Number(e.target.value))}
        />
      </Form.Group>
      <div className="divider"></div>
      {/* GEOLOCATION */}
      <Form.Group className="mb-3">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="number"
          min={67.82295}
          max={67.88398}
          step={0.00001}
          value={props.geolocation.latitude}
          isInvalid={!!props.errors.latitude}
          onChange={(e) =>
            props.setGeolocation({
              ...props.geolocation,
              latitude: e.target.value,
              municipality: null,
            })
          }
          id="formDocumentGeolocationLatitude"
          disabled={props.geolocation.municipality === "Whole municipality"}
        />
        {props.errors.latitude && (
          <Form.Control.Feedback type="invalid">
            {props.errors.latitude}
          </Form.Control.Feedback>
        )}
        <Form.Range
          min={67.82295}
          max={67.88398}
          step={0.00001}
          value={props.geolocation.latitude}
          isInvalid={!!props.errors.latitude}
          onChange={(e) =>
            props.setGeolocation({
              ...props.geolocation,
              latitude: e.target.value,
              municipality: null,
            })
          }
          disabled={props.geolocation.municipality === "Whole municipality"}
        />

        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="number"
          value={props.geolocation.longitude}
          min={20.14402}
          max={20.3687}
          step={0.00001}
          isInvalid={!!props.errors.longitude}
          onChange={(e) =>
            props.setGeolocation({
              ...props.geolocation,
              longitude: e.target.value,
              municipality: null,
            })
          }
          id="formDocumentGeolocationLongitude"
          disabled={props.geolocation.municipality === "Whole municipality"}
        />
        {props.errors.longitude && (
          <Form.Control.Feedback type="invalid">
            {props.errors.longitude}
          </Form.Control.Feedback>
        )}
        <Form.Range
          min={20.14402}
          max={20.3687}
          step={0.00001}
          value={props.geolocation.longitude}
          isInvalid={!!props.errors.longitude}
          onChange={(e) =>
            props.setGeolocation({
              ...props.geolocation,
              longitude: e.target.value,
              municipality: null,
            })
          }
          disabled={props.geolocation.municipality === "Whole municipality"}
        />

        <Form.Check
          type="checkbox"
          label="Whole municipality"
          checked={props.geolocation.municipality === "Whole municipality"}
          onChange={(e) => {
            if (e.target.checked) {
              props.setGeolocation({
                latitude: null,
                longitude: null,
                municipality: "Whole municipality",
              });
            } else {
              props.setGeolocation({
                ...props.geolocation,
                municipality: null,
              });
            }
            document.getElementById(
              "formDocumentGeolocationLatitude"
            ).disabled = e.target.checked;
            document.getElementById(
              "formDocumentGeolocationLongitude"
            ).disabled = e.target.checked;
            if (e.target.checked) {
              props.setGeolocation({
                latitude: "",
                longitude: "",
                municipality: "Whole municipality",
              });
            }
          }}
          className="mt-2"
        />
      </Form.Group>
      {props.errors.municipality && (
        <Form.Control.Feedback type="invalid">
          {props.errors.municipality}
        </Form.Control.Feedback>
      )}
      <div className="divider"></div>
      {/* DESCRIPTION */}
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
  nrConnections: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  nrPages: PropTypes.number.isRequired,
  geolocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    municipality: PropTypes.string,
  }),
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

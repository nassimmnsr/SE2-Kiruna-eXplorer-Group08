import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { Button, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Document } from "../model/Document.mjs";
import dayjs from "dayjs";
import "../App.css";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default function DocumentModal(props) {
  const [isEditable, setIsEditable] = useState(false);

  const [document, setDocument] = useState({
    title: "",
    stakeholders: [],
    scale: "",
    issuanceDate: "",
    day: "",
    month: "",
    year: "",
    type: "",
    nrConnections: 0,
    language: "",
    nrPages: 0,
    geolocation: {
      latitude: "",
      longitude: "",
      municipality: "Whole municipality",
    },
    description: "",
  });
  const [errors, setErrors] = useState({});

  // Update the state when the document prop changes
  useEffect(() => {
    if (props.document) {
      setIsEditable(props.document.isEditable || false);
      setDocument({
        title: props.document.title || "",
        stakeholders: props.document.stakeholders || [],
        scale: props.document.scale || "",
        issuanceDate: props.document.issuanceDate || "",
        day: props.document.issuanceDate
          ? props.document.issuanceDate.split("-")[2] || ""
          : "",
        month: props.document.issuanceDate
          ? props.document.issuanceDate.split("-")[1] || ""
          : "",
        year: props.document.issuanceDate
          ? props.document.issuanceDate.split("-")[0] || ""
          : "",
        type: props.document.type || "",
        nrConnections: props.document.nrConnections || 0,
        language: props.document.language || "",
        nrPages: props.document.nrPages || 0,
        geolocation: {
          latitude: props.document.geolocation
            ? props.document.geolocation.latitude
            : "",
          longitude: props.document.geolocation
            ? props.document.geolocation.longitude
            : "",
          municipality: props.document.geolocation
            ? props.document.geolocation.municipality
            : "Whole municipality",
        },
        description: props.document.description || "",
      });
    }
    setErrors({});
  }, [props.document]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {}; // Reset errors

    const combinedIssuanceDate = `${document.year}${
      document.month ? "-" + document.month.padStart(2, "0") : ""
    }${document.day ? "-" + document.day.padStart(2, "0") : ""}`;

    const sanitizedGeolocation = {
      latitude: document.geolocation.latitude || null,
      longitude: document.geolocation.longitude || null,
      municipality: document.geolocation.municipality || null,
    };

    // Title validation
    if (typeof document.title !== "string" || !document.title.trim()) {
      newErrors.title = "Title is required and must be a non-empty string.";
    } else if (document.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters.";
    } else if (document.title.length > 64) {
      newErrors.title = "Title must be less than 64 characters.";
    }

    // Stakeholders validation
    if (
      !Array.isArray(document.stakeholders) ||
      document.stakeholders.length === 0 ||
      document.stakeholders.some((s) => typeof s !== "string" || !s.trim())
    ) {
      newErrors.stakeholders =
        "At least one stakeholder is required, and all must be non-empty strings.";
    } else if (
      new Set(document.stakeholders.map((s) => s.trim().toLowerCase())).size !==
      document.stakeholders.length
    ) {
      newErrors.stakeholders = "Stakeholders must not contain duplicates.";
    }

    // Scale validation
    const scalePatterns = [
      "Text",
      "Blueprint/Material effects",
      /^[1-9]:[1-9][0-9]*$/,
    ];
    if (
      typeof document.scale !== "string" ||
      !document.scale.trim() ||
      !scalePatterns.some((pattern) =>
        typeof pattern === "string"
          ? pattern === document.scale
          : pattern.test(document.scale)
      )
    ) {
      newErrors.scale =
        "Scale is required and must match one of the defined patterns.";
    }

    // Issuance date validation
    if (
      typeof combinedIssuanceDate !== "string" ||
      !dayjs(
        combinedIssuanceDate,
        ["YYYY-MM-DD", "YYYY-MM", "YYYY"],
        true
      ).isValid()
    ) {
      newErrors.issuanceDate =
        "Issuance date is required and must be in the format DD/MM/YYYY, MM/YYYY or YYYY.";
    }

    // Type validation
    const validTypes = [
      "Design document",
      "Material effect",
      "Technical document",
      "Prescriptive document",
      "Informative document",
    ];
    if (!validTypes.includes(document.type)) {
      newErrors.type =
        "Type is required and must be one of the predefined values.";
    }

    if (
      document.language &&
      (document.language.length < 2 || document.language.length > 64)
    ) {
      newErrors.language = "Language must be between 2 and 64 characters.";
    }

    // Number of pages validation
    if (document.nrPages && typeof document.nrPages !== "number") {
      newErrors.nrPages = "Number of pages must be an integer";
    }

    // Geolocation validation
    if (typeof document.geolocation === "object" && document.geolocation) {
      if (
        (document.geolocation.latitude &&
          (document.geolocation.latitude > 67.88398 ||
            document.geolocation.latitude < 67.82295)) ||
        (document.geolocation.longitude && !document.geolocation.latitude)
      ) {
        newErrors.latitude =
          "Latitude must be in the range between 67.82295 and 67.88398.";
      }
      if (
        (document.geolocation.longitude &&
          (document.geolocation.longitude > 20.3687 ||
            document.geolocation.longitude < 20.14402)) ||
        (document.geolocation.latitude && !document.geolocation.longitude)
      ) {
        newErrors.longitude =
          "Longitude must be in the range between 20.14402 and 20.36870.";
      }
      if (
        (document.geolocation.latitude || document.geolocation.longitude) &&
        document.geolocation.municipality === "Whole municipality"
      ) {
        newErrors.municipality =
          "Geolocation must be 'Whole municipality' or a valid coordinate.";
      }
    }

    // Description validation
    if (document.description && document.description.length > 1000) {
      newErrors.description = "Description must not exceed 1000 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (props.document.id === undefined) {
      props.handleAdd(
        new Document(
          null,
          document.title,
          document.stakeholders,
          document.scale,
          combinedIssuanceDate,
          document.type,
          document.nrConnections,
          document.language,
          document.nrPages,
          sanitizedGeolocation,
          document.description
        )
      );
    }
    // else {
    //   props.handleSave(
    //     new Document(props.document.id, ...document)
    //   );
    // }
    props.onHide();
  };

  // const handleModifyClick = () => {
  //   setIsEditable(true);
  // };

  const handleLinkToClick = () => {
    props.onLinkToClick(props.document);
    props.onHide();
  };
  const handleChange = (field, value) => {
    setDocument((prevDocument) => ({
      ...prevDocument,
      [field]: value,
    }));
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
          {isEditable
            ? "Enter the values in the following fields"
            : document.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        {isEditable ? (
          <DocumentFormComponent
            document={document}
            setDocument={setDocument}
            errors={errors}
            setErrors={setErrors}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        ) : (
          <ModalBodyComponent document={document} />
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

function ModalBodyComponent({ document }) {
  return (
    <div className="document-info">
      <div className="info-section">
        <div className="info-item">
          <label>Stakeholders:</label>
          <span>
            {document.stakeholders ? document.stakeholders.join(", ") : ""}
          </span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Scale:</label>
          <span>{document.scale}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Issuance Date:</label>
          <span>
            {dayjs(document.issuanceDate).format(
              document.issuanceDate.length === 4
                ? "YYYY"
                : document.issuanceDate.length === 7
                ? "MM/YYYY"
                : "DD/MM/YYYY"
            )}
          </span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Type:</label>
          <span>{document.type}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Connections:</label>
          <span>
            {document.nrConnections === 0 ? (
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
              document.nrConnections
            )}
          </span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Language:</label>
          <span>{document.language ? `${document.language}` : "-"}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Pages:</label>
          <span>{document.nrPages > 0 ? `${document.nrPages}` : "-"}</span>
        </div>
        <div className="divider"></div>
        <div className="info-item">
          <label>Location:</label>
          <span>
            {document.geolocation.latitude && document.geolocation.longitude ? (
              `${document.geolocation.latitude}, ${document.geolocation.longitude}`
            ) : document.geolocation.municipality ? (
              `${document.geolocation.municipality}`
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
        <p>{document.description}</p>
      </div>
    </div>
  );
}

ModalBodyComponent.propTypes = {
  document: PropTypes.object.isRequired,
};

function DocumentFormComponent({ document, errors, handleChange }) {
  const [customScaleValue, setCustomScaleValue] = useState("");
  const [enableCustomScale, setEnableCustomScale] = useState(false);

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const handleDayChange = (e) => {
    const value = e.target.value;
    if (value.length <= 2) {
      handleChange("day", value);
      if (value.length === 2) {
        monthRef.current.focus();
      }
    }
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    if (value.length <= 2) {
      handleChange("month", value);
      if (value.length === 2) {
        yearRef.current.focus();
      }
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4) {
      handleChange("year", value);
    }
  };

  return (
    <Form style={{ width: "100%" }} className="mx-auto">
      {/* TITLE */}
      <Form.Group className="mb-3" controlId="formDocumentTitle">
        <Form.Label>Title *</Form.Label>
        <Form.Control
          type="text"
          value={document.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Example title"
          isInvalid={!!errors.title}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="divider" />

      {/* STAKEHOLDERS */}
      <Form.Group className="mb-3" controlId="formDocumentStakeholders">
        <Form.Label>Stakeholders *</Form.Label>
        {[
          "LKAB",
          "Municipality",
          "Regional authority",
          "Architecture firms",
          "Citizen",
        ].map((stakeholderOption) => (
          <Form.Check
            key={stakeholderOption}
            type="checkbox"
            label={stakeholderOption}
            checked={document.stakeholders.includes(stakeholderOption)}
            onChange={(e) => {
              const newStakeholders = e.target.checked
                ? [...document.stakeholders, stakeholderOption]
                : document.stakeholders.filter((s) => s !== stakeholderOption);
              handleChange("stakeholders", newStakeholders);
            }}
            isInvalid={!!errors.stakeholders}
          />
        ))}
        {document.stakeholders
          .filter(
            (stakeholder) =>
              ![
                "LKAB",
                "Municipality",
                "Regional authority",
                "Architecture firms",
                "Citizen",
              ].includes(stakeholder)
          )
          .map((stakeholder, index) => (
            <div key={index} className="d-flex mb-2">
              <Form.Control
                type="text"
                value={stakeholder}
                onChange={(e) => {
                  const newStakeholders = [...document.stakeholders];
                  newStakeholders[
                    document.stakeholders.findIndex((s) => s === stakeholder)
                  ] = e.target.value;
                  handleChange("stakeholders", newStakeholders);
                }}
                placeholder="Example stakeholder"
                isInvalid={!!errors.stakeholders}
                className="me-2"
              />
              <Button
                variant="danger"
                onClick={() => {
                  const newStakeholders = document.stakeholders.filter(
                    (s) => s !== stakeholder
                  );
                  handleChange("stakeholders", newStakeholders);
                }}
                title="Delete stakeholder"
              >
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          ))}
        <div>
          <Button
            className="mt-2"
            title="Add new stakeholder"
            variant="primary"
            onClick={() =>
              handleChange("stakeholders", [...document.stakeholders, ""])
            }
          >
            <i className="bi bi-plus-square"></i>
          </Button>
        </div>
        <Form.Control.Feedback type="invalid">
          {errors.stakeholders}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="divider" />

      {/* SCALE */}
      <Form.Group className="mb-3" controlId="formDocumentScale">
        <Form.Label>Scale *</Form.Label>
        {/* Predefined Scale Options */}
        <Form.Check
          type="radio"
          label="Text"
          name="scaleOptions"
          id="scaleText"
          value="Text"
          checked={document.scale === "Text"}
          onChange={(e) => {
            handleChange("scale", e.target.value);
            setCustomScaleValue(""); // Clear custom scale when switching to predefined scale
            setEnableCustomScale(false); // Disable custom scale inputs
          }}
          isInvalid={!!errors.scale}
        />
        <Form.Check
          type="radio"
          label="Blueprint/Material effects"
          name="scaleOptions"
          id="scaleBlueprint"
          value="Blueprint/Material effects"
          checked={document.scale === "Blueprint/Material effects"}
          onChange={(e) => {
            handleChange("scale", e.target.value);
            setCustomScaleValue(""); // Clear custom scale when switching to predefined scale
            setEnableCustomScale(false); // Disable custom scale inputs
          }}
          isInvalid={!!errors.scale}
        />
        {/* Custom Scale Option */}
        <Form.Check
          type="radio"
          name="scaleOptions"
          id="scaleCustom"
          value="Custom"
          checked={
            enableCustomScale ||
            (document.scale &&
              !["Text", "Blueprint/Material effects"].includes(document.scale))
          }
          onChange={() => {
            setEnableCustomScale(true); // Enable custom scale inputs
            handleChange("scale", customScaleValue); // Set scale to the current custom value
          }}
          isInvalid={!!errors.scale}
          label={
            <div className="d-flex align-items-center">
              <Form.Control
                type="number"
                min={1}
                value={customScaleValue.split(":")[0] || ""}
                disabled={!enableCustomScale}
                onChange={(e) =>
                  setCustomScaleValue(
                    `${e.target.value}:${customScaleValue.split(":")[1] || ""}`
                  )
                }
                onBlur={() => handleChange("scale", customScaleValue)}
                isInvalid={!!errors.scale}
                className="me-1"
                style={{ width: "80px" }}
              />
              <span>:</span>
              <Form.Control
                type="number"
                min={1}
                value={customScaleValue.split(":")[1] || ""}
                disabled={!enableCustomScale}
                onChange={(e) =>
                  setCustomScaleValue(
                    `${customScaleValue.split(":")[0] || ""}:${e.target.value}`
                  )
                }
                onBlur={() => handleChange("scale", customScaleValue)}
                isInvalid={!!errors.scale}
                className="ms-1"
                style={{ width: "100px" }}
              />
            </div>
          }
        />
        <Form.Control.Feedback type="invalid">
          {errors.scale}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="divider" />

      {/* ISSUANCE DATE */}
      <Form.Group className="mb-3" controlId="formDocumentIssuanceDate">
        <Form.Label>Issuance Date *</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="text"
            value={document.day}
            onChange={(e) => handleDayChange(e)}
            isInvalid={!!errors.issuanceDate}
            placeholder="DD"
            className="me-1"
            ref={dayRef}
            style={{ width: "80px" }}
          />
          <span>/</span>
          <Form.Control
            type="text"
            value={document.month}
            onChange={(e) => handleMonthChange(e)}
            isInvalid={!!errors.issuanceDate}
            placeholder="MM"
            className="mx-1"
            ref={monthRef}
            style={{ width: "80px" }}
          />
          <span>/</span>
          <Form.Control
            type="text"
            value={document.year}
            onChange={(e) => handleYearChange(e)}
            isInvalid={!!errors.issuanceDate}
            placeholder="YYYY"
            className="ms-1"
            ref={yearRef}
            style={{ width: "100px" }}
          />
        </div>
        <Form.Control.Feedback type="invalid">
          {errors.issuanceDate}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="divider" />

      {/* TYPE */}

      <Form.Group className="mb-3" controlId="formDocumentType">
        <Form.Label>Type *</Form.Label>
        <Form.Control
          as="select"
          value={document.type}
          onChange={(e) => handleChange("type", e.target.value)}
          isInvalid={!!errors.type}
          required
        >
          <option value="">Select type</option>
          <option value="Design document">Design document</option>
          <option value="Material effect">Material effect</option>
          <option value="Technical document">Technical document</option>
          <option value="Prescriptive document">Prescriptive document</option>
          <option value="Informative document">Informative document</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.type}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="divider" />

      {/* LANGUAGE */}
      <Form.Group className="mb-3" controlId="formDocumentLanguage">
        <Form.Label>Language</Form.Label>
        <Form.Control
          type="text"
          value={document.language}
          onChange={(e) => handleChange("language", e.target.value)}
          placeholder="English"
          isInvalid={!!errors.language}
        />
        <Form.Control.Feedback type="invalid">
          {errors.language}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="divider" />

      {/* PAGES */}
      <Form.Group className="mb-3" controlId="formDocumentNrPages">
        <Form.Label>Pages</Form.Label>
        <Form.Control
          type="number"
          value={document.nrPages}
          min={0}
          onChange={(e) => handleChange("nrPages", Number(e.target.value))}
          isInvalid={!!errors.nrPages}
        />
        <Form.Control.Feedback type="invalid">
          {errors.nrPages}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="divider" />

      {/* GEOLOCATION */}
      <Form.Group className="mb-3">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="number"
          min={67.82295}
          max={67.88398}
          step={0.00001}
          value={document.geolocation.latitude}
          isInvalid={!!errors.latitude}
          onChange={(e) =>
            handleChange("geolocation", {
              ...document.geolocation,
              latitude: e.target.value,
              municipality: "",
            })
          }
          id="formDocumentGeolocationLatitude"
          disabled={document.geolocation.municipality === "Whole municipality"}
        />
        <Form.Control.Feedback type="invalid">
          {errors.latitude}
        </Form.Control.Feedback>

        <Form.Range
          min={67.82295}
          max={67.88398}
          step={0.00001}
          value={document.geolocation.latitude}
          isInvalid={!!errors.latitude}
          onChange={(e) =>
            handleChange("geolocation", {
              ...document.geolocation,
              latitude: e.target.value,
              municipality: "",
            })
          }
          disabled={document.geolocation.municipality === "Whole municipality"}
        />

        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="number"
          value={document.geolocation.longitude}
          min={20.14402}
          max={20.3687}
          step={0.00001}
          isInvalid={!!errors.longitude}
          onChange={(e) =>
            handleChange("geolocation", {
              ...document.geolocation,
              longitude: e.target.value,
              municipality: "",
            })
          }
          id="formDocumentGeolocationLongitude"
          disabled={document.geolocation.municipality === "Whole municipality"}
        />
        <Form.Control.Feedback type="invalid">
          {errors.longitude}
        </Form.Control.Feedback>
        <Form.Range
          min={20.14402}
          max={20.3687}
          step={0.00001}
          value={document.geolocation.longitude}
          isInvalid={!!errors.longitude}
          onChange={(e) =>
            handleChange("geolocation", {
              ...document.geolocation,
              longitude: e.target.value,
              municipality: "",
            })
          }
          disabled={document.geolocation.municipality === "Whole municipality"}
        />

        <Form.Check
          type="radio"
          label="Whole municipality"
          checked={document.geolocation.municipality === "Whole municipality"}
          onChange={(e) => {
            const isChecked = e.target.checked;
            handleChange("geolocation", {
              latitude: isChecked ? "" : document.geolocation.latitude,
              longitude: isChecked ? "" : document.geolocation.longitude,
              municipality: isChecked ? "Whole municipality" : "",
            });
          }}
          className="mt-2"
        />
      </Form.Group>
      <Form.Control.Feedback type="invalid">
        {errors.municipality}
      </Form.Control.Feedback>

      <div className="divider" />

      {/* DESCRIPTION */}
      <Form.Group className="mb-3" controlId="formDocumentDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={document.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Description of the document"
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

DocumentFormComponent.propTypes = {
  document: PropTypes.object.isRequired,
  setDocument: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setErrors: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

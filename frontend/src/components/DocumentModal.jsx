import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Polygon, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Document } from "../model/Document.mjs";
import { useMap } from "react-leaflet";

// Initialize Leaflet marker icon defaults
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Function to center the map on a given position
function MapCenterer({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

const kirunaBorderCoordinates = [
    [67.8774793377591, 20.170706869100258],
    [67.87748429947607, 20.170156880492076],
    [67.8775362936903, 20.169007008710658],
    [67.87768990486535, 20.16737368465619],
    [67.87776225500424, 20.166344553788214],
    [67.87777693811648, 20.165465907325178],
    [67.87775940727052, 20.164451392917137],
    [67.87768770267084, 20.163609505133543],
    [67.8773709358694, 20.161810645150076],
    [67.87692866946043, 20.160455170492355],
    [67.87639972156038, 20.159272322460048],
    [67.87581858108294, 20.158431494916083],
    [67.8743729931603, 20.15721253656828],
    [67.87220547911285, 20.157431342078056],
    [67.86960070627492, 20.157736794170788],
    [67.86686200058037, 20.154842101969976],
    [67.86178647958684, 20.147986002807514],
    [67.85941972290985, 20.14744414051002],
    [67.85082313196916, 20.144413277096014],
    [67.84609586779916, 20.14133466743696],
    [67.83712125700372, 20.139992931191763],
    [67.8317856892725, 20.13873863902123],
    [67.8285616448409, 20.14048813754337],
    [67.8147312185138, 20.152160625508962],
    [67.81195366039736, 20.155068874005085],
    [67.80942343954007, 20.159723142545012],
    [67.80741961804884, 20.16525042110838],
    [67.80641765520991, 20.169080775155592],
    [67.80521417825226, 20.173977843965147],
    [67.80354368247836, 20.184513207704633],
    [67.80203675462084, 20.199736894038587],
    [67.80081305325024, 20.20894880935299],
    [67.79945492981545, 20.21798293887232],
    [67.79752213726275, 20.227031682606132],
    [67.79518625393564, 20.23288028204805],
    [67.7958097203447, 20.233619874981596],
    [67.79713100602217, 20.234213704452486],
    [67.79885534363784, 20.234137879860505],
    [67.79997201213317, 20.23447210291652],
    [67.80094940546704, 20.234920788616087],
    [67.80192679345164, 20.234883542958837],
    [67.80334911955276, 20.234128678079486],
    [67.80483518051923, 20.233299194763372],
    [67.80545748597862, 20.233195072856347],
    [67.80684915967717, 20.23366713313093],
    [67.80783377523674, 20.234125218006106],
    [67.81286636941988, 20.23834843781372],
    [67.81766779893985, 20.247857208611258],
    [67.8205798782276, 20.2573684279481],
    [67.82230609194474, 20.26538104142323],
    [67.82301210330557, 20.2721753730819],
    [67.8249599587991, 20.285497828468053],
    [67.82708880386267, 20.29478453475386],
    [67.8290160308868, 20.300281381077824],
    [67.83289417265036, 20.305601776739678],
    [67.83598491926207, 20.307483336187396],
    [67.84080389344645, 20.307769489353305],
    [67.8435134344439, 20.307995762296855],
    [67.84560492825644, 20.315810632730884],
    [67.8467568774085, 20.31744870649017],
    [67.84716860378111, 20.317698803279576],
    [67.84721879483297, 20.31768830318787],
    [67.84725033450074, 20.317681291463042],
    [67.84728267859481, 20.317671934197932],
    [67.84734702926659, 20.317651098346417],
    [67.84739696703579, 20.31763464932518],
    [67.84745237202479, 20.317594941064353],
    [67.84750259859229, 20.317559756979357],
    [67.84752013532119, 20.317542394909786],
    [67.84754313520133, 20.317519753494956],
    [67.84756255129525, 20.317502240392223],
    [67.84757148845996, 20.317502851371916],
    [67.84759893050565, 20.317493803019588],
    [67.84761196682159, 20.3174512611228],
    [67.84763047039098, 20.31739784477616],
    [67.84767704523249, 20.31730853202995],
    [67.84772862797752, 20.317246944704635],
    [67.84779228417565, 20.317190190468075],
    [67.84783396693706, 20.317177471663967],
    [67.84787724429809, 20.317165356995073],
    [67.84789495458557, 20.31716382495275],
    [67.84791630966126, 20.317159876365295],
    [67.84796220897553, 20.31719185217512],
    [67.84799888021314, 20.317228013531675],
    [67.84811189608254, 20.317115667278713],
    [67.84818846426914, 20.316964656314394],
    [67.84823951928337, 20.316804098875075],
    [67.84833522233004, 20.316503381857224],
    [67.8484299014055, 20.316299347892606],
    [67.84853733703451, 20.31607356502728],
    [67.84892668959117, 20.3155335258499],
    [67.84952395343677, 20.31500378422976],
    [67.85010656317303, 20.314551774904373],
    [67.85068094210567, 20.31395749155059],
    [67.8510234814439, 20.31348163946228],
    [67.85136602078214, 20.31285032278452],
    [67.85197333541413, 20.311587896085392],
    [67.85342450000658, 20.30793336363123],
    [67.85423846004414, 20.305120493331138],
    [67.85508862523054, 20.30168424599198],
    [67.85582077648223, 20.297843357371],
    [67.8566502528929, 20.292772129785412],
    [67.85750328694849, 20.287228334561878],
    [67.85893627206853, 20.278611681690798],
    [67.86003163766068, 20.273250604457406],
    [67.86118302517332, 20.268930393351532],
    [67.86186930952898, 20.26619701026725],
    [67.86263243323683, 20.263121312403484],
    [67.86322490439056, 20.25908983187381],
    [67.86345277390132, 20.255138980954456],
    [67.8634679651228, 20.25280072224757],
    [67.8634679651228, 20.25042214873551],
    [67.863574303396, 20.247277593922405],
    [67.86389331530509, 20.245261853656842],
    [67.8643794202944, 20.24316548378232],
    [67.86583189315968, 20.239234468730302],
    [67.86616601444854, 20.238255936120737],
    [67.86658077903942, 20.236971612070676],
    [67.86691488959181, 20.235870762885355],
    [67.86707618262665, 20.23525918000425],
    [67.8671913912539, 20.23473933455503],
    [67.86732964085465, 20.23418890996291],
    [67.8674102860763, 20.233730222802592],
    [67.86758309632594, 20.233026902488604],
    [67.86767526126832, 20.232598794472295],
    [67.86773286417227, 20.231926053303283],
    [67.86788263105623, 20.23106983727064],
    [67.86797479481393, 20.230397096101626],
    [67.86807847860581, 20.229479721780024],
    [67.8681706415889, 20.22856234745842],
    [67.86825128390015, 20.22770613142572],
    [67.86831978819703, 20.226810864191492],
    [67.86836927904841, 20.2257336521281],
    [67.86840887227368, 20.224656466708467],
    [67.8684385676907, 20.22384199466839],
    [67.86842866983596, 20.223237700740356],
    [67.86848806041732, 20.22292241417108],
    [67.8684979599524, 20.222107915046962],
    [67.8685078593987, 20.22145105164762],
    [67.86850786019667, 20.22092555497059],
    [67.86850786135847, 20.22018985023027],
    [67.86855735623467, 20.219427856607382],
    [67.86856725569558, 20.21911254510161],
    [67.86859695287131, 20.21874467886633],
    [67.86859695367139, 20.21845563898671],
    [67.86863861842414, 20.218052633012945],
    [67.86879183786021, 20.217138891289494],
    [67.86883004994345, 20.216224926080628],
    [67.86905999943147, 20.21500595801541],
    [67.87005724013437, 20.21216031692481],
    [67.87284416685043, 20.20443394291584],
    [67.87469459781542, 20.19872247647143],
    [67.8752387780547, 20.194435823783465],
    [67.87662528430965, 20.19055745889986],
    [67.87693428859129, 20.188108188786174],
    [67.87739832064597, 20.183821123196395],
    [67.8773972960712, 20.180610295191343],
    [67.87736258909496, 20.178805400529335],
    [67.87737663932276, 20.176684023721535],
    [67.87739390482986, 20.175807489292367],
    [67.87748665486242, 20.173399121998727],
    [67.87748831623034, 20.17115137627556],
    [67.8774793377591, 20.170706869100258]
];

import { point, polygon } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

const isPointInsidePolygon = (latlng, polygonCoordinates) => {
  const turfPoint = point([latlng.lng, latlng.lat]); // Turf uses [longitude, latitude]
  const turfPolygon = polygon([polygonCoordinates]); // Polygon coordinates must be nested
  return booleanPointInPolygon(turfPoint, turfPolygon);
};

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
    latitude: null,
    longitude: null,
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
          latitude: null,
          longitude: null,
          municipality: "Whole municipality",
        }
      );
      setDescription(props.document.description || "");
    }
    setErrors({});
  }, [props.document]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (typeof title !== "string" || !title.trim()) {
      newErrors.title = "Title is required and must be a non-empty string.";
    } else if (title.length < 2) {
      newErrors.title = "Title must be at least 2 characters.";
    } else if (title.length > 64) {
      newErrors.title = "Title must be less than 64 characters.";
    }

    if (
      !Array.isArray(stakeholders) ||
      stakeholders.length === 0 ||
      stakeholders.some((s) => typeof s !== "string" || !s.trim())
    ) {
      newErrors.stakeholders =
        "At least one stakeholder is required, and all must be non-empty strings.";
    }

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

    if (
      typeof issuanceDate !== "string" ||
      !issuanceDate.match(/^\d{4}-\d{2}-\d{2}$/)
    ) {
      newErrors.issuanceDate =
        "Issuance date is required and must be in the format YYYY-MM-DD.";
    }

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

    const point = L.latLng(geolocation.latitude, geolocation.longitude);
    if (!isPointInsidePolygon(point, kirunaBorderCoordinates)) {
      newErrors.geolocation = "Geolocation must be within the Kiruna boundary.";
    }

    // Geolocation validation
    if (typeof geolocation === "object" && geolocation !== null) {
      if (
        geolocation.latitude !== null &&
        (geolocation.latitude > 67.88398 || geolocation.latitude < 67.82295)
      ) {
        newErrors.geolocation =
          "Latitude must be in the range between 67.82295 and 67.88398.";
      } else if (
        geolocation.longitude !== null &&
        (geolocation.longitude > 20.3687 || geolocation.longitude < 20.14402)
      ) {
        newErrors.geolocation =
          "Longitude must be in the range between 20.14402 and 20.36870.";
      }
    } else if (
      typeof geolocation === "string" &&
      (geolocation !== "Whole municipality" ||
        geolocation.length < 2 ||
        geolocation.length > 64)
    ) {
      newErrors.geolocation =
        "Geolocation must be 'Whole municipality' or a valid coordinate.";
    }

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
            latitude: parseFloat(geolocation.latitude),
            longitude: parseFloat(geolocation.longitude),
          },
          description
        )
      );
    }
    props.onHide();
  };

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
  handleSave: PropTypes.func,
  handleAdd: PropTypes.func,
  onLinkToClick: PropTypes.func,
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
  const { geolocation, setGeolocation } = props;

  const defaultPosition = [67.8400, 20.2253]; // Default center position (Kiruna)

  const [markerPosition, setMarkerPosition] = useState([
    geolocation.latitude != null ? geolocation.latitude : defaultPosition[0],
    geolocation.longitude != null ? geolocation.longitude : defaultPosition[1],
  ]);
  

  useEffect(() => {
    if (geolocation.latitude != null && geolocation.longitude != null) {
      setMarkerPosition([geolocation.latitude, geolocation.longitude]);
    }
  }, [geolocation.latitude, geolocation.longitude]);
  

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition([lat, lng]);
    setGeolocation({ ...geolocation, latitude: lat, longitude: lng, municipality: null });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const handleLatitudeChange = (e) => {
    const value = e.target.value;
    const lat = value === '' ? null : parseFloat(value);
    setGeolocation({ ...geolocation, latitude: lat, municipality: null });
    if (lat != null && geolocation.longitude != null) {
      setMarkerPosition([lat, geolocation.longitude]);
    }
  };
  
  const handleLongitudeChange = (e) => {
    const value = e.target.value;
    const lng = value === '' ? null : parseFloat(value);
    setGeolocation({ ...geolocation, longitude: lng, municipality: null });
    if (geolocation.latitude != null && lng != null) {
      setMarkerPosition([geolocation.latitude, lng]);
    }
  };
  

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
      <Form.Group className="mb-3">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="number"
          min={67.82295}
          max={67.88398}
          step={0.00001}
          value={geolocation.latitude || ""}
          onChange={handleLatitudeChange}
          id="formDocumentGeolocationLatitude"
          disabled={geolocation.municipality === "Whole municipality"}
        />
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="number"
          min={20.14402}
          max={20.3687}
          step={0.00001}
          value={geolocation.longitude || ""}
          onChange={handleLongitudeChange}
          id="formDocumentGeolocationLongitude"
          disabled={geolocation.municipality === "Whole municipality"}
        />
        <Form.Check
          type="checkbox"
          label="Whole municipality"
          checked={geolocation.municipality === "Whole municipality"}
          onChange={(e) => {
            if (e.target.checked) {
              setGeolocation({
                latitude: null,
                longitude: null,
                municipality: "Whole municipality",
              });
              setMarkerPosition(defaultPosition);
            } else {
              setGeolocation({
                ...geolocation,
                municipality: null,
              });
            }
          }}
          className="mt-2"
        />
        {props.errors.geolocation && (
          <Form.Control.Feedback type="invalid">
            {props.errors.geolocation}
          </Form.Control.Feedback>
        )}
        <div style={{ height: "300px", marginBottom: "15px" }}>
        <MapContainer
          center={markerPosition}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={markerPosition} />
          <Polygon positions={kirunaBorderCoordinates} />
          <MapClickHandler />
        </MapContainer>
      </div>
        <Form.Text className="text-muted">
          Click on the map to set the location. Latitude and Longitude fields will update automatically.
        </Form.Text>
      </Form.Group>
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

DocumentFormComponent.defaultProps = {
  errors: {},
};

export default DocumentModal;

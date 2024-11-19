import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import { Button, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Document } from "../model/Document.mjs";
import dayjs from "dayjs";
import "../App.css";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
// import { useMap } from "react-leaflet";

export default function DocumentModal(props) {
  // Initialize Leaflet marker icon defaults
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

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
    [67.8774793377591, 20.170706869100258],
  ];
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
    } else if (document.scale.includes(":")) {
      const [first, second] = document.scale.split(":").map(Number);
      if (first >= second) {
        newErrors.scale =
          "The first number of the scale must be smaller than the second one.";
      }
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
    if (document.geolocation.latitude && document.geolocation.longitude) {
      const point = {
        lat: document.geolocation.latitude,
        lng: document.geolocation.longitude,
      };

      const kirunaBorderCoordinatesLngLat = kirunaBorderCoordinates.map(
        ([lat, lng]) => [lng, lat]
      );
      const polygon = [
        ...kirunaBorderCoordinatesLngLat,
        kirunaBorderCoordinatesLngLat[0], // Close the loop
      ];
      const [x, y] = [point.lng, point.lat]; // Ensure [lng, lat]
      let inside = false;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }

      if (!inside) {
        newErrors.latitude = "Geolocation must be within the Kiruna boundary.";
        newErrors.longitude = "Geolocation must be within the Kiruna boundary.";
      }
    }
    if (
      (document.geolocation.latitude || document.geolocation.longitude) &&
      document.geolocation.municipality === "Whole municipality"
    ) {
      newErrors.municipality =
        "Geolocation must be 'Whole municipality' or a valid coordinate.";
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
    } else {
      props.handleSave(
        new Document(
          props.document.id,
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
    props.onHide();
  };

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
            kirunaBorderCoordinates={kirunaBorderCoordinates}
          />
        ) : (
          <ModalBodyComponent document={document} />
        )}
      </Modal.Body>
      <Modal.Footer className="mt-3">
        {isEditable ? (
          <Button title="Save" variant="success" onClick={handleSubmit}>
            <i className="bi bi-check-square"></i>
          </Button>
        ) : (
          <div className="d-flex align-items-center">
            <Button
              title="Link to"
              variant="primary"
              onClick={handleLinkToClick}
              className="me-2"
            >
              <i className="bi bi-box-arrow-up-right"></i>
            </Button>
            <Button
              title="Edit"
              variant="primary"
              onClick={() => setIsEditable(true)}
              className="me-2"
            >
              <i className="bi bi-pencil-square"></i>
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

function DocumentFormComponent({
  document,
  errors,
  handleChange,
  kirunaBorderCoordinates,
}) {
  const [customScaleValue, setCustomScaleValue] = useState(
    document.scale !== "Text" && document.scale !== "Blueprint/Material effects"
      ? document.scale
      : ""
  );
  const [enableCustomScale, setEnableCustomScale] = useState(
    document.scale !== "Text" &&
      document.scale !== "Blueprint/Material effects" &&
      document.scale !== ""
  );
  const defaultPosition = [67.84, 20.2253]; // Default center position (Kiruna)
  const [markerPosition, setMarkerPosition] = useState([
    document.geolocation.latitude
      ? document.geolocation.latitude
      : defaultPosition[0],
    document.geolocation.longitude
      ? document.geolocation.longitude
      : defaultPosition[1],
  ]);

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

  useEffect(() => {
    if (document.geolocation.latitude && document.geolocation.longitude) {
      setMarkerPosition([
        document.geolocation.latitude,
        document.geolocation.longitude,
      ]);
    }
  }, [document.geolocation.latitude, document.geolocation.longitude]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition([lat, lng]);
    handleChange("geolocation", {
      latitude: lat,
      longitude: lng,
      municipality: null,
    });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const handleLatitudeChange = (e) => {
    const value = e.target.value;
    const lat = value === "" ? null : parseFloat(value);
    handleChange("geolocation", {
      ...document.geolocation,
      latitude: lat,
      municipality: null,
    });
    if (lat != null && document.geolocation.longitude != null) {
      setMarkerPosition([lat, document.geolocation.longitude]);
    }
  };

  const handleLongitudeChange = (e) => {
    const value = e.target.value;
    const lng = value === "" ? null : parseFloat(value);
    handleChange("geolocation", {
      ...document.geolocation,
      longitude: lng,
      municipality: null,
    });
    if (document.geolocation.latitude != null && lng != null) {
      setMarkerPosition([document.geolocation.latitude, lng]);
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
        <div style={{ color: "#dc3545", fontSize: "0.875rem" }}>
          {errors.stakeholders}
        </div>
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
        <div style={{ color: "#dc3545", fontSize: "0.875rem" }}>
          {errors.scale}
        </div>
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
        <div style={{ color: "#dc3545", fontSize: "0.875rem" }}>
          {errors.issuanceDate}
        </div>
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
          onChange={handleLatitudeChange}
          id="formDocumentGeolocationLatitude"
          disabled={document.geolocation.municipality === "Whole municipality"}
          isInvalid={!!errors.latitude}
        />
        <Form.Control.Feedback type="invalid">
          {errors.latitude}
        </Form.Control.Feedback>

        <Form.Range
          min={67.82295}
          max={67.88398}
          step={0.00001}
          value={document.geolocation.latitude}
          onChange={handleLatitudeChange}
          disabled={document.geolocation.municipality === "Whole municipality"}
        />

        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="number"
          value={document.geolocation.longitude || ""}
          min={20.14402}
          max={20.3687}
          step={0.00001}
          isInvalid={!!errors.longitude}
          onChange={handleLongitudeChange}
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
          onChange={handleLongitudeChange}
          disabled={document.geolocation.municipality === "Whole municipality"}
        />

        <div style={{ height: "300px", marginBottom: "15px" }}>
          <MapContainer
            center={markerPosition}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={markerPosition} />
            {document.geolocation.municipality === "Whole municipality" ? (
              <Polygon positions={kirunaBorderCoordinates} />
            ) : null}
            <MapClickHandler />
          </MapContainer>
        </div>
        <Form.Text className="text-muted">
          Click on the map to set the location. Latitude and Longitude fields
          will update automatically.
        </Form.Text>
        <Form.Check
          type="checkbox"
          label="Whole municipality"
          checked={document.geolocation.municipality === "Whole municipality"}
          onChange={(e) => {
            const isChecked = e.target.checked;
            setMarkerPosition(defaultPosition);
            handleChange("geolocation", {
              latitude: isChecked ? "" : document.geolocation.latitude,
              longitude: isChecked ? "" : document.geolocation.longitude,
              municipality: isChecked ? "Whole municipality" : "",
            });
          }}
          className="mt-2"
          feedback={errors.municipality}
          feedbackType="invalid"
        />
      </Form.Group>

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
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  kirunaBorderCoordinates: PropTypes.array.isRequired,
};

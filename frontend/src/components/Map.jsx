import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polygon, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import L from "leaflet";
import "leaflet-editable";
import { Button } from "react-bootstrap";
import API from "../API";
import DocumentModal from "./DocumentModal";
import ListDocuments from "./ListDocuments";
import prescpritiveDocument from "../public/icons/Prescriptive-document-LKAB.png";
import designDocument from "../public/icons/Design-document-LKAB.png";
import actionDocument from "../public/icons/Action-LKAB.png";
import informativeDocument from "../public/icons/Informative-document-LKAB.png";
import technicalDocument from "../public/icons/Technical-document-LKAB.png";

// Icon mapping
const iconMapping = {
  "Prescriptive document": new L.Icon({
    iconUrl: prescpritiveDocument,
    iconSize: [45, 45],
    iconAnchor: [20, 37],
    popupAnchor: [1, -25],
  }),
  "Design document": new L.Icon({
    iconUrl: designDocument,
    iconSize: [45, 45],
    iconAnchor: [20, 37],
    popupAnchor: [1, -25],
  }),
  "Material effect": new L.Icon({
    iconUrl: actionDocument,
    iconSize: [45, 45],
    iconAnchor: [20, 37],
    popupAnchor: [1, -25],
  }),
  "Informative document": new L.Icon({
    iconUrl: informativeDocument,
    iconSize: [45, 45],
    iconAnchor: [20, 37],
    popupAnchor: [1, -25],
  }),
  "Technical document": new L.Icon({
    iconUrl: technicalDocument,
    iconSize: [45, 45],
    iconAnchor: [20, 37],
    popupAnchor: [1, -25],
  }),
};

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Editable map
const EditableMap = ({ setMapReady, layers }) => {
  const map = useMap();

  useEffect(() => {
    map.editTools = new L.Editable(map);
    setMapReady(map);

    map.on("editable:created", (e) => {
      if (e.layer instanceof L.Marker || e.layer instanceof L.Polygon || e.layer instanceof L.Polyline) {
        layers.current.push(e.layer);
        map.addLayer(e.layer);
      }
    });
  }, [map, setMapReady, layers]);

  return null;
};

// Main component
const MapKiruna = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [mapReady, setMapReady] = useState(null);
  const layersRef = useRef([]);
  const kirunaPosition = [67.8400, 20.2253];
  const zoomLevel = 12;

  useEffect(() => {
    API.getAllDocumentSnippets()
      .then(setDocuments)
      .catch((error) => console.error("Error fetching documents:", error));
  }, []);

  const handleStartDrawing = (mode) => {
    if (!mapReady) {
      console.error("Map is not ready.");
      return;
    }

    const editTools = mapReady.editTools;

    if (mode === "marker") editTools.startMarker();
    else if (mode === "polyline") editTools.startPolyline();
    else if (mode === "polygon") editTools.startPolygon();
    else console.error("Unknown drawing mode");
  };

  const handleClear = () => {
    layersRef.current.forEach((layer) => mapReady.removeLayer(layer));
    layersRef.current = [];
  };

  const handleDocumentClick = (document) => {
    API.getDocumentById(document.id)
      .then((response) => {
        setSelectedDocument(response);
        if (response.geolocation?.latitude && response.geolocation?.longitude) {
          mapReady.setView([response.geolocation.latitude, response.geolocation.longitude], 15);
        }
      })
      .catch((error) => console.error("Error fetching document:", error));
  };

  const kirunaBorderCoordinates = [
    // Add the coordinates here
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 2, position: "relative" }}>
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          <Button onClick={() => handleStartDrawing("marker")} disabled={!mapReady}>
            Add Marker
          </Button>
          <Button onClick={() => handleStartDrawing("polyline")} disabled={!mapReady}>
            Draw Polyline
          </Button>
          <Button onClick={() => handleStartDrawing("polygon")} disabled={!mapReady}>
            Draw Polygon
          </Button>
          <Button onClick={handleClear} disabled={!mapReady}>
            Clear All
          </Button>
        </div>

        <MapContainer center={kirunaPosition} zoom={zoomLevel} style={{ height: "calc(100% - 50px)", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <EditableMap setMapReady={setMapReady} layers={layersRef} />
          <Polygon positions={kirunaBorderCoordinates} color="purple" weight={3} fillOpacity={0.1} />
          <MarkerClusterGroup>
            {documents.map((doc, index) => {
              const position = doc.geolocation?.latitude && doc.geolocation?.longitude
                ? [doc.geolocation.latitude, doc.geolocation.longitude]
                : kirunaPosition;
              const icon = iconMapping[doc.type] || defaultIcon;

              return (
                <Marker
                  key={index}
                  position={position}
                  icon={icon}
                  eventHandlers={{
                    click: () => handleDocumentClick(doc),
                  }}
                />
              );
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>

      <div style={{ flex: 1, borderLeft: "1px solid #ccc", overflowY: "auto", paddingTop: "8px" }}>
        <ListDocuments thinCardLayout />
      </div>

      {selectedDocument && (
        <DocumentModal
          show={!!selectedDocument}
          onHide={() => setSelectedDocument(null)}
          document={selectedDocument}
        />
      )}
    </div>
  );
};

export default MapKiruna;

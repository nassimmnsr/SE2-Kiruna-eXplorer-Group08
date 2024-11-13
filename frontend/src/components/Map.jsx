import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import API from '../API';
import 'leaflet/dist/leaflet.css';

const MapKiruna = () => {
  const [documents, setDocuments] = useState([]);
  const kirunaPosition = [67.8400, 20.2253];
  const zoomLevel = 12;

  useEffect(() => {
    API.getAllDocumentSnippets()
      .then((response) => setDocuments(response))
      .catch((error) => console.error(error));
  }, []);

  const iconMapping = {
    "Prescriptive document": new L.Icon({ iconUrl: '/path/to/prescriptive-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] }),
  };

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <MapContainer center={kirunaPosition} zoom={zoomLevel} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {documents.map((doc, index) => {
          const { geolocation, title, type } = doc;
          const { latitude, longitude, municipality } = geolocation || {};

          const position = (latitude && longitude)
            ? [latitude, longitude]
            : municipality === 'Whole municipality'
              ? kirunaPosition
              : null;

          const icon = iconMapping[type] || iconMapping["Default"];

          return (
            position && (
              <Marker key={index} position={position} icon={icon}>
                <Popup>
                  <strong>{title}</strong>
                  <br />
                  {municipality || "Location not specified"}
                </Popup>
              </Marker>
            )
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapKiruna;

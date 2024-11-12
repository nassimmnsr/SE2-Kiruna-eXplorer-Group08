import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import API from '../API';

const MapKiruna = () => {
  const [documents, setDocuments] = useState([]);
  const kirunaPosition = [67.8400, 20.2253];
  const zoomLevel = 12;

  useEffect(() => {
    API.getAllDocumentSnippets()
      .then((response) => {
        console.log(response);
        setDocuments(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <MapContainer center={kirunaPosition} zoom={zoomLevel} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Aggiungi i marker per ogni documento */}
        {documents.map((doc, index) => {
          const { geolocation, title } = doc;
          const { latitude, longitude, municipality } = geolocation || {};
          console.log(latitude, longitude, municipality);

          // Determina la posizione: usa Kiruna come fallback se le coordinate sono mancanti
          const position = (latitude && longitude)
            ? [latitude, longitude]
            : municipality === 'Whole municipality'
              ? kirunaPosition
              : null; 

          // Mostra il marker solo se è presente una posizione valida
          return (
            position && (
              <Marker key={index} position={position}>
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

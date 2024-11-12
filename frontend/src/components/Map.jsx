import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapKiruna = () => {
  const kirunaPosition = [67.8400, 20.2253];
  const zoomLevel = 12;

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <MapContainer center={kirunaPosition} zoom={zoomLevel} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default MapKiruna;
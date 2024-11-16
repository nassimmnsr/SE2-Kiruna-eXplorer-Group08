import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster'; // Importa MarkerClusterGroup
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css'; // Stili per i cluster
import API from '../API';
import prescpritiveDocument from '../public/icons/Prescriptive-document-LKAB.png'
import designDocument from '../public/icons/Design-document-LKAB.png'
import actionDocument from '../public/icons/Action-LKAB.png'
import informativeDocument from '../public/icons/Informative-document-LKAB.png'
import technicalDocument from '../public/icons/Technical-document-LKAB.png'

const iconMapping = {
  "Prescriptive document": new L.Icon({
    iconUrl: prescpritiveDocument,
    iconSize: [45, 45],
    iconAnchor: [20, 37],
    popupAnchor: [1, -25]
  }),
  "Design document": new L.Icon({
    iconUrl: designDocument,
    iconSize: [45, 45],
    iconAnchor: [20, 37],
    popupAnchor: [1, -25]
  }),
  "Material effect": new L.Icon({
    iconUrl: actionDocument,
    iconSize: [45, 45],
    iconAnchor: [20, 37],
    popupAnchor: [1, -25]
  }),
  "Informative document": new L.Icon({
    iconUrl: informativeDocument,
    iconSize: [45, 45],
    iconAnchor: [20, 37],
    popupAnchor: [1, -25]
  }),
  "Technical document": new L.Icon({
    iconUrl: technicalDocument,
    iconSize: [45, 45],
    iconAnchor: [20, 37],
    popupAnchor: [1, -25]
  }),
};

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

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
          detectRetina={true}
        />
        
        <MarkerClusterGroup>
          {documents.map((doc, index) => {
            const { geolocation, title } = doc;
            const { latitude, longitude, municipality } = geolocation || {};

            const position = (latitude && longitude)
              ? [latitude, longitude]
              : municipality === 'Whole municipality'
                ? kirunaPosition
                : null;

            const icon = iconMapping[doc.type] || defaultIcon;

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
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default MapKiruna;

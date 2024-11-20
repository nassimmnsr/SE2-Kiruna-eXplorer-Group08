import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polygon, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import L from "leaflet";
import "leaflet-editable";
import API from "../API";
import PropTypes from "prop-types";
import DocumentSidePanel from "./DocumentSidePanel";
import prescpritiveDocument_LKAB from "../public/icons/Prescriptive-document-LKAB.png";
import designDocument_LKAB from "../public/icons/Design-document-LKAB.png";
import actionDocument_LKAB from "../public/icons/Action-LKAB.png";
import informativeDocument_LKAB from "../public/icons/Informative-document-LKAB.png";
import technicalDocument_LKAB from "../public/icons/Technical-document-LKAB.png";
import prescriptiveDocument_Kommun from "../public/icons/Prescriptive-document-KOMMUN.png";
import informativeDocument_KommunResidents from "../public/icons/Informative-document-KOMMUN-RESIDENTS.png";
import designDocument_KommunWhiteArkitekter from "../public/icons/Design-document-KOMMUN-ARKITEKTER.png";

// Icon mapping
const iconMapping = {
  "Prescriptive document": {
    "LKAB": new L.Icon({
      iconUrl: prescpritiveDocument_LKAB,
      iconSize: [45, 45],
      iconAnchor: [20, 37],
      popupAnchor: [1, -25],
    }),
    "Kiruna kommun": new L.Icon({
      iconUrl: prescriptiveDocument_Kommun,
      iconSize: [45, 45],
      iconAnchor: [20, 37],
      popupAnchor: [1, -25],
    }),
  },
  "Informative document": {
    "LKAB": new L.Icon({
      iconUrl: informativeDocument_LKAB,
      iconSize: [45, 45],
      iconAnchor: [20, 37],
      popupAnchor: [1, -25],
    }),
    "Kiruna kommun,Residents": new L.Icon({
      iconUrl: informativeDocument_KommunResidents,
      iconSize: [45, 45],
      iconAnchor: [20, 37],
      popupAnchor: [1, -25],
    }),
  },
  "Design document": {
    "LKAB": new L.Icon({
      iconUrl: designDocument_LKAB,
      iconSize: [45, 45],
      iconAnchor: [20, 37],
      popupAnchor: [1, -25],
    }),
    "Kiruna kommun,White Arkitekter": new L.Icon({
      iconUrl: designDocument_KommunWhiteArkitekter,
      iconSize: [45, 45],
      iconAnchor: [20, 37],
      popupAnchor: [1, -25],
    }),
  },
  "Material effect": {
    "LKAB": new L.Icon({
      iconUrl: actionDocument_LKAB,
      iconSize: [45, 45],
      iconAnchor: [20, 37],
      popupAnchor: [1, -25],
    }),
  },
  "Technical document": {
    "LKAB": new L.Icon({
      iconUrl: technicalDocument_LKAB,
      iconSize: [45, 45],
      iconAnchor: [20, 37],
      popupAnchor: [1, -25],
    }),
  }
};

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const getIconForDocument = (type, stakeholders) => {
  if (iconMapping[type]) {
    const stakeholdersKey = stakeholders.sort().join(",");
    console.log(stakeholdersKey);
    return iconMapping[type][stakeholdersKey] || defaultIcon;
  }
  return defaultIcon;
};

const ZoomToMarker = ({ position, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, zoomLevel || map.getZoom(), { duration: 1.5 }); // Default to current zoom if zoomLevel not provided
    }
  }, [position, zoomLevel, map]);

  return null;
};

ZoomToMarker.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoomLevel: PropTypes.number,
};


const MapKiruna = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [show, setShow] = useState(true);
  const kirunaPosition = [67.8400, 20.2253];
  const zoomLevel = 12;

  useEffect(() => {
    API.getAllDocumentSnippets()
      .then(setDocuments)
      .catch((error) => console.error("Error fetching documents:", error));
  }, []);

  const handleDocumentClick = (document) => {
    console.log(documents)
    API.getDocumentById(document.id)
      .then((response) => {
        setSelectedDocument(response);
        setShow(true);
      })
      .catch((error) => console.error("Error fetching document:", error));
  };

  const closeSidePanel = () => {
    console.log("closeSidePanel");
    setShow(false);
    setSelectedDocument(null);
  };

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
  

  return (
    <div style={{ display: "flex", height: "90vh", position: "relative" }}>
      <div style={{ flex: 2, position: "relative" }}>
        <MapContainer center={kirunaPosition} zoom={zoomLevel} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          { selectedDocument && 
            selectedDocument.geolocation.municipality === "Entire municipality" && 
            <Polygon positions={kirunaBorderCoordinates} color="purple" weight={3} fillOpacity={0.1} />
            }
            <MarkerClusterGroup>
            {documents.map((doc, index) => {
              const position = doc.geolocation.latitude ? [doc.geolocation.latitude, doc.geolocation.longitude] : kirunaPosition;
              //const icon = iconMapping[doc.type] || defaultIcon;

              return (
                <Marker
                  key={index}
                  position={position}
                  icon={getIconForDocument(doc.type, doc.stakeholders)}
                  eventHandlers={{
                    click: () => handleDocumentClick(doc),
                  }}
                />
              );
            })}
          </MarkerClusterGroup>
          {selectedDocument && selectedDocument.geolocation.latitude ? (
            <ZoomToMarker
              position={[
                selectedDocument.geolocation.latitude,
                selectedDocument.geolocation.longitude
              ]}
              zoomLevel={15} // Zoom to level 15 for the selected document
            />
          ) : (
            <ZoomToMarker position={kirunaPosition} zoomLevel={12} /> // Reset to initial view
          )}
        </MapContainer>
      </div>
  
      {selectedDocument && show &&(
        <DocumentSidePanel
          document={selectedDocument}
          onClose={closeSidePanel}
        />
        )}
    </div>
  );
};

export default MapKiruna; 
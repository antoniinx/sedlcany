import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom red marker icon
const createRedIcon = () => {
  return new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Mapy.cz API Key - REPLACE THIS WITH YOUR OWN KEY
const MAPY_API_KEY = 'yX0VpEKovTwa6NtRGsrGzQDcdSuVpnsGhMz4JspkbkU';

function MapBounds({ coordinates }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, coordinates]);

  return null;
}

export default function Map({ coordinates, questions = [], currentQuestionIndex = 0, userLocation }) {
  if (!coordinates || coordinates.length === 0) {
    return (
      <div className="w-full h-full bg-dark-bg flex items-center justify-center border border-dark-border rounded-xl">
        <p className="text-base text-gray-400 font-medium">No route data available</p>
      </div>
    );
  }

  // Custom DivIcons
  const createCustomIcon = (color, text = '', isUser = false) => {
    if (isUser) {
      return new L.DivIcon({
        className: 'custom-div-icon',
        html: `<div class="marker-user"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10] // Center of the 20x20 circle
      });
    }

    let bgClass = '';
    if (color === 'green') bgClass = 'marker-green';
    if (color === 'gold') bgClass = 'marker-gold';
    if (color === 'red') bgClass = ''; // Default red gradient

    return new L.DivIcon({
      className: 'custom-div-icon',
      html: `
            <div class="custom-marker-pin ${bgClass}">
                <div class="marker-pin-inner">${text}</div>
            </div>
          `,
      iconSize: [48, 48],
      /* 
         Anchor X: Center = 24
         Anchor Y: Center (24) + Distance to Corner (~34) = 58 
      */
      iconAnchor: [24, 58],
      popupAnchor: [0, -58]
    });
  };

  return (
    <div className="w-full h-full bg-[#0F1115]">
      <MapContainer
        center={coordinates[0]}
        zoom={13}
        style={{ height: '100%', width: '100%', background: '#0F1115' }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {/* Mapy.cz Outdoor Layer with Retina & Dark Filter */}
        <TileLayer
          className="map-tiles-dark"
          key="mapy-cz-outdoor"
          attribution='&copy; <a href="https://www.seznam.cz">Seznam.cz, a.s.</a>'
          url={`https://api.mapy.com/v1/maptiles/outdoor/256/{z}/{x}/{y}?apikey=${MAPY_API_KEY}`}
          maxZoom={19}
          detectRetina={true}
        />

        <Polyline
          positions={coordinates}
          color="#ff3b30"
          weight={4}
          opacity={0.8}
          dashArray="10, 10"
        />

        {/* Question Markers */}
        {questions.map((q, index) => {
          if (!q.coordinates) return null;

          let color = 'red';
          let statusText = "Další bod";

          if (index < currentQuestionIndex) {
            color = 'green';
            statusText = "Dokončeno";
          } else if (index === currentQuestionIndex) {
            color = 'gold';
            statusText = "Cíl";
          }

          return (
            <Marker key={q.id} position={q.coordinates} icon={createCustomIcon(color, (index + 1).toString())}>
              <Popup>
                <div className="text-center p-2">
                  <span className="font-bold block text-sm mb-1">{statusText}</span>
                  <span className="text-xs text-gray-400">Otázka {index + 1}</span>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={createCustomIcon('blue', '', true)} zIndexOffset={1000}>
            <Popup>
              <span className="text-sm font-bold text-accent-primary">Tvoje poloha</span>
            </Popup>
          </Marker>
        )}

        {/* Fit bounds to include route AND user (if available) */}
        <MapBounds coordinates={[...coordinates, ...(userLocation ? [[userLocation.lat, userLocation.lng]] : [])]} />
      </MapContainer>
    </div>
  );
}

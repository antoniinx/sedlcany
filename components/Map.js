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

  // Icons
  const createIcon = (color) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const blueIcon = createIcon('blue'); // User
  const redIcon = createIcon('red'); // Future
  const greenIcon = createIcon('green'); // Completed
  const goldIcon = createIcon('gold'); // Active

  return (
    <div className="w-full h-full">
      <MapContainer
        center={coordinates[0]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        {/* Mapy.cz Outdoor (Turistická) Layer */}
        <TileLayer
          key="mapy-cz-outdoor"
          attribution='&copy; <a href="https://www.seznam.cz">Seznam.cz, a.s.</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={`https://api.mapy.com/v1/maptiles/outdoor/256/{z}/{x}/{y}?apikey=${MAPY_API_KEY}`}
          maxZoom={19}
        />

        <Polyline
          positions={coordinates}
          color="#ff3b30"
          weight={5}
          opacity={0.8}
        />

        {/* Question Markers */}
        {questions.map((q, index) => {
          if (!q.coordinates) return null;

          let icon = redIcon;
          let statusText = "Další bod";

          if (index < currentQuestionIndex) {
            icon = greenIcon;
            statusText = "Dokončeno";
          } else if (index === currentQuestionIndex) {
            icon = goldIcon;
            statusText = "Cíl";
          }

          return (
            <Marker key={q.id} position={q.coordinates} icon={icon}>
              <Popup>
                <div className="text-center">
                  <span className="font-bold block">{statusText}</span>
                  <span className="text-xs text-gray-500">Otázka {index + 1}</span>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={blueIcon} zIndexOffset={1000}>
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

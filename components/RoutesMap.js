import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MAPY_API_KEY = 'yX0VpEKovTwa6NtRGsrGzQDcdSuVpnsGhMz4JspkbkU';

function MapBounds({ locations }) {
    const map = useMap();
    useEffect(() => {
        if (locations && locations.length > 0) {
            const bounds = L.latLngBounds(locations);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [map, locations]);
    return null;
}

export default function RoutesMap({ routes = [], userLocation }) {

    // Custom DivIcons
    const createCustomIcon = (type, text = '', isUser = false) => {
        if (isUser) {
            return new L.DivIcon({
                className: 'custom-div-icon',
                html: `<div class="marker-user"></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
        }

        return new L.DivIcon({
            className: 'custom-div-icon',
            html: `
              <div class="custom-marker-pin">
                  <div class="marker-pin-inner">${text}</div>
              </div>
            `,
            iconSize: [44, 44],
            iconAnchor: [22, 44],
            popupAnchor: [0, -44]
        });
    };

    // Collect all relevant points for bounds
    const allPoints = routes
        .map(r => r.coordinates?.[0])
        .filter(Boolean);

    if (userLocation) {
        allPoints.push([userLocation.lat, userLocation.lng]);
    }

    return (
        <div className="w-full h-full bg-[#0F1115]">
            <MapContainer
                center={[49.66, 14.42]} // Approx Sedlcany center
                zoom={12}
                style={{ height: '100%', width: '100%', background: '#0F1115' }}
                scrollWheelZoom={true}
                zoomControl={false}
            >
                <TileLayer
                    className="map-tiles-dark"
                    attribution='&copy; <a href="https://www.seznam.cz">Seznam.cz, a.s.</a>'
                    url={`https://api.mapy.com/v1/maptiles/outdoor/256/{z}/{x}/{y}?apikey=${MAPY_API_KEY}`}
                    maxZoom={19}
                    detectRetina={true}
                />

                {routes.map((route, i) => {
                    if (!route.coordinates || route.coordinates.length === 0) return null;
                    const startPoint = route.coordinates[0];

                    return (
                        <Marker key={route.id} position={startPoint} icon={createCustomIcon('route', (i + 1).toString())}>
                            <Popup>
                                <div className="text-center min-w-[200px] p-2">
                                    <h3 className="font-bold text-lg mb-1 text-white">{route.name}</h3>
                                    <div className="flex justify-between text-xs text-gray-400 mb-3">
                                        <span>{route.length} km</span>
                                        <span>{route.duration}</span>
                                    </div>
                                    <Link href={`/route/${route.id}`}>
                                        <button className="w-full py-2.5 bg-accent-primary text-white rounded-lg font-bold text-xs uppercase hover:bg-red-600 transition-colors shadow-lg shadow-accent-primary/20">
                                            Zobrazit trasu
                                        </button>
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lng]} icon={createCustomIcon('user', '', true)} zIndexOffset={1000}>
                        <Popup>
                            <span className="text-sm font-bold text-accent-primary">Tvoje poloha</span>
                        </Popup>
                    </Marker>
                )}

                <MapBounds locations={allPoints} />
            </MapContainer>
        </div>
    );
}

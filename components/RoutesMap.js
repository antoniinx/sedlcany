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
    const createIcon = (color) => new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const blueIcon = createIcon('blue'); // User
    const redIcon = createIcon('red'); // specific route marker

    // Collect all relevant points for bounds
    const allPoints = routes
        .map(r => r.coordinates?.[0])
        .filter(Boolean);

    if (userLocation) {
        allPoints.push([userLocation.lat, userLocation.lng]);
    }

    return (
        <div className="w-full h-full">
            <MapContainer
                center={[49.66, 14.42]} // Approx Sedlcany center
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.seznam.cz">Seznam.cz, a.s.</a>'
                    url={`https://api.mapy.com/v1/maptiles/outdoor/256/{z}/{x}/{y}?apikey=${MAPY_API_KEY}`}
                    maxZoom={19}
                />

                {routes.map((route) => {
                    if (!route.coordinates || route.coordinates.length === 0) return null;
                    const startPoint = route.coordinates[0];

                    return (
                        <Marker key={route.id} position={startPoint} icon={redIcon}>
                            <Popup>
                                <div className="text-center min-w-[200px]">
                                    <h3 className="font-bold text-lg mb-1">{route.name}</h3>
                                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                                        <span>{route.length} km</span>
                                        <span>{route.duration}</span>
                                    </div>
                                    <Link href={`/route/${route.id}`}>
                                        <button className="w-full py-2 bg-accent-primary text-white rounded-lg font-bold text-xs uppercase hover:bg-red-600 transition-colors">
                                            Zobrazit trasu
                                        </button>
                                    </Link>
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

                <MapBounds locations={allPoints} />
            </MapContainer>
        </div>
    );
}

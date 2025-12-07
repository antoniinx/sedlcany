import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
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

function RealRoutePolyline({ route, color = '#F87171' }) {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const fetchRoute = async () => {
            if (!route || !route.coordinates || route.coordinates.length < 2) return;

            try {
                // Convert [lat, lon] (Leaflet) to lon,lat (Mapy.cz API)
                const start = `${route.coordinates[0][1]},${route.coordinates[0][0]}`;
                const end = `${route.coordinates[route.coordinates.length - 1][1]},${route.coordinates[route.coordinates.length - 1][0]}`;

                // Intermediate waypoints
                const waypoints = route.coordinates.slice(1, -1).map(c => `${c[1]},${c[0]}`).join(';');

                let url = `https://api.mapy.cz/v1/routing/route?apikey=${MAPY_API_KEY}&start=${start}&end=${end}&routeType=foot_fast&geometry=true`;
                if (waypoints) {
                    url += `&waypoints=${waypoints}`;
                }

                const response = await fetch(url);
                const data = await response.json();

                if (data.geometry && data.geometry.geometry && data.geometry.geometry.coordinates) {
                    // Mapy.cz returns [lon, lat], Leaflet needs [lat, lon]
                    const decoded = data.geometry.geometry.coordinates.map(c => [c[1], c[0]]);
                    setPositions(decoded);
                } else if (data.geometry && data.geometry.coordinates) {
                    // Sometimes structure varies, handle direct coordinates
                    const decoded = data.geometry.coordinates.map(c => [c[1], c[0]]);
                    setPositions(decoded);
                }
            } catch (error) {
                console.error("Error fetching route geometry:", error);
                // Fallback to straight lines if API fails
                setPositions(route.coordinates);
            }
        };

        fetchRoute();
    }, [route]);

    if (positions.length === 0) return null;

    return <Polyline positions={positions} pathOptions={{ color: color, weight: 4, opacity: 0.8 }} />;
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
                        <div key={route.id}>
                            <RealRoutePolyline route={route} />

                            <Marker position={startPoint} icon={createCustomIcon('route', (i + 1).toString())}>
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
                        </div>
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

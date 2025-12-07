import { calculateDistance } from './geolocation';

const MAPY_API_KEY = 'yX0VpEKovTwa6NtRGsrGzQDcdSuVpnsGhMz4JspkbkU';

export async function fetchRouteGeometry(route) {
    if (!route || !route.coordinates || route.coordinates.length < 2) return null;

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
        if (!response.ok) throw new Error('Routing API failed');

        const data = await response.json();

        if (data.geometry && data.geometry.geometry && data.geometry.geometry.coordinates) {
            // Mapy.cz returns [lon, lat]
            return data.geometry.geometry.coordinates;
        } else if (data.geometry && data.geometry.coordinates) {
            return data.geometry.coordinates;
        }
        return null;

    } catch (error) {
        console.error("Error fetching route geometry:", error);
        return null;
    }
}

export async function fetchRouteElevationProfile(route) {
    // 1. Get accurate geometry first
    const geometry = await fetchRouteGeometry(route);
    if (!geometry || geometry.length === 0) return null;

    // 2. Reduce points if too many (API limit usuall 256 for elevation, but let's be safe with 100)
    // Simple sampling
    const maxPoints = 120; // safe limit
    const sampledPoints = [];

    if (geometry.length <= maxPoints) {
        sampledPoints.push(...geometry);
    } else {
        const step = (geometry.length - 1) / (maxPoints - 1);
        for (let i = 0; i < maxPoints; i++) {
            sampledPoints.push(geometry[Math.round(i * step)]);
        }
    }

    // 3. Prepare positions for Elevation API (lon,lat)
    const positions = sampledPoints.map(p => `${p[0]},${p[1]}`).join(','); // Mapy.cz uses lon,lat

    try {
        const url = `https://api.mapy.cz/v1/elevation?apikey=${MAPY_API_KEY}&positions=${positions}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Elevation API failed');

        const data = await response.json();
        // Expected data: { items: [ { elevation: 123, ... }, ... ] }

        if (!data.items) return null;

        // 4. Combine into { distance, elevation } structure
        const profile = [];
        let totalDist = 0;

        for (let i = 0; i < sampledPoints.length; i++) {
            const elevation = data.items[i].elevation;

            if (i > 0) {
                // Calculate dist from prev point
                // Note: geometry is [lon, lat], calculateDistance needs (lat1, lon1, lat2, lon2)
                const prev = sampledPoints[i - 1];
                const curr = sampledPoints[i];
                const dist = calculateDistance(prev[1], prev[0], curr[1], curr[0]);
                totalDist += dist;
            }

            profile.push({
                distance: totalDist / 1000, // Convert to km for display
                elevation: elevation
            });
        }

        return profile;

    } catch (error) {
        console.error("Error fetching elevation:", error);
        return null;
    }
}

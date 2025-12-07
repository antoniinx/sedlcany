import dynamic from 'next/dynamic';
import { routes } from '../data/routes';
import { useGeolocation } from '../utils/geolocation';

const RoutesMap = dynamic(() => import('../components/RoutesMap'), { ssr: false });

export default function MapPage() {
    const { location } = useGeolocation();

    return (
        <div className="relative w-full h-screen bg-dark-bg overflow-hidden">
            {/* Map Layer - Fullscreen Absolute */}
            <div className="absolute inset-0 z-0">
                <RoutesMap routes={routes} userLocation={location} />
            </div>

            {/* Gradient Overlay for bottom navbar readability */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg/80 to-transparent z-10 pointer-events-none" />

            {/* Top Gradient for top navbar readability */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-bg/80 to-transparent z-10 pointer-events-none" />
        </div>
    );
}

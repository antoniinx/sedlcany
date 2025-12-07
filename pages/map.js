import dynamic from 'next/dynamic';
import { routes } from '../data/routes';
import { useGeolocation } from '../utils/geolocation';

const RoutesMap = dynamic(() => import('../components/RoutesMap'), { ssr: false });

export default function MapPage() {
    const { location } = useGeolocation();

    return (
        <div className="min-h-screen bg-dark-bg relative overflow-hidden">
            {/* Map Header Overlay */}
            <div className="fixed top-0 left-0 right-0 z-20 p-6 pt-24 md:pt-6 pointer-events-none bg-gradient-to-b from-dark-bg/90 via-dark-bg/60 to-transparent">
                <h1 className="text-3xl font-bold text-white drop-shadow-md">Mapa tras</h1>
            </div>

            {/* Map Layer - Fullscreen */}
            <div className="fixed inset-0 z-0">
                <RoutesMap routes={routes} userLocation={location} />
            </div>

            {/* Invisible spacer to allow scrolling if needed (though map is fixed) - mostly for navbar clearance */}
            <div className="pointer-events-none fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-10" />
        </div>
    );
}

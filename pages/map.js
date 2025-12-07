import dynamic from 'next/dynamic';
import { routes } from '../data/routes';
import { useGeolocation } from '../utils/geolocation';

const RoutesMap = dynamic(() => import('../components/RoutesMap'), { ssr: false });

export default function MapPage() {
    const { location } = useGeolocation();

    return (
        <div className="min-h-screen bg-dark-bg relative pb-32 overflow-hidden flex flex-col">
            {/* Map Header Overlay - Mobile Adjusted */}
            <div className="absolute top-0 left-0 right-0 z-20 p-6 pt-24 md:pt-6 pointer-events-none bg-gradient-to-b from-dark-bg/90 via-dark-bg/60 to-transparent">
                <h1 className="text-3xl font-bold text-white drop-shadow-md">Mapa tras</h1>
            </div>

            <div className="flex-1 w-full h-full relative z-0 mt-0">
                <RoutesMap routes={routes} userLocation={location} />
            </div>
        </div>
    );
}

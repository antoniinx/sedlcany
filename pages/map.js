import dynamic from 'next/dynamic';
import { routes } from '../data/routes';
import { useGeolocation } from '../utils/geolocation';

const RoutesMap = dynamic(() => import('../components/RoutesMap'), { ssr: false });

export default function MapPage() {
    const { location } = useGeolocation();

    return (
        <div className="min-h-screen bg-dark-bg relative pb-32 overflow-hidden flex flex-col">
            {/* Map Header Overlay */}
            <div className="absolute top-0 left-0 right-0 z-10 p-6 pointer-events-none bg-gradient-to-b from-dark-bg/80 to-transparent">
                <h1 className="text-2xl font-bold text-white drop-shadow-md">Mapa tras</h1>
            </div>

            <div className="flex-1 w-full h-full relative z-0">
                <RoutesMap routes={routes} userLocation={location} />
            </div>
        </div>
    );
}

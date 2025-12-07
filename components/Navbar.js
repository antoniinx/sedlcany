import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const isActive = (path) => router.pathname === path;

  // Custom Icon Components for cleaner code & filled variation
  const HomeIcon = ({ active }) => (
    <svg className={`w-7 h-7 ${active ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  const MapIcon = ({ active }) => (
    <svg className={`w-7 h-7 ${active ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );

  const CityIcon = ({ active }) => (
    <svg className={`w-7 h-7 ${active ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const ProfileIcon = ({ active }) => (
    <svg className={`w-7 h-7 ${active ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  return (
    <>
      {/* Top Bar - Mobile Only Logo */}
      <div className="fixed top-0 left-0 right-0 z-40 px-6 py-6 bg-gradient-to-b from-[#1e293b] via-[#1e293b]/90 to-transparent pointer-events-none md:hidden">
        <span className="text-2xl font-black tracking-tight text-white drop-shadow-md flex items-center gap-2">
          <span className="w-8 h-8 bg-[#F87171] rounded-lg flex items-center justify-center text-lg shadow-lg rotate-3">
            📍
          </span>
          SEDLČANY<span className="text-[#F87171]">GO</span>
        </span>
      </div>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-4 right-4 z-50 md:top-6 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:max-w-2xl">
        <div className="adventure-card bg-[#1e293b]/90 px-2 py-2 flex justify-between items-center relative overflow-hidden">

          {/* Desktop Logo Placeholder for layout balance */}
          <div className="hidden md:flex items-center gap-2 absolute left-6 text-white font-black text-xl">
            <span className="w-8 h-8 bg-[#F87171] rounded-lg flex items-center justify-center text-lg shadow-lg -rotate-3">
              📍
            </span>
            SEDLČANY<span className="text-[#F87171]">GO</span>
          </div>

          <div className="flex w-full justify-around md:justify-end md:gap-4 md:pr-2">

            {[
              { path: '/', label: 'Mise', Icon: HomeIcon },
              { path: '/map', label: 'Mapa', Icon: MapIcon },
              { path: '/city', label: 'Město', Icon: CityIcon },
              { path: currentUser ? '/profile' : '/login', label: 'Profil', Icon: ProfileIcon },
            ].map((item) => {
              const active = isActive(item.path);
              return (
                <Link href={item.path} key={item.path}>
                  <div className="relative group cursor-pointer">
                    <motion.div
                      className={`relative z-10 flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${active ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                      whileTap={{ scale: 0.9 }}
                    >
                      <item.Icon active={active} />
                      <span className={`text-[10px] font-extrabold mt-1 tracking-wider ${active ? 'opacity-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all'}`}>
                        {item.label.toUpperCase()}
                      </span>
                    </motion.div>
                    {active && (
                      <motion.div
                        layoutId="navIndicatorBackground"
                        className="absolute inset-0 bg-[#F87171] rounded-2xl shadow-lg shadow-red-900/40 z-0"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>
                </Link>
              );
            })}

          </div>
        </div>
      </nav>
    </>
  );
}

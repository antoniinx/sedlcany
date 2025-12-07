import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function RouteCard({ route }) {
  const [completionRate, setCompletionRate] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.completedRoutes?.[route.id]) {
      setCompletionRate(currentUser.completedRoutes[route.id].successRate);
    } else {
      setCompletionRate(null);
    }
  }, [currentUser, route.id]);

  // Difficulty Color Logic
  const difficultyColor = route.difficulty === 'Lehká' ? 'text-green-500' :
    route.difficulty === 'Střední' ? 'text-yellow-500' : 'text-red-500';

  return (
    <Link href={`/route/${route.id}`}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="glass-card rounded-3xl overflow-hidden relative group cursor-pointer w-full transition-all duration-300 hover:shadow-2xl hover:border-accent-primary/30"
      >
        {/* Background Visuals */}
        <div className={`absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none`} />

        {/* Gradient Accent - Dynamic based on difficulty */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${route.difficulty === 'Lehká' ? 'from-green-500/20' : route.difficulty === 'Střední' ? 'from-yellow-500/20' : 'from-red-500/20'} to-transparent rounded-bl-[100px] pointer-events-none`} />

        <div className="p-6 relative z-10">

          {/* Top Row: Difficulty & Badge */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <span className={`h-2.5 w-2.5 rounded-full ${route.difficulty === 'Lehká' ? 'bg-green-500 box-shadow-glow-green' : route.difficulty === 'Střední' ? 'bg-yellow-500 box-shadow-glow-yellow' : 'bg-red-500 box-shadow-glow-red'}`} />
              <span className={`text-xs font-extrabold uppercase tracking-widest ${difficultyColor}`}>
                {route.difficulty.toUpperCase()}
              </span>
            </div>
            {completionRate !== null && (
              <div className="px-2 py-1 bg-accent-secondary rounded text-[10px] font-bold text-dark-bg uppercase tracking-wide">
                Splněno
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold text-white mb-6 leading-tight max-w-[90%]">
            {route.name}
          </h2>

          {/* Stats Grid - The "Sports" Look */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">

            {/* Distance */}
            <div>
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Vzdálenost</div>
              <div className="text-xl font-extrabold text-white flex items-baseline">
                {route.length}
                <span className="text-sm font-medium text-gray-500 ml-1">km</span>
              </div>
            </div>

            {/* Duration */}
            <div>
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Čas</div>
              <div className="text-xl font-extrabold text-white flex items-baseline">
                {route.duration.split(' ')[0]}
                <span className="text-sm font-medium text-gray-500 ml-1">h</span>
              </div>
            </div>

            {/* Elevation (New) */}
            <div>
              <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Výstup</div>
              <div className="text-xl font-extrabold text-accent-primary flex items-baseline">
                {route.elevationGain || 0}
                <span className="text-sm font-medium text-gray-500 ml-1">m</span>
              </div>
            </div>

          </div>
        </div>

        {/* Action strip at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </Link>
  );
}


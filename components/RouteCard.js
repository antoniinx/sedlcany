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

  // Difficulty Color Logic - Now used for accent rings
  const difficultyColor = route.difficulty === 'Lehká' ? 'border-green-400 text-green-400' :
    route.difficulty === 'Střední' ? 'border-yellow-400 text-yellow-400' : 'border-red-400 text-red-400';

  return (
    <Link href={`/route/${route.id}`}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="adventure-card overflow-hidden relative group cursor-pointer w-full my-4"
      >
        <div className="flex flex-col md:flex-row">

          {/* Left: Illustrative / Visual Side */}
          <div className="h-40 md:h-auto md:w-1/3 bg-slate-700 relative overflow-hidden">
            {/* Abstract Map/Terrain Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/topography.png')]" />

            {/* Character/Icon Placeholder - Can be replaced with specific SVGs per route later */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-20 h-20 rounded-full border-4 ${difficultyColor} flex items-center justify-center bg-slate-800 shadow-xl`}>
                <span className="text-3xl">🏁</span>
              </div>
            </div>

            {/* Completed Badge */}
            {completionRate !== null && (
              <div className="absolute top-3 left-3 level-badge px-3 py-1 rounded-full text-xs">
                Splněno {completionRate}%
              </div>
            )}
          </div>

          {/* Right: Mission Briefing */}
          <div className="p-6 md:w-2/3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">MISE #{route.id}</span>
                <div className="h-1 w-1 rounded-full bg-slate-500" />
                <span className={`text-[10px] font-black uppercase tracking-widest ${route.difficulty === 'Lehká' ? 'text-green-400' : route.difficulty === 'Střední' ? 'text-yellow-400' : 'text-red-400'}`}>
                  {route.difficulty}
                </span>
              </div>

              <h2 className="text-2xl font-black text-white mb-2 leading-tight">
                {route.name}
              </h2>
              <p className="text-slate-300 text-sm line-clamp-2 mb-4 font-medium">
                {route.description}
              </p>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-2xl border border-white/5">
              <div className="text-center">
                <div className="text-lg font-black text-white">{route.length} <span className="text-xs text-slate-400">km</span></div>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div className="text-center">
                <div className="text-lg font-black text-white">{route.elevationGain || 0} <span className="text-xs text-slate-400">m</span></div>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div className="text-center">
                <div className="text-lg font-black text-[#fbbf24]">{route.reward} <span className="text-xs text-[#fbbf24]/70">XP</span></div>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </Link>
  );
}

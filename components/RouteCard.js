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

  return (
    <Link href={`/route/${route.id}`}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="glass-card rounded-2xl overflow-hidden relative group cursor-pointer h-[280px] w-full"
      >
        {/* Abstract Background Gradient based on difficulty */}
        <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${route.difficulty === 'Lehká' ? 'from-green-500 to-emerald-900' :
          route.difficulty === 'Střední' ? 'from-yellow-500 to-orange-900' :
            'from-red-500 to-rose-900'
          }`} />

        {/* Content Container */}
        <div className="relative h-full p-6 flex flex-col justify-between z-10">

          {/* Header */}
          <div className="flex justify-between items-start">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-white/10 border border-white/10 ${route.difficulty === 'Lehká' ? 'text-green-400' :
              route.difficulty === 'Střední' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
              {route.difficulty}
            </span>

            {completionRate !== null && (
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-accent-secondary text-dark-bg font-bold shadow-glow">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs">{completionRate}%</span>
              </div>
            )}
          </div>

          {/* Main Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
              {route.name}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-300 font-medium">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {route.length} km
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {route.duration}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
              {route.questions.length} Otázek
            </span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent-primary transition-colors duration-300">
              <svg className="w-5 h-5 text-white transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

        </div>
      </motion.div>
    </Link>
  );
}


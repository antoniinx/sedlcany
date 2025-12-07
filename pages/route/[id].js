import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { routes } from '../../data/routes';
import Quiz from '../../components/Quiz';
import ElevationProfile from '../../components/ElevationProfile';
import { useAuth } from '../../contexts/AuthContext';
import { calculateDistance, useGeolocation } from '../../utils/geolocation';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

export default function RoutePage() {
  const router = useRouter();
  const { id } = router.query;
  const [route, setRoute] = useState(null);
  const [showOverview, setShowOverview] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [trailPoints, setTrailPoints] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const { updateUserProgress } = useAuth();

  // Geolocation
  const { location, error: geoError } = useGeolocation();
  const [distanceToNextPoint, setDistanceToNextPoint] = useState(null);
  const [isNearTarget, setIsNearTarget] = useState(false);

  useEffect(() => {
    if (id) {
      const foundRoute = routes.find((r) => r.id === parseInt(id, 10));
      if (foundRoute) {
        setRoute(foundRoute);
      } else {
        router.push('/');
      }
    }
  }, [id, router]);

  // Check distance to current question target
  useEffect(() => {
    if (route && location && !showOverview && !isCompleted) {
      const currentTarget = route.questions[currentQuestionIndex]?.coordinates;
      if (currentTarget) {
        const dist = calculateDistance(location.lat, location.lng, currentTarget[0], currentTarget[1]);
        setDistanceToNextPoint(dist);
        // Unlock if closer than 50 meters
        setIsNearTarget(dist <= 50);
      }
    }
  }, [route, location, showOverview, currentQuestionIndex, isCompleted]);


  const handleAnswer = (selectedAnswer, isCorrect) => {
    const newAnswers = [...answers, { selectedAnswer, isCorrect }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setTrailPoints((prev) => prev + route.questions[currentQuestionIndex].points);
    }

    if (currentQuestionIndex < route.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsNearTarget(false); // Lock next question immediately
    } else {
      setIsCompleted(true);
      setShowCompletion(true);

      const correctCount = newAnswers.filter((a) => a.isCorrect).length;
      const successRate = Math.round((correctCount / route.questions.length) * 100);
      const pointsEarned = trailPoints + (isCorrect ? route.questions[currentQuestionIndex].points : 0);

      // Save via Context
      updateUserProgress(route.id, pointsEarned, {
        successRate,
        points: pointsEarned
      });
    }
  };

  if (!route) return null;

  // Determine layout mode
  const isNavigating = !showOverview && !isCompleted;

  return (
    <div className={`min-h-screen bg-dark-bg relative ${isNavigating ? 'overflow-hidden flex flex-col' : ''}`}>

      {/* Map Layer */}
      {/* If Navigating: Top 60%, If Overview: Top 40% */}
      <div className={`
        relative w-full transition-all duration-500 ease-in-out
        ${isNavigating ? 'h-[60vh] z-0' : 'fixed inset-0 h-[40vh] sm:h-[50vh] z-0 mask-image-b'}
      `}>
        <Map
          coordinates={route.coordinates}
          questions={route.questions}
          currentQuestionIndex={currentQuestionIndex}
          userLocation={location}
        />
        {/* Gradient Overlay only when NOT navigating (overview mode) */}
        {!isNavigating && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/20 to-dark-bg pointer-events-none" />
        )}
      </div>

      {/* Content Layer */}
      {/* If Navigating: Bottom 40%, If Overview: Standard Scroll */}
      <div className={`
        relative transition-all duration-500 ease-in-out z-10
        ${isNavigating
          ? 'h-[40vh] bg-dark-bg border-t border-white/10 shadow-up-lg' // Fixed Bottom Sheet
          : 'pt-[35vh] sm:pt-[45vh] px-4 sm:px-6 max-w-4xl mx-auto pb-32 pointer-events-none' // passthrough for map
        }
      `}>
        <motion.div
          layout
          className={`
             ${isNavigating
              ? 'h-full w-full'
              : 'glass-card backdrop-blur-xl border border-white/10 rounded-t-3xl min-h-[65vh] pointer-events-auto shadow-2xl'
            }
           `}
        >
          <div className={`${isNavigating ? 'h-full flex flex-col' : 'p-6 sm:p-8'}`}>

            {/* Header Actions - Overview Only */}
            {!isNavigating && (
              <div className="flex justify-between items-center mb-6">
                <Link href="/">
                  <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </div>
                    <span className="font-medium">Zpět</span>
                  </button>
                </Link>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-white/10 border border-white/10 ${route.difficulty === 'Lehká' ? 'text-green-400' :
                    route.difficulty === 'Střední' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                    {route.difficulty}
                  </span>
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {showCompletion ? (
                <motion.div
                  key="completion"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  {/* Completion UI */}
                  <div className="w-20 h-20 bg-accent-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                    <svg className="w-10 h-10 text-dark-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Trasa dokončena!</h2>

                  <div className="grid grid-cols-2 gap-4 mb-8 mt-8">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="text-2xl font-bold text-accent-secondary">{trailPoints}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest">Body</div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="text-2xl font-bold text-white">{Math.round((answers.filter(a => a.isCorrect).length / route.questions.length) * 100)}%</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest">Úspěšnost</div>
                    </div>
                  </div>
                  <Link href="/">
                    <button className="w-full py-4 bg-accent-primary text-white rounded-xl font-bold uppercase shadow-lg shadow-accent-primary/25 hover:bg-red-500 transition-colors">
                      Další trasa
                    </button>
                  </Link>
                </motion.div>
              ) : showOverview ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="pb-8"
                >
                  <div className="flex justify-between items-start mb-2 hidden sm:flex">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-white/10 border border-white/10 ${route.difficulty === 'Lehká' ? 'text-green-400' :
                      route.difficulty === 'Střední' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                      {route.difficulty}
                    </span>
                  </div>

                  <h1 className="text-4xl font-extrabold text-white mb-4 leading-none tracking-tight">{route.name}</h1>
                  <p className="text-gray-400 leading-relaxed mb-8 text-sm">{route.description}</p>

                  {/* Sports Stats Grid */}
                  <div className="grid grid-cols-3 gap-6 mb-8 border-y border-white/5 py-6">
                    <div>
                      <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Vzdálenost</div>
                      <div className="text-3xl font-black text-white flex items-baseline">
                        {route.length}
                        <span className="text-sm font-bold text-gray-500 ml-1">km</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Čas</div>
                      <div className="text-3xl font-black text-white flex items-baseline">
                        {route.duration.split(' ')[0]}
                        <span className="text-sm font-bold text-gray-500 ml-1">h</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Výstup</div>
                      <div className="text-3xl font-black text-accent-primary flex items-baseline">
                        {route.elevationGain || 120}
                        <span className="text-sm font-bold text-gray-500 ml-1">m</span>
                      </div>
                    </div>
                  </div>

                  {/* Elevation Profile */}
                  {route.elevationProfile && (
                    <div className="mb-8">
                      <div className="flex justify-between items-end mb-4">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Výškový profil</h3>
                        <span className="text-xs text-gray-500 font-mono">MAX {Math.max(...route.elevationProfile.map(p => p.elevation))}m</span>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <ElevationProfile profile={route.elevationProfile} color="#FE3B30" />
                      </div>
                    </div>
                  )}

                  {/* Info Badges */}
                  <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex items-center px-4 py-2 bg-white/5 rounded-full border border-white/5 whitespace-nowrap">
                      <span className="text-accent-secondary font-bold mr-2">{route.questions.length}</span>
                      <span className="text-xs text-gray-400 uppercase font-bold">Otázek</span>
                    </div>
                    <div className="flex items-center px-4 py-2 bg-white/5 rounded-full border border-white/5 whitespace-nowrap">
                      <span className="text-white font-bold mr-2">{route.reward}</span>
                      <span className="text-xs text-gray-400 uppercase font-bold">Bodů</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowOverview(false)}
                    className="w-full py-5 bg-accent-primary text-white rounded-xl font-bold text-xl uppercase shadow-xl shadow-accent-primary/20 hover:bg-red-500 transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Spustit trasu
                  </button>
                </motion.div>
              ) : (
                /* QUIZ FLOW & NAVIGATION - Full Compact Mode */
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col"
                >
                  {isNearTarget ? (
                    // UNLOCKED: Show Compact Quiz
                    <div className="flex-1 overflow-y-auto p-4 pb-20">
                      <div className="max-w-md mx-auto">
                        <Quiz
                          question={route.questions[currentQuestionIndex]}
                          onAnswer={handleAnswer}
                          isLastQuestion={currentQuestionIndex === route.questions.length - 1}
                        />
                      </div>
                    </div>
                  ) : (
                    // LOCKED: Navigation View
                    <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
                      <h2 className="text-xl font-bold text-white mb-2">Jdi na bod {currentQuestionIndex + 1}</h2>

                      {distanceToNextPoint !== null ? (
                        <div className="my-6">
                          <div className="text-5xl font-bold text-accent-primary tracking-tighter mb-1">
                            {distanceToNextPoint}
                            <span className="text-lg font-medium text-accent-primary/60 ml-1">m</span>
                          </div>
                          <div className="text-xs text-gray-400 uppercase tracking-widest">Vzdálenost</div>
                        </div>
                      ) : (
                        <div className="my-6 text-gray-500 animate-pulse">Hledám signál GPS...</div>
                      )}

                      <div className="text-sm text-gray-400 max-w-xs">
                        Až dojdeš na místo, otázka se automaticky zobrazí.
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Floating Back Button (Top Left) */}
      {isNavigating && (
        <button
          onClick={() => setShowOverview(true)}
          className="fixed top-6 left-4 z-20 p-3 bg-dark-bg/50 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg active:scale-95 transition-transform"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
      )}
    </div>
  );
}

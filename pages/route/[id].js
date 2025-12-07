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
  const { updateUserProgress, isTestingMode } = useAuth();

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
    if (route && (location || isTestingMode) && !showOverview && !isCompleted) {
      if (isTestingMode) {
        setIsNearTarget(true);
        setDistanceToNextPoint(0);
        return;
      }

      const currentTarget = route.questions[currentQuestionIndex]?.coordinates;
      if (currentTarget && location) {
        const dist = calculateDistance(location.lat, location.lng, currentTarget[0], currentTarget[1]);
        setDistanceToNextPoint(dist);
        // Unlock if closer than 50 meters
        setIsNearTarget(dist <= 50);
      }
    }
  }, [route, location, showOverview, currentQuestionIndex, isCompleted, isTestingMode]);


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
        relative w-full z-0 transition-all duration-500 ease-in-out
        ${isNavigating ? 'h-[60vh]' : 'h-[50vh]'} 
      `}>
        <Map
          coordinates={route.coordinates}
          questions={route.questions}
          currentQuestionIndex={currentQuestionIndex}
          userLocation={location}
        />
        {!isNavigating && (
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none" />
        )}
      </div>

      {/* Content Layer - Overlaps Map */}
      <div className={`
        relative z-10 transition-all duration-500 ease-in-out px-4 sm:px-6
        ${isNavigating
          ? 'flex-1 bg-dark-bg border-t border-white/10 shadow-up-lg pb-32 -mt-8 rounded-t-3xl'
          : '-mt-20 pb-40 max-w-4xl mx-auto'
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
                  <div className="w-24 h-24 bg-gradient-to-br from-accent-secondary to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3 border-4 border-white/10">
                    <span className="text-4xl">🏆</span>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-wide">MISE SPLNĚNA!</h2>
                  <p className="text-gray-400 font-medium">Skvělá práce, agente!</p>

                  <div className="grid grid-cols-2 gap-4 mb-8 mt-8">
                    <div className="adventure-card p-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      </div>
                      <div className="text-3xl font-black text-accent-secondary">{trailPoints}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">ZÍSKANÉ XP</div>
                    </div>
                    <div className="adventure-card p-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                      </div>
                      <div className="text-3xl font-black text-white">{Math.round((answers.filter(a => a.isCorrect).length / route.questions.length) * 100)}%</div>
                      <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">PŘESNOST</div>
                    </div>
                  </div>
                  <Link href="/">
                    <button className="mission-btn w-full py-4 text-white rounded-xl font-bold uppercase shadow-lg shadow-accent-primary/25 hover:bg-red-500 transition-colors text-lg">
                      ZPĚT NA ZÁKLADNU
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
                  <div className="flex justify-between items-start mb-4 hidden sm:flex">
                    <span className="level-badge px-3 py-1 rounded-full text-xs">
                      MISE #{route.id}
                    </span>
                  </div>

                  <h1 className="text-4xl font-black text-white mb-2 leading-none tracking-tight shadow-text">{route.name}</h1>
                  <p className="text-gray-400 leading-relaxed mb-8 text-sm font-medium">{route.description}</p>

                  {/* Mission Stats Grid */}
                  <div className="adventure-card p-6 mb-8 grid grid-cols-3 gap-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="text-center relative">
                      <div className="text-gray-500 text-[10px] font-black uppercase tracking-wider mb-1">CÍL</div>
                      <div className="text-2xl font-black text-white flex justify-center items-baseline">
                        {route.length}
                        <span className="text-sm font-bold text-gray-500 ml-1">km</span>
                      </div>
                    </div>

                    <div className="text-center border-l border-white/10 relative">
                      <div className="text-gray-500 text-[10px] font-black uppercase tracking-wider mb-1">LIMIT</div>
                      <div className="text-2xl font-black text-white flex justify-center items-baseline">
                        {route.duration.split(' ')[0]}
                        <span className="text-sm font-bold text-gray-500 ml-1">h</span>
                      </div>
                    </div>

                    <div className="text-center border-l border-white/10 relative">
                      <div className="text-gray-500 text-[10px] font-black uppercase tracking-wider mb-1">VÝSTUP</div>
                      <div className="text-2xl font-black text-accent-primary flex justify-center items-baseline">
                        {route.elevationGain || 120}
                        <span className="text-sm font-bold text-gray-500 ml-1">m</span>
                      </div>
                    </div>
                  </div>

                  {/* Elevation Profile - Adventure Style */}
                  {route.elevationProfile && (
                    <div className="mb-8">
                      <div className="flex justify-between items-end mb-4">
                        <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                          <svg className="w-4 h-4 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                          TERÉN MISE
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white">MAX {Math.max(...route.elevationProfile.map(p => p.elevation))}m</span>
                      </div>
                      <div className="adventure-card p-4">
                        <ElevationProfile profile={route.elevationProfile} color="#fbbf24" />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setShowOverview(false)}
                    className="mission-btn w-full py-5 text-xl flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ZAČÍT MISI
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
                    // LOCKED: Navigation View (HUD)
                    <div className="flex-1 flex flex-col justify-center items-center p-6 text-center relative overflow-hidden">
                      {/* Background pulse effect */}
                      <div className="absolute inset-0 bg-accent-primary/5 animate-pulse pointer-events-none" />

                      <div className="adventure-card p-6 w-full max-w-sm relative z-10 border-accent-primary/30">
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex justify-center items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent-secondary animate-ping" />
                          NAVIGACE K BODU {currentQuestionIndex + 1}
                        </h2>

                        {distanceToNextPoint !== null ? (
                          <div className="my-2">
                            <div className="text-6xl font-black text-white tracking-tighter drop-shadow-lg tabular-nums">
                              {distanceToNextPoint}
                            </div>
                            <div className="text-xs font-bold text-accent-primary uppercase tracking-[0.2em] mt-2">METRŮ K CÍLI</div>
                          </div>
                        ) : (
                          <div className="my-8 text-gray-500 animate-pulse font-mono text-sm">HLEDÁM GPS SIGNÁL...</div>
                        )}

                        <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-accent-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: distanceToNextPoint ? `${Math.min(100, Math.max(0, 100 - (distanceToNextPoint / 500) * 100))}%` : "0%" }}
                            transition={{ type: "spring", stiffness: 50 }}
                          />
                        </div>
                      </div>

                      <div className="mt-8 text-sm text-gray-400 max-w-xs font-medium bg-dark-bg/80 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5">
                        📍 Doraz na místo a odemkni další část příběhu.
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

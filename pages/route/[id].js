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
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">

      {/* Map Layer - Fullscreen during navigation */}
      <div className={`fixed inset-0 transition-all duration-500 ease-in-out ${isNavigating ? 'z-10 h-full' : 'z-0 h-[40vh] sm:h-[50vh] mask-image-b'}`}>
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

      {/* Main Content Interface */}
      <div className={`
        relative z-20 transition-all duration-500 ease-in-out
        ${isNavigating
          ? 'fixed bottom-0 left-0 right-0 p-4' // Floating Bottom Sheet
          : 'pt-[35vh] sm:pt-[45vh] px-4 sm:px-6 max-w-4xl mx-auto h-full' // Standard Scroll View
        }
      `}>
        <motion.div
          layout // Enable layout animation
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`
            glass-card backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl
            ${isNavigating ? 'rounded-3xl' : 'rounded-t-3xl min-h-[65vh]'}
          `}
        >
          <div className={`${isNavigating ? 'p-5' : 'p-6 sm:p-8'}`}>

            {/* Header Actions - Compact version during nav */}
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

            {/* Mode: Navigating Header (Back button floated on map maybe? Or simple X) */}
            {isNavigating && (
              <div className="absolute top-4 right-4 z-50">
                {/* Optional close/minimize button could go here */}
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
                  {/* Completion UI Same as before */}
                  <div className="w-20 h-20 bg-accent-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                    <svg className="w-10 h-10 text-dark-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Trasa dokončena!</h2>
                  <p className="text-gray-400 mb-8">Skvělá práce, zvládl jsi to.</p>

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
                  // ... Overview UI (Same) ...
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{route.name}</h1>
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">{route.description}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <div className="text-accent-primary font-bold text-lg">{route.length} km</div>
                      <div className="text-[10px] text-gray-500 uppercase">Délka</div>
                    </div>
                    {/* ... other stats ... */}
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <div className="text-white font-bold text-lg">{route.duration}</div>
                      <div className="text-[10px] text-gray-500 uppercase">Čas</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <div className="text-accent-secondary font-bold text-lg">{route.reward}</div>
                      <div className="text-[10px] text-gray-500 uppercase">Body</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                      <div className="text-white font-bold text-lg">{route.questions.length}</div>
                      <div className="text-[10px] text-gray-500 uppercase">Otázky</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowOverview(false)}
                    className="w-full py-4 bg-accent-primary text-white rounded-xl font-bold text-lg uppercase shadow-lg shadow-accent-primary/25 hover:bg-red-500 transition-all active:scale-95"
                  >
                    Spustit trasu
                  </button>
                </motion.div>
              ) : (
                /* QUIZ FLOW & NAVIGATION - Compact Mode */
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-h-[60vh] overflow-y-auto"
                >
                  {isNearTarget ? (
                    <>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-white">Otázka {currentQuestionIndex + 1}</h2>
                        {/* Close/Minimize button could go here too */}
                      </div>

                      {/* Progress Bar */}
                      <div className="h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
                        <motion.div
                          className="h-full bg-accent-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentQuestionIndex + 1) / route.questions.length) * 100}%` }}
                        />
                      </div>

                      <Quiz
                        question={route.questions[currentQuestionIndex]}
                        onAnswer={handleAnswer}
                        isLastQuestion={currentQuestionIndex === route.questions.length - 1}
                      />
                    </>
                  ) : (
                    /* NAVIGATION MODE - Compact */
                    <div className="flex items-center space-x-6">
                      <div className="flex-1">
                        <h2 className="text-lg font-bold text-white mb-1">Jdi na další bod</h2>
                        <div className="text-sm text-gray-400">
                          {distanceToNextPoint !== null ? `${distanceToNextPoint} metrů daleko` : 'Hledám signál...'}
                        </div>
                      </div>

                      <div className="bg-accent-primary/10 border border-accent-primary/20 rounded-2xl w-16 h-16 flex items-center justify-center flex-shrink-0 animate-pulse relative">
                        <span className="text-xl font-bold text-accent-primary">{distanceToNextPoint || '?'}</span>
                        <span className="text-[10px] absolute bottom-2 text-accent-primary/60">m</span>
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Floating Back Button for Navigation Mode */}
      {isNavigating && (
        <button
          onClick={() => setShowOverview(true)}
          className="fixed top-6 left-4 z-50 p-3 bg-dark-bg/80 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
      )}
    </div>
  );
}

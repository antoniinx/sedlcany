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

  return (
    <div className="min-h-screen bg-dark-bg pb-24 relative">

      {/* Immersive Map Background - Always show Route & User Location */}
      <div className={`fixed inset-0 z-0 transition-all duration-500 ${(!showOverview && !isNearTarget) ? 'h-[70vh]' : 'h-[40vh] sm:h-[50vh]'} mask-image-b`}>
        <Map
          coordinates={route.coordinates}
          questions={route.questions}
          currentQuestionIndex={currentQuestionIndex}
          userLocation={location}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/20 to-dark-bg pointer-events-none" />
      </div>

      {/* Main Content Sheet */}
      <div className={`relative z-10 transition-all duration-500 ${(!showOverview && !isNearTarget) ? 'pt-[65vh]' : 'pt-[35vh] sm:pt-[45vh]'} px-4 sm:px-6 max-w-4xl mx-auto`}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card rounded-t-3xl min-h-[65vh] p-6 sm:p-8 backdrop-blur-xl border-t border-white/10"
        >

          {/* Header Actions */}
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

          <AnimatePresence mode="wait">
            {showCompletion ? (
              <motion.div
                key="completion"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-accent-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <svg className="w-10 h-10 text-dark-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Trasa dokončena!</h2>
                <p className="text-gray-400 mb-8">Skvělá práce, zvládl jsi to.</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
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
              >
                <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{route.name}</h1>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">{route.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <div className="text-accent-primary font-bold text-lg">{route.length} km</div>
                    <div className="text-[10px] text-gray-500 uppercase">Délka</div>
                  </div>
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

                {/* Start Button */}
                <button
                  onClick={() => setShowOverview(false)}
                  className="w-full py-4 bg-accent-primary text-white rounded-xl font-bold text-lg uppercase shadow-lg shadow-accent-primary/25 hover:bg-red-500 transition-all active:scale-95"
                >
                  Spustit trasu
                </button>
              </motion.div>
            ) : (
              /* QUIZ FLOW - Geolocation Protected */
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {isNearTarget ? (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="font-bold text-white">Etape {currentQuestionIndex + 1}</h2>
                      <div className="text-sm font-medium text-gray-400">
                        {currentQuestionIndex + 1} / {route.questions.length}
                      </div>
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
                  /* LOCKED STATE - NAVIGATION MODE */
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <svg className="w-8 h-8 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Najdi další bod</h2>
                    <p className="text-gray-400 max-w-xs mx-auto mb-6">
                      K odemčení otázky musíš dojít na určené místo.
                    </p>

                    {distanceToNextPoint !== null ? (
                      <div className="inline-block bg-accent-primary/20 border border-accent-primary/40 rounded-xl px-6 py-3">
                        <span className="text-2xl font-bold text-accent-primary">{distanceToNextPoint} m</span>
                        <span className="block text-[10px] text-accent-primary/70 uppercase tracking-widest mt-1">Vzdálenost</span>
                      </div>
                    ) : (
                      <div className="text-red-400 text-sm">
                        {geoError ? 'Povol přístup k poloze' : 'Hledám signál...'}
                      </div>
                    )}

                    <p className="text-xs text-gray-500 mt-8">
                      Sleduj mapu nahoře pro navigaci k bodu.
                    </p>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}


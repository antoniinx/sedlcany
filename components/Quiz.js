import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Quiz({ question, onAnswer, isLastQuestion }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const currentPoints = parseInt(localStorage.getItem('totalPoints') || '0', 10);
      const newPoints = currentPoints + question.points;
      localStorage.setItem('totalPoints', newPoints.toString());
      window.dispatchEvent(new Event('pointsUpdated'));
    }
  };

  const handleNext = () => {
    onAnswer(selectedAnswer, isCorrect);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  return (
    <div className="relative px-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Question Header */}
          <div className="mb-4">
            <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest mb-1 block">
              Otázka za {question.points} bodů
            </span>
            <h3 className="text-lg font-bold text-white leading-snug">
              {question.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-2">
            {question.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrectOption = option.id === question.correctAnswer;

              let backgroundColor = "bg-white/5";
              let borderColor = "border-white/10";
              let textColor = "text-gray-300";

              if (showFeedback) {
                if (isCorrectOption) {
                  backgroundColor = "bg-accent-secondary/20";
                  borderColor = "border-accent-secondary";
                  textColor = "text-accent-secondary";
                } else if (isSelected && !isCorrect) {
                  backgroundColor = "bg-accent-primary/20";
                  borderColor = "border-accent-primary";
                  textColor = "text-accent-primary";
                } else {
                  textColor = "text-gray-500 opacity-50";
                }
              } else if (isSelected) {
                backgroundColor = "bg-accent-primary/20";
                borderColor = "border-accent-primary";
                textColor = "text-white";
              }

              return (
                <motion.button
                  key={option.id}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  onClick={() => !showFeedback && setSelectedAnswer(option.id)}
                  disabled={showFeedback}
                  className={`w-full text-left p-3 rounded-xl border ${borderColor} ${backgroundColor} ${textColor} transition-all duration-200 relative overflow-hidden group`}
                >
                  <div className="flex items-center">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 border ${showFeedback && isCorrectOption ? 'border-accent-secondary text-accent-secondary' :
                      isSelected ? 'border-accent-primary text-accent-primary bg-accent-primary/10' :
                        'border-white/20 text-gray-400'
                      }`}>
                      {option.id.toUpperCase()}
                    </span>
                    <span className="font-medium text-sm">{option.text}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback Overlay with Animation */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className={`p-3 rounded-xl mb-3 flex items-start gap-3 ${isCorrect ? 'bg-accent-secondary/10 border border-accent-secondary/20' : 'bg-accent-primary/10 border border-accent-primary/20'
              }`}>
              <div className={`p-1.5 rounded-full ${isCorrect ? 'bg-accent-secondary text-dark-bg' : 'bg-accent-primary text-white'}`}>
                {isCorrect ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>
              <div>
                <h4 className={`font-bold text-sm mb-0.5 ${isCorrect ? 'text-accent-secondary' : 'text-accent-primary'}`}>
                  {isCorrect ? 'Správně!' : 'Špatně!'}
                </h4>
                <p className="text-xs text-gray-300">
                  {isCorrect
                    ? `Výborně! Přičítáme ${question.points} bodů.`
                    : `Správná: ${question.correctAnswer.toUpperCase()}`
                  }
                </p>
              </div>
            </div>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-white text-dark-bg font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <span>{isLastQuestion ? 'Dokončit kvíz' : 'Další otázka'}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button (only visible before feedback) */}
      {!showFeedback && (
        <div className="mt-4">
          <motion.button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            whileTap={selectedAnswer ? { scale: 0.98 } : {}}
            className={`w-full py-3 rounded-xl font-bold transition-all duration-200 text-sm ${selectedAnswer
              ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/25'
              : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
          >
            Odeslat odpověď
          </motion.button>
        </div>
      )}
    </div>
  );
}


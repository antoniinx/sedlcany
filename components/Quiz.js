import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Quiz({ question, onAnswer, isLastQuestion }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [question]);

  const handleSubmit = () => {
    if (!selectedOption) return;

    const correct = selectedOption === question.correctAnswer;
    setIsAnswered(true);
    setIsCorrect(correct);

    // Small delay before proceeding via callback
    setTimeout(() => {
      onAnswer(selectedOption, correct);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col justify-center">

        {/* Question Card */}
        <div className="adventure-card p-6 mb-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-accent-primary" />
          <h3 className="text-xl font-black text-white ml-2 leading-tight">
            {question.question}
          </h3>
          <div className="mt-2 ml-2 flex items-center text-xs font-bold text-accent-secondary uppercase tracking-widest">
            <span>{question.points} XP</span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id;
            // Determined styles based on state
            let btnClass = "w-full p-4 rounded-xl border-2 font-bold text-left transition-all relative overflow-hidden flex items-center justify-between group ";

            if (isAnswered) {
              if (option.id === question.correctAnswer) {
                btnClass += "bg-green-500/20 border-green-500 text-white";
              } else if (isSelected) {
                btnClass += "bg-red-500/20 border-red-500 text-white";
              } else {
                btnClass += "border-white/5 text-gray-500 opacity-50";
              }
            } else {
              if (isSelected) {
                btnClass += "bg-accent-primary/20 border-accent-primary text-white shadow-[0_0_15px_rgba(248,113,113,0.3)]";
              } else {
                btnClass += "bg-[#1e293b] border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/30";
              }
            }

            return (
              <motion.button
                key={option.id}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                onClick={() => !isAnswered && setSelectedOption(option.id)}
                className={btnClass}
                disabled={isAnswered}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black border-2 ${isAnswered
                      ? (option.id === question.correctAnswer ? 'border-green-500 text-green-500' : isSelected ? 'border-red-500 text-red-500' : 'border-gray-600 text-gray-600')
                      : (isSelected ? 'border-accent-primary text-accent-primary bg-accent-primary/10' : 'border-gray-600 text-gray-400')
                    }`}>
                    {option.id.toUpperCase()}
                  </span>
                  <span>{option.text}</span>
                </div>

                {/* Status Icons */}
                {isAnswered && option.id === question.correctAnswer && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </motion.div>
                )}
                {isAnswered && isSelected && option.id !== question.correctAnswer && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Action Area */}
      <div className="pt-4 mt-auto min-h-[80px]">
        <AnimatePresence mode="wait">
          {!isAnswered ? (
            <motion.div
              key="submit-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className={`mission-btn w-full py-4 rounded-2xl text-lg tracking-widest transition-all ${!selectedOption ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
              >
                ODESLAT ODPOVĚĎ
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result-msg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-center p-4 rounded-2xl border ${isCorrect ? 'bg-green-500/20 border-green-500/50' : 'bg-red-500/20 border-red-500/50'}`}
            >
              <span className={`text-xl font-black uppercase flex items-center justify-center gap-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? (
                  <>
                    <span>+ {question.points} XP</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </>
                ) : (
                  <>
                    <span>ŠPATNĚ...</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  </>
                )}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


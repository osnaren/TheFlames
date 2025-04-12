import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface SlotMachineRevealProps {
  remainingLetters: string[];
  onComplete: () => void;
  animationsEnabled: boolean;
}

const FLAMES_LETTERS = ['F', 'L', 'A', 'M', 'E', 'S'];

const SlotMachineReveal: React.FC<SlotMachineRevealProps> = ({ remainingLetters, onComplete, animationsEnabled }) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [currentIndices, setCurrentIndices] = useState(FLAMES_LETTERS.map(() => 0));
  const [spinCompleted, setSpinCompleted] = useState<boolean[]>(Array(6).fill(false));

  useEffect(() => {
    if (!animationsEnabled) {
      setIsSpinning(false);
      onComplete();
      return;
    }

    let intervals: NodeJS.Timeout[] = [];

    // Create spinning effect for each letter
    FLAMES_LETTERS.forEach((_, index) => {
      // Stagger the start and duration of each letter's spin
      const startDelay = index * 200;
      const spinDuration = 2000 + index * 500;

      setTimeout(() => {
        const interval = setInterval(() => {
          setCurrentIndices((prev) => {
            const next = [...prev];
            next[index] = (next[index] + 1) % FLAMES_LETTERS.length;
            return next;
          });
        }, 100);

        intervals.push(interval);

        // Stop spinning after duration
        setTimeout(() => {
          clearInterval(interval);
          setSpinCompleted((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });

          // Check if all spins are complete
          if (index === FLAMES_LETTERS.length - 1) {
            setIsSpinning(false);
            setTimeout(onComplete, 1000);
          }
        }, spinDuration);
      }, startDelay);
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [animationsEnabled, onComplete]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="mx-auto w-full max-w-4xl p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {FLAMES_LETTERS.map((letter, index) => (
            <motion.div
              key={letter}
              variants={letterVariants}
              className={`relative h-20 w-16 overflow-hidden rounded-xl md:h-32 md:w-24 ${
                spinCompleted[index]
                  ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-black/30'
                  : 'ring-1 ring-white/20'
              }`}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Slot window background */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 backdrop-blur" />

              {/* Letter display */}
              <motion.div
                className={`absolute inset-0 flex items-center justify-center text-3xl font-bold md:text-5xl ${spinCompleted[index] ? 'text-orange-500' : 'text-white/90'}`}
                animate={
                  isSpinning && !spinCompleted[index]
                    ? {
                        y: [0, -100],
                        transition: {
                          y: {
                            duration: 0.1,
                            repeat: Infinity,
                            ease: 'linear',
                          },
                        },
                      }
                    : {}
                }
              >
                {FLAMES_LETTERS[currentIndices[index]]}
              </motion.div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

              {/* Completion flash */}
              {spinCompleted[index] && (
                <motion.div
                  className="absolute inset-0 bg-orange-500"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Visual helpers */}
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-12 rounded-full bg-orange-500/50" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SlotMachineReveal;

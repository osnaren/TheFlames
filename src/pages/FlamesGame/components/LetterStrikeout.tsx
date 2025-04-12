import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface LetterStrikeoutProps {
  name1: string;
  name2: string;
  onComplete: (remainingLetters: string[]) => void;
  animationsEnabled: boolean;
}

interface LetterTile {
  char: string;
  id: string;
  isCommon: boolean;
  isStruck: boolean;
}

const LetterStrikeout: React.FC<LetterStrikeoutProps> = ({ name1, name2, onComplete, animationsEnabled }) => {
  const [name1Tiles, setName1Tiles] = useState<LetterTile[]>([]);
  const [name2Tiles, setName2Tiles] = useState<LetterTile[]>([]);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Process names and find common letters
    const processNames = () => {
      const name1Chars = name1.toLowerCase().split('');
      const name2Chars = name2.toLowerCase().split('');
      const commonIndices = new Set<number>();

      // Find common letters
      for (let i = 0; i < name1Chars.length; i++) {
        const char = name1Chars[i];
        const name2Index = name2Chars.indexOf(char);
        if (name2Index !== -1) {
          commonIndices.add(i);
          name2Chars[name2Index] = ''; // Mark as used
        }
      }

      // Create tiles for both names
      const tiles1 = name1Chars.map((char, index) => ({
        char,
        id: `name1-${index}`,
        isCommon: commonIndices.has(index),
        isStruck: false,
      }));

      const tiles2 = name2
        .toLowerCase()
        .split('')
        .map((char, index) => ({
          char,
          id: `name2-${index}`,
          isCommon: name1Chars.includes(char),
          isStruck: false,
        }));

      setName1Tiles(tiles1);
      setName2Tiles(tiles2);

      if (!animationsEnabled) {
        // Skip animations and complete immediately
        const remainingLetters = [...name1Chars].filter((_, i) => !commonIndices.has(i));
        onComplete(remainingLetters);
      } else {
        // Start strike-out animation sequence
        animateStrikeout(tiles1, tiles2, Array.from(commonIndices));
      }
    };

    processNames();
  }, [name1, name2, onComplete, animationsEnabled]);

  const animateStrikeout = (tiles1: LetterTile[], tiles2: LetterTile[], commonIndices: number[]) => {
    let currentIndex = 0;

    const strikeInterval = setInterval(() => {
      if (currentIndex >= commonIndices.length) {
        clearInterval(strikeInterval);
        setIsProcessing(false);
        const remainingLetters = tiles1.filter((tile) => !tile.isCommon).map((tile) => tile.char);
        onComplete(remainingLetters);
        return;
      }

      setName1Tiles((prev) =>
        prev.map((tile) => (tile.isCommon && !tile.isStruck ? { ...tile, isStruck: true } : tile))
      );

      setName2Tiles((prev) =>
        prev.map((tile) => (tile.isCommon && !tile.isStruck ? { ...tile, isStruck: true } : tile))
      );

      currentIndex++;
    }, 500);

    return () => clearInterval(strikeInterval);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: animationsEnabled ? 0.5 : 0,
        when: 'beforeChildren',
        staggerChildren: animationsEnabled ? 0.1 : 0,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: animationsEnabled ? 0.3 : 0 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: animationsEnabled ? 0.3 : 0 },
    },
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
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-16">
          {/* Name 1 */}
          <motion.div className="w-full flex-1">
            <h3 className="mb-4 text-center text-2xl text-white/80">{name1}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {name1Tiles.map((tile) => (
                <motion.div
                  key={tile.id}
                  variants={letterVariants}
                  className={`relative flex h-12 w-12 items-center justify-center text-2xl font-bold ${
                    tile.isCommon ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'
                  } rounded-lg backdrop-blur-sm`}
                >
                  {tile.char.toUpperCase()}
                  {tile.isStruck && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-1/2 left-0 h-0.5 bg-red-500"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="hidden h-32 w-px bg-white/20 md:block" />

          {/* Name 2 */}
          <motion.div className="w-full flex-1">
            <h3 className="mb-4 text-center text-2xl text-white/80">{name2}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {name2Tiles.map((tile) => (
                <motion.div
                  key={tile.id}
                  variants={letterVariants}
                  className={`relative flex h-12 w-12 items-center justify-center text-2xl font-bold ${
                    tile.isCommon ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'
                  } rounded-lg backdrop-blur-sm`}
                >
                  {tile.char.toUpperCase()}
                  {tile.isStruck && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-1/2 left-0 h-0.5 bg-red-500"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LetterStrikeout;

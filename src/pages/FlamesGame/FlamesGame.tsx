import { AnimatePresence, motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import React, { useReducer, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiSettings } from 'react-icons/fi';
import LetterStrikeout from './components/LetterStrikeout';
import NameEntryForm from './components/NameEntryForm';
import SlotMachineReveal from './components/SlotMachineReveal';

// Define game stages
enum GameStage {
  NAME_ENTRY = 'name_entry',
  LETTER_STRIKEOUT = 'letter_strikeout',
  SLOT_MACHINE = 'slot_machine',
  RESULT = 'result',
}

// Game state interface
interface GameState {
  stage: GameStage;
  name1: string;
  name2: string;
  remainingLetters: string[];
  result: string | null;
  resultMeaning: string | null;
}

// Action types for reducer
type GameAction =
  | { type: 'SUBMIT_NAMES'; payload: { name1: string; name2: string } }
  | { type: 'COMPLETE_STRIKEOUT'; payload: { remainingLetters: string[] } }
  | { type: 'REVEAL_RESULT'; payload: { result: string; resultMeaning: string } }
  | { type: 'RESET_GAME' };

// Result meanings
const FLAMES_MEANINGS = {
  F: 'Friends',
  L: 'Love',
  A: 'Affection',
  M: 'Marriage',
  E: 'Enemy',
  S: 'Siblings',
};

// Result emojis and quotes
const RESULT_DETAILS = {
  F: { emoji: '👯‍♀️', quote: 'Friends stick together through thick and thin!' },
  L: { emoji: '💘', quote: 'Love is in the air!' },
  A: { emoji: '🥰', quote: 'Affection grows with time!' },
  M: { emoji: '💍', quote: 'When is the wedding?' },
  E: { emoji: '😈', quote: 'Keep your friends close, but enemies closer!' },
  S: { emoji: '👨‍👩‍👧‍👦', quote: "Like siblings - can't live with or without them!" },
};

// Initial game state
const initialGameState: GameState = {
  stage: GameStage.NAME_ENTRY,
  name1: '',
  name2: '',
  remainingLetters: [],
  result: null,
  resultMeaning: null,
};

// Reducer function to manage game state
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SUBMIT_NAMES':
      return {
        ...state,
        name1: action.payload.name1,
        name2: action.payload.name2,
        stage: GameStage.LETTER_STRIKEOUT,
      };
    case 'COMPLETE_STRIKEOUT':
      return {
        ...state,
        remainingLetters: action.payload.remainingLetters,
        stage: GameStage.SLOT_MACHINE,
      };
    case 'REVEAL_RESULT':
      return {
        ...state,
        result: action.payload.result,
        resultMeaning: action.payload.resultMeaning,
        stage: GameStage.RESULT,
      };
    case 'RESET_GAME':
      return initialGameState;
    default:
      return state;
  }
};

// Calculate FLAMES result
const calculateFlamesResult = (remainingLetters: string[]): string => {
  const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
  let count = remainingLetters.length % flames.length;

  // If count is 0, return the last letter
  if (count === 0) count = flames.length;

  return flames[count - 1];
};

const FlamesGame: React.FC = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

  // Handle name submission
  const handleNameSubmit = (name1: string, name2: string) => {
    toast.success('Names submitted successfully!');
    dispatch({ type: 'SUBMIT_NAMES', payload: { name1, name2 } });
  };

  // Handle strikeout completion
  const handleStrikeoutComplete = (remainingLetters: string[]) => {
    dispatch({ type: 'COMPLETE_STRIKEOUT', payload: { remainingLetters } });
  };

  // Handle slot machine completion
  const handleSlotMachineComplete = () => {
    const result = calculateFlamesResult(gameState.remainingLetters);
    const resultMeaning = FLAMES_MEANINGS[result as keyof typeof FLAMES_MEANINGS] || '';

    dispatch({
      type: 'REVEAL_RESULT',
      payload: { result, resultMeaning },
    });
  };

  // Reset the game
  const handleReset = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  // Toggle animations
  const toggleAnimations = () => {
    setAnimationsEnabled((prev) => !prev);
    toast.success(`Animations ${!animationsEnabled ? 'enabled' : 'disabled'}`);
  };

  // Get the details for a result
  const getResultDetails = (result: string) => {
    return RESULT_DETAILS[result as keyof typeof RESULT_DETAILS] || { emoji: '❓', quote: 'Unknown result' };
  };

  // Take a screenshot of the result
  const handleScreenshot = async () => {
    try {
      const resultElement = document.querySelector('.result-capture');
      if (!resultElement) {
        toast.error('Could not capture screenshot');
        return;
      }

      const canvas = await html2canvas(resultElement);
      const dataUrl = canvas.toDataURL('image/png');

      // Create a temporary link element to download the image
      const link = document.createElement('a');
      link.download = `flames-result-${gameState.name1}-${gameState.name2}.png`;
      link.href = dataUrl;
      link.click();

      toast.success('Screenshot saved!');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      toast.error('Failed to capture screenshot');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-black p-8">
      {/* Background particles effect */}
      <div className="absolute inset-0 bg-[url('/src/assets/polygons2.jpg')] bg-cover bg-center opacity-20" />

      {/* Settings toggle */}
      <div
        className="group absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-white/10 p-2 transition-all duration-300 hover:bg-white/20"
        onClick={toggleAnimations}
      >
        <FiSettings
          className={`text-2xl ${
            animationsEnabled ? 'rotate-90 text-orange-500' : 'text-white'
          } transition-all duration-300`}
        />
        <span className="absolute top-1/2 right-full mr-2 -translate-y-1/2 rounded bg-black/80 px-2 py-1 text-sm whitespace-nowrap text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {animationsEnabled ? 'Disable' : 'Enable'} Animations
        </span>
      </div>

      {/* Game content */}
      <div className="relative z-10 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {gameState.stage === GameStage.NAME_ENTRY && (
            <NameEntryForm onSubmit={handleNameSubmit} animationsEnabled={animationsEnabled} />
          )}

          {gameState.stage === GameStage.LETTER_STRIKEOUT && (
            <LetterStrikeout
              name1={gameState.name1}
              name2={gameState.name2}
              onComplete={handleStrikeoutComplete}
              animationsEnabled={animationsEnabled}
            />
          )}

          {gameState.stage === GameStage.SLOT_MACHINE && (
            <SlotMachineReveal
              remainingLetters={gameState.remainingLetters}
              onComplete={handleSlotMachineComplete}
              animationsEnabled={animationsEnabled}
            />
          )}

          {gameState.stage === GameStage.RESULT && gameState.result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="result-capture mx-auto w-full max-w-md rounded-2xl bg-black/30 p-8 shadow-2xl backdrop-blur-lg"
            >
              <div className="text-center">
                <motion.h2
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="mb-4 animate-pulse text-8xl font-bold text-orange-500"
                >
                  {gameState.result}
                </motion.h2>

                <h3 className="mb-8 text-3xl text-white">{gameState.resultMeaning}</h3>

                <div className="space-y-4">
                  <div className="animate-bounce text-6xl">{getResultDetails(gameState.result).emoji}</div>
                  <p className="text-white/80 italic">{getResultDetails(gameState.result).quote}</p>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-orange-600 hover:to-red-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black/30 focus:outline-none"
                  >
                    Try Again
                  </button>

                  <button
                    onClick={handleScreenshot}
                    className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
                  >
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlamesGame;
